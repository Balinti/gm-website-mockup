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

function MagneticButton({ children, className }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  const handleMouseMove = (e) => {
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
      style={{ x: springX, y: springY }}
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}

function Stats() {
  const containerRef = useRef(null)
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
    <section ref={containerRef} className="py-24 bg-white relative overflow-hidden">
      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(90deg, #1e3a5f 0px, #1e3a5f 1px, transparent 1px, transparent 60px),
                           repeating-linear-gradient(0deg, #1e3a5f 0px, #1e3a5f 1px, transparent 1px, transparent 60px)`
        }} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left side - Search panels */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-navy text-4xl font-serif mb-8">Discover Our People</h2>
              <motion.div
                className="flex flex-wrap gap-1 mb-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: { transition: { staggerChildren: 0.02 } }
                }}
              >
                {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter, i) => (
                  <motion.div
                    key={letter}
                    variants={{
                      hidden: { opacity: 0, scale: 0.5 },
                      visible: { opacity: 1, scale: 1 }
                    }}
                  >
                    <MagneticButton
                      className="w-9 h-9 text-sm text-navy hover:bg-navy hover:text-white transition-colors border border-navy/20 hover:border-navy"
                    >
                      {letter}
                    </MagneticButton>
                  </motion.div>
                ))}
              </motion.div>
              <div className="relative group">
                <motion.div
                  className="absolute -inset-2 bg-gold/10 rounded-lg blur-xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                <input
                  type="text"
                  placeholder="Search"
                  className="relative w-full border-b-2 border-navy/30 py-3 bg-transparent focus:border-gold focus:outline-none transition-all duration-300"
                />
                <motion.svg
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </motion.svg>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-navy text-4xl font-serif mb-8">Discover Our Services</h2>
              <div className="space-y-4">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Search Practice Areas"
                    className="w-full border-b-2 border-navy/30 py-3 bg-transparent focus:border-gold focus:outline-none transition-all duration-300"
                  />
                  <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <motion.select
                  className="w-full border-b-2 border-navy/30 py-3 bg-transparent focus:border-gold focus:outline-none text-navy/60 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <option>Practice Areas</option>
                  <option>Real Estate</option>
                  <option>Litigation</option>
                  <option>Cannabis</option>
                  <option>Immigration</option>
                  <option>Corporate</option>
                </motion.select>
              </div>
            </motion.div>
          </div>

          {/* Right side - Stats with 3D cards */}
          <div className="flex justify-center items-center min-h-[400px]">
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
