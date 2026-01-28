import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: "Hello! I'm Emma, your virtual legal assistant at Greenspoon Marder. How may I help you today?" 
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const simulateResponse = (userMessage) => {
    setIsTyping(true)
    
    // Simulate AI response based on keywords
    setTimeout(() => {
      let response = ''
      const lowerMsg = userMessage.toLowerCase()

      if (lowerMsg.includes('cannabis') || lowerMsg.includes('marijuana')) {
        response = "Our Cannabis Law team has an exceptional track record - we're the only firm to secure cannabis dispensary approvals in Miami. Would you like me to connect you with our Cannabis Law group, led by Irina Dashevsky in Chicago?"
      } else if (lowerMsg.includes('real estate') || lowerMsg.includes('property')) {
        response = "Real Estate is one of our core practice areas. We represent buyers, sellers, developers, lenders, and investors across all property types. Which office location would be most convenient for you?"
      } else if (lowerMsg.includes('litigation') || lowerMsg.includes('lawsuit') || lowerMsg.includes('sue')) {
        response = "Our Litigation team is nationally recognized. We recently secured a major victory defeating a $123 million class action. Can you tell me a bit more about your matter so I can direct you to the right attorney?"
      } else if (lowerMsg.includes('immigration') || lowerMsg.includes('visa') || lowerMsg.includes('h1b')) {
        response = "Our Immigration practice handles both business and family immigration matters, including H-1B, EB-5, and naturalization. Patricia Gannon chairs our Immigration group in New York. Would you like to schedule a consultation?"
      } else if (lowerMsg.includes('office') || lowerMsg.includes('location')) {
        response = "We have 22 offices nationwide including Atlanta, Chicago, Denver, Fort Lauderdale, Las Vegas, Los Angeles, Miami, New York, Orlando, and West Palm Beach. Which location is most convenient for you?"
      } else if (lowerMsg.includes('attorney') || lowerMsg.includes('lawyer')) {
        response = "With over 215 attorneys across 41 practice areas, we can help with virtually any legal matter. Could you tell me what type of legal assistance you're looking for?"
      } else {
        response = "I'd be happy to help you with that. Could you provide a bit more detail about your legal needs? Our firm handles Real Estate, Litigation, Corporate, Cannabis, Immigration, Hospitality, and many other practice areas."
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }])
      setIsTyping(false)
    }, 1500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setInput('')
    simulateResponse(userMessage)
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-gold text-navy w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors ${isOpen ? 'hidden' : ''}`}
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-navy p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                  <span className="text-navy font-bold">E</span>
                </div>
                <div>
                  <h3 className="text-white font-medium">Emma</h3>
                  <p className="text-white/60 text-xs">AI Legal Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-navy text-white rounded-br-none'
                        : 'bg-gray-100 text-navy rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-navy/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-navy/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-navy/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  className="bg-gold text-navy px-4 py-2 rounded-lg hover:bg-navy hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Powered by U Botika AI
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatWidget
