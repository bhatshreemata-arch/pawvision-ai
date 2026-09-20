'use client';

import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-white via-blue-50 to-white border-b border-gray-200 sticky top-0 z-30"
    >
      <div className="max-w-full px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Pet Breed Detector</h1>
          <p className="text-gray-500 text-sm">Powered by advanced machine learning</p>
        </div>
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-right"
          >
            <p className="text-sm text-gray-600">Status</p>
            <p className="text-lg font-bold text-green-600">✓ Online</p>
          </motion.div>
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:shadow-lg transition">
            AI
          </div>
        </div>
      </div>
    </motion.header>
  );
}
