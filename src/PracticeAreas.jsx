import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function PracticeAreas() {
  const [activeArea, setActiveArea] = useState(null)

  const areas = [
    {
      name: 'Real Estate',
      description: 'Full-service real estate representation for buyers, sellers, developers, lenders, and investors across all property types.',
      icon: '🏢'
    },
    {
      name: 'Litigation',
      description: 'Nationally recognized trial attorneys handling complex commercial disputes and class action defense.',
      icon: '⚖️'
    },
    {
      name: 'Cannabis',
      description: 'The only firm to secure cannabis dispensary approvals in Miami. Comprehensive regulatory and business counsel.',
      icon: '🌿'
    },
    {
      name: 'Corporate',
      description: 'Strategic counsel for M&A, securities, corporate governance, and business transactions of all sizes.',
      icon: '📊'
    },
    {
      name: 'Immigration',
      description: 'Business and family immigration services including H-1B, EB-5, and naturalization.',
      icon: '🌍'
    },
    {
      name: 'Hospitality',
      description: 'Serving the $1.5 trillion hospitality sector - hotels, restaurants, bars, and entertainment venues.',
      icon: '🍽️'
    }
  ]

  return (
    <section id="practices" className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm tracking-[0.3em]">EXPERTISE</span>
          <h2 className="text-white text-4xl font-serif mt-4">41 Practice Areas</h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">
            From complex litigation to cutting-edge cannabis law, our attorneys bring decades of experience to every matter.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, idx) => (
            <motion.div
              key={area.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => setActiveArea(area.name)}
              onMouseLeave={() => setActiveArea(null)}
              className="group relative bg-white/5 border border-white/10 p-8 cursor-pointer hover:bg-white/10 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{area.icon}</div>
              <h3 className="text-white text-xl font-serif mb-2">{area.name}</h3>
              
              <AnimatePresence>
                {activeArea === area.name && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-white/70 text-sm overflow-hidden"
                  >
                    {area.description}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="border border-gold text-gold px-8 py-3 hover:bg-gold hover:text-navy transition-all duration-300">
            View All Practice Areas
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default PracticeAreas
