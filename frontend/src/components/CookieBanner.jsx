import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, X } from 'lucide-react'

const v = (name) => `var(--${name})`

function CookieBanner() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('claimnet-cookies-accepted')
    if (!accepted) {
      // Small delay to make it feel premium when it loads
      const timer = setTimeout(() => setIsOpen(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('claimnet-cookies-accepted', 'true')
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-50 p-5 rounded-2xl shadow-2xl"
          style={{ 
            backgroundColor: v('bg-card'), 
            border: `1px solid ${v('border')}`,
            boxShadow: `0 10px 30px ${v('shadow')}`
          }}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: v('bg-subtle'), border: `1px solid ${v('border-accent')}` }}>
              <Info className="w-5 h-5" style={{ color: v('text-primary') }} />
            </div>
            
            <div className="flex-grow space-y-3">
              <div>
                <h4 className="text-sm font-bold" style={{ color: v('text-primary') }}>
                  Cookie & Preferences Consent
                </h4>
                <p className="text-xs leading-relaxed mt-1" style={{ color: v('text-muted') }}>
                  We use cookies and browser storage solely to persist your theme preference (Dark/Light mode) and remember this choice. No tracker cookies are used.
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAccept}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
                  style={{ backgroundColor: v('bg-accent'), color: v('text-on-accent') }}
                >
                  Accept & Continue
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg transition-colors hover:bg-slate-800/10"
                  style={{ color: v('text-faint') }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CookieBanner
