#!/bin/bash

echo "=========================================="
echo "   ClaimNet - Insurance Claim AI System"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if virtual environment exists
if [ ! -d "backend/venv" ]; then
    echo "Creating Python virtual environment..."
    cd backend
    python3 -m venv venv
    cd ..
fi

# Function to cleanup processes on exit
cleanup() {
    echo ""
    echo "Shutting down servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM

# Start Backend
echo -e "${BLUE}Starting Backend Server...${NC}"
cd backend
source venv/bin/activate
pip install -r requirements.txt
python app.py &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Start Frontend
echo -e "${GREEN}Starting Frontend Development Server...${NC}"
cd frontend
npm install
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "=========================================="
echo "   Both servers are running!"
echo ""
echo "   Backend:  http://localhost:5000"
echo "   Frontend: http://localhost:5173"
echo "=========================================="
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
