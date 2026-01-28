import React, { useState } from 'react'
import { motion } from 'framer-motion'

function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)

  const headlines = [
    { tag: 'CANNABIS', text: 'We Applaud Federal Cannabis Rescheduling and Celebrate Our Clients' },
    { tag: 'LITIGATION', text: 'Securing $123M Victory in Landmark TCPA Class Action Defense' },
    { tag: 'REAL ESTATE', text: 'Unanimous Miami City Commission Approval Through 2050' }
  ]

  const [currentHeadline, setCurrentHeadline] = useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-navy">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Animated lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <motion.path
            d="M0,400 Q400,300 800,400 T1600,400"
            stroke="white"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          key={currentHeadline}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold text-sm tracking-[0.3em] font-medium">
            {headlines[currentHeadline].tag}
          </span>
          <h1 className="text-white text-4xl md:text-6xl font-serif mt-4 leading-tight max-w-4xl mx-auto">
            {headlines[currentHeadline].text}
          </h1>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 max-w-xl mx-auto"
        >
          <div className={`relative transition-all duration-300 ${searchFocused ? 'scale-105' : ''}`}>
            <input
              type="text"
              placeholder="Find answers here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full bg-transparent border-b-2 border-gold text-white placeholder-gold/70 py-3 px-2 text-lg focus:outline-none"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gold hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Headline indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {headlines.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentHeadline(idx)}
              className={`h-1 transition-all duration-300 ${
                idx === currentHeadline ? 'w-12 bg-white' : 'w-6 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}

export default Hero
