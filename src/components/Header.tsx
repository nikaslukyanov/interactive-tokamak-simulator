import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Atom, Menu, X, Github, Mail } from 'lucide-react'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Features', href: '#features' },
    { name: 'Simulation', href: '#simulation' },
    { name: 'Technical', href: '#technical' },
    { name: 'Examples', href: '#examples' },
    { name: 'Configuration', href: '#configuration' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <Atom className="h-8 w-8 text-plasma-600" />
              <div className="absolute inset-0 animate-spin-slow">
                <div className="h-8 w-8 border-2 border-transparent border-t-fusion-500 rounded-full"></div>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">AOE TokaMaker</h1>
              <p className="text-xs text-gray-600 -mt-1">Plasma Simulation Toolkit</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-plasma-600 font-medium transition-colors duration-200"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {item.name}
              </motion.a>
            ))}
            <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-gray-300">
              <motion.a
                href="mailto:nl2951@columbia.edu"
                className="text-gray-600 hover:text-plasma-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-600 hover:text-plasma-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="h-5 w-5" />
              </motion.a>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? 'auto' : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md border-t border-gray-200"
        >
          <div className="py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-2 text-gray-700 hover:text-plasma-600 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-200">
              <a
                href="mailto:nl2951@columbia.edu"
                className="text-gray-600 hover:text-plasma-600 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-plasma-600 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  )
}

export default Header