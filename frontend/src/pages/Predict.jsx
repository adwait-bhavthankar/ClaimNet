import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Loader2, CheckCircle2, XCircle, AlertTriangle,
  User, Car, FileText, DollarSign, Shield,
  Cpu, Zap, Activity, Brain, ChevronRight, RefreshCw, BarChart2
} from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { useTheme } from '../context/ThemeContext'

const API_URL = 'http://localhost:5000'

const initialFormData = {
  age: '', gender: '', marital_status: '', income: '', education_level: '',
  employment_status: '', credit_score: '', vehicle_age: '', vehicle_type: '',
  vehicle_price: '', policy_tenure: '', premium_amount: '', no_of_claims: '',
  accident_severity: '', region: '', agent_rating: '', claim_amount: '', fraudulent_flag: 0
}

const formSections = [
  {
    title: 'Personal Info', subtitle: 'Demographics & Credit Profiling', icon: User,
    fields: ['age', 'gender', 'marital_status', 'income', 'education_level', 'employment_status', 'credit_score']
  },
  {
    title: 'Vehicle Specs', subtitle: 'Asset Metrics & Value', icon: Car,
    fields: ['vehicle_age', 'vehicle_type', 'vehicle_price']
  },
  {
    title: 'Policy Details', subtitle: 'Tenure & Premium Information', icon: FileText,
    fields: ['policy_tenure', 'premium_amount', 'no_of_claims', 'agent_rating']
  },
  {
    title: 'Claim Input', subtitle: 'Severity, Region & Amount', icon: DollarSign,
    fields: ['accident_severity', 'region', 'claim_amount']
  }
]

const fieldConfig = {
  age: { label: 'Age', type: 'number', min: 18, max: 100, placeholder: '34' },
  gender: { label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'] },
  marital_status: { label: 'Marital Status', type: 'select', options: ['Single', 'Married', 'Divorced', 'Widowed'] },
  income: { label: 'Annual Income ($)', type: 'number', min: 0, placeholder: '85000' },
  education_level: { label: 'Education Level', type: 'select', options: ['High School', 'Bachelor', 'Master', 'PhD', 'Other'] },
  employment_status: { label: 'Employment Status', type: 'select', options: ['Employed', 'Self-Employed', 'Unemployed', 'Retired', 'Student'] },
  credit_score: { label: 'Credit Score', type: 'number', min: 300, max: 850, placeholder: '720' },
  vehicle_age: { label: 'Vehicle Age (years)', type: 'number', min: 0, max: 50, placeholder: '3' },
  vehicle_type: { label: 'Vehicle Type', type: 'select', options: ['Sedan', 'SUV', 'Truck', 'Hatchback', 'Luxury', 'Sports'] },
  vehicle_price: { label: 'Vehicle Price ($)', type: 'number', min: 1000, placeholder: '35000' },
  policy_tenure: { label: 'Policy Tenure (years)', type: 'number', min: 0, max: 50, placeholder: '4' },
  premium_amount: { label: 'Premium Amount ($)', type: 'number', min: 100, placeholder: '2500' },
  no_of_claims: { label: 'Previous Claims', type: 'number', min: 0, max: 50, placeholder: '1' },
  accident_severity: { label: 'Accident Severity', type: 'select', options: ['Minor', 'Moderate', 'Major', 'Total Loss'] },
  region: { label: 'Region', type: 'select', options: ['North', 'South', 'East', 'West', 'Central'] },
  agent_rating: { label: 'Agent Rating (1-5)', type: 'number', min: 1, max: 5, placeholder: '4' },
  claim_amount: { label: 'Claim Amount ($)', type: 'number', min: 100, placeholder: '4000' }
}

const pageVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } } }

function Predict() {
  const [formData, setFormData] = useState(initialFormData)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeSection, setActiveSection] = useState(0)
  const { isDark } = useTheme()

  const handleInputChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }))

  const loadDemoData = (profileType) => {
    const demos = {
      standard: { age: '34', gender: 'Male', marital_status: 'Married', income: '8500', education_level: 'Bachelor', employment_status: 'Employed', credit_score: '720', vehicle_age: '3', vehicle_type: 'Sedan', vehicle_price: '35000', policy_tenure: '4', premium_amount: '2500', no_of_claims: '1', accident_severity: 'Moderate', region: 'North', agent_rating: '4', claim_amount: '4000', fraudulent_flag: 0 },
      highrisk: { age: '22', gender: 'Female', marital_status: 'Single', income: '30000', education_level: 'High School', employment_status: 'Self-Employed', credit_score: '450', vehicle_age: '12', vehicle_type: 'SUV', vehicle_price: '120000', policy_tenure: '1', premium_amount: '4500', no_of_claims: '4', accident_severity: 'Total Loss', region: 'South', agent_rating: '1', claim_amount: '90000', fraudulent_flag: 1 },
      premium: { age: '45', gender: 'Female', marital_status: 'Married', income: '150000', education_level: 'PhD', employment_status: 'Employed', credit_score: '850', vehicle_age: '2', vehicle_type: 'Luxury', vehicle_price: '150000', policy_tenure: '8', premium_amount: '6000', no_of_claims: '0', accident_severity: 'Minor', region: 'West', agent_rating: '5', claim_amount: '10000', fraudulent_flag: 0 }
    }
    setFormData(demos[profileType]); setActiveSection(0); setResult(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError(null); setResult(null)
    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, age: parseInt(formData.age), income: parseFloat(formData.income), credit_score: parseInt(formData.credit_score), vehicle_age: parseInt(formData.vehicle_age), vehicle_price: parseFloat(formData.vehicle_price), policy_tenure: parseInt(formData.policy_tenure), premium_amount: parseFloat(formData.premium_amount), no_of_claims: parseInt(formData.no_of_claims), agent_rating: parseInt(formData.agent_rating), claim_amount: parseFloat(formData.claim_amount), fraudulent_flag: parseInt(formData.fraudulent_flag) || 0 })
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || data.details?.join(', ') || 'Prediction failed')
      setResult(data)
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  const resetForm = () => { setFormData(initialFormData); setResult(null); setError(null); setActiveSection(0) }

  const chartData = result ? [
    { name: 'Approval', value: result.probability * 100, color: isDark ? '#ffffff' : '#0f172a' },
    { name: 'Risk', value: (1 - result.probability) * 100, color: isDark ? '#1e1b2e' : '#e2e8f0' }
  ] : []

  const v = (varName) => `var(--${varName})`

  return (
    <motion.div initial="hidden" animate="visible" variants={pageVariants}
      className="min-h-screen py-8 lg:py-12 cyber-grid relative" style={{ backgroundColor: v('bg-page') }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full mb-4"
            style={{ backgroundColor: v('bg-subtle'), border: `1px solid ${v('border-accent')}` }}>
            <Brain className="w-4.5 h-4.5" style={{ color: v('text-primary') }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: v('text-tertiary') }}>Neural Inference Console</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-display font-extrabold tracking-tight mb-3" style={{ color: v('text-primary') }}>
            Real-Time <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${v('text-primary')}, ${v('text-muted')})` }}>Claim Evaluation</span>
          </h1>
          <p className="max-w-xl mx-auto text-sm sm:text-base" style={{ color: v('text-muted') }}>
            Input parameters below to feed the serialized RandomForest classifier pipeline and determine claim approval probability.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <span className="text-xs font-bold uppercase tracking-wider mr-1" style={{ color: v('text-faint') }}>Load Demo:</span>
            <button onClick={() => loadDemoData('standard')} className="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors"
              style={{ backgroundColor: v('bg-btn-secondary'), border: `1px solid ${v('border')}`, color: v('text-tertiary') }}>Standard</button>
            <button onClick={() => loadDemoData('highrisk')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${isDark ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/20' : 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200'
                }`}>High-Risk</button>
            <button onClick={() => loadDemoData('premium')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${isDark ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                }`}>Premium</button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Stepper */}
              <div className="rounded-xl p-4 flex justify-between items-center overflow-x-auto gap-4"
                style={{ backgroundColor: v('bg-elevated'), border: `1px solid ${v('border')}` }}>
                {formSections.map((sec, idx) => {
                  const Icon = sec.icon; const isCurrent = activeSection === idx; const isCompleted = activeSection > idx
                  return (
                    <button key={sec.title} type="button" onClick={() => setActiveSection(idx)}
                      className="flex items-center space-x-2.5 text-left focus:outline-none flex-shrink-0 group">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                        style={{
                          backgroundColor: isCurrent ? v('bg-accent') : isCompleted ? v('bg-subtle') : v('bg-btn-secondary'),
                          color: isCurrent ? v('text-on-accent') : isCompleted ? v('text-primary') : v('text-faint'),
                          border: isCurrent ? 'none' : `1px solid ${v('border')}`,
                        }}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="hidden md:block">
                        <p className="text-xs font-bold uppercase tracking-wider" style={{ color: isCurrent ? v('text-primary') : v('text-faint') }}>{sec.title}</p>
                        <p className="text-[10px] font-medium" style={{ color: v('text-ghost') }}>Step {idx + 1}</p>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Active Step */}
              <div className="glass-panel rounded-2xl p-6 sm:p-8 transition-all duration-350">
                <div className="flex items-center space-x-4 mb-6 pb-4" style={{ borderBottom: `1px solid ${v('border')}` }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: v('bg-subtle'), border: `1px solid ${v('border-accent')}` }}>
                    {React.createElement(formSections[activeSection].icon, { className: 'w-5.5 h-5.5', style: { color: v('text-primary') } })}
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold" style={{ color: v('text-primary') }}>{formSections[activeSection].title}</h2>
                    <p className="text-xs font-medium" style={{ color: v('text-faint') }}>{formSections[activeSection].subtitle}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  {formSections[activeSection].fields.map((fieldName) => {
                    const config = fieldConfig[fieldName]
                    return (
                      <div key={fieldName} className="space-y-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider" style={{ color: v('text-muted') }}>{config.label}</label>
                        {config.type === 'select' ? (
                          <select value={formData[fieldName]} onChange={(e) => handleInputChange(fieldName, e.target.value)} required
                            className="w-full px-4 py-3 rounded-xl text-sm font-medium focus:outline-none transition-all"
                            style={{ backgroundColor: v('bg-input'), border: `1px solid ${v('border')}`, color: v('text-primary') }}>
                            <option value="" style={{ backgroundColor: v('bg-elevated'), color: v('text-faint') }}>Select...</option>
                            {config.options.map(opt => <option key={opt} value={opt} style={{ backgroundColor: v('bg-elevated'), color: v('text-primary') }}>{opt}</option>)}
                          </select>
                        ) : (
                          <input type={config.type} value={formData[fieldName]} onChange={(e) => handleInputChange(fieldName, e.target.value)}
                            min={config.min} max={config.max} placeholder={`e.g. ${config.placeholder}`} required
                            className="w-full px-4 py-3 rounded-xl text-sm font-medium focus:outline-none transition-all"
                            style={{ backgroundColor: v('bg-input'), border: `1px solid ${v('border')}`, color: v('text-primary') }} />
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center mt-8 pt-6" style={{ borderTop: `1px solid ${v('border')}` }}>
                  <button type="button" onClick={() => setActiveSection(Math.max(0, activeSection - 1))} disabled={activeSection === 0}
                    className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{ backgroundColor: v('bg-btn-secondary'), border: `1px solid ${v('border')}`, color: v('text-muted') }}>Back</button>
                  <div className="flex items-center gap-3">
                    {activeSection > 0 && (
                      <button type="button" onClick={resetForm} className="p-2.5 rounded-xl transition-colors" title="Reset"
                        style={{ backgroundColor: v('bg-btn-secondary'), border: `1px solid ${v('border')}`, color: v('text-muted') }}>
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    )}
                    {activeSection < formSections.length - 1 ? (
                      <button type="button" onClick={() => setActiveSection(activeSection + 1)}
                        className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center gap-1.5"
                        style={{ backgroundColor: v('bg-accent'), color: v('text-on-accent') }}>
                        <span>Continue</span><ChevronRight className="w-4.5 h-4.5" />
                      </button>
                    ) : (
                      <button type="submit" disabled={loading}
                        className="px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ backgroundColor: v('bg-accent'), color: v('text-on-accent') }}>
                        {loading ? <><Loader2 className="w-4.5 h-4.5 animate-spin" /><span>Analysing...</span></> : <><Cpu className="w-4.5 h-4.5" /><span>Execute Inference</span></>}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>

            {error && (
              <div className={`mt-6 p-4 rounded-xl flex items-start space-x-3 shadow-lg border ${isDark ? 'bg-red-500/10 border-red-500/25' : 'bg-red-50 border-red-200'
                }`}>
                <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-red-400' : 'text-red-700'}`}>Pipeline Exception</h4>
                  <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-red-300' : 'text-red-800'}`}>{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="lg:col-span-5">
            {result ? (
              <div className="glass-panel rounded-2xl p-6 shadow-2xl relative overflow-hidden sticky top-24">
                <div className={`absolute top-0 left-0 right-0 h-1.5 ${result.approved ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-rose-500 to-red-500'}`} />
                <div className="text-center mt-3 mb-6">
                  <div className="flex justify-center mb-4">
                    {result.approved ? (
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/25 shadow-lg">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/25 shadow-lg">
                        <XCircle className="w-8 h-8 text-rose-400" />
                      </div>
                    )}
                  </div>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: v('text-faint') }}>Inference Decision</p>
                  <h3 className={`text-2xl sm:text-3xl font-display font-black tracking-tight mt-1 ${result.approved ? (isDark ? 'text-emerald-400' : 'text-emerald-600') : (isDark ? 'text-rose-400' : 'text-rose-600')
                    }`}>
                    {result.approved ? 'Claim Approved' : 'Claim Rejected'}
                  </h3>
                </div>

                {/* Chart */}
                <div className="h-44 relative flex items-center justify-center mb-6 rounded-2xl p-2"
                  style={{ backgroundColor: v('bg-input'), border: `1px solid ${v('border')}` }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart><Pie data={chartData} cx="50%" cy="50%" innerRadius={50} outerRadius={65} paddingAngle={3} dataKey="value">
                      {chartData.map((entry, i) => <Cell key={`cell-${i}`} fill={entry.color} style={{ outline: 'none' }} />)}
                    </Pie><Tooltip enabled={false} /></PieChart>
                  </ResponsiveContainer>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-[9px] font-black uppercase tracking-wider" style={{ color: v('text-faint') }}>Confidence</span>
                    <span className="text-2xl font-black font-mono mt-0.5" style={{ color: v('text-primary') }}>{(result.probability * 100).toFixed(1)}%</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3 rounded-xl" style={{ backgroundColor: v('bg-input'), border: `1px solid ${v('border')}` }}>
                    <span className="text-[10px] font-bold uppercase tracking-wider block mb-1" style={{ color: v('text-faint') }}>Scale Probability</span>
                    <span className="font-mono text-sm font-semibold" style={{ color: v('text-primary') }}>{result.probability.toFixed(4)}</span>
                  </div>
                  <div className="p-3 rounded-xl" style={{ backgroundColor: v('bg-input'), border: `1px solid ${v('border')}` }}>
                    <span className="text-[10px] font-bold uppercase tracking-wider block mb-1" style={{ color: v('text-faint') }}>Decision Confidence</span>
                    <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide border ${result.confidence === 'High' ? (isDark ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25' : 'bg-emerald-50 text-emerald-700 border-emerald-200')
                        : result.confidence === 'Medium' ? (isDark ? 'bg-amber-500/15 text-amber-400 border-amber-500/25' : 'bg-amber-50 text-amber-700 border-amber-200')
                          : (isDark ? 'bg-rose-500/15 text-rose-400 border-rose-500/25' : 'bg-rose-50 text-rose-700 border-rose-200')
                      }`}>{result.confidence}</span>
                  </div>
                </div>

                {/* Risk Factors */}
                {result.risk_factors?.length > 0 && (
                  <div className="pt-4 mt-4" style={{ borderTop: `1px solid ${v('border')}` }}>
                    <div className="flex items-center space-x-2 mb-3">
                      <Shield className={`w-4 h-4 ${isDark ? 'text-amber-500' : 'text-amber-600'}`} />
                      <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-amber-500' : 'text-amber-600'}`}>Risk Factors</span>
                    </div>
                    <ul className="space-y-2">
                      {result.risk_factors.map((f, i) => (
                        <li key={i} className={`flex items-start space-x-2 p-2 rounded-lg border text-xs ${isDark ? 'bg-amber-500/5 border-amber-500/10 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-800'
                          }`}>
                          <AlertTriangle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isDark ? 'text-amber-500' : 'text-amber-600'}`} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Derived Features */}
                {result.derived_features && (
                  <div className="pt-4 mt-4" style={{ borderTop: `1px solid ${v('border')}` }}>
                    <div className="flex items-center space-x-2 mb-3">
                      <Activity className="w-4 h-4" style={{ color: v('text-primary') }} />
                      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: v('text-primary') }}>Engineered Features</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                      {[
                        ['Premium/Income', result.derived_features.premium_to_income_ratio?.toFixed(4)],
                        ['Claim/Premium', result.derived_features.claim_to_premium_ratio?.toFixed(4)],
                        ['Risk Vehicle', result.derived_features.is_high_risk_vehicle ? 'TRUE' : 'FALSE'],
                        ['Young Driver', result.derived_features.young_driver_flag ? 'TRUE' : 'FALSE'],
                      ].map(([label, val]) => (
                        <div key={label} className="p-2 rounded-lg" style={{ backgroundColor: v('bg-input'), border: `1px solid ${v('border')}` }}>
                          <span className="block text-[9px] uppercase tracking-wider mb-0.5" style={{ color: v('text-faint') }}>{label}</span>
                          <span className="font-mono" style={{ color: v('text-primary') }}>{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button onClick={resetForm} className="w-full mt-6 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors inline-flex items-center justify-center gap-2"
                  style={{ backgroundColor: v('bg-btn-secondary'), border: `1px solid ${v('border')}`, color: v('text-tertiary') }}>
                  <RefreshCw className="w-3.5 h-3.5" /><span>Evaluate New Parameters</span>
                </button>
              </div>
            ) : (
              <div className="sticky top-24">
                <div className="glass-panel rounded-2xl text-center py-16 px-6" style={{ border: `2px dashed ${v('border')}` }}>
                  <div className="w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: v('bg-subtle'), border: `1px solid ${v('border-accent')}` }}>
                    <BarChart2 className="w-7 h-7" style={{ color: v('text-primary') }} />
                  </div>
                  <h3 className="text-lg font-display font-bold mb-2" style={{ color: v('text-primary') }}>Awaiting Parameters</h3>
                  <p className="text-xs leading-relaxed max-w-xs mx-auto" style={{ color: v('text-faint') }}>
                    Complete the multi-step evaluation forms and run prediction to compile AI analytics and decision metrics.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Predict;