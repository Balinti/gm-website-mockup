import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

function NewsCard({ item, idx, featured = false, direction = 'up' }) {
  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-50, 50], [5, -5])
  const rotateY = useTransform(x, [-50, 50], [-5, 5])
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 20 })

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
  }

  const initialAnimation = direction === 'up'
    ? { opacity: 0, y: 60 }
    : { opacity: 0, x: 60 }

  const animateAnimation = direction === 'up'
    ? { opacity: 1, y: 0 }
    : { opacity: 1, x: 0 }

  return (
    <motion.article
      ref={cardRef}
      initial={initialAnimation}
      whileInView={animateAnimation}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d'
      }}
      className="group relative cursor-pointer"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-2 bg-gold/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />

      <motion.div
        className={`relative bg-white/5 border border-white/10 ${featured ? 'p-8' : 'p-6'} overflow-hidden`}
        whileHover={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderColor: 'rgba(201, 162, 39, 0.3)'
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent"
          initial={{ opacity: 0, scale: 1.5 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        <div className="relative">
          <div className="flex items-center gap-4 mb-4">
            <motion.span
              className="bg-gold text-navy text-xs px-3 py-1 font-medium"
              whileHover={{ scale: 1.1 }}
            >
              {item.tag}
            </motion.span>
            <span className="text-white/50 text-sm flex items-center gap-2">
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </motion.svg>
              {item.date}
            </span>
          </div>

          <h3 className={`text-white font-serif group-hover:text-gold transition-colors duration-300 ${featured ? 'text-2xl' : 'text-lg'}`}>
            {item.title}
          </h3>

          <motion.div
            className="mt-6 flex items-center text-gold text-sm font-medium"
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
          >
            Read More
            <motion.svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ x: 0 }}
              whileHover={{ x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.div>
        </div>

        {/* Shine sweep effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
          initial={{ x: '-100%' }}
          whileHover={{ x: '200%' }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>
    </motion.article>
  )
}

function News() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [50, -50])

  const news = [
    {
      tag: 'NEWS',
      date: 'Jan 28, 2026',
      title: 'Greenspoon Marder Attorney Kevin Cruz to Speak at the 2026...',
      featured: true
    },
    {
      tag: 'NEWS',
      date: 'Jan 28, 2026',
      title: 'Greenspoon Marder Celebrates Launch of Broward County\'s "50 & Forward"...',
      featured: true
    },
    {
      tag: 'NEWS',
      date: 'Jan 23, 2026',
      title: 'Greenspoon Marder Ranks First in Am Law 200 Digital Visibility...',
      featured: false
    },
    {
      tag: 'NEWS',
      date: 'Jan 20, 2026',
      title: 'Greenspoon Marder Announces Jamey Campellone\'s Promotion to Partner',
      featured: false
    },
    {
      tag: 'TCPA',
      date: 'Jan 28, 2026',
      title: 'Another Court Concludes that Text Messages Count as "Telephone Calls"',
      featured: false
    },
    {
      tag: 'Immigration Blog',
      date: 'Jan 20, 2026',
      title: 'Preparation for the Fiscal Year (FY) 2027 H-1B Cap Season',
      featured: false
    }
  ]

  const featuredNews = news.filter(n => n.featured)
  const sideNews = news.filter(n => !n.featured).slice(0, 2)
  const bottomNews = news.slice(4)

  return (
    <section ref={containerRef} id="insights" className="py-16 sm:py-24 bg-navy relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(201, 162, 39, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(201, 162, 39, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Floating orbs */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 rounded-full bg-gold/5 blur-3xl"
            style={{
              left: `${i * 40}%`,
              top: `${20 + i * 20}%`
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <motion.h2
            className="text-white text-3xl sm:text-5xl font-serif"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Featured News & Insights
          </motion.h2>
          <motion.div
            className="h-1 w-24 bg-gold mt-4"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Featured articles - left column */}
          <div className="lg:col-span-2 space-y-6">
            {featuredNews.map((item, idx) => (
              <NewsCard key={idx} item={item} idx={idx} featured direction="up" />
            ))}
          </div>

          {/* Side articles - right column */}
          <div className="space-y-6">
            {sideNews.map((item, idx) => (
              <NewsCard key={idx} item={item} idx={idx} direction="right" />
            ))}
          </div>
        </div>

        {/* Bottom row with staggered animation */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
        >
          {bottomNews.map((item, idx) => (
            <motion.article
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 }
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative cursor-pointer"
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="absolute -inset-1 bg-gold/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <div className="relative bg-navy border border-white/20 p-6 h-full group-hover:border-gold transition-colors duration-300">
                <motion.span
                  className="inline-block bg-white/10 text-white text-xs px-3 py-1 mb-4"
                  whileHover={{ backgroundColor: 'rgba(201, 162, 39, 0.3)' }}
                >
                  {item.tag}
                </motion.span>
                <p className="text-white/50 text-sm mb-2">{item.date}</p>
                <h3 className="text-white font-serif group-hover:text-gold transition-colors">{item.title}</h3>
                <motion.button
                  className="mt-4 bg-white/10 text-white px-4 py-2 text-sm overflow-hidden relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-gold"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative group-hover:text-navy transition-colors">Read More</span>
                </motion.button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default News
