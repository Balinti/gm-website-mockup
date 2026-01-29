import React, { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

function Hero({ videoUrl }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef(null)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Parallax scroll effect
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, isMobile ? 50 : 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 1.1])

  // Mouse tracking for 3D effect (disabled on mobile)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  const handleMouseMove = (e) => {
    if (isMobile) return
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const x = (e.clientX - rect.left - rect.width / 2) / 25
      const y = (e.clientY - rect.top - rect.height / 2) / 25
      mouseX.set(x)
      mouseY.set(y)
    }
  }

  const headlines = [
    { tag: 'CANNABIS', text: 'We Applaud Federal Cannabis Rescheduling and Celebrate Our Clients' },
    { tag: 'LITIGATION', text: 'Securing $123M Victory in Landmark TCPA Class Action Defense' },
    { tag: 'REAL ESTATE', text: 'Unanimous Miami City Commission Approval Through 2050' }
  ]

  const [currentHeadline, setCurrentHeadline] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Video URL
  const defaultVideo = videoUrl || "https://raw.githubusercontent.com/Balinti/gm-website-mockup/main/VID-20260116-WA0051.mp4"

  // Reduce particles on mobile for performance
  const particleCount = isMobile ? 8 : 20

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video/Image Background with Parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: isMobile ? 1 : scale }}
      >
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='%231e3a5f' width='1920' height='1080'/%3E%3C/svg%3E"
        >
          <source src={defaultVideo} type="video/mp4" />
        </video>

        {/* Overlay gradient - stronger on mobile for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/70 to-navy/95 md:from-navy/80 md:via-navy/60 md:to-navy/90" />

        {/* Animated mesh gradient - hidden on mobile for performance */}
        {!isMobile && (
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                'radial-gradient(circle at 20% 80%, rgba(201, 162, 39, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 20%, rgba(201, 162, 39, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 40% 40%, rgba(201, 162, 39, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 80%, rgba(201, 162, 39, 0.3) 0%, transparent 50%)',
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        )}
      </motion.div>

      {/* Floating particles - reduced on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(particleCount)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Animated geometric lines - hidden on mobile */}
      {!isMobile && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.line
            x1="0" y1="100%" x2="100%" y2="0"
            stroke="rgba(201, 162, 39, 0.1)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.line
            x1="100%" y1="100%" x2="0" y2="30%"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, delay: 1, repeat: Infinity, repeatType: "reverse" }}
          />
        </svg>
      )}

      {/* Content with parallax and 3D effect */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center py-20"
        style={{
          y,
          opacity,
          rotateX: isMobile ? 0 : springY,
          rotateY: isMobile ? 0 : springX,
          transformPerspective: 1000
        }}
      >
        <motion.div
          key={currentHeadline}
          initial={{ opacity: 0, y: 30, filter: isMobile ? 'none' : 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -30, filter: isMobile ? 'none' : 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="text-gold text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] font-medium inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {headlines[currentHeadline].tag}
          </motion.span>
          <h1 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-serif mt-3 sm:mt-4 leading-tight max-w-5xl mx-auto px-2">
            {isMobile ? (
              // Simple render on mobile - no word-by-word animation
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {headlines[currentHeadline].text}
              </motion.span>
            ) : (
              // Word-by-word animation on desktop
              headlines[currentHeadline].text.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.25em]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
                >
                  {word}
                </motion.span>
              ))
            )}
          </h1>
        </motion.div>

        {/* Search Bar with glow effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 sm:mt-12 max-w-xl mx-auto px-2"
        >
          <div className={`relative transition-all duration-500 ${searchFocused && !isMobile ? 'scale-105' : ''}`}>
            {!isMobile && (
              <motion.div
                className="absolute -inset-2 bg-gold/20 rounded-lg blur-xl transition-opacity duration-300"
                animate={{ opacity: searchFocused ? 1 : 0 }}
              />
            )}
            <input
              type="text"
              placeholder="Find answers here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="relative w-full bg-white/10 backdrop-blur-sm border border-gold/50 text-white placeholder-white/50 py-3 sm:py-4 px-4 sm:px-6 text-base sm:text-lg focus:outline-none focus:border-gold focus:bg-white/20 transition-all duration-300 rounded-sm"
            />
            <button className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gold hover:text-white transition-colors p-1">
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Headline indicators with progress animation */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
          {headlines.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentHeadline(idx)}
              className="relative h-1 overflow-hidden bg-white/20 transition-all duration-300"
              style={{ width: idx === currentHeadline ? (isMobile ? 36 : 48) : (isMobile ? 18 : 24) }}
            >
              {idx === currentHeadline && (
                <motion.div
                  className="absolute inset-0 bg-gold"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 5, ease: "linear" }}
                  style={{ transformOrigin: 'left' }}
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator with bounce - simplified on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 sm:gap-2"
        >
          <span className="hidden sm:block text-white/50 text-xs tracking-widest">SCROLL</span>
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center pt-1.5 sm:pt-2">
            <motion.div
              className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gold rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Corner accents - smaller on mobile */}
      <div className="absolute top-0 left-0 w-16 h-16 sm:w-32 sm:h-32 border-l-2 border-t-2 border-gold/30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-32 sm:h-32 border-r-2 border-b-2 border-gold/30 pointer-events-none" />
    </section>
  )
}

export default Hero
