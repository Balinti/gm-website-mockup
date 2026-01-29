import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from 'framer-motion'

function PracticeCard({ area, idx, isActive, onHover, onLeave, isMobile }) {
  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleMouseMove = (e) => {
    if (isMobile) return
    const rect = cardRef.current?.getBoundingClientRect()
    if (rect) {
      x.set((e.clientX - rect.left - rect.width / 2) / 20)
      y.set((e.clientY - rect.top - rect.height / 2) / 20)
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(area.name)}
      onMouseLeave={handleMouseLeave}
      onClick={() => isMobile && (isActive ? onLeave() : onHover(area.name))}
      className="group relative cursor-pointer"
    >
      {/* Glow effect - desktop only */}
      {!isMobile && (
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-gold/50 to-gold/30 rounded-lg blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 0.5 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <motion.div
        className="relative bg-white/5 border border-white/10 p-5 sm:p-8 overflow-hidden"
        whileHover={isMobile ? {} : { backgroundColor: 'rgba(255,255,255,0.15)', borderColor: 'rgba(201, 162, 39, 0.5)' }}
        animate={isActive ? { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(201, 162, 39, 0.3)' } : {}}
        transition={{ duration: 0.3 }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          className="text-3xl sm:text-5xl mb-3 sm:mb-4 relative"
          animate={isMobile ? {} : { scale: isActive ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {area.icon}
        </motion.div>

        <h3 className="text-white text-lg sm:text-xl font-serif mb-2 relative">{area.name}</h3>

        <AnimatePresence>
          {isActive && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-white/70 text-xs sm:text-sm overflow-hidden relative"
            >
              {area.description}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Arrow indicator */}
        <motion.div
          className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-gold"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.div>

        {/* Shine effect - desktop only */}
        {!isMobile && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
            initial={{ x: '-100%' }}
            animate={{ x: isActive ? '200%' : '-100%' }}
            transition={{ duration: 0.6 }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

function PracticeAreas() {
  const [activeArea, setActiveArea] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [100, -100])

  const areas = [
    {
      name: 'Real Estate',
      description: 'Full-service real estate representation for buyers, sellers, developers, lenders, and investors.',
      icon: '🏢'
    },
    {
      name: 'Litigation',
      description: 'Nationally recognized trial attorneys handling complex commercial disputes.',
      icon: '⚖️'
    },
    {
      name: 'Cannabis',
      description: 'The only firm to secure cannabis dispensary approvals in Miami.',
      icon: '🌿'
    },
    {
      name: 'Corporate',
      description: 'Strategic counsel for M&A, securities, and corporate governance.',
      icon: '📊'
    },
    {
      name: 'Immigration',
      description: 'Business and family immigration services including H-1B and EB-5.',
      icon: '🌍'
    },
    {
      name: 'Hospitality',
      description: 'Serving hotels, restaurants, bars, and entertainment venues.',
      icon: '🍽️'
    }
  ]

  return (
    <section ref={containerRef} id="practices" className="py-16 sm:py-24 bg-navy relative overflow-hidden">
      {/* Animated background elements - desktop only */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y: backgroundY }}
        >
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
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-16"
        >
          <motion.span
            className="text-gold text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] inline-block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            EXPERTISE
          </motion.span>
          <motion.h2
            className="text-white text-3xl sm:text-5xl font-serif mt-3 sm:mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            41 Practice Areas
          </motion.h2>
          <motion.p
            className="text-white/60 mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-lg px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From complex litigation to cutting-edge cannabis law, our attorneys bring decades of experience to every matter.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {areas.map((area, idx) => (
            <PracticeCard
              key={area.name}
              area={area}
              idx={idx}
              isActive={activeArea === area.name}
              onHover={setActiveArea}
              onLeave={() => setActiveArea(null)}
              isMobile={isMobile}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-8 sm:mt-12"
        >
          <motion.button
            className="relative border border-gold text-gold px-6 sm:px-10 py-3 sm:py-4 overflow-hidden group text-sm sm:text-base"
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
