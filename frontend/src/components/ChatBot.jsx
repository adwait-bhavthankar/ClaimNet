import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react'

const v = (name) => `var(--${name})`

const FAQ_LIST = [
  {
    q: "What is ClaimNet?",
    a: "ClaimNet is an intelligent decision support system designed to evaluate insurance claims. It uses a trained RandomForest classifier to estimate the approval probability of any claim based on demographics, credit info, and asset history."
  },
  {
    q: "How is training-inference skew prevented?",
    a: "We package both preprocessors (like Imputer, OrdinalEncoder, and StandardScaler) and the RandomForest estimator into a single serialized scikit-learn Pipeline (.pkl file). This ensures that web inputs undergo the exact same mathematical transforms as training data."
  },
  {
    q: "What is the OOB Accuracy of the model?",
    a: "Our RandomForest model yields an Out-Of-Bag (OOB) score of approximately 99.5% on our baseline dataset of 10,000 synthetic records."
  },
  {
    q: "How do I perform a batch prediction?",
    a: "You can send a POST request containing an array of claim objects to the `/predict/batch` endpoint. It processes up to 100 claims simultaneously and returns a list of decisions and probabilities."
  },
  {
    q: "How are the risk flags calculated?",
    a: "Risk factors are computed using rule-based metrics combined with model inputs. It flags drivers under 25, credit scores below 600, high claims frequency, or unusual claim-to-premium ratios."
  }
]

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am the ClaimNet Assistant. How can I help you analyze the prediction pipeline today?', time: new Date() }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping])

  const handleSelectQuestion = (faq) => {
    // Add user message
    const userMsg = { sender: 'user', text: faq.q, time: new Date() }
    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)

    // Simulate bot response generation
    setTimeout(() => {
      setIsTyping(false)
      const botMsg = { sender: 'bot', text: faq.a, time: new Date() }
      setMessages(prev => [...prev, botMsg])
    }, 1200)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="w-[360px] sm:w-[380px] h-[500px] rounded-2xl flex flex-col mb-4 overflow-hidden border shadow-2xl"
            style={{ 
              backgroundColor: v('bg-card'), 
              borderColor: v('border'),
              boxShadow: `0 10px 40px ${v('shadow')}`
            }}
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${v('border')}`, backgroundColor: v('bg-page-alt') }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10">
                  <Bot className="w-4.5 h-4.5" style={{ color: v('text-primary') }} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: v('text-primary') }}>ClaimNet Assistant</h4>
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest block">Active Agent</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-1.5 rounded-lg hover:bg-slate-800/10 transition-colors"
                style={{ color: v('text-faint') }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    msg.sender === 'user' ? 'bg-white text-black border border-white/20' : 'bg-slate-900 border border-slate-800'
                  }`}>
                    {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <div className={`p-3 rounded-xl max-w-[75%] text-xs leading-relaxed ${
                    msg.sender === 'user' ? 'bg-white text-black' : 'bg-slate-950/65 text-slate-300 border border-slate-850'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/65 text-slate-500 border border-slate-850 flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span className="text-[10px] uppercase font-bold tracking-wider">Generating Answer...</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Selector Q&A Grid */}
            <div className="p-4 bg-slate-950/40" style={{ borderTop: `1px solid ${v('border')}` }}>
              <p className="text-[9px] font-extrabold uppercase tracking-wider mb-2.5" style={{ color: v('text-faint') }}>Frequently Asked Questions</p>
              <div className="flex flex-col gap-2 max-h-36 overflow-y-auto pr-1">
                {FAQ_LIST.map((faq, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectQuestion(faq)}
                    disabled={isTyping}
                    className="w-full text-left p-2 rounded-lg text-[10px] font-semibold transition-all hover:bg-slate-800/10 text-slate-300 border border-transparent hover:border-slate-800/40 disabled:opacity-50"
                    style={{ backgroundColor: v('bg-input'), color: v('text-secondary'), border: `1px solid ${v('border')}` }}
                  >
                    {faq.q}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Circle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-200 active:scale-95"
        style={{ 
          backgroundColor: v('bg-accent'), 
          color: v('text-on-accent'),
          boxShadow: `0 8px 24px ${v('shadow')}`
        }}
        aria-label="Help Chatbot"
      >
        <MessageSquare className="w-5.5 h-5.5" />
      </button>

    </div>
  )
}

export default ChatBot
