import React from 'react'
import { motion } from 'framer-motion'
import { 
  Github, Linkedin, Mail, ExternalLink, 
  Cpu, Database, Brain, Shield, Code2, Terminal,
  Zap, Activity, Layers, Server, BookOpen, UserCheck
} from 'lucide-react'

const technologies = [
  { name: 'React 18', icon: Code2, description: 'Component-Based Architecture', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  { name: 'Flask', icon: Terminal, description: 'RESTful API Endpoint Delivery', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  { name: 'Python 3', icon: Cpu, description: 'Scientific Computation Core', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
  { name: 'scikit-learn', icon: Brain, description: 'Pipeline Serialization (joblib)', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
  { name: 'Tailwind CSS', icon: Layers, description: 'Aesthetic Utility Tokens', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
  { name: 'Recharts', icon: Activity, description: 'High-Fidelity Telemetry Charts', color: 'bg-violet-500/10 text-violet-400 border-violet-500/20' },
]

const pipelineSteps = [
  {
    title: '1. Raw Feature Ingestion',
    desc: 'Receives 17 direct customer parameters (demographics, credit history, assets, claim amount) as JSON input.'
  },
  {
    title: '2. Engineered Derivation',
    desc: 'Dynamically computes derived columns (Premium-to-Income, Claim-to-Premium, Age Thresholds, Risk Flags) to form 25 features.'
  },
  {
    title: '3. ColumnTransformer Pipeline',
    desc: 'Automatically applies OrdinalEncoder (handling unseen values with -1) and StandardScaler, preventing training-inference skew.'
  },
  {
    title: '4. RandomForest Inference',
    desc: 'Feeds transformed feature matrices into the optimal estimator (max_depth=15, 100 trees) returning decision & confidence score.'
  }
]

const apiEndpoints = [
  { method: 'POST', endpoint: '/predict', desc: 'Accepts raw claim parameters, runs pipeline, returns decision probability.', color: 'green' },
  { method: 'POST', endpoint: '/predict/batch', desc: 'Accepts array of claim JSONs (max 100), outputs array of predictions.', color: 'green' },
  { method: 'GET', endpoint: '/model/info', desc: 'Returns details on active model type, feature dimensions, and serialization age.', color: 'purple' },
  { method: 'GET', endpoint: '/health', desc: 'Performs check on system health and verifies model state memory loading.', color: 'purple' },
]

const pageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
}

function About() {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="min-h-screen py-8 lg:py-12 bg-[#0d0d0f] cyber-grid relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 mb-4">
            <BookOpen className="w-4.5 h-4.5 text-purple-400" />
            <span className="text-purple-300 text-xs font-semibold uppercase tracking-wider">Academic Architecture Specifications</span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-display font-extrabold text-white tracking-tight mb-3">
            System & <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">Model Specifications</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            ClaimNet is a Bachelor of Engineering (B.E.) Capstone project demonstrating advanced machine learning pipelines.
          </p>
        </div>

        {/* Project Overview Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 mb-10 border border-slate-800 transition-all duration-300 hover:border-slate-700">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Server className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-display font-bold text-white">Project Concept</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 text-sm leading-relaxed text-slate-300">
            <div>
              <p className="mb-4">
                Insurance claim processing traditionally suffers from high manual overhead, long processing cycles, 
                and susceptibility to classification inconsistencies. ClaimNet modernizes this lifecycle by training 
                an ensemble model on 10,000 synthetic records with balanced categorical attributes.
              </p>
              <p>
                By replacing legacy ad-hoc processing scripts with a serialized scikit-learn Pipeline 
                containing both preprocessors and the classifier model, ClaimNet guarantees that training pre-processing
                and real-time prediction environments are mathematically identical.
              </p>
            </div>
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-850 flex flex-col justify-center">
              <div className="flex items-center space-x-2 text-purple-400 mb-2">
                <Shield className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Zero Training-Inference Skew</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rather than saving encoders and models separately (which forces manual realignment logic in web servers), 
                the entire transform step is embedded within the model pipeline itself, creating an immutable
                end-to-end inference container.
              </p>
            </div>
          </div>
        </div>

        {/* Model Pipeline Stepper */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 mb-10 border border-slate-800 transition-all duration-300 hover:border-slate-700">
          <h2 className="text-xl font-display font-bold text-white mb-8 text-left">Pipeline Inference Architecture</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pipelineSteps.map((step, idx) => (
              <div key={idx} className="relative p-5 bg-slate-950/65 rounded-xl border border-slate-850 hover:border-slate-700 transition-all duration-300">
                <span className="absolute top-4 right-4 text-xs font-mono font-bold text-slate-700">0{idx+1}</span>
                <h3 className="text-sm font-bold text-purple-400 mb-2 font-display">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Grid */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 mb-10 border border-slate-800 transition-all duration-300 hover:border-slate-700">
          <h2 className="text-xl font-display font-bold text-white mb-8 text-left">Integrated Technologies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech) => {
              const Icon = tech.icon
              return (
                <div 
                  key={tech.name}
                  className={`flex items-start space-x-4 p-5 bg-slate-950/50 hover:bg-slate-950/80 rounded-xl border ${tech.color} transition-all duration-300`}
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{tech.name}</h3>
                    <p className="text-slate-400 text-xs mt-1 leading-relaxed">{tech.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* API Specification */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 mb-10 border border-slate-800 transition-all duration-300 hover:border-slate-700">
          <h2 className="text-xl font-display font-bold text-white mb-6 text-left">API Endpoints (Self-Documentation)</h2>
          <div className="space-y-4">
            {apiEndpoints.map((api, idx) => (
              <div 
                key={idx}
                className="flex flex-col lg:flex-row lg:items-center justify-between p-4 bg-slate-950/80 rounded-xl border border-slate-850 hover:border-slate-800 transition-all gap-4"
              >
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                    api.color === 'green' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' 
                      : 'bg-purple-500/10 text-purple-400 border-purple-500/25'
                  }`}>
                    {api.method}
                  </span>
                  <code className="text-xs text-white font-mono font-semibold bg-slate-900 px-3 py-1 rounded-md border border-slate-800">{api.endpoint}</code>
                </div>
                <span className="text-slate-400 text-xs leading-relaxed lg:flex-1 lg:max-w-2xl">{api.desc}</span>
                <div className="flex items-center space-x-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2 lg:mt-0">
                  <span>Inference Server</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Profile */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 text-center border border-slate-800 transition-all duration-300 hover:border-slate-700">
          <div className="w-12 h-12 mx-auto rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 border border-purple-500/20">
            <UserCheck className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-xl font-display font-bold text-white mb-2">Capstone Project Registry</h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mb-8">
            This project is designed and implemented as a Final Year Project for the Bachelor of Engineering (B.E.) program, 
            demonstrating integration of ML systems with modern microservices.
          </p>
          
          <div className="flex items-center justify-center space-x-6">
            {[
              { icon: Github, label: 'Repository', href: '#' },
              { icon: Linkedin, label: 'Developers', href: '#' },
              { icon: Mail, label: 'Contact', href: '#' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex flex-col items-center space-y-2 text-slate-400 hover:text-purple-400 transition-colors group"
              >
                <div className="w-11 h-11 rounded-lg bg-slate-950 border border-slate-850 flex items-center justify-center group-hover:bg-purple-500/10 group-hover:border-purple-500/20 transition-all">
                  <item.icon className="w-4.5 h-4.5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
              </a>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-900">
            <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <span>B.E. Final Year Project</span>
              <span className="text-slate-800">|</span>
              <span>Model: RandomForestClassifier (max_depth=15)</span>
              <span className="text-slate-800">|</span>
              <span className="text-purple-400">System Version 2.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default About;
