import React from 'react'
import { motion } from 'framer-motion'
import { Atom, Mail, Github, ExternalLink, Heart } from 'lucide-react'

const Footer = () => {
  const links = {
    project: [
      { name: 'Features', href: '#features' },
      { name: 'Simulation', href: '#simulation' },
      { name: 'Technical Specs', href: '#technical' },
      { name: 'Examples', href: '#examples' },
    ],
    resources: [
      { name: 'OpenFUSIONToolkit', href: '#', external: true },
      { name: 'TokaMaker Documentation', href: '#', external: true },
      { name: 'Jupyter Notebooks', href: '#', external: true },
      { name: 'Research Papers', href: '#', external: true },
    ],
    research: [
      { name: 'Columbia Plasma Physics Lab', href: '#', external: true },
      { name: 'Plasma Disruption Studies', href: '#', external: true },
      { name: 'Tokamak Research', href: '#', external: true },
      { name: 'Fusion Energy', href: '#', external: true },
    ]
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <motion.div 
              className="flex items-center space-x-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <Atom className="h-8 w-8 text-plasma-400" />
                <div className="absolute inset-0 animate-spin-slow">
                  <div className="h-8 w-8 border-2 border-transparent border-t-fusion-400 rounded-full"></div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold gradient-text">AOE TokaMaker</h3>
                <p className="text-sm text-gray-400 -mt-1">Plasma Simulation Toolkit</p>
              </div>
            </motion.div>
            
            <motion.p 
              className="text-gray-300 mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Advanced tokamak plasma simulation toolkit for Grad-Shafranov equation solving 
              and plasma equilibrium analysis, built on the OpenFUSIONToolkit.
            </motion.p>
            
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="mailto:nl2951@columbia.edu"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-plasma-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-plasma-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="h-5 w-5" />
              </motion.a>
            </motion.div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4 capitalize">{category}</h4>
              <ul className="space-y-3">
                {items.map((link, index) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-gray-300 hover:text-plasma-400 transition-colors flex items-center space-x-1"
                      whileHover={{ x: 4 }}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                    >
                      <span>{link.name}</span>
                      {link.external && <ExternalLink className="h-3 w-3" />}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 AOE TokaMaker. Built for plasma disruption research.
            </div>
            
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>for fusion energy research</span>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            className="mt-6 text-center text-sm text-gray-500"
          >
            <p>
              Initial AOE TokaMaker and CUTE VDE code provided by{' '}
              <span className="text-plasma-400 font-medium">Jamie Xia</span> at the{' '}
              <span className="text-fusion-400 font-medium">Columbia Plasma Physics Lab</span>.
            </p>
            <p className="mt-2">
              Contributors: <span className="text-plasma-400">Nikas Lukyanov</span> and{' '}
              <span className="text-plasma-400">Matthew Long</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer