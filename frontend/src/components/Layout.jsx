import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Shield, Menu, X, Cpu, Server, Activity } from 'lucide-react'

const API_URL = 'http://localhost:5000'

function Layout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [apiStatus, setApiStatus] = useState('checking')
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
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
      if (res.ok) {
        setApiStatus('online')
      } else {
        setApiStatus('offline')
      }
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
    <div className="min-h-screen bg-[#0b0b0d] text-slate-200 flex flex-col font-sans antialiased relative">
      {/* Top Telemetry Bar */}
      <div className="bg-slate-950 py-2 z-50 text-[10px] font-bold uppercase tracking-widest text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-slate-600" />
              <span>Inference Core: <span className="text-purple-400">RandomForest v2.1</span></span>
            </span>
            <span className="hidden sm:inline text-slate-800">|</span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-slate-600" />
              <span>Validation: <span className="text-indigo-400">OOB (99.5%)</span></span>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-slate-600" />
              <span>API Server: </span>
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
      <nav
        className={`fixed top-8 left-0 right-0 z-40 transition-all duration-200 ${
          isScrolled 
            ? 'mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-2' 
            : 'w-full px-4 sm:px-6 lg:px-8'
        }`}
      >
        <div className={`transition-all duration-200 rounded-xl sm:rounded-2xl ${
          isScrolled 
            ? 'glass-panel border-slate-800/80 shadow-2xl py-2 px-4 sm:px-6' 
            : 'bg-transparent py-4 px-0'
        }`}>
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg border border-purple-500/25 transition-all duration-200">
                <Shield className="w-4.5 h-4.5 text-white" />
              </div>
              <div className="flex items-center">
                <span className="text-lg font-display font-extrabold tracking-tight text-white">Claim</span>
                <span className="text-lg font-display font-extrabold tracking-tight text-purple-400">Net</span>
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
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 border ${
                      isActive
                        ? 'text-purple-400 bg-purple-500/5 border-purple-500/20'
                        : 'text-slate-400 border-transparent hover:text-white hover:bg-slate-900/60'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900/60 border border-transparent hover:border-slate-800 transition-all"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 mx-auto max-w-md bg-[#0f0f12]/95 border border-slate-850 p-3 rounded-xl shadow-2xl space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'text-purple-400 bg-purple-500/5 border border-purple-500/15'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="pt-24 sm:pt-28 flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#09090b] border-t border-slate-900/40 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center border border-purple-500/20">
                  <Shield className="w-4.5 h-4.5 text-white" />
                </div>
                <span className="text-lg font-display font-extrabold text-white">
                  Claim<span className="text-purple-400">Net</span>
                </span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
                Academic Capstone Demonstration. AI-driven decisioning pipeline leveraging serialized preprocessors and optimal tree ensembles.
              </p>
            </div>
            <div>
              <h4 className="text-slate-200 text-xs font-bold uppercase tracking-wider mb-4">Navigation</h4>
              <ul className="space-y-2.5 text-xs font-semibold">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link to={item.path} className="text-slate-400 hover:text-purple-400 transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-slate-200 text-xs font-bold uppercase tracking-wider mb-4">Pipeline Status</h4>
              <ul className="space-y-2.5 text-xs font-semibold text-slate-400">
                <li className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>API Integration: Active</span>
                </li>
                <li>Classifier Model: RandomForest</li>
                <li>OOB Accuracy: 99.5%</li>
                <li className="text-purple-400">Telemetry: Online</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-900/40 mt-10 pt-6 text-center text-slate-500 text-[10px] font-bold uppercase tracking-wider">
            <p>&copy; {new Date().getFullYear()} ClaimNet System. Bachelor of Engineering Academic Capstone Project.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout;
