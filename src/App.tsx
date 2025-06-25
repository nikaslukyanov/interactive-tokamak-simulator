import React from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import SimulationDashboard from './components/SimulationDashboard'
import TechnicalSpecs from './components/TechnicalSpecs'
import Examples from './components/Examples'
import TokamakConfiguration from './components/TokamakConfiguration'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <Header />
      <main>
        <Hero />
        <Features />
        <SimulationDashboard />
        <TechnicalSpecs />
        <Examples />
        <TokamakConfiguration />
      </main>
      <Footer />
    </div>
  )
}

export default App