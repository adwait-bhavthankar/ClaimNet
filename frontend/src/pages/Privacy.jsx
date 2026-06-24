import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Eye, Lock, FileText, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const pageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
}

const v = (name) => `var(--${name})`

function Privacy() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="min-h-screen py-8 lg:py-12 relative"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors"
            style={{ color: v('text-muted') }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full mb-4"
            style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-accent)' }}>
            <Shield className="w-4.5 h-4.5" style={{ color: v('text-primary') }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: v('text-tertiary') }}>
              Data Governance Registry
            </span>
          </div>
          <h1 className="text-3xl lg:text-5xl font-display font-extrabold tracking-tight mb-3"
            style={{ color: v('text-primary') }}>
            Privacy <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, var(--text-primary), var(--text-muted))' }}>Policy</span>
          </h1>
          <p className="max-w-xl mx-auto text-sm" style={{ color: v('text-muted') }}>
            Effective Date: June 24, 2026. This policy outlines how ClaimNet handles data during model testing and prediction.
          </p>
        </div>

        {/* Content Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-8 transition-all duration-300 shadow-sm"
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}>
          
          <section className="space-y-3">
            <div className="flex items-center gap-2.5">
              <Eye className="w-5 h-5" style={{ color: v('text-primary') }} />
              <h2 className="text-lg font-bold" style={{ color: v('text-primary') }}>1. Information We Process</h2>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: v('text-muted') }}>
              ClaimNet operates primarily as a localized Machine Learning inference demo. Any features or numerical metrics entered into the <strong>Inference Engine</strong> (such as age, income, credit score, vehicle price, and claim amount) are processed in real-time on our self-hosted Flask server. We do not sell, rent, or distribute this testing input data.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2.5">
              <Lock className="w-5 h-5" style={{ color: v('text-primary') }} />
              <h2 className="text-lg font-bold" style={{ color: v('text-primary') }}>2. Data Security & Storage</h2>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: v('text-muted') }}>
              Inbound prediction requests are handled immediately in memory. Standard sessions do not store submission histories to permanent databases unless explicitly requested by developers for diagnostic logging. Data transferred between the client frontend and backend uses secure protocol configurations.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2.5">
              <FileText className="w-5 h-5" style={{ color: v('text-primary') }} />
              <h2 className="text-lg font-bold" style={{ color: v('text-primary') }}>3. Cookie Usage</h2>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: v('text-muted') }}>
              We use lightweight browser storage mechanisms (like LocalStorage or session flags) solely to persist theme configurations (Dark vs. Light modes) and cookie banner preferences. No third-party ad-tracking cookies are deployed on this application.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2.5">
              <Shield className="w-5 h-5" style={{ color: v('text-primary') }} />
              <h2 className="text-lg font-bold" style={{ color: v('text-primary') }}>4. Academic Capstone Context</h2>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: v('text-muted') }}>
              Please note that ClaimNet is an academic capstone demonstration. The classification outputs, risk factors, and decision metrics generated by the machine learning pipeline are synthetic and should not be used as official financial, legal, or commercial insurance authorizations.
            </p>
          </section>

        </div>

      </div>
    </motion.div>
  )
}

export default Privacy
