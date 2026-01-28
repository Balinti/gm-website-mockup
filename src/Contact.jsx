import React, { useState } from 'react'
import { motion } from 'framer-motion'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    practice: '',
    message: ''
  })

  const offices = [
    'Atlanta', 'Boca Raton', 'Chicago', 'Denver', 'Fort Lauderdale',
    'Las Vegas', 'Los Angeles', 'Miami', 'New York', 'Orlando',
    'Scottsdale', 'West Palm Beach'
  ]

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold text-sm tracking-[0.3em]">GET IN TOUCH</span>
            <h2 className="text-navy text-4xl font-serif mt-4 mb-8">Contact Us</h2>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-navy/70 text-sm mb-2">Full Name *</label>
                  <input
                    type="text"
                    className="w-full border-b-2 border-navy/20 py-2 focus:border-gold focus:outline-none transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-navy/70 text-sm mb-2">Email *</label>
                  <input
                    type="email"
                    className="w-full border-b-2 border-navy/20 py-2 focus:border-gold focus:outline-none transition-colors"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-navy/70 text-sm mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full border-b-2 border-navy/20 py-2 focus:border-gold focus:outline-none transition-colors"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-navy/70 text-sm mb-2">Practice Area</label>
                  <select
                    className="w-full border-b-2 border-navy/20 py-2 bg-transparent focus:border-gold focus:outline-none transition-colors"
                    value={formData.practice}
                    onChange={(e) => setFormData({...formData, practice: e.target.value})}
                  >
                    <option value="">Select a practice area</option>
                    <option>Real Estate</option>
                    <option>Litigation</option>
                    <option>Cannabis</option>
                    <option>Corporate</option>
                    <option>Immigration</option>
                    <option>Hospitality</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-navy/70 text-sm mb-2">How can we help? *</label>
                <textarea
                  rows={4}
                  className="w-full border-b-2 border-navy/20 py-2 focus:border-gold focus:outline-none transition-colors resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-navy text-white px-8 py-4 hover:bg-gold hover:text-navy transition-all duration-300"
              >
                Submit Inquiry
              </motion.button>
            </form>
          </motion.div>

          {/* Locations */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gold text-sm tracking-[0.3em]">PRINCIPAL LOCATIONS</span>
            <h2 className="text-navy text-4xl font-serif mt-4 mb-8">22 Offices Nationwide</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {offices.map((office, idx) => (
                <motion.a
                  key={office}
                  href="#"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="text-navy hover:text-gold transition-colors py-2 border-b border-navy/10"
                >
                  {office}
                </motion.a>
              ))}
            </div>

            <div className="mt-12 p-6 bg-navy/5">
              <h3 className="text-navy font-serif text-xl mb-4">Main Office</h3>
              <p className="text-navy/70">
                200 East Las Olas Boulevard<br />
                Fort Lauderdale, FL 33301
              </p>
              <p className="text-navy font-medium mt-4">
                <a href="tel:8884911120" className="hover:text-gold transition-colors">
                  (888) 491-1120
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
