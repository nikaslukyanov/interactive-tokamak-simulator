import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar
} from 'recharts'
import { Play, Pause, RotateCcw, Settings, Download, Zap } from 'lucide-react'

const SimulationDashboard = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  // Sample simulation data
  const plasmaData = [
    { time: 0, temperature: 10, density: 1.2, pressure: 12, beta: 0.02 },
    { time: 1, temperature: 15, density: 1.5, pressure: 22.5, beta: 0.05 },
    { time: 2, temperature: 25, density: 1.8, pressure: 45, beta: 0.12 },
    { time: 3, temperature: 35, density: 2.1, pressure: 73.5, beta: 0.18 },
    { time: 4, temperature: 42, density: 2.3, pressure: 96.6, beta: 0.22 },
    { time: 5, temperature: 48, density: 2.4, pressure: 115.2, beta: 0.25 },
  ]

  const coilData = [
    { name: 'PF01', current: 850, power: 72 },
    { name: 'PF02', current: 920, power: 85 },
    { name: 'PF03', current: 780, power: 61 },
    { name: 'PF04', current: 1050, power: 110 },
    { name: 'PF05', current: 890, power: 79 },
    { name: 'PF06', current: 960, power: 92 },
    { name: 'PF07', current: 820, power: 67 },
    { name: 'PF08', current: 1100, power: 121 },
  ]

  const geometryData = [
    { parameter: 'Major Radius', value: 4.55, max: 5.0 },
    { parameter: 'Minor Radius', value: 1.2, max: 1.5 },
    { parameter: 'Elongation', value: 1.4, max: 2.0 },
    { parameter: 'Triangularity', value: 0.5, max: 1.0 },
    { parameter: 'Safety Factor', value: 3.2, max: 5.0 },
    { parameter: 'Beta Poloidal', value: 0.25, max: 1.0 },
  ]

  const handleSimulationToggle = () => {
    setIsRunning(!isRunning)
    if (!isRunning) {
      // Simulate running animation
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= plasmaData.length - 1) {
            setIsRunning(false)
            clearInterval(interval)
            return prev
          }
          return prev + 1
        })
      }, 1000)
    }
  }

  const resetSimulation = () => {
    setIsRunning(false)
    setCurrentStep(0)
  }

  return (
    <section id="simulation" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Interactive Simulation Dashboard
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time visualization and control of tokamak plasma parameters, 
            coil currents, and geometric configurations
          </p>
        </motion.div>

        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-6 shadow-lg mb-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={handleSimulationToggle}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isRunning 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-plasma-500 hover:bg-plasma-600 text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                <span>{isRunning ? 'Pause' : 'Start'} Simulation</span>
              </motion.button>

              <motion.button
                onClick={resetSimulation}
                className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="h-5 w-5" />
                <span>Reset</span>
              </motion.button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Zap className="h-4 w-4" />
                <span>Step: {currentStep + 1}/{plasmaData.length}</span>
              </div>
              
              <motion.button
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Settings className="h-5 w-5" />
              </motion.button>
              
              <motion.button
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Download className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Plasma Parameters Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Plasma Parameters Evolution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={plasmaData.slice(0, currentStep + 1)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  name="Temperature (keV)"
                />
                <Line 
                  type="monotone" 
                  dataKey="density" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                  name="Density (10¹⁹ m⁻³)"
                />
                <Line 
                  type="monotone" 
                  dataKey="pressure" 
                  stroke="#EC4899" 
                  strokeWidth={3}
                  dot={{ fill: '#EC4899', strokeWidth: 2, r: 4 }}
                  name="Pressure (kPa)"
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Geometry Radar Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Tokamak Geometry</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={geometryData}>
                <PolarGrid stroke="#f0f0f0" />
                <PolarAngleAxis dataKey="parameter" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 'dataMax']} tick={false} />
                <Radar
                  name="Current Values"
                  dataKey="value"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Radar
                  name="Maximum Values"
                  dataKey="max"
                  stroke="#E5E7EB"
                  fill="transparent"
                  strokeWidth={1}
                  strokeDasharray="5 5"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Coil Currents */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Poloidal Field Coil Currents</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={coilData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }} 
                />
                <Bar 
                  dataKey="current" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                  name="Current (A)"
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Status Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">System Status</h3>
            <div className="space-y-4">
              {[
                { label: 'Plasma Confinement', value: 'Stable', status: 'good' },
                { label: 'Magnetic Field', value: '2.1 T', status: 'good' },
                { label: 'Plasma Current', value: '200 kA', status: 'good' },
                { label: 'Beta Normalized', value: '1.23%', status: 'warning' },
                { label: 'Safety Factor q95', value: '3.89', status: 'good' },
                { label: 'Disruption Risk', value: 'Low', status: 'good' },
              ].map((item, index) => (
                <div key={item.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">{item.label}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-900 font-semibold">{item.value}</span>
                    <div className={`w-3 h-3 rounded-full ${
                      item.status === 'good' ? 'bg-green-500' :
                      item.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SimulationDashboard