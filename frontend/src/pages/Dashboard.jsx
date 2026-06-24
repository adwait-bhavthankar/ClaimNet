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
import { useTheme } from '../context/ThemeContext'

const API_URL = 'http://localhost:5000'

const mockClaimData = [
  { month: 'Jan', approved: 145, rejected: 23 },
  { month: 'Feb', approved: 132, rejected: 18 },
  { month: 'Mar', approved: 164, rejected: 31 },
  { month: 'Apr', approved: 187, rejected: 25 },
  { month: 'May', approved: 201, rejected: 28 },
  { month: 'Jun', approved: 195, rejected: 22 },
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
  { title: 'Total Claims Logged', value: '1,383', change: '+12.5% MoM', icon: Activity, trend: 'up' },
  { title: 'AI Classifier Precision', value: '99.5%', change: 'Stable', icon: CheckCircle2, trend: 'up' },
  { title: 'Average Approved Value', value: '$8,450', change: '-2.1% MoM', icon: TrendingUp, trend: 'down' },
  { title: 'Pipeline Inference Speed', value: '87ms', change: '-15.3% latency', icon: Zap, trend: 'up' },
]

const pageVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } } }

function Dashboard() {
  const [modelInfo, setModelInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const { isDark } = useTheme()

  useEffect(() => { fetchModelInfo() }, [])

  const fetchModelInfo = async () => {
    try {
      const res = await fetch(`${API_URL}/model/info`)
      if (res.ok) setModelInfo(await res.json())
    } catch (err) { console.error('Failed to fetch model info:', err) }
    finally { setLoading(false) }
  }

  const v = (name) => `var(--${name})`

  // Dynamic chart colors
  const chartBar = isDark ? '#ffffff' : '#0f172a'
  const chartBarAlt = isDark ? '#334155' : '#e2e8f0'
  const chartBarStroke = isDark ? '#64748b' : '#94a3b8'
  const chartGrid = isDark ? '#1f2937' : '#f1f5f9'
  const chartAxis = isDark ? '#4b5563' : '#94a3b8'
  const tooltipBg = isDark ? '#16161a' : '#ffffff'
  const tooltipBorder = isDark ? '#374151' : '#e2e8f0'
  const chartBarH = isDark ? '#e2e8f0' : '#334155'
  const chartBarHAlt = isDark ? '#1e293b' : '#e2e8f0'

  const regionData = [
    { name: 'North', value: 342, color: isDark ? '#ffffff' : '#0f172a' },
    { name: 'South', value: 298, color: isDark ? '#94a3b8' : '#475569' },
    { name: 'East', value: 256, color: isDark ? '#64748b' : '#94a3b8' },
    { name: 'West', value: 289, color: isDark ? '#cbd5e1' : '#334155' },
    { name: 'Central', value: 198, color: isDark ? '#475569' : '#cbd5e1' },
  ]

  const tooltipStyle = {
    backgroundColor: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    boxShadow: '0 8px 30px var(--shadow)',
    padding: '8px 12px'
  }

  const tooltipLabelStyle = {
    color: 'var(--text-primary)',
    fontWeight: 'bold',
    fontSize: '11px',
    marginBottom: '2px',
    textTransform: 'uppercase'
  }

  const tooltipItemStyle = {
    color: 'var(--text-secondary)',
    fontSize: '11.5px',
    padding: '1px 0'
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={pageVariants}
      className="min-h-screen py-8 lg:py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 pb-6" style={{ borderBottom: `1px solid ${v('border')}` }}>
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full mb-3"
              style={{ backgroundColor: v('bg-subtle'), border: `1px solid ${v('border-accent')}` }}>
              <Server className="w-3.5 h-3.5" style={{ color: v('text-primary') }} />
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: v('text-tertiary') }}>Production Monitoring</span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-display font-extrabold tracking-tight" style={{ color: v('text-primary') }}>
              Predictive <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${v('text-primary')}, ${v('text-muted')})` }}>Analytics Panel</span>
            </h1>
            <p className="text-sm mt-1" style={{ color: v('text-muted') }}>Live metrics, telemetry feed, and classifier pipeline validation.</p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3 text-xs px-4 py-2.5 rounded-xl"
            style={{ backgroundColor: v('bg-input'), border: `1px solid ${v('border')}` }}>
            <span className="relative flex h-2 w-2"><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
            <span className="font-bold uppercase tracking-wider" style={{ color: v('text-tertiary') }}>Telemetry Live</span>
            <span style={{ color: v('text-ghost') }}>|</span>
            <span className="font-mono" style={{ color: v('text-faint') }}>{new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat) => (
            <div key={stat.title} className="glass-panel rounded-2xl p-6 hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: v('bg-subtle'), border: `1px solid ${v('border-accent')}` }}>
                  <stat.icon className="w-5 h-5" style={{ color: v('text-primary') }} />
                </div>
                <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                  stat.trend === 'up' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                }`}>{stat.change}</span>
              </div>
              <p className="text-3xl font-display font-black tracking-tight mb-1" style={{ color: v('text-primary') }}>{stat.value}</p>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: v('text-muted') }}>{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-display font-bold" style={{ color: v('text-primary') }}>Claims Execution Volumetrics</h3>
                <p className="text-xs" style={{ color: v('text-faint') }}>Monthly classification breakdown (Approved vs Rejected)</p>
              </div>
              <div className="flex items-center space-x-4 mt-3 sm:mt-0">
                <div className="flex items-center space-x-2"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: chartBar }} /><span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: v('text-muted') }}>Approved</span></div>
                <div className="flex items-center space-x-2"><div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: chartBarAlt }} /><span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: v('text-muted') }}>Rejected</span></div>
              </div>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockClaimData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} vertical={false} />
                  <XAxis dataKey="month" stroke={chartAxis} fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke={chartAxis} fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} cursor={{ fill: 'rgba(128,128,128,0.05)' }} />
                  <Bar dataKey="approved" fill={chartBar} radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="rejected" fill={chartBarAlt} stroke={chartBarStroke} strokeWidth={1} radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-5 glass-panel rounded-2xl p-6 relative">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-display font-bold" style={{ color: v('text-primary') }}>Geographic Penetration</h3>
                <p className="text-xs" style={{ color: v('text-faint') }}>Distribution across 5 regional clusters</p>
              </div>
              <PieChartIcon className="w-5 h-5" style={{ color: v('text-faint') }} />
            </div>
            <div className="h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart><Pie data={regionData} cx="50%" cy="50%" innerRadius={65} outerRadius={85} paddingAngle={3} dataKey="value">
                  {regionData.map((entry, i) => <Cell key={`cell-${i}`} fill={entry.color} style={{ outline: 'none' }} />)}
                </Pie><Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} /></PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                <Database className="w-6 h-6 mb-1" style={{ color: v('text-faint') }} />
                <span className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: v('text-muted') }}>Regions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-7 glass-panel rounded-2xl p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-display font-bold" style={{ color: v('text-primary') }}>Asset Class Classification</h3>
                <p className="text-xs" style={{ color: v('text-faint') }}>Prediction approvals by vehicle archetype</p>
              </div>
              <BarChart3 className="w-5 h-5" style={{ color: v('text-faint') }} />
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockVehicleTypeData} layout="vertical" margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} horizontal={false} />
                  <XAxis type="number" stroke={chartAxis} fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis dataKey="type" type="category" stroke={chartAxis} fontSize={11} tickLine={false} axisLine={false} width={80} />
                  <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} itemStyle={tooltipItemStyle} />
                  <Bar dataKey="Approved" fill={chartBarH} radius={[0, 4, 4, 0]} barSize={12} />
                  <Bar dataKey="Rejected" fill={chartBarHAlt} radius={[0, 4, 4, 0]} barSize={12} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Model Config */}
          <div className="lg:col-span-5 glass-panel rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6 pb-4" style={{ borderBottom: `1px solid ${v('border')}` }}>
              <div>
                <h3 className="text-lg font-display font-bold" style={{ color: v('text-primary') }}>Model Parameters</h3>
                <p className="text-xs" style={{ color: v('text-faint') }}>Serialized pipeline configuration</p>
              </div>
              <span className="inline-flex px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest rounded-md"
                style={{ backgroundColor: v('bg-subtle'), border: `1px solid ${v('border-accent')}`, color: v('text-primary') }}>Active</span>
            </div>
            {loading ? (
              <div className="flex items-center justify-center h-48"><Loader2 className="w-8 h-8 animate-spin" style={{ color: v('text-primary') }} /></div>
            ) : modelInfo ? (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    ['Classifier Type', modelInfo.model_type || 'RandomForest'],
                    ['Total Columns', `${modelInfo.features_count || 25} Features`],
                    ['Reference Data', `${modelInfo.training_data_size?.toLocaleString() || '10,000'} rows`],
                    ['Asset Update', modelInfo.last_updated ? new Date(modelInfo.last_updated).toLocaleDateString() : 'Active Now']
                  ].map(([label, val]) => (
                    <div key={label} className="p-3 rounded-xl" style={{ backgroundColor: v('bg-input'), border: `1px solid ${v('border')}` }}>
                      <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: v('text-faint') }}>{label}</p>
                      <p className="text-sm font-bold" style={{ color: v('text-primary') }}>{val}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: v('text-muted') }}>Categorical Encoders</p>
                  <div className="flex flex-wrap gap-1.5">
                    {modelInfo.categorical_features?.map((f) => (
                      <span key={f} className="px-2.5 py-1 text-[10px] rounded-lg"
                        style={{ backgroundColor: v('bg-subtle'), color: v('text-tertiary'), border: `1px solid ${v('border-accent')}` }}>{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10"><AlertCircle className="w-10 h-10 mx-auto mb-3" style={{ color: v('text-ghost') }} /><p className="text-xs" style={{ color: v('text-faint') }}>Connection timed out.</p></div>
            )}
          </div>
        </div>

        {/* Audit Table */}
        <div className="glass-panel rounded-2xl overflow-hidden">
          <div className="p-6 flex items-center justify-between" style={{ borderBottom: `1px solid ${v('border')}` }}>
            <div>
              <h3 className="text-lg font-display font-bold" style={{ color: v('text-primary') }}>Decision Audit Log</h3>
              <p className="text-xs" style={{ color: v('text-faint') }}>Latest pipeline execution logs</p>
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: v('bg-btn-secondary'), border: `1px solid ${v('border')}`, color: v('text-muted') }}>
              <Clock className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-bold uppercase tracking-widest" style={{ backgroundColor: v('bg-input'), color: v('text-muted'), borderBottom: `1px solid ${v('border')}` }}>
                  <th className="py-3.5 px-6">Execution ID</th><th className="py-3.5 px-6">Asset Type</th><th className="py-3.5 px-6">Claim Amount</th>
                  <th className="py-3.5 px-6">Decision</th><th className="py-3.5 px-6">Confidence</th><th className="py-3.5 px-6">Timestamp</th>
                </tr>
              </thead>
              <tbody className="text-xs font-medium">
                {[
                  { id:'INF-2026-940',vehicle:'Luxury Sedan',amount:'$5,200',status:'Approved',prob:'94.2%',time:'1m ago' },
                  { id:'INF-2026-939',vehicle:'SUV (High Risk)',amount:'$12,800',status:'Rejected',prob:'23.5%',time:'4m ago' },
                  { id:'INF-2026-938',vehicle:'Truck Utility',amount:'$8,450',status:'Approved',prob:'87.3%',time:'11m ago' },
                  { id:'INF-2026-937',vehicle:'Luxury SUV',amount:'$25,000',status:'Approved',prob:'91.8%',time:'15m ago' },
                  { id:'INF-2026-936',vehicle:'Hatchback Compact',amount:'$3,200',status:'Approved',prob:'96.1%',time:'22m ago' },
                ].map((c) => (
                  <tr key={c.id} className="transition-colors" style={{ borderTop: `1px solid ${v('border')}` }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = v('bg-subtle')}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                    <td className="py-3.5 px-6 font-mono font-bold" style={{ color: v('text-primary') }}>{c.id}</td>
                    <td className="py-3.5 px-6" style={{ color: v('text-tertiary') }}>{c.vehicle}</td>
                    <td className="py-3.5 px-6 font-mono" style={{ color: v('text-primary') }}>{c.amount}</td>
                    <td className="py-3.5 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide border ${
                        c.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}>{c.status === 'Approved' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}{c.status}</span>
                    </td>
                    <td className="py-3.5 px-6 font-mono font-bold" style={{ color: v('text-primary') }}>{c.prob}</td>
                    <td className="py-3.5 px-6 font-medium" style={{ color: v('text-faint') }}>{c.time}</td>
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
