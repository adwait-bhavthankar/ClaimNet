import React from 'react'
import { motion } from 'framer-motion'
import {
  Github, Linkedin, Mail, ExternalLink,
  Cpu, Database, Brain, Shield, Code2, Terminal,
  Zap, Activity, Layers, Server, BookOpen, UserCheck
} from 'lucide-react'

const technologies = [
  { name: 'React 18', icon: Code2, description: 'Component-Based Architecture' },
  { name: 'Flask', icon: Terminal, description: 'RESTful API Endpoint Delivery' },
  { name: 'Python 3', icon: Cpu, description: 'Scientific Computation Core' },
  { name: 'scikit-learn', icon: Brain, description: 'Pipeline Serialization (joblib)' },
  { name: 'Tailwind CSS', icon: Layers, description: 'Aesthetic Utility Tokens' },
  { name: 'Recharts', icon: Activity, description: 'High-Fidelity Telemetry Charts' },
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
  { method: 'POST', endpoint: '/predict', desc: 'Accepts raw claim parameters, runs pipeline, returns decision probability.', type: 'action' },
  { method: 'POST', endpoint: '/predict/batch', desc: 'Accepts array of claim JSONs (max 100), outputs array of predictions.', type: 'action' },
  { method: 'GET', endpoint: '/model/info', desc: 'Returns details on active model type, feature dimensions, and serialization age.', type: 'info' },
  { method: 'GET', endpoint: '/health', desc: 'Performs check on system health and verifies model state memory loading.', type: 'info' },
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
      className="min-h-screen py-8 lg:py-12 cyber-grid relative"
      style={{ backgroundColor: 'var(--bg-page)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full mb-4"
            style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-accent)' }}>
            <BookOpen className="w-4.5 h-4.5" style={{ color: 'var(--text-primary)' }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
              Academic Architecture Specifications
            </span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-display font-extrabold tracking-tight mb-3"
            style={{ color: 'var(--text-primary)' }}>
            System & <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, var(--text-primary), var(--text-muted))' }}>Model Specifications</span>
          </h1>
          <p className="max-w-xl mx-auto text-sm sm:text-base" style={{ color: 'var(--text-muted)' }}>
            ClaimNet is a Bachelor of Engineering (B.E.) Capstone project demonstrating advanced machine learning pipelines.
          </p>
        </div>

        {/* Project Overview Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 mb-10 transition-all duration-300 shadow-sm"
          style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border)' }}>
              <Server className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
            </div>
            <h2 className="text-xl font-display font-bold" style={{ color: 'var(--text-primary)' }}>Project Concept</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
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
            <div className="p-4 rounded-xl flex flex-col justify-center"
              style={{ backgroundColor: 'var(--bg-page-alt)', border: '1px solid var(--border-subtle)' }}>
              <div className="flex items-center space-x-2 mb-2" style={{ color: 'var(--text-primary)' }}>
                <Shield className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Zero Training-Inference Skew</span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-faint)' }}>
                Rather than saving encoders and models separately (which forces manual realignment logic in web servers),
                the entire transform step is embedded within the model pipeline itself, creating an immutable
                end-to-end inference container.
              </p>
            </div>
          </div>
        </div>

        {/* Model Pipeline Stepper */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 mb-10 transition-all duration-300 shadow-sm"
          style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
          <h2 className="text-xl font-display font-bold mb-8 text-left" style={{ color: 'var(--text-primary)' }}>Pipeline Inference Architecture</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pipelineSteps.map((step, idx) => (
              <div key={idx} className="relative p-5 rounded-xl transition-all duration-300"
                style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border)' }}>
                <span className="absolute top-4 right-4 text-xs font-mono font-bold" style={{ color: 'var(--text-faint)' }}>0{idx + 1}</span>
                <h3 className="text-sm font-bold mb-2 font-display" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies Grid */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 mb-10 transition-all duration-300 shadow-sm"
          style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
          <h2 className="text-xl font-display font-bold mb-8 text-left" style={{ color: 'var(--text-primary)' }}>Integrated Technologies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech) => {
              const Icon = tech.icon
              return (
                <div
                  key={tech.name}
                  className="flex items-start space-x-4 p-5 rounded-xl transition-all duration-300 hover:-translate-y-0.5"
                  style={{ backgroundColor: 'var(--bg-page-alt)', border: '1px solid var(--border)' }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border)' }}>
                    <Icon className="w-5 h-5" style={{ color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{tech.name}</h3>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-muted)' }}>{tech.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* API Specification */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 mb-10 transition-all duration-300 shadow-sm"
          style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
          <h2 className="text-xl font-display font-bold mb-6 text-left" style={{ color: 'var(--text-primary)' }}>API Endpoints (Self-Documentation)</h2>
          <div className="space-y-4">
            {apiEndpoints.map((api, idx) => (
              <div
                key={idx}
                className="flex flex-col lg:flex-row lg:items-center justify-between p-4 rounded-xl transition-all gap-4"
                style={{ backgroundColor: 'var(--bg-page-alt)', border: '1px solid var(--border)' }}
              >
                <div className="flex items-center space-x-4">
                  <span className="px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border"
                    style={{
                      backgroundColor: api.type === 'action' ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-input)',
                      color: api.type === 'action' ? '#34d399' : 'var(--text-primary)',
                      borderColor: api.type === 'action' ? 'rgba(16, 185, 129, 0.25)' : 'var(--border)'
                    }}>
                    {api.method}
                  </span>
                  <code className="text-xs font-mono font-semibold px-3 py-1 rounded-md"
                    style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                    {api.endpoint}
                  </code>
                </div>
                <span className="text-xs leading-relaxed lg:flex-1 lg:max-w-2xl" style={{ color: 'var(--text-muted)' }}>{api.desc}</span>
                <div className="flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-widest mt-2 lg:mt-0" style={{ color: 'var(--text-faint)' }}>
                  <span>Inference Server</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Profile */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 text-center transition-all duration-300 shadow-sm"
          style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border)' }}>
          <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-4"
            style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border)' }}>
            <UserCheck className="w-6 h-6" style={{ color: 'var(--text-primary)' }} />
          </div>
          <h2 className="text-xl font-display font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Capstone Project Registry</h2>
          <p className="text-xs sm:text-sm max-w-xl mx-auto leading-relaxed mb-8" style={{ color: 'var(--text-muted)' }}>
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
                className="flex flex-col items-center space-y-2 transition-all hover:-translate-y-0.5 group"
                style={{ color: 'var(--text-muted)' }}
              >
                <div className="w-11 h-11 rounded-lg flex items-center justify-center transition-all"
                  style={{ backgroundColor: 'var(--bg-input)', border: '1px solid var(--border)' }}>
                  <item.icon className="w-4.5 h-4.5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
              </a>
            ))}
          </div>

          <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-faint)' }}>
              <span>B.E. Final Year Project</span>
              <span style={{ color: 'var(--border)' }}>|</span>
              <span>Model: RandomForestClassifier (max_depth=15)</span>
              <span style={{ color: 'var(--border)' }}>|</span>
              <span style={{ color: 'var(--text-primary)' }}>System Version 2.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default About;