import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Shield, Menu, X, Cpu, Server, Activity, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import CookieBanner from './CookieBanner'
import ChatBot from './ChatBot'
import Particles from './Particles'

const API_URL = 'http://localhost:5000'

function Layout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [apiStatus, setApiStatus] = useState('checking')
  const location = useLocation()
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    checkApiStatus()
    const interval = setInterval(checkApiStatus, 15000)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(interval)
    }
  }, [])

  const checkApiStatus = async () => {
    try {
      const res = await fetch(`${API_URL}/health`)
      setApiStatus(res.ok ? 'online' : 'offline')
    } catch {
      setApiStatus('offline')
    }
  }

  const navItems = [
    { path: '/', label: 'System Home' },
    { path: '/predict', label: 'Inference Engine' },
    { path: '/dashboard', label: 'Analytics Board' },
    { path: '/about', label: 'Specifications' },
  ]

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased relative" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-secondary)' }}>
      {/* Background Interactive Particles */}
      <Particles />

      {/* Top Telemetry Bar */}
      <div className="py-2 z-50 text-[10px] font-bold uppercase tracking-widest" style={{ backgroundColor: 'var(--bg-page-alt)', color: 'var(--text-faint)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5" style={{ color: 'var(--text-ghost)' }} />
              <span>Inference Core: <span style={{ color: 'var(--text-primary)' }}>RandomForest v2.1</span></span>
            </span>
            <span className="hidden sm:inline" style={{ color: 'var(--text-ghost)' }}>|</span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" style={{ color: 'var(--text-ghost)' }} />
              <span>Validation: <span style={{ color: 'var(--text-tertiary)' }}>OOB (99.5%)</span></span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" style={{ color: 'var(--text-ghost)' }} />
              <span>API: </span>
              {apiStatus === 'online' ? (
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Online
                </span>
              ) : apiStatus === 'offline' ? (
                <span className="text-rose-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  Offline
                </span>
              ) : (
                <span className="text-amber-400">Checking...</span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`fixed top-8 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled ? 'mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-2' : 'w-full px-4 sm:px-6 lg:px-8'
      }`}>
        <div className={`transition-all duration-200 rounded-xl sm:rounded-2xl ${
          isScrolled ? 'glass-panel shadow-2xl py-2 px-4 sm:px-6' : 'bg-transparent py-4 px-0'
        }`}>
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center shadow-lg transition-all duration-200"
                style={{ backgroundColor: 'var(--bg-accent)' }}>
                <Shield className="w-4.5 h-4.5" style={{ color: 'var(--text-on-accent)' }} />
              </div>
              <div className="flex items-center">
                <span className="text-lg font-display font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>Claim</span>
                <span className="text-lg font-display font-extrabold tracking-tight" style={{ color: 'var(--text-muted)' }}>Net</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1.5">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200"
                    style={{
                      color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                      backgroundColor: isActive ? 'var(--bg-subtle)' : 'transparent',
                      border: `1px solid ${isActive ? 'var(--border-accent)' : 'transparent'}`,
                    }}
                  >
                    {item.label}
                  </Link>
                )
              })}

              {/* Theme Toggle */}
              <div className="flex items-center space-x-2 ml-4 pl-4" style={{ borderLeft: `1px solid var(--border)` }}>
                <Sun className="w-3.5 h-3.5" style={{ color: isDark ? 'var(--text-ghost)' : 'var(--text-primary)' }} />
                <button
                  onClick={toggleTheme}
                  className={`theme-toggle ${!isDark ? 'is-light' : ''}`}
                  aria-label="Toggle theme"
                />
                <Moon className="w-3.5 h-3.5" style={{ color: isDark ? 'var(--text-primary)' : 'var(--text-ghost)' }} />
              </div>
            </div>

            {/* Mobile: Toggle + Menu */}
            <div className="md:hidden flex items-center gap-2">
              <button onClick={toggleTheme} className={`theme-toggle ${!isDark ? 'is-light' : ''}`} aria-label="Toggle theme" />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg transition-all"
                style={{ color: 'var(--text-muted)' }}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 mx-auto max-w-md p-3 rounded-xl shadow-2xl space-y-1"
            style={{ backgroundColor: 'var(--bg-card)', border: `1px solid var(--border)` }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                  style={{
                    color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                    backgroundColor: isActive ? 'var(--bg-subtle)' : 'transparent',
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-24 sm:pt-28 flex-grow">{children}</main>

      {/* Footer */}
      <footer className="py-12 mt-auto" style={{ backgroundColor: 'var(--bg-footer)', borderTop: `1px solid var(--border-section)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'var(--bg-accent)' }}>
                  <Shield className="w-4.5 h-4.5" style={{ color: 'var(--text-on-accent)' }} />
                </div>
                <span className="text-lg font-display font-extrabold" style={{ color: 'var(--text-primary)' }}>
                  Claim<span style={{ color: 'var(--text-muted)' }}>Net</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm max-w-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                Academic Capstone Demonstration. AI-driven decisioning pipeline leveraging serialized preprocessors and optimal tree ensembles.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-secondary)' }}>Navigation</h4>
              <ul className="space-y-2.5 text-xs font-semibold">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="hover:opacity-80 transition-opacity" style={{ color: 'var(--text-muted)' }}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--text-secondary)' }}>Pipeline Status</h4>
              <ul className="space-y-2.5 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>API Integration: Active</span>
                </li>
                <li>Classifier Model: RandomForest</li>
                <li>OOB Accuracy: 99.5%</li>
                <li style={{ color: 'var(--text-primary)' }}>Telemetry: Online</li>
                <li>
                  <Link to="/privacy" className="hover:opacity-80 transition-opacity underline decoration-dotted" style={{ color: 'var(--text-muted)' }}>
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 text-center text-[10px] font-bold uppercase tracking-wider" style={{ borderTop: `1px solid var(--border-section)`, color: 'var(--text-faint)' }}>
            <p>&copy; {new Date().getFullYear()} ClaimNet System. Bachelor of Engineering Academic Capstone Project.</p>
          </div>
        </div>
      </footer>
      
      {/* Dynamic Popups & Utilities */}
      <CookieBanner />
      <ChatBot />
    </div>

  )
}

export default Layout;
