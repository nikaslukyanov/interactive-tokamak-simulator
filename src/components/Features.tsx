import React from 'react'
import { motion } from 'framer-motion'
import { 
  Cpu, 
  Zap, 
  Target, 
  BarChart3, 
  Settings, 
  Database,
  Atom,
  Activity,
  GitBranch
} from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Grad-Shafranov Solver",
      description: "Advanced plasma equilibrium calculations using TokaMaker from OpenFUSIONToolkit",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Target,
      title: "Plasma Shaping",
      description: "Precise isoflux boundary point generation for optimal plasma shape definition",
      color: "from-plasma-400 to-plasma-600"
    },
    {
      icon: Settings,
      title: "Configurable Mesh",
      description: "Customizable resolution for plasma, coil, vacuum vessel, and vacuum domains",
      color: "from-gray-400 to-gray-600"
    },
    {
      icon: Atom,
      title: "Geometric Modeling",
      description: "Complete tokamak geometry setup with vacuum vessel specification",
      color: "from-fusion-400 to-fusion-600"
    },
    {
      icon: BarChart3,
      title: "Real-time Visualization",
      description: "Interactive plasma cross-section and magnetic flux surface plotting",
      color: "from-green-400 to-emerald-600"
    },
    {
      icon: Database,
      title: "Output Management",
      description: "Automated timestamped simulation folders for organized result storage",
      color: "from-blue-400 to-indigo-600"
    },
    {
      icon: Cpu,
      title: "Coil Optimization",
      description: "Support for up to 8 poloidal field coils with geometric constraint validation",
      color: "from-purple-400 to-violet-600"
    },
    {
      icon: Activity,
      title: "VDE Analysis",
      description: "Vertical Displacement Event studies and plasma stability analysis",
      color: "from-red-400 to-pink-600"
    },
    {
      icon: GitBranch,
      title: "Research Integration",
      description: "Built for plasma disruption research with Columbia Plasma Physics Lab",
      color: "from-teal-400 to-cyan-600"
    }
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Comprehensive Simulation Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built on the OpenFUSIONToolkit, our platform provides everything needed for 
            advanced tokamak plasma simulation and analysis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 card-hover"
            >
              <div className="relative mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-plasma-600 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Technical Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-plasma-50 to-fusion-50 rounded-3xl p-8 md:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Built for Research Excellence
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Developed in collaboration with the Columbia Plasma Physics Lab for 
              cutting-edge plasma disruption and stability research
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "OpenFUSIONToolkit",
                description: "Built on industry-standard plasma simulation framework",
                icon: "🔬"
              },
              {
                title: "Python Integration",
                description: "Seamless integration with scientific Python ecosystem",
                icon: "🐍"
              },
              {
                title: "Jupyter Notebooks",
                description: "Interactive development and analysis environment",
                icon: "📊"
              },
              {
                title: "Research Ready",
                description: "Designed for academic and industrial research applications",
                icon: "🎓"
              }
            ].map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white rounded-xl p-6 shadow-md"
              >
                <div className="text-3xl mb-3">{highlight.icon}</div>
                <h4 className="font-semibold text-gray-900 mb-2">{highlight.title}</h4>
                <p className="text-sm text-gray-600">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Features