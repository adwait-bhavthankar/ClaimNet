import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Activity, TrendingUp, CheckCircle2, XCircle, AlertCircle, 
  Clock, BarChart3, PieChart as PieChartIcon, Zap, Database, Server, Loader2
} from 'lucide-react'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'

const API_URL = 'http://localhost:5000'

const mockClaimData = [
  { month: 'Jan', approved: 145, rejected: 23 },
  { month: 'Feb', approved: 132, rejected: 18 },
  { month: 'Mar', approved: 164, rejected: 31 },
  { month: 'Apr', approved: 187, rejected: 25 },
  { month: 'May', approved: 201, rejected: 28 },
  { month: 'Jun', approved: 195, rejected: 22 },
]

const mockRegionData = [
  { name: 'North', value: 342, color: '#a855f7' },
  { name: 'South', value: 298, color: '#6366f1' },
  { name: 'East', value: 256, color: '#3b82f6' },
  { name: 'West', value: 289, color: '#ec4899' },
  { name: 'Central', value: 198, color: '#14b8a6' },
]

const mockVehicleTypeData = [
  { type: 'Sedan', Approved: 412, Rejected: 45 },
  { type: 'SUV', Approved: 298, Rejected: 67 },
  { type: 'Truck', Approved: 156, Rejected: 54 },
  { type: 'Hatchback', Approved: 234, Rejected: 28 },
  { type: 'Luxury', Approved: 89, Rejected: 12 },
  { type: 'Sports', Approved: 67, Rejected: 18 },
]

const statsCards = [
  { 
    title: 'Total Claims Logged', 
    value: '1,383', 
    change: '+12.5% MoM', 
    icon: Activity,
    trend: 'up',
    color: 'purple',
    glow: 'hover:border-purple-500/30'
  },
  { 
    title: 'AI Classifier Precision', 
    value: '99.5%', 
    change: 'Stable', 
    icon: CheckCircle2,
    trend: 'up',
    color: 'green',
    glow: 'hover:border-green-500/30'
  },
  { 
    title: 'Average Approved Value', 
    value: '$8,450', 
    change: '-2.1% MoM', 
    icon: TrendingUp,
    trend: 'down',
    color: 'indigo',
    glow: 'hover:border-indigo-500/30'
  },
  { 
    title: 'Pipeline Inference Speed', 
    value: '87ms', 
    change: '-15.3% latency', 
    icon: Zap,
    trend: 'up',
    color: 'amber',
    glow: 'hover:border-amber-500/30'
  },
]

const colorMap = {
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  green: 'bg-green-500/10 text-green-400 border-green-500/20',
  indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
}

const pageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
}

function Dashboard() {
  const [modelInfo, setModelInfo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchModelInfo()
  }, [])

  const fetchModelInfo = async () => {
    try {
      const response = await fetch(`${API_URL}/model/info`)
      if (response.ok) {
        const data = await response.json()
        setModelInfo(data)
      }
    } catch (err) {
      console.error('Failed to fetch model info:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="min-h-screen py-8 lg:py-12 bg-[#0d0d0f] cyber-grid relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 pb-6 border-b border-slate-900">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-3">
              <Server className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-indigo-300 text-[10px] font-bold uppercase tracking-wider">Production Monitoring</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-display font-extrabold text-white tracking-tight">
              Predictive <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">Analytics Panel</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Live metrics, telemetry feed, and classifier pipeline validation.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3 text-xs bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-850">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-bold uppercase tracking-wider">Telemetry Live</span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-500 font-mono">{new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat) => (
            <div
              key={stat.title}
              className={`glass-panel ${stat.glow} rounded-2xl p-6 hover:-translate-y-0.5 hover:border-slate-700 transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl ${colorMap[stat.color]} border flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                  stat.trend === 'up' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-display font-black text-white tracking-tight mb-1">{stat.value}</p>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Main Charts Row */}
        <div className="grid lg:grid-cols-12 gap-8 mb-8">
          
          {/* Claims Trend Chart */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-slate-800 transition-all duration-300 hover:border-slate-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-display font-bold text-white">Claims Execution Volumetrics</h3>
                <p className="text-xs text-slate-500">Monthly classification breakdown (Approved vs Rejected)</p>
              </div>
              <div className="flex items-center space-x-4 mt-3 sm:mt-0">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Approved</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1e1b4b]" />
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Rejected</span>
                </div>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockClaimData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="month" stroke="#4b5563" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#4b5563" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#16161a', 
                      border: '1px solid #374151',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: 12
                    }}
                    cursor={{ fill: 'rgba(255, 255, 255, 0.02)' }}
                  />
                  <Bar dataKey="approved" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="rejected" fill="#1e1b4b" stroke="#8b5cf6" strokeWidth={1} radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Regional distribution */}
          <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-slate-800 transition-all duration-300 hover:border-slate-700 relative">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-display font-bold text-white">Geographic Penetration</h3>
                <p className="text-xs text-slate-500">Distribution mapped across 5 regional clusters</p>
              </div>
              <PieChartIcon className="w-5 h-5 text-slate-500" />
            </div>
            <div className="h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockRegionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {mockRegionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} style={{ outline: 'none' }} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#16161a', 
                      border: '1px solid #374151',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: 12
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                <Database className="w-6 h-6 text-slate-500 mb-1" />
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">Regions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row Charts */}
        <div className="grid lg:grid-cols-12 gap-8 mb-8">
          
          {/* Vehicle type Approved vs Rejected */}
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-slate-800 transition-all duration-300 hover:border-slate-700">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-display font-bold text-white">Asset Class Classification</h3>
                <p className="text-xs text-slate-500">Prediction approvals segmented by vehicle archetype</p>
              </div>
              <BarChart3 className="w-5 h-5 text-slate-500" />
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockVehicleTypeData} layout="vertical" margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" horizontal={false} />
                  <XAxis type="number" stroke="#4b5563" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis dataKey="type" type="category" stroke="#4b5563" fontSize={11} tickLine={false} axisLine={false} width={80} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#16161a', 
                      border: '1px solid #374151',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: 12
                    }}
                  />
                  <Bar dataKey="Approved" fill="#a855f7" radius={[0, 4, 4, 0]} barSize={12} />
                  <Bar dataKey="Rejected" fill="#312e81" radius={[0, 4, 4, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Model Config details */}
          <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-slate-800 transition-all duration-300 hover:border-slate-700">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
              <div>
                <h3 className="text-lg font-display font-bold text-white">Model Parameters</h3>
                <p className="text-xs text-slate-500">Serialized pipeline configuration</p>
              </div>
              <span className="inline-flex px-2 py-0.5 bg-purple-500/10 border border-purple-500/25 text-purple-400 text-[10px] font-extrabold uppercase tracking-widest rounded-md">
                Active
              </span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-48">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
              </div>
            ) : modelInfo ? (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-850">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Classifier Type</p>
                    <p className="text-sm font-bold text-white">{modelInfo.model_type || 'RandomForest'}</p>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-850">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Total Columns</p>
                    <p className="text-sm font-bold text-white">{modelInfo.features_count || 25} Features</p>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-850">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Reference Data</p>
                    <p className="text-sm font-bold text-white">{modelInfo.training_data_size?.toLocaleString() || '10,000'} rows</p>
                  </div>
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-850">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Asset Update</p>
                    <p className="text-sm font-bold text-white">
                      {modelInfo.last_updated ? new Date(modelInfo.last_updated).toLocaleDateString() : 'Active Now'}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Categorical Encoders</p>
                  <div className="flex flex-wrap gap-1.5">
                    {modelInfo.categorical_features?.map((feature) => (
                      <span 
                        key={feature}
                        className="px-2.5 py-1 bg-purple-500/5 text-purple-300 text-[10px] rounded-lg border border-purple-500/15"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10 text-slate-500">
                <AlertCircle className="w-10 h-10 mx-auto mb-3 text-slate-600" />
                <p className="text-xs">Connection to backend endpoint timed out.</p>
              </div>
            )}
          </div>
        </div>

        {/* Predictions Feed Table */}
        <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 transition-all duration-300 hover:border-slate-700">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-display font-bold text-white">Decision Audit Log</h3>
              <p className="text-xs text-slate-500">Latest pipeline execution logs</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
              <Clock className="w-4.5 h-4.5" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-950/60 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800">
                  <th className="py-3.5 px-6">Execution ID</th>
                  <th className="py-3.5 px-6">Asset Type</th>
                  <th className="py-3.5 px-6">Claim Amount</th>
                  <th className="py-3.5 px-6">Decision Outcome</th>
                  <th className="py-3.5 px-6">Confidence</th>
                  <th className="py-3.5 px-6">Timestamp</th>
                </tr>
              </thead>
              <tbody className="text-xs font-medium">
                {[
                  { id: 'INF-2026-940', vehicle: 'Luxury Sedan', amount: '$5,200', status: 'Approved', prob: '94.2%', time: '1m ago' },
                  { id: 'INF-2026-939', vehicle: 'SUV (High Risk)', amount: '$12,800', status: 'Rejected', prob: '23.5%', time: '4m ago' },
                  { id: 'INF-2026-938', vehicle: 'Truck Utility', amount: '$8,450', status: 'Approved', prob: '87.3%', time: '11m ago' },
                  { id: 'INF-2026-937', vehicle: 'Luxury SUV', amount: '$25,000', status: 'Approved', prob: '91.8%', time: '15m ago' },
                  { id: 'INF-2026-936', vehicle: 'Hatchback Compact', amount: '$3,200', status: 'Approved', prob: '96.1%', time: '22m ago' },
                ].map((claim) => (
                  <tr 
                    key={claim.id}
                    className="border-t border-slate-900 hover:bg-slate-950/40 transition-colors"
                  >
                    <td className="py-3.5 px-6 font-mono text-purple-400 font-bold">{claim.id}</td>
                    <td className="py-3.5 px-6 text-slate-300">{claim.vehicle}</td>
                    <td className="py-3.5 px-6 font-mono text-white">{claim.amount}</td>
                    <td className="py-3.5 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide border ${
                        claim.status === 'Approved' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}>
                        {claim.status === 'Approved' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {claim.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-purple-400 font-mono font-bold">{claim.prob}</td>
                    <td className="py-3.5 px-6 text-slate-500 font-medium">{claim.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Dashboard;
