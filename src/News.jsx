import React from 'react'
import { motion } from 'framer-motion'

function News() {
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
    <section id="insights" className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-white text-4xl font-serif">Featured News & Insights</h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Featured articles - left column */}
          <div className="lg:col-span-2 space-y-6">
            {featuredNews.map((item, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-gold text-navy text-xs px-3 py-1 font-medium">{item.tag}</span>
                  <span className="text-white/50 text-sm flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item.date}
                  </span>
                </div>
                <h3 className="text-white text-2xl font-serif group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <div className="mt-6 flex items-center text-gold text-sm font-medium">
                  Read More
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Side articles - right column */}
          <div className="space-y-6">
            {sideNews.map((item, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-gold text-xs tracking-wider">{item.tag}</span>
                  <span className="text-white/50 text-xs">{item.date}</span>
                </div>
                <h3 className="text-white font-serif group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
                <div className="mt-4 text-gold text-sm">
                  Read More →
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {bottomNews.map((item, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative overflow-hidden cursor-pointer"
            >
              <div className="bg-navy border border-white/20 p-6 h-full hover:border-gold transition-colors">
                <span className="inline-block bg-white/10 text-white text-xs px-3 py-1 mb-4">{item.tag}</span>
                <p className="text-white/50 text-sm mb-2">{item.date}</p>
                <h3 className="text-white font-serif group-hover:text-gold transition-colors">{item.title}</h3>
                <button className="mt-4 bg-white/10 text-white px-4 py-2 text-sm hover:bg-gold hover:text-navy transition-all">
                  Read More
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default News
