import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowRight, Sparkles, Zap, Shield, TrendingUp, 
  Brain, Activity, Target, Database, Terminal, Cpu
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'Cognitive Inference Pipeline',
    description: 'Underpinned by a serialized scikit-learn Pipeline incorporating automated preprocessors and ColumnTransformers, ensuring zero training-inference skew.',
    color: 'from-purple-500/10 to-indigo-500/10 border-purple-500/20 hover:border-purple-500/40'
  },
  {
    icon: Zap,
    title: 'Sub-100ms Real-Time Inference',
    description: 'High-throughput decision engine providing instantaneous classification, claim-to-premium evaluations, and probability matrices.',
    color: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20 hover:border-blue-500/40'
  },
  {
    icon: Shield,
    title: 'Adaptive Risk Intelligence',
    description: 'Heuristic-driven risk profiling engine mapping credit scoring, history of claims, and accident severity indicators to identify anomalies.',
    color: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20 hover:border-emerald-500/40'
  },
  {
    icon: TrendingUp,
    title: 'Explainable AI Predictions',
    description: 'Provides granular decision confidence metrics (High/Medium/Low) paired with real-time derived features for full prediction transparency.',
    color: 'from-amber-500/10 to-orange-500/10 border-amber-500/20 hover:border-amber-500/40'
  }
]

const stats = [
  { value: '99.5%', label: 'Inference Precision', icon: Target, glow: 'hover:border-purple-500/30' },
  { value: '87ms', label: 'Response Latency', icon: Zap, glow: 'hover:border-indigo-500/30' },
  { value: '10K+', label: 'Synthetic Training Set', icon: Database, glow: 'hover:border-green-500/30' },
  { value: '25', label: 'Engineered Features', icon: Activity, glow: 'hover:border-amber-500/30' },
]

const techStack = [
  { name: 'React 18', type: 'Frontend Core' },
  { name: 'Flask', type: 'REST API' },
  { name: 'Python 3', type: 'Computation' },
  { name: 'scikit-learn', type: 'ML Pipeline' },
  { name: 'Tailwind CSS', type: 'Design Tokens' }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
}

function Home() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-[#0d0d0f] relative overflow-hidden cyber-grid"
    >
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column (Content) */}
            <motion.div variants={itemVariants} className="lg:col-span-7 text-left z-10">
              <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/25 mb-8">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-purple-300 text-xs font-semibold uppercase tracking-wider">
                  Academic Modernization Project
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold leading-none mb-6 text-white tracking-tight">
                ClaimNet: End-to-End <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">
                  ML Prediction Engine
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-400 mb-8 leading-relaxed max-w-xl">
                An industrial-grade insurance claim decision support system. Utilizing a fully serialized
                scikit-learn pipeline, ClaimNet automates feature engineering, data imputation, and 
                prediction with zero training-inference skew.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/predict" 
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 inline-flex items-center gap-2.5 shadow-xl shadow-purple-600/10 hover:-translate-y-0.5"
                >
                  <span>Launch Inference Engine</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  to="/dashboard" 
                  className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold rounded-xl border border-slate-800 hover:border-slate-700 transition-all duration-200 inline-flex items-center gap-2 hover:-translate-y-0.5"
                >
                  <span>View System Dashboard</span>
                </Link>
              </div>
              
              {/* Tech stack badge list */}
              <div className="mt-12 pt-8 border-t border-slate-800/80">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Core Technology Stack</p>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <span 
                      key={tech.name} 
                      className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-medium flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      <strong>{tech.name}</strong> <span className="text-slate-600">|</span> <span className="text-slate-500 text-[10px]">{tech.type}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column (Visual Mockup) */}
            <motion.div variants={itemVariants} className="lg:col-span-5 relative">
              <div className="w-full relative glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl z-10 transition-transform duration-300 hover:scale-[1.01]">
                <div className="flex items-center justify-between mb-8 border-b border-slate-800 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3.5 h-3.5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                    </div>
                    <span className="text-slate-200 text-xs font-bold tracking-widest uppercase">System Operational</span>
                  </div>
                  <div className="px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-400 text-[10px] font-black tracking-wider uppercase">
                    ML-RF Pipeline v2
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Progress Line */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                      <span>Model Stability (OOB Score)</span>
                      <span className="text-purple-400">99.5%</span>
                    </div>
                    <div className="h-2.5 bg-slate-950/80 rounded-full overflow-hidden p-0.5 border border-slate-800">
                      <div
                        style={{ width: "99.5%" }}
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Dual Grid cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800">
                      <Brain className="w-5 h-5 text-purple-400 mb-2" />
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Estimator</p>
                      <p className="text-white font-display text-sm font-extrabold mt-1">RandomForest</p>
                    </div>
                    <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800">
                      <Cpu className="w-5 h-5 text-purple-400 mb-2" />
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Features Type</p>
                      <p className="text-white font-display text-sm font-extrabold mt-1">Mixed (Cat/Num)</p>
                    </div>
                  </div>

                  {/* Latency card */}
                  <div className="p-4 bg-purple-500/5 rounded-xl border border-purple-500/10">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
                      <span>Pipeline Transformations</span>
                      <span className="text-purple-400 font-mono">25 Columns</span>
                    </div>
                    <div className="text-[11px] text-slate-500 leading-relaxed mb-1">
                      Imputer &rarr; OrdinalEncoder &rarr; StandardScaler &rarr; RF Classifier
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section variants={itemVariants} className="py-16 bg-[#0a0a0c] border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`glass-panel ${stat.glow} rounded-xl p-6 hover:-translate-y-1 hover:border-slate-700 transition-all duration-300 text-center`}
              >
                <div className="w-10 h-10 mx-auto rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                  <stat.icon className="w-5 h-5 text-purple-400" />
                </div>
                <p className="text-3xl lg:text-4xl font-display font-black text-white tracking-tight mb-1">{stat.value}</p>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-24 bg-[#0d0d0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span className="text-indigo-400 text-xs font-semibold uppercase tracking-wider">Architectural Components</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight mb-4">
              Advanced Decision <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">Capabilities</span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Designed as a robust pipeline solution that streamlines data processing from ingestion to prediction.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className={`bg-gradient-to-br ${feature.color} border rounded-2xl p-6 sm:p-8 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300`}
              >
                <div className="w-12 h-12 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section variants={itemVariants} className="py-24 bg-[#0a0a0c] border-t border-slate-900 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div>
            <h2 className="text-3xl lg:text-5xl font-display font-extrabold text-white tracking-tight mb-6">
              Experience Real-Time <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">Claims Decisioning</span>
            </h2>
            <p className="text-slate-400 mb-10 max-w-xl mx-auto text-base leading-relaxed">
              Test features, derived calculation validation, and model confidence thresholds in real time using the interactive suite.
            </p>
            <Link 
              to="/predict" 
              className="px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all duration-200 inline-flex items-center gap-3 shadow-2xl hover:-translate-y-0.5 text-lg"
            >
              <Sparkles className="w-5 h-5" />
              <span>Launch Prediction Panel</span>
            </Link>
          </div>
        </div>
      </motion.section>
    </motion.div>
  )
}

export default Home;
