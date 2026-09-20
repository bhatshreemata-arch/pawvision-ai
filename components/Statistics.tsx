'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Statistics() {
  const stats = [
    { label: 'AI Models', value: '50+', icon: '🤖' },
    { label: 'Accuracy Rate', value: '99.2%', icon: '🎯' },
    { label: 'Breeds Recognized', value: '200+', icon: '🐾' },
    { label: 'Active Users', value: '10K+', icon: '👥' },
  ];

  const [counts, setCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const intervals = stats.map((stat, index) => {
      const targetValue = parseInt(stat.value.replace(/\D/g, ''));
      let current = 0;
      const increment = Math.ceil(targetValue / 50);

      return setInterval(() => {
        current += increment;
        if (current >= targetValue) {
          current = targetValue;
          clearInterval(intervals[index]);
        }
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = current;
          return newCounts;
        });
      }, 30);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            By the Numbers
          </h2>
          <p className="text-gray-400 text-lg">Trusted by thousands of pet lovers worldwide</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative"
            >
              {/* Glassmorphism Card */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:border-purple-500/50 transition-all duration-300">
                {/* Icon */}
                <div className="text-4xl mb-4">{stat.icon}</div>

                {/* Value */}
                <div className="text-4xl font-bold text-white mb-2">
                  {counts[index]}{stat.value.includes('%') ? '%' : stat.value.replace(/\d/g, '')}
                </div>

                {/* Label */}
                <p className="text-gray-400 text-sm font-semibold">{stat.label}</p>

                {/* Bottom Line */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-b-xl w-0 group-hover:w-full transition-all duration-300"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
