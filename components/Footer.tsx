'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  const footerLinks = {
    Product: ['Features', 'Pricing', 'Security', 'API Docs'],
    Company: ['About', 'Blog', 'Careers', 'Contact'],
    Legal: ['Privacy', 'Terms', 'License', 'Cookies'],
    Social: ['Twitter', 'GitHub', 'LinkedIn', 'Discord'],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="relative overflow-hidden border-t border-purple-500/20 bg-black/50 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">PV</span>
              </div>
              <span className="text-lg font-bold text-white">PawVision</span>
            </div>
            <p className="text-gray-400 text-sm">
              Advanced AI for pet recognition and health analysis.
            </p>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.div key={category} variants={itemVariants}>
              <h4 className="text-white font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5 }}
                      className="text-gray-400 hover:text-purple-400 text-sm transition-colors"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent mb-8"></div>

        {/* Bottom Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between"
        >
          {/* Copyright */}
          <motion.p variants={itemVariants} className="text-gray-400 text-sm text-center md:text-left">
            © 2026 PawVision AI. All rights reserved.
          </motion.p>

          {/* Social Icons */}
          <motion.div variants={itemVariants} className="flex items-center space-x-4 mt-6 md:mt-0">
            {['Twitter', 'GitHub', 'LinkedIn'].map((social) => (
              <motion.a
                key={social}
                href="#"
                whileHover={{ scale: 1.2 }}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-500/20 hover:bg-purple-500/40 text-purple-300 transition-colors"
              >
                {social[0]}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full filter blur-3xl"></div>
      </div>
    </footer>
  );
}
