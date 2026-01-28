import React from 'react'
import { motion } from 'framer-motion'

function Footer() {
  return (
    <footer className="bg-navy border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <a href="#" className="text-white font-serif text-2xl tracking-wide">
              <span className="font-light">Greenspoon</span>
              <span className="font-normal">Marder</span>
              <span className="text-gold text-sm ml-1">LLP</span>
            </a>
            <p className="text-white/60 mt-4 max-w-md">
              A full-service law firm with over 215 attorneys and 20+ offices across the United States. 
              Am Law 200 ranked since 2015.
            </p>
            <div className="flex gap-4 mt-6">
              {['facebook', 'twitter', 'linkedin', 'youtube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 border border-white/20 flex items-center justify-center text-white/60 hover:border-gold hover:text-gold transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  {social === 'facebook' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5L14.17.5C10.24.5,9.25,3.3,9.25,5.47v2H6.5v4h2.75V24h5.25V11.5h3.54l.48-4Z"/></svg>
                  )}
                  {social === 'twitter' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  )}
                  {social === 'linkedin' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  )}
                  {social === 'youtube' && (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Our People', 'Practice Areas', 'Careers', 'News & Insights'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/60 hover:text-gold transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-medium mb-4">Legal</h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Use', 'Disclaimer', 'Sitemap', 'Pay Online'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/60 hover:text-gold transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            Attorney Advertising. Copyright © 2026. Greenspoon Marder LLP. All Rights Reserved.
          </p>
          <p className="text-white/40 text-sm">
            A U Botika Web Experience
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
