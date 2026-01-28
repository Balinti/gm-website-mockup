import React from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import PracticeAreas from './components/PracticeAreas'
import News from './components/News'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'

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
