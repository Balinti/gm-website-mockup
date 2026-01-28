import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

function DraggableCard({ area, idx, isActive, onHover, onLeave }) {
  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (rect) {
      x.set(e.clientX - rect.left - rect.width / 2)
      y.set(e.clientY - rect.top - rect.height / 2)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    onLeave()
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(area.name)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      whileHover={{ z: 50 }}
      className="group relative cursor-pointer"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-gold/50 to-gold/30 rounded-lg blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="relative bg-white/5 border border-white/10 p-8 overflow-hidden"
        whileHover={{ backgroundColor: 'rgba(255,255,255,0.15)', borderColor: 'rgba(201, 162, 39, 0.5)' }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          className="text-5xl mb-4 relative"
          animate={{ scale: isActive ? 1.2 : 1, rotate: isActive ? [0, -10, 10, 0] : 0 }}
          transition={{ duration: 0.5 }}
        >
          {area.icon}
        </motion.div>

        <h3 className="text-white text-xl font-serif mb-2 relative">{area.name}</h3>

        <AnimatePresence>
          {isActive && (
            <motion.p
              initial={{ opacity: 0, height: 0, y: 10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/70 text-sm overflow-hidden relative"
            >
              {area.description}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Arrow indicator */}
        <motion.div
          className="absolute bottom-4 right-4"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -10 }}
          transition={{ duration: 0.3 }}
        >
          <motion.svg
            className="w-6 h-6 text-gold"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ x: isActive ? [0, 5, 0] : 0 }}
            transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </motion.svg>
        </motion.div>

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
          initial={{ x: '-100%' }}
          animate={{ x: isActive ? '200%' : '-100%' }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>
    </motion.div>
  )
}

function PracticeAreas() {
  const [activeArea, setActiveArea] = useState(null)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

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
    <section ref={containerRef} id="practices" className="py-24 bg-navy relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        {/* Floating shapes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 border border-gold/10 rounded-full"
            style={{
              left: `${20 + i * 20}%`,
              top: `${10 + i * 15}%`
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <motion.span
            className="text-gold text-sm tracking-[0.3em] inline-block"
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            EXPERTISE
          </motion.span>
          <motion.h2
            className="text-white text-5xl font-serif mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            41 Practice Areas
          </motion.h2>
          <motion.p
            className="text-white/60 mt-4 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From complex litigation to cutting-edge cannabis law, our attorneys bring decades of experience to every matter.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, idx) => (
            <DraggableCard
              key={area.name}
              area={area}
              idx={idx}
              isActive={activeArea === area.name}
              onHover={setActiveArea}
              onLeave={() => setActiveArea(null)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.button
            className="relative border border-gold text-gold px-10 py-4 overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-gold"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative group-hover:text-navy transition-colors duration-300">
              View All Practice Areas
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default PracticeAreas
