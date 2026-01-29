import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  const menuItems = ['Professionals', 'Practices', 'Insights', 'Careers', 'Contact']

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy shadow-lg py-2 sm:py-3' : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        <a href="#" className="text-white font-serif text-xl sm:text-2xl tracking-wide z-50">
          <span className="font-light">Greenspoon</span>
          <span className="font-normal">Marder</span>
          <span className="text-gold text-xs sm:text-sm ml-1">LLP</span>
        </a>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {menuItems.map((item) => (
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

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white z-50 p-2 -mr-2"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <motion.span
              className="w-full h-0.5 bg-current block"
              animate={menuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-full h-0.5 bg-current block"
              animate={menuOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-full h-0.5 bg-current block"
              animate={menuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-navy/95 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu content */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 w-full sm:w-80 bg-navy md:hidden flex flex-col pt-20"
            >
              <div className="flex-1 px-6 py-8">
                {menuItems.map((item, idx) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.1 }}
                    className="block py-4 text-white text-2xl font-serif border-b border-white/10 hover:text-gold hover:border-gold/50 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </motion.a>
                ))}

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 w-full bg-gold text-navy py-4 text-lg font-medium hover:bg-white transition-colors"
                >
                  Client Portal
                </motion.button>
              </div>

              {/* Contact info at bottom */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="px-6 py-6 border-t border-white/10"
              >
                <p className="text-white/60 text-sm">Main Office</p>
                <p className="text-white text-sm mt-1">Fort Lauderdale, FL</p>
                <a href="tel:8884911120" className="text-gold text-lg mt-2 block">
                  (888) 491-1120
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
