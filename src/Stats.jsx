import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function AnimatedCounter({ end, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

function Stats() {
  const stats = [
    { number: 44, suffix: '+', label: 'Years' },
    { number: 215, suffix: '+', label: 'Attorneys' },
    { number: 20, suffix: '+', label: 'Offices' }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left side - Search panels */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-navy text-3xl font-serif mb-6">Discover Our People</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
                  <button
                    key={letter}
                    className="w-8 h-8 text-sm text-navy hover:bg-navy hover:text-white transition-colors border border-navy/20"
                  >
                    {letter}
                  </button>
                ))}
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full border-b-2 border-navy/30 py-2 focus:border-gold focus:outline-none transition-colors"
                />
                <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-navy text-3xl font-serif mb-6">Discover Our Services</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Practice Areas"
                  className="w-full border-b-2 border-navy/30 py-2 focus:border-gold focus:outline-none transition-colors"
                />
                <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <select className="w-full border-b-2 border-navy/30 py-2 mt-4 bg-transparent focus:border-gold focus:outline-none text-navy/60">
                <option>Practice Areas</option>
                <option>Real Estate</option>
                <option>Litigation</option>
                <option>Cannabis</option>
                <option>Immigration</option>
                <option>Corporate</option>
              </select>
            </motion.div>
          </div>

          {/* Right side - Stats */}
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-3 gap-8 text-center">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                >
                  <div className="text-5xl md:text-6xl font-serif text-navy">
                    <AnimatedCounter end={stat.number} suffix="" />
                    <span className="text-gold">{stat.suffix}</span>
                  </div>
                  <div className="text-navy/70 text-lg mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stats
