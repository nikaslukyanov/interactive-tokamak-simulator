import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  Download, 
  Upload,
  Zap,
  Target,
  Activity,
  BarChart3,
  Info,
  ChevronRight,
  ChevronLeft
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  ScatterChart,
  Scatter
} from 'recharts'

const TokamakConfiguration = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [plasmaParams, setPlasmaParams] = useState({
    majorRadius: 4.5,
    minorRadius: 1.2,
    elongation: 1.4,
    triangularity: -0.5
  })

  // Coil coordinates (8 coils as shown in the interface)
  const [coilCoordinates, setCoilCoordinates] = useState([
    { id: 1, r: 3.2, z: 1.8, current: 850 },
    { id: 2, r: 3.8, z: 1.5, current: 920 },
    { id: 3, r: 4.2, z: 1.0, current: 780 },
    { id: 4, r: 4.5, z: 0.5, current: 1050 },
    { id: 5, r: 4.5, z: -0.5, current: 890 },
    { id: 6, r: 4.2, z: -1.0, current: 960 },
    { id: 7, r: 3.8, z: -1.5, current: 820 },
    { id: 8, r: 3.2, z: -1.8, current: 1100 }
  ])

  // Wall coordinates (vacuum vessel boundary)
  const [wallCoordinates, setWallCoordinates] = useState([
    { id: 1, r: 2.8, z: 2.2 },
    { id: 2, r: 3.0, z: 2.0 },
    { id: 3, r: 5.2, z: 2.0 },
    { id: 4, r: 5.5, z: 1.5 },
    { id: 5, r: 5.5, z: -1.5 },
    { id: 6, r: 5.2, z: -2.0 },
    { id: 7, r: 3.0, z: -2.0 },
    { id: 8, r: 2.8, z: -2.2 }
  ])

  // Simulation data for evolution plots
  const [evolutionData, setEvolutionData] = useState([
    { time: 0.0, displacement: 0.001, growth: 0.0 },
    { time: 0.5, displacement: 0.002, growth: 0.1 },
    { time: 1.0, displacement: 0.005, growth: 0.3 },
    { time: 1.5, displacement: 0.012, growth: 0.8 },
    { time: 2.0, displacement: 0.028, growth: 2.1 },
    { time: 2.5, displacement: 0.065, growth: 5.2 }
  ])

  // Plasma profiles data
  const plasmaProfiles = [
    { position: 0.0, temperature: 12.5, density: 2.8, pressure: 35.0 },
    { position: 0.2, temperature: 11.8, density: 2.6, pressure: 30.7 },
    { position: 0.4, temperature: 10.2, density: 2.2, pressure: 22.4 },
    { position: 0.6, temperature: 7.8, density: 1.8, pressure: 14.0 },
    { position: 0.8, temperature: 4.5, density: 1.2, pressure: 5.4 },
    { position: 1.0, temperature: 1.2, density: 0.4, pressure: 0.5 }
  ]

  // Coil current data for bar chart
  const coilCurrentData = coilCoordinates.map(coil => ({
    name: `PF${coil.id.toString().padStart(2, '0')}`,
    current: coil.current,
    power: Math.round(coil.current * coil.current / 10000)
  }))

  const handleSimulationToggle = () => {
    setIsRunning(!isRunning)
  }

  const resetSimulation = () => {
    setIsRunning(false)
    setCurrentTime(0)
  }

  const updatePlasmaParam = (param: string, value: number) => {
    setPlasmaParams(prev => ({
      ...prev,
      [param]: value
    }))
  }

  const updateCoilCurrent = (coilId: number, current: number) => {
    setCoilCoordinates(prev => 
      prev.map(coil => 
        coil.id === coilId ? { ...coil, current } : coil
      )
    )
  }

  // Simulate time evolution
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev + 0.1)
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold gradient-text mb-2">Custom Tokamak Configuration</h1>
          <p className="text-gray-600">Interactive plasma simulation and control interface</p>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Tokamak Visualization */}
          <div className="xl:col-span-1 space-y-6">
            {/* Custom Tokamak Visualization */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Custom Tokamak</h3>
              <div className="relative bg-gray-50 rounded-lg p-4 h-80">
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  {/* Vacuum vessel (wall) */}
                  <path
                    d="M 80 50 L 320 50 L 340 80 L 340 220 L 320 250 L 80 250 L 60 220 L 60 80 Z"
                    fill="none"
                    stroke="black"
                    strokeWidth="3"
                  />
                  
                  {/* Plasma boundary (blue dots) */}
                  {Array.from({ length: 20 }, (_, i) => {
                    const angle = (i / 20) * 2 * Math.PI
                    const r = 60 + 20 * Math.cos(2 * angle) // Elongated shape
                    const x = 200 + r * Math.cos(angle)
                    const y = 150 + r * 0.7 * Math.sin(angle) // Elongation factor
                    return (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="4"
                        fill="#3B82F6"
                      />
                    )
                  })}
                  
                  {/* Coils (red dots) */}
                  {coilCoordinates.map((coil, index) => {
                    const x = 50 + (coil.r / 6) * 300
                    const y = 150 - (coil.z / 3) * 100
                    return (
                      <circle
                        key={coil.id}
                        cx={x}
                        cy={y}
                        r="6"
                        fill="#EF4444"
                        className="cursor-pointer hover:fill-red-600"
                      />
                    )
                  })}
                  
                  {/* Legend */}
                  <g transform="translate(20, 20)">
                    <circle cx="10" cy="5" r="4" fill="#EF4444" />
                    <text x="20" y="9" fontSize="12" fill="#666">the red (coils)</text>
                    <rect x="5" y="15" width="10" height="3" fill="black" />
                    <text x="20" y="19" fontSize="12" fill="#666">the black (wall)</text>
                    <circle cx="10" cy="25" r="4" fill="#3B82F6" />
                    <text x="20" y="29" fontSize="12" fill="#666">the blue (plasma)</text>
                  </g>
                </svg>
              </div>
            </motion.div>

            {/* Plasma Shape Controls */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Plasma Shape</h3>
              <div className="space-y-4">
                {[
                  { label: 'Major Radius', key: 'majorRadius', min: 3.0, max: 6.0, step: 0.1, unit: 'm' },
                  { label: 'Minor Radius', key: 'minorRadius', min: 0.8, max: 2.0, step: 0.1, unit: 'm' },
                  { label: 'Elongation', key: 'elongation', min: 1.0, max: 2.0, step: 0.1, unit: '' },
                  { label: 'Triangularity', key: 'triangularity', min: -1.0, max: 1.0, step: 0.1, unit: '' }
                ].map((param) => (
                  <div key={param.key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium text-gray-700">{param.label}</label>
                      <span className="text-sm text-gray-600">
                        {plasmaParams[param.key as keyof typeof plasmaParams].toFixed(1)}{param.unit}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={param.min}
                      max={param.max}
                      step={param.step}
                      value={plasmaParams[param.key as keyof typeof plasmaParams]}
                      onChange={(e) => updatePlasmaParam(param.key, parseFloat(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Coordinate Input Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Coil Coordinates */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Coil Coordinates</h3>
                <div className="space-y-2 text-sm">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Coordinate {i + 1}</span>
                      <span className="text-gray-600">Coordinate {i + 2}</span>
                    </div>
                  )).slice(0, 4)}
                </div>
              </motion.div>

              {/* Wall Coordinates */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Wall Coordinates</h3>
                <div className="space-y-2 text-sm">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div key={i} className="grid grid-cols-2 gap-2">
                      <span className="text-gray-600">Coordinate {i + 1}</span>
                      <span className="text-gray-600">Coordinate {i + 2}</span>
                    </div>
                  )).slice(0, 4)}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Middle Column - Main Visualization */}
          <div className="xl:col-span-1 space-y-6">
            {/* VDE Evolution Plot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">VDE Evolution</h3>
                <span className="text-sm text-gray-600">{currentTime.toFixed(1)} ms</span>
              </div>
              
              {/* Main tokamak cross-section visualization */}
              <div className="bg-gray-50 rounded-lg p-4 h-80 mb-4">
                <svg viewBox="0 0 500 400" className="w-full h-full">
                  {/* Vacuum vessel boundary */}
                  <path
                    d="M 100 80 L 400 80 L 420 100 L 420 300 L 400 320 L 100 320 L 80 300 L 80 100 Z"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                  />
                  
                  {/* Plasma flux surfaces */}
                  {Array.from({ length: 8 }, (_, i) => {
                    const scale = 0.9 - i * 0.1
                    const color = i === 0 ? '#EF4444' : i < 3 ? '#F97316' : '#3B82F6'
                    return (
                      <ellipse
                        key={i}
                        cx="250"
                        cy="200"
                        rx={80 * scale}
                        ry={60 * scale}
                        fill="none"
                        stroke={color}
                        strokeWidth="1.5"
                      />
                    )
                  })}
                  
                  {/* Coil positions */}
                  {coilCoordinates.map((coil) => {
                    const x = 100 + (coil.r / 6) * 300
                    const y = 200 - (coil.z / 3) * 120
                    return (
                      <rect
                        key={coil.id}
                        x={x - 8}
                        y={y - 8}
                        width="16"
                        height="16"
                        fill="#666"
                        rx="2"
                      />
                    )
                  })}
                  
                  {/* X-points */}
                  <circle cx="250" cy="140" r="3" fill="black" />
                  <circle cx="250" cy="260" r="3" fill="black" />
                </svg>
              </div>

              {/* Control buttons */}
              <div className="flex items-center justify-center space-x-4">
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
                  <span>{isRunning ? 'Pause' : 'Run'} Simulation</span>
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
            </motion.div>
          </div>

          {/* Right Column - Analysis Panels */}
          <div className="xl:col-span-1 space-y-6">
            {/* Info Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Info className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-bold text-gray-900">Info</h3>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-xs h-32 overflow-y-auto">
                <div>Starting non-linear GS solver</div>
                <div>     1  2.3289E+00  1.4875E+00  6.3391E-03</div>
                <div>     2  2.5451E+00  1.5358E+00  1.4525E-03</div>
                <div>     3  2.6170E+00  1.5572E+00  4.1092E-04</div>
                <div>Convergence achieved: 1.2E-06</div>
                <div className="text-yellow-400">run_tokamaker_get_stat</div>
              </div>
              <div className="flex justify-center mt-4 space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-blue-600">{i}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Analysis Charts */}
            <div className="grid grid-cols-1 gap-4">
              {/* Initial Equilibrium */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-2xl p-4 shadow-lg"
              >
                <h4 className="text-sm font-bold text-gray-900 mb-2">Initial Equilibrium</h4>
                <div className="h-24 bg-gray-50 rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 120 80" className="w-full h-full">
                    <ellipse cx="60" cy="40" rx="30" ry="20" fill="none" stroke="#3B82F6" strokeWidth="1" />
                    <ellipse cx="60" cy="40" rx="20" ry="13" fill="none" stroke="#EF4444" strokeWidth="1" />
                    <ellipse cx="60" cy="40" rx="10" ry="7" fill="none" stroke="#F97316" strokeWidth="1" />
                    {/* Coil positions */}
                    <rect x="20" y="15" width="4" height="4" fill="#666" />
                    <rect x="96" y="15" width="4" height="4" fill="#666" />
                    <rect x="20" y="61" width="4" height="4" fill="#666" />
                    <rect x="96" y="61" width="4" height="4" fill="#666" />
                  </svg>
                </div>
              </motion.div>

              {/* Coil Currents */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-white rounded-2xl p-4 shadow-lg"
              >
                <h4 className="text-sm font-bold text-gray-900 mb-2">Coil Currents</h4>
                <ResponsiveContainer width="100%" height={100}>
                  <BarChart data={coilCurrentData.slice(0, 4)}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Bar dataKey="current" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Plasma Profiles */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-white rounded-2xl p-4 shadow-lg"
              >
                <h4 className="text-sm font-bold text-gray-900 mb-2">Plasma Profiles</h4>
                <ResponsiveContainer width="100%" height={100}>
                  <LineChart data={plasmaProfiles}>
                    <XAxis dataKey="position" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Line type="monotone" dataKey="temperature" stroke="#EF4444" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="density" stroke="#3B82F6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TokamakConfiguration