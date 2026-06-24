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
  },
  {
    icon: Zap,
    title: 'Sub-100ms Real-Time Inference',
    description: 'High-throughput decision engine providing instantaneous classification, claim-to-premium evaluations, and probability matrices.',
  },
  {
    icon: Shield,
    title: 'Adaptive Risk Intelligence',
    description: 'Heuristic-driven risk profiling engine mapping credit scoring, history of claims, and accident severity indicators to identify anomalies.',
  },
  {
    icon: TrendingUp,
    title: 'Explainable AI Predictions',
    description: 'Provides granular decision confidence metrics (High/Medium/Low) paired with real-time derived features for full prediction transparency.',
  }
]

const stats = [
  { value: '99.5%', label: 'Inference Precision', icon: Target },
  { value: '87ms', label: 'Response Latency', icon: Zap },
  { value: '10K+', label: 'Synthetic Training Set', icon: Database },
  { value: '25', label: 'Engineered Features', icon: Activity },
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
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
}

function Home() {
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}
      className="min-h-screen relative overflow-hidden cyber-grid" style={{ backgroundColor: 'var(--bg-page)' }}>

      {/* Hero */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            <motion.div variants={itemVariants} className="lg:col-span-7 text-left z-10">
              <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full mb-8"
                style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-accent)' }}>
                <Sparkles className="w-4 h-4" style={{ color: 'var(--text-primary)' }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                  Academic Modernization Project
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold leading-none mb-6 tracking-tight"
                style={{ color: 'var(--text-primary)' }}>
                ClaimNet: End-to-End <br />
                <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, var(--text-primary), var(--text-muted))' }}>
                  ML Prediction Engine
                </span>
              </h1>

              <p className="text-base sm:text-lg mb-8 leading-relaxed max-w-xl" style={{ color: 'var(--text-muted)' }}>
                An industrial-grade insurance claim decision support system. Utilizing a fully serialized
                scikit-learn pipeline, ClaimNet automates feature engineering, data imputation, and
                prediction with zero training-inference skew.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/predict"
                  className="px-8 py-4 font-semibold rounded-xl transition-all duration-200 inline-flex items-center gap-2.5 shadow-xl hover:-translate-y-0.5"
                  style={{ backgroundColor: 'var(--bg-accent)', color: 'var(--text-on-accent)' }}>
                  <span>Launch Inference Engine</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/dashboard"
                  className="px-8 py-4 font-semibold rounded-xl transition-all duration-200 inline-flex items-center gap-2 hover:-translate-y-0.5"
                  style={{ backgroundColor: 'var(--bg-btn-secondary)', color: 'var(--text-tertiary)', border: '1px solid var(--border)' }}>
                  <span>View System Dashboard</span>
                </Link>
              </div>

              <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--text-faint)' }}>Core Technology Stack</p>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <span key={tech.name} className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5"
                      style={{ backgroundColor: 'var(--bg-btn-secondary)', border: '1px solid var(--border)', color: 'var(--text-tertiary)' }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--text-primary)' }} />
                      <strong>{tech.name}</strong> <span style={{ color: 'var(--text-ghost)' }}>|</span> <span className="text-[10px]" style={{ color: 'var(--text-faint)' }}>{tech.type}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div variants={itemVariants} className="lg:col-span-5 relative">
              <div className="w-full relative glass-panel rounded-2xl p-6 sm:p-8 shadow-2xl z-10 transition-transform duration-300 hover:scale-[1.01]">
                <div className="flex items-center justify-between mb-8 pb-4" style={{ borderBottom: '1px solid var(--border)' }}>
                  <div className="flex items-center space-x-3">
                    <div className="w-3.5 h-3.5 rounded-full bg-green-500/20 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                    </div>
                    <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--text-secondary)' }}>System Operational</span>
                  </div>
                  <div className="px-3 py-1 rounded-md text-[10px] font-black tracking-wider uppercase"
                    style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-accent)', color: 'var(--text-primary)' }}>
                    ML-RF Pipeline v2
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-2">
                      <span style={{ color: 'var(--text-muted)' }}>Model Stability (OOB Score)</span>
                      <span style={{ color: 'var(--text-primary)' }}>99.5%</span>
                    </div>
                    <div className="h-2.5 rounded-full overflow-hidden p-0.5" style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border)' }}>
                      <div style={{ width: "99.5%", backgroundImage: 'linear-gradient(to right, var(--text-primary), var(--text-muted))' }} className="h-full rounded-full" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border)' }}>
                      <Brain className="w-5 h-5 mb-2" style={{ color: 'var(--text-primary)' }} />
                      <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-faint)' }}>Estimator</p>
                      <p className="font-display text-sm font-extrabold mt-1" style={{ color: 'var(--text-primary)' }}>RandomForest</p>
                    </div>
                    <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border)' }}>
                      <Cpu className="w-5 h-5 mb-2" style={{ color: 'var(--text-primary)' }} />
                      <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-faint)' }}>Features Type</p>
                      <p className="font-display text-sm font-extrabold mt-1" style={{ color: 'var(--text-primary)' }}>Mixed (Cat/Num)</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--bg-subtle-2)', border: '1px solid var(--border-subtle)' }}>
                    <div className="flex items-center justify-between text-xs font-semibold mb-2">
                      <span style={{ color: 'var(--text-tertiary)' }}>Pipeline Transformations</span>
                      <span className="font-mono" style={{ color: 'var(--text-primary)' }}>25 Columns</span>
                    </div>
                    <div className="text-[11px] leading-relaxed" style={{ color: 'var(--text-faint)' }}>
                      Imputer &rarr; OrdinalEncoder &rarr; StandardScaler &rarr; RF Classifier
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <motion.section variants={itemVariants} className="py-16" style={{ backgroundColor: 'var(--bg-page-alt)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="glass-panel rounded-xl p-6 hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="w-10 h-10 mx-auto rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--bg-subtle)' }}>
                  <stat.icon className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
                </div>
                <p className="text-3xl lg:text-4xl font-display font-black tracking-tight mb-1" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
                <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <section className="py-24" style={{ backgroundColor: 'var(--bg-page)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-accent)' }}>
              <Terminal className="w-4 h-4" style={{ color: 'var(--text-primary)' }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Architectural Components</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-display font-extrabold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
              Advanced Decision <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, var(--text-primary), var(--text-muted))' }}>Capabilities</span>
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Designed as a robust pipeline solution that streamlines data processing from ingestion to prediction.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {features.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}
                className="rounded-2xl p-6 sm:p-8 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border)' }}>
                  <feature.icon className="w-6 h-6" style={{ color: 'var(--text-primary)' }} />
                </div>
                <h3 className="text-xl font-display font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{feature.title}</h3>
                <p className="leading-relaxed text-sm" style={{ color: 'var(--text-muted)' }}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <motion.section variants={itemVariants} className="py-24 relative" style={{ backgroundColor: 'var(--bg-page-alt)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl lg:text-5xl font-display font-extrabold tracking-tight mb-6" style={{ color: 'var(--text-primary)' }}>
            Experience Real-Time <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, var(--text-primary), var(--text-muted))' }}>Claims Decisioning</span>
          </h2>
          <p className="mb-10 max-w-xl mx-auto text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Test features, derived calculation validation, and model confidence thresholds in real time using the interactive suite.
          </p>
          <Link to="/predict"
            className="px-10 py-5 font-bold rounded-xl transition-all duration-200 inline-flex items-center gap-3 shadow-2xl hover:-translate-y-0.5 text-lg"
            style={{ backgroundColor: 'var(--bg-accent)', color: 'var(--text-on-accent)' }}>
            <Sparkles className="w-5 h-5" />
            <span>Launch Prediction Panel</span>
          </Link>
        </div>
      </motion.section>
    </motion.div>
  )
}

export default Home;
