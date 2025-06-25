import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  Download, 
  ExternalLink, 
  FileText, 
  BarChart3, 
  Zap,
  Target,
  Activity,
  ChevronRight,
  Calendar,
  User
} from 'lucide-react'

const Examples = () => {
  const [selectedExample, setSelectedExample] = useState(0)

  const examples = [
    {
      id: 'negative-triangulation',
      title: 'Negative Triangulation Tokamak',
      description: 'Complete simulation of a negative triangularity tokamak configuration with detailed plasma equilibrium analysis',
      date: '2024-06-24',
      author: 'Columbia Plasma Physics Lab',
      category: 'Equilibrium Analysis',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Negative triangularity δ = -0.5',
        'Major radius R₀ = 4.55m',
        'Plasma current Ip = 200 kA',
        '8 poloidal field coils',
        'Vacuum vessel optimization',
        'Real-time parameter evolution'
      ],
      outputs: [
        { name: 'Vacuum Vessel Design', file: '01_vacuum_vessel_design.png', type: 'visualization' },
        { name: 'Plasma Profiles', file: '02_plasma_profiles.png', type: 'analysis' },
        { name: 'Initial Equilibrium', file: '03_initial_equilibrium.png', type: 'equilibrium' },
        { name: 'Coil Currents', file: '04_coil_currents.png', type: 'data' },
        { name: 'VDE Evolution', file: '05_vde_evolution.gif', type: 'animation' }
      ],
      metrics: {
        'Convergence': '10⁻⁶',
        'Iterations': '12',
        'Beta Poloidal': '27.0%',
        'Safety Factor': '3.89'
      }
    },
    {
      id: 'vde-analysis',
      title: 'Vertical Displacement Event Study',
      description: 'Comprehensive analysis of vertical displacement events in CUTE tokamak with stability assessment',
      date: '2024-06-20',
      author: 'Jamie Xia',
      category: 'Stability Analysis',
      icon: Activity,
      color: 'from-red-500 to-pink-500',
      features: [
        'Linear stability analysis',
        'Nonlinear growth rates',
        'Beta poloidal scan',
        'Mode structure visualization',
        'Disruption prediction',
        'Time-dependent evolution'
      ],
      outputs: [
        { name: 'Growth Rate Trends', file: 'growth_rates.png', type: 'analysis' },
        { name: 'Linear Eigenmodes', file: 'eigenmodes.png', type: 'visualization' },
        { name: 'Plasma Evolution', file: 'plasma_evolution.png', type: 'time-series' },
        { name: 'Stability Map', file: 'stability_map.png', type: 'analysis' }
      ],
      metrics: {
        'Growth Rate': '-1.2×10⁴ s⁻¹',
        'Beta Range': '1-80%',
        'Time Steps': '30',
        'Modes Analyzed': '10'
      }
    },
    {
      id: 'cute-simulation',
      title: 'CUTE Tokamak Simulation',
      description: 'Standard CUTE tokamak equilibrium calculation with mesh generation and coil optimization',
      date: '2024-06-15',
      author: 'Research Team',
      category: 'General Simulation',
      icon: Zap,
      color: 'from-purple-500 to-indigo-500',
      features: [
        'CUTE geometry specification',
        'Mesh generation and refinement',
        'Coil current optimization',
        'Flux surface calculation',
        'Pressure profile analysis',
        'Magnetic axis determination'
      ],
      outputs: [
        { name: 'Mesh Structure', file: 'mesh_structure.png', type: 'mesh' },
        { name: 'Flux Surfaces', file: 'flux_surfaces.png', type: 'equilibrium' },
        { name: 'Pressure Profiles', file: 'pressure_profiles.png', type: 'profiles' },
        { name: 'Coil Configuration', file: 'coil_config.png', type: 'geometry' }
      ],
      metrics: {
        'Mesh Elements': '15,420',
        'Coil Sets': '28',
        'Flux Surfaces': '20',
        'Aspect Ratio': '3.79'
      }
    }
  ]

  const currentExample = examples[selectedExample]

  return (
    <section id="examples" className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Simulation Examples
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore real simulation results and case studies demonstrating the capabilities 
            of the AOE TokaMaker toolkit in various plasma physics scenarios
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Example Selection */}
          <div className="space-y-4">
            {examples.map((example, index) => (
              <motion.div
                key={example.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 ${
                  selectedExample === index
                    ? 'bg-white shadow-lg ring-2 ring-plasma-500'
                    : 'bg-white/70 hover:bg-white hover:shadow-md'
                }`}
                onClick={() => setSelectedExample(index)}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${example.color} p-3 flex-shrink-0`}>
                    <example.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">{example.title}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{example.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{example.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{example.author}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${
                    selectedExample === index ? 'rotate-90' : ''
                  }`} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Example Details */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedExample}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${currentExample.color} p-6 text-white`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <currentExample.icon className="h-8 w-8" />
                    <div>
                      <h3 className="text-2xl font-bold">{currentExample.title}</h3>
                      <p className="opacity-90">{currentExample.category}</p>
                    </div>
                  </div>
                  <p className="text-lg opacity-90">{currentExample.description}</p>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Key Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {currentExample.features.map((feature, index) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="flex items-center space-x-2"
                        >
                          <div className="w-2 h-2 bg-plasma-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Simulation Metrics</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(currentExample.metrics).map(([key, value], index) => (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="bg-gray-50 rounded-lg p-3 text-center"
                        >
                          <div className="text-lg font-bold text-plasma-600">{value}</div>
                          <div className="text-xs text-gray-600">{key}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Outputs */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Generated Outputs</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentExample.outputs.map((output, index) => (
                        <motion.div
                          key={output.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-plasma-100 rounded-lg flex items-center justify-center">
                              {output.type === 'visualization' && <BarChart3 className="h-4 w-4 text-plasma-600" />}
                              {output.type === 'analysis' && <Activity className="h-4 w-4 text-plasma-600" />}
                              {output.type === 'data' && <FileText className="h-4 w-4 text-plasma-600" />}
                              {output.type === 'animation' && <Play className="h-4 w-4 text-plasma-600" />}
                              {!['visualization', 'analysis', 'data', 'animation'].includes(output.type) && <FileText className="h-4 w-4 text-plasma-600" />}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{output.name}</div>
                              <div className="text-xs text-gray-500 capitalize">{output.type}</div>
                            </div>
                          </div>
                          <motion.button
                            className="p-2 text-gray-400 hover:text-plasma-600 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Download className="h-4 w-4" />
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-4">
                    <motion.button
                      className="flex items-center space-x-2 bg-plasma-500 hover:bg-plasma-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="h-5 w-5" />
                      <span>Run Simulation</span>
                    </motion.button>
                    
                    <motion.button
                      className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="h-5 w-5" />
                      <span>View Notebook</span>
                    </motion.button>
                    
                    <motion.button
                      className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="h-5 w-5" />
                      <span>Download Results</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Examples