from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler
import os
import logging
from datetime import datetime
from functools import wraps

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('claimnet.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:3000"], supports_credentials=True)

# ── Paths ──────────────────────────────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "final_claimnet_model.pkl")
CSV_PATH   = os.path.join(BASE_DIR, "insurance_claims_raw_10k.csv")

# ── Feature columns (same order as training) ───────────────────────────────────
FEATURE_COLS = [
    'age', 'gender', 'marital_status', 'income', 'education_level',
    'employment_status', 'credit_score', 'vehicle_age', 'vehicle_type',
    'vehicle_price', 'policy_tenure', 'premium_amount', 'no_of_claims',
    'accident_severity', 'region', 'fraudulent_flag', 'agent_rating',
    'claim_amount', 'premium_to_income_ratio', 'vehicle_depreciation_ratio',
    'claim_to_premium_ratio', 'is_high_risk_vehicle', 'young_driver_flag',
    'low_credit_flag', 'high_claim_frequency'
]

CAT_COLS = ['gender', 'marital_status', 'education_level',
            'employment_status', 'vehicle_type', 'accident_severity', 'region']

NUMERIC_COLS = ['age', 'income', 'credit_score', 'vehicle_age', 'vehicle_price',
                'policy_tenure', 'premium_amount', 'no_of_claims', 'agent_rating',
                'claim_amount', 'fraudulent_flag']

# Valid categorical values
VALID_CATEGORIES = {
    'gender': ['Male', 'Female', 'Other'],
    'marital_status': ['Single', 'Married', 'Divorced', 'Widowed'],
    'education_level': ['High School', 'Bachelor', 'Master', 'PhD', 'Other'],
    'employment_status': ['Employed', 'Self-Employed', 'Unemployed', 'Retired', 'Student'],
    'vehicle_type': ['Sedan', 'SUV', 'Truck', 'Hatchback', 'Luxury', 'Sports'],
    'accident_severity': ['Minor', 'Moderate', 'Major', 'Total Loss'],
    'region': ['North', 'South', 'East', 'West', 'Central']
}

# ── Load model and fit pipeline on startup ─────────────────────────────────────
print("[Loading] Loading model and setting up pipeline...")
logger.info("Starting ClaimNet API server...")
 
try:
    model = joblib.load(MODEL_PATH)
    logger.info(f"Model loaded successfully from {MODEL_PATH}")
except Exception as e:
    logger.error(f"Failed to load model: {e}")
    raise
 
print("[Ready] Model and pipeline ready!")
logger.info("Model and preprocessing pipeline ready for predictions")


# ── Validation helpers ─────────────────────────────────────────────────────────
def validate_input(data):
    """Validate input data"""
    errors = []
    
    # Check required fields
    required_fields = ['age', 'gender', 'marital_status', 'income', 'education_level',
                       'employment_status', 'credit_score', 'vehicle_age', 'vehicle_type',
                       'vehicle_price', 'policy_tenure', 'premium_amount', 'no_of_claims',
                       'accident_severity', 'region', 'agent_rating', 'claim_amount']
    
    for field in required_fields:
        if field not in data:
            errors.append(f"Missing required field: {field}")
    
    if errors:
        return False, errors
    
    # Validate numeric ranges
    validations = [
        ('age', 18, 100, "Age must be between 18 and 100"),
        ('income', 0, 10000000, "Income must be positive"),
        ('credit_score', 300, 850, "Credit score must be between 300 and 850"),
        ('vehicle_age', 0, 50, "Vehicle age must be between 0 and 50"),
        ('vehicle_price', 1000, 500000, "Vehicle price must be between 1,000 and 500,000"),
        ('policy_tenure', 0, 50, "Policy tenure must be between 0 and 50 years"),
        ('premium_amount', 100, 50000, "Premium amount must be between 100 and 50,000"),
        ('no_of_claims', 0, 50, "Number of claims must be between 0 and 50"),
        ('agent_rating', 1, 5, "Agent rating must be between 1 and 5"),
        ('claim_amount', 100, 1000000, "Claim amount must be between 100 and 1,000,000"),
    ]
    
    for field, min_val, max_val, message in validations:
        try:
            value = float(data[field])
            if value < min_val or value > max_val:
                errors.append(message)
        except (ValueError, TypeError):
            errors.append(f"{field} must be a valid number")
    
    # Validate categorical values
    for field, valid_values in VALID_CATEGORIES.items():
        if field in data and data[field] not in valid_values:
            errors.append(f"{field} must be one of: {', '.join(valid_values)}")
    
    # Set default for fraudulent_flag if not provided
    if 'fraudulent_flag' not in data:
        data['fraudulent_flag'] = 0
    
    return len(errors) == 0, errors


# ── Helper: compute derived features ──────────────────────────────────────────
def compute_derived(data: dict) -> dict:
    age            = int(data["age"])
    income         = float(data["income"])
    credit_score   = int(data["credit_score"])
    vehicle_age    = int(data["vehicle_age"])
    vehicle_type   = data["vehicle_type"]
    policy_tenure  = int(data["policy_tenure"])
    premium_amount = float(data["premium_amount"])
    no_of_claims   = int(data["no_of_claims"])
    claim_amount   = float(data["claim_amount"])

    data["premium_to_income_ratio"]    = premium_amount / income if income else 0
    data["vehicle_depreciation_ratio"] = vehicle_age / (policy_tenure + 1)
    data["claim_to_premium_ratio"]     = claim_amount / (premium_amount + 1)
    data["is_high_risk_vehicle"]       = 1 if vehicle_type in ["SUV", "Truck"] else 0
    data["young_driver_flag"]          = 1 if age < 25 else 0
    data["low_credit_flag"]            = 1 if credit_score < 600 else 0
    data["high_claim_frequency"]       = 1 if no_of_claims >= 3 else 0
    return data


def process_single_prediction(data):
    """Process a single prediction"""
    # Compute derived features
    data = compute_derived(data)
    
    # Build DataFrame in correct column order
    row = pd.DataFrame([data], columns=FEATURE_COLS)
    
    # Predict
    pred = int(model.predict(row)[0])
    prob = float(model.predict_proba(row)[0][1])
    
    return {
        "approved": pred == 1,
        "probability": round(prob, 4),
        "confidence": "High" if prob > 0.8 or prob < 0.2 else "Medium" if prob > 0.6 or prob < 0.4 else "Low",
        "derived_features": {
            "premium_to_income_ratio":    round(data["premium_to_income_ratio"], 4),
            "vehicle_depreciation_ratio": round(data["vehicle_depreciation_ratio"], 4),
            "claim_to_premium_ratio":     round(data["claim_to_premium_ratio"], 4),
            "is_high_risk_vehicle":       bool(data["is_high_risk_vehicle"]),
            "young_driver_flag":          bool(data["young_driver_flag"]),
            "low_credit_flag":            bool(data["low_credit_flag"]),
            "high_claim_frequency":       bool(data["high_claim_frequency"]),
        },
        "risk_factors": []
    }


# ── API Endpoints ─────────────────────────────────────────────────────────────

@app.route("/", methods=["GET"])
def root():
    """API root with basic info"""
    return jsonify({
        "name": "ClaimNet API",
        "version": "1.0.0",
        "status": "operational",
        "endpoints": {
            "/predict": "POST - Single claim prediction",
            "/predict/batch": "POST - Batch claim predictions",
            "/model/info": "GET - Model information",
            "/health": "GET - Health check",
            "/docs": "GET - API documentation"
        }
    })


@app.route("/docs", methods=["GET"])
def api_docs():
    """API documentation"""
    return jsonify({
        "api": "ClaimNet Insurance Claim Prediction API",
        "version": "1.0.0",
        "endpoints": {
            "/predict": {
                "method": "POST",
                "description": "Predict single claim approval",
                "request_body": {
                    "age": "integer (18-100)",
                    "gender": "string (Male/Female/Other)",
                    "marital_status": "string (Single/Married/Divorced/Widowed)",
                    "income": "number (positive)",
                    "education_level": "string (High School/Bachelor/Master/PhD/Other)",
                    "employment_status": "string (Employed/Self-Employed/Unemployed/Retired/Student)",
                    "credit_score": "integer (300-850)",
                    "vehicle_age": "integer (0-50)",
                    "vehicle_type": "string (Sedan/SUV/Truck/Hatchback/Luxury/Sports)",
                    "vehicle_price": "number (1000-500000)",
                    "policy_tenure": "integer (0-50)",
                    "premium_amount": "number (100-50000)",
                    "no_of_claims": "integer (0-50)",
                    "accident_severity": "string (Minor/Moderate/Major/Total Loss)",
                    "region": "string (North/South/East/West/Central)",
                    "agent_rating": "integer (1-5)",
                    "claim_amount": "number (100-1000000)",
                    "fraudulent_flag": "integer (0-1, optional, default: 0)"
                },
                "response": {
                    "approved": "boolean",
                    "probability": "float (0-1)",
                    "confidence": "string (High/Medium/Low)",
                    "derived_features": "object",
                    "risk_factors": "array"
                }
            },
            "/predict/batch": {
                "method": "POST",
                "description": "Predict multiple claims",
                "request_body": {
                    "claims": "array of claim objects"
                }
            },
            "/model/info": {
                "method": "GET",
                "description": "Get model information and statistics"
            },
            "/health": {
                "method": "GET",
                "description": "Health check endpoint"
            }
        }
    })


@app.route("/health", methods=["GET"])
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "model_loaded": model is not None,
        "version": "1.0.0"
    })


@app.route("/model/info", methods=["GET"])
def model_info():
    """Get model information"""
    return jsonify({
        "model_type": type(model).__name__,
        "features_count": len(FEATURE_COLS),
        "features": FEATURE_COLS,
        "categorical_features": CAT_COLS,
        "valid_categories": VALID_CATEGORIES,
        "training_data_size": 10000,
        "model_path": MODEL_PATH,
        "last_updated": datetime.fromtimestamp(os.path.getmtime(MODEL_PATH)).isoformat()
    })


@app.route("/predict", methods=["POST"])
def predict():
    """Single claim prediction"""
    try:
        body = request.get_json(force=True)
        if not body:
            logger.warning("Empty request body received")
            return jsonify({"error": "Empty request body"}), 400
        
        logger.info(f"Prediction request received: {body.get('age', 'N/A')}yo, ${body.get('claim_amount', 'N/A')} claim")
        
        # Validate input
        is_valid, errors = validate_input(body)
        if not is_valid:
            logger.warning(f"Validation failed: {errors}")
            return jsonify({"error": "Validation failed", "details": errors}), 400
        
        # Process prediction
        result = process_single_prediction(body)
        
        # Add risk factors
        risk_factors = []
        if result["derived_features"]["young_driver_flag"]:
            risk_factors.append("Young driver (under 25)")
        if result["derived_features"]["low_credit_flag"]:
            risk_factors.append("Low credit score (under 600)")
        if result["derived_features"]["high_claim_frequency"]:
            risk_factors.append("High claim frequency (3+ claims)")
        if result["derived_features"]["is_high_risk_vehicle"]:
            risk_factors.append("High-risk vehicle type (SUV/Truck)")
        if result["derived_features"]["claim_to_premium_ratio"] > 10:
            risk_factors.append("High claim-to-premium ratio")
        
        result["risk_factors"] = risk_factors
        
        logger.info(f"Prediction complete: approved={result['approved']}, prob={result['probability']}")
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}", exc_info=True)
        return jsonify({"error": str(e)}), 500


@app.route("/predict/batch", methods=["POST"])
def predict_batch():
    """Batch prediction for multiple claims"""
    try:
        body = request.get_json(force=True)
        if not body or "claims" not in body:
            return jsonify({"error": "Request must contain 'claims' array"}), 400
        
        claims = body["claims"]
        if not isinstance(claims, list):
            return jsonify({"error": "claims must be an array"}), 400
        
        if len(claims) > 100:
            return jsonify({"error": "Maximum 100 claims per batch"}), 400
        
        logger.info(f"Batch prediction request: {len(claims)} claims")
        
        results = []
        errors = []
        
        for i, claim in enumerate(claims):
            is_valid, validation_errors = validate_input(claim)
            if not is_valid:
                errors.append({"index": i, "errors": validation_errors})
                results.append(None)
            else:
                try:
                    result = process_single_prediction(claim)
                    results.append(result)
                except Exception as e:
                    errors.append({"index": i, "errors": [str(e)]})
                    results.append(None)
        
        response = {
            "total": len(claims),
            "successful": len([r for r in results if r is not None]),
            "failed": len(errors),
            "results": results
        }
        
        if errors:
            response["errors"] = errors
        
        logger.info(f"Batch prediction complete: {response['successful']}/{response['total']} successful")
        return jsonify(response)
        
    except Exception as e:
        logger.error(f"Batch prediction error: {str(e)}", exc_info=True)
        return jsonify({"error": str(e)}), 500


@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found", "available": ["/", "/predict", "/predict/batch", "/model/info", "/health", "/docs"]}), 404


@app.errorhandler(500)
def internal_error(error):
    logger.error(f"Internal server error: {error}")
    return jsonify({"error": "Internal server error"}), 500


if __name__ == "__main__":
    logger.info("Starting Flask development server...")
    app.run(debug=True, port=5000, host='0.0.0.0')
