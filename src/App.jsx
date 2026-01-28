import React from 'react'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Hero from './Hero'
import Stats from './Stats'
import PracticeAreas from './PracticeAreas'
import News from './News'
import Contact from './Contact'
import Footer from './Footer'
import ChatWidget from './ChatWidget'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Stats />
      <PracticeAreas />
      <News />
      <Contact />
      <Footer />
      <ChatWidget />
    </div>
  )
}

export default App
