import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

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

function MagneticButton({ children, className, isMobile }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  const handleMouseMove = (e) => {
    if (isMobile) return
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      x.set((e.clientX - rect.left - rect.width / 2) / 3)
      y.set((e.clientY - rect.top - rect.height / 2) / 3)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={isMobile ? {} : { x: springX, y: springY }}
      className={className}
      whileHover={isMobile ? {} : { scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}

function Stats() {
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

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])

  const stats = [
    { number: 44, suffix: '+', label: 'Years' },
    { number: 215, suffix: '+', label: 'Attorneys' },
    { number: 20, suffix: '+', label: 'Offices' }
  ]

  return (
    <section ref={containerRef} className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Animated background pattern - hidden on mobile */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{ y: backgroundY }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(90deg, #1e3a5f 0px, #1e3a5f 1px, transparent 1px, transparent 60px),
                             repeating-linear-gradient(0deg, #1e3a5f 0px, #1e3a5f 1px, transparent 1px, transparent 60px)`
          }} />
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Stats - Show first on mobile */}
        <div className="flex justify-center mb-12 md:hidden">
          <div className="grid grid-cols-3 gap-4 text-center">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative"
              >
                <div className="text-4xl sm:text-5xl font-serif text-navy">
                  <AnimatedCounter end={stat.number} suffix="" />
                  <span className="text-gold">{stat.suffix}</span>
                </div>
                <div className="text-navy/70 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
          {/* Left side - Search panels */}
          <div className="space-y-8 sm:space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-navy text-2xl sm:text-4xl font-serif mb-4 sm:mb-8">Discover Our People</h2>
              <motion.div
                className="flex flex-wrap gap-0.5 sm:gap-1 mb-4 sm:mb-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: { transition: { staggerChildren: 0.02 } }
                }}
              >
                {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
                  <motion.div
                    key={letter}
                    variants={{
                      hidden: { opacity: 0, scale: 0.5 },
                      visible: { opacity: 1, scale: 1 }
                    }}
                  >
                    <MagneticButton
                      isMobile={isMobile}
                      className="w-7 h-7 sm:w-9 sm:h-9 text-xs sm:text-sm text-navy hover:bg-navy hover:text-white transition-colors border border-navy/20 hover:border-navy"
                    >
                      {letter}
                    </MagneticButton>
                  </motion.div>
                ))}
              </motion.div>
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search"
                  className="relative w-full border-b-2 border-navy/30 py-2 sm:py-3 bg-transparent focus:border-gold focus:outline-none transition-all duration-300 text-sm sm:text-base"
                />
                <svg
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-navy text-2xl sm:text-4xl font-serif mb-4 sm:mb-8">Discover Our Services</h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Search Practice Areas"
                    className="w-full border-b-2 border-navy/30 py-2 sm:py-3 bg-transparent focus:border-gold focus:outline-none transition-all duration-300 text-sm sm:text-base"
                  />
                  <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <select
                  className="w-full border-b-2 border-navy/30 py-2 sm:py-3 bg-transparent focus:border-gold focus:outline-none text-navy/60 cursor-pointer text-sm sm:text-base"
                >
                  <option>Practice Areas</option>
                  <option>Real Estate</option>
                  <option>Litigation</option>
                  <option>Cannabis</option>
                  <option>Immigration</option>
                  <option>Corporate</option>
                </select>
              </div>
            </motion.div>
          </div>

          {/* Right side - Stats with 3D cards (desktop only) */}
          <div className="hidden md:flex justify-center items-center min-h-[400px]">
            <div className="grid grid-cols-3 gap-6 text-center">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 50, rotateX: -30 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{
                    scale: 1.1,
                    rotateY: 10,
                    transition: { duration: 0.3 }
                  }}
                  className="relative group cursor-pointer"
                  style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute -inset-4 bg-gold/20 rounded-2xl blur-2xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative p-6">
                    <div className="text-6xl md:text-7xl font-serif text-navy">
                      <AnimatedCounter end={stat.number} suffix="" />
                      <motion.span
                        className="text-gold"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                      >
                        {stat.suffix}
                      </motion.span>
                    </div>
                    <motion.div
                      className="text-navy/70 text-lg mt-3 tracking-wider"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                    >
                      {stat.label}
                    </motion.div>
                  </div>
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
