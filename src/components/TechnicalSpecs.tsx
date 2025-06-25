import React from 'react'
import { motion } from 'framer-motion'
import { 
  Cpu, 
  Database, 
  Zap, 
  Target, 
  Settings, 
  BarChart3,
  Code,
  GitBranch
} from 'lucide-react'

const TechnicalSpecs = () => {
  const specifications = [
    {
      category: "Plasma Parameters",
      icon: Zap,
      specs: [
        { name: "Major Radius", value: "4.55 m", description: "Primary tokamak dimension" },
        { name: "Minor Radius", value: "1.2 m", description: "Plasma cross-section radius" },
        { name: "Elongation", value: "1.4", description: "Vertical plasma stretching" },
        { name: "Triangularity", value: "-0.5", description: "Negative triangulation configuration" },
        { name: "Plasma Current", value: "200 kA", description: "Target toroidal current" },
        { name: "Toroidal Field", value: "2.1 T", description: "Magnetic confinement field" }
      ]
    },
    {
      category: "Computational Mesh",
      icon: Database,
      specs: [
        { name: "Plasma Domain", value: "High Resolution", description: "Fine mesh for accurate equilibrium" },
        { name: "Coil Regions", value: "Medium Resolution", description: "Optimized for field calculations" },
        { name: "Vacuum Vessel", value: "Structured Mesh", description: "Boundary-fitted geometry" },
        { name: "Vacuum Domain", value: "Coarse Resolution", description: "Efficient far-field computation" },
        { name: "Element Order", value: "2-4", description: "Configurable finite element order" },
        { name: "Mesh Adaptation", value: "Automatic", description: "Dynamic refinement capability" }
      ]
    },
    {
      category: "Coil System",
      icon: Target,
      specs: [
        { name: "PF Coils", value: "8 Coils", description: "Poloidal field coil configuration" },
        { name: "Current Limit", value: "1 kA/turn", description: "Maximum coil current density" },
        { name: "Positioning", value: "(R,Z) Coordinates", description: "Precise geometric placement" },
        { name: "Optimization", value: "Regularized", description: "Current amplitude minimization" },
        { name: "Constraints", value: "Geometric", description: "Outside vacuum vessel validation" },
        { name: "Control", value: "Real-time", description: "Dynamic current adjustment" }
      ]
    },
    {
      category: "Software Stack",
      icon: Code,
      specs: [
        { name: "Core Engine", value: "OpenFUSIONToolkit", description: "TokaMaker Grad-Shafranov solver" },
        { name: "Language", value: "Python 3.x", description: "Scientific computing ecosystem" },
        { name: "Visualization", value: "Matplotlib", description: "Publication-quality plots" },
        { name: "Data Format", value: "HDF5", description: "Efficient scientific data storage" },
        { name: "Notebooks", value: "Jupyter", description: "Interactive development environment" },
        { name: "Version Control", value: "Git", description: "Collaborative development" }
      ]
    }
  ]

  const capabilities = [
    {
      title: "Equilibrium Solving",
      description: "Advanced Grad-Shafranov equation solving with iterative convergence",
      features: ["Non-linear solver", "Convergence tolerance 10⁻⁶", "Automatic mesh refinement"]
    },
    {
      title: "Stability Analysis",
      description: "Linear and nonlinear plasma stability assessment",
      features: ["Vertical displacement events", "Growth rate calculations", "Mode structure analysis"]
    },
    {
      title: "Shape Optimization",
      description: "Plasma boundary optimization with isoflux constraints",
      features: ["30+ boundary points", "X-point positioning", "Divertor configuration"]
    },
    {
      title: "Real-time Monitoring",
      description: "Live parameter tracking and visualization",
      features: ["Parameter evolution", "Coil current monitoring", "Disruption prediction"]
    }
  ]

  return (
    <section id="technical" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Technical Specifications
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive technical details of the AOE TokaMaker simulation toolkit, 
            built on industry-standard plasma physics frameworks
          </p>
        </motion.div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {specifications.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-plasma-500 rounded-xl flex items-center justify-center">
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{category.category}</h3>
              </div>
              
              <div className="space-y-4">
                {category.specs.map((spec, specIndex) => (
                  <motion.div
                    key={spec.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (specIndex * 0.05) }}
                    viewport={{ once: true }}
                    className="bg-white rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-900">{spec.name}</span>
                      <span className="text-plasma-600 font-bold">{spec.value}</span>
                    </div>
                    <p className="text-sm text-gray-600">{spec.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Capabilities Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Core Capabilities
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <h4 className="text-xl font-bold text-gray-900 mb-3">{capability.title}</h4>
                <p className="text-gray-600 mb-4">{capability.description}</p>
                <ul className="space-y-2">
                  {capability.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-plasma-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-plasma-500 to-fusion-500 rounded-3xl p-8 md:p-12 text-white"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Performance Metrics</h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Optimized for high-performance plasma simulation with efficient computational algorithms
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { metric: "Convergence", value: "10⁻⁶", unit: "tolerance" },
              { metric: "Mesh Elements", value: "10K+", unit: "adaptive" },
              { metric: "Time Step", value: "μs", unit: "resolution" },
              { metric: "Iterations", value: "<20", unit: "typical" }
            ].map((item, index) => (
              <motion.div
                key={item.metric}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl font-bold mb-2">{item.value}</div>
                <div className="text-sm opacity-80 mb-1">{item.metric}</div>
                <div className="text-xs opacity-60">{item.unit}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TechnicalSpecs