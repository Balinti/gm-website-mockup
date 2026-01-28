import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy shadow-lg py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-white font-serif text-2xl tracking-wide">
          <span className="font-light">Greenspoon</span>
          <span className="font-normal">Marder</span>
          <span className="text-gold text-sm ml-1">LLP</span>
        </a>

        <div className="hidden md:flex items-center space-x-8">
          {['Professionals', 'Practices', 'Insights', 'Careers', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white text-sm tracking-wider hover:text-gold transition-colors"
            >
              {item}
            </a>
          ))}
          <button className="bg-gold text-navy px-4 py-2 text-sm font-medium hover:bg-white transition-colors">
            Client Portal
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-navy border-t border-white/10 mt-4"
        >
          {['Professionals', 'Practices', 'Insights', 'Careers', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block px-6 py-3 text-white hover:bg-white/10"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar
