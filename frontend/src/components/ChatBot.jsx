import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Bot, User, Loader2 } from 'lucide-react'

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
  const [showTooltip, setShowTooltip] = useState(false)
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-[380px] sm:w-[410px] h-[550px] rounded-2xl flex flex-col overflow-hidden border shadow-2xl"
            style={{ 
              backgroundColor: v('bg-card'), 
              borderColor: v('border'),
              boxShadow: `0 15px 45px ${v('shadow')}`
            }}
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${v('border')}`, backgroundColor: v('bg-page-alt') }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center border" style={{ backgroundColor: v('bg-input'), borderColor: v('border') }}>
                  <Bot className="w-5 h-5" style={{ color: v('text-primary') }} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: v('text-primary') }}>ClaimNet Assistant</h4>
                  <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest block">Active Agent</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 rounded-lg hover:bg-slate-800/10 transition-colors"
                style={{ color: v('text-muted') }}
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ backgroundColor: v('bg-card') }}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex items-start gap-3.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border"
                    style={{ 
                      backgroundColor: msg.sender === 'user' ? v('text-primary') : v('bg-input'),
                      color: msg.sender === 'user' ? v('bg-page') : v('text-primary'),
                      borderColor: v('border')
                    }}>
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className="p-3.5 rounded-xl max-w-[75%] text-xs leading-relaxed border"
                    style={{ 
                      backgroundColor: msg.sender === 'user' ? v('text-primary') : v('bg-page-alt'),
                      color: msg.sender === 'user' ? v('bg-page') : v('text-primary'),
                      borderColor: msg.sender === 'user' ? 'transparent' : v('border')
                    }}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border"
                    style={{ backgroundColor: v('bg-input'), color: v('text-primary'), borderColor: v('border') }}>
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3.5 rounded-xl border flex items-center gap-2"
                    style={{ backgroundColor: v('bg-page-alt'), color: v('text-muted'), borderColor: v('border') }}>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-[10px] uppercase font-bold tracking-wider">Generating Answer...</span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Selector Q&A Grid */}
            <div className="p-4 border-t" style={{ backgroundColor: v('bg-page-alt'), borderColor: v('border') }}>
              <p className="text-[10px] font-extrabold uppercase tracking-wider mb-2.5" style={{ color: v('text-secondary') }}>
                Select a Question
              </p>
              <div className="flex flex-col gap-2 max-h-36 overflow-y-auto pr-1">
                {FAQ_LIST.map((faq, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectQuestion(faq)}
                    disabled={isTyping}
                    className="w-full text-left p-2.5 rounded-lg text-[10.5px] font-bold transition-all border disabled:opacity-50 hover:opacity-85"
                    style={{ 
                      backgroundColor: v('bg-card'), 
                      color: v('text-primary'), 
                      borderColor: v('border')
                    }}
                  >
                    {faq.q}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Circle Button & Label Group */}
      <div className="relative flex items-center gap-3">
        {/* Label Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute right-16 py-1.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider border shadow-md whitespace-nowrap pointer-events-none"
              style={{ backgroundColor: v('bg-card'), color: v('text-primary'), borderColor: v('border') }}
            >
              Ask ClaimNet
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-200 active:scale-95 border"
          style={{ 
            backgroundColor: v('bg-accent'), 
            color: v('text-on-accent'),
            borderColor: v('border-accent'),
            boxShadow: `0 8px 30px ${v('shadow')}`
          }}
          whileHover={{ scale: 1.06 }}
          aria-label="Help Chatbot"
        >
          <MessageSquare className="w-6.5 h-6.5" />
        </motion.button>
      </div>

    </div>
  )
}

export default ChatBot
