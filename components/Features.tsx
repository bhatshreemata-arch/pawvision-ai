'use client';

import { motion } from 'framer-motion';

export default function Features() {
  const features = [
    {
      icon: '🐕',
      title: 'Breed Recognition',
      description: 'Instantly identify dog breeds with our advanced AI algorithms',
      color: 'from-blue-500 to-purple-500',
    },
    {
      icon: '🧬',
      title: 'Health Analysis',
      description: 'Analyze physical traits and get AI-powered health insights',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Get results in milliseconds with our optimized models',
      color: 'from-pink-500 to-red-500',
    },
    {
      icon: '🔒',
      title: 'Privacy Focused',
      description: 'Your images are processed securely and never stored',
      color: 'from-green-500 to-blue-500',
    },
    {
      icon: '📊',
      title: 'Detailed Reports',
      description: 'Receive comprehensive analysis with actionable recommendations',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: '🌐',
      title: 'Multi-Language',
      description: 'Available in 50+ languages for global accessibility',
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-600/10 rounded-full filter blur-3xl"></div>
      </div>

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
            Powerful Features
          </h2>
          <p className="text-gray-400 text-lg">Everything you need to understand your pet better</p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Background Glow */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-xl blur opacity-0 group-hover:opacity-30 transition-all duration-300`}></div>

              {/* Card */}
              <div className="relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl hover:border-white/30 transition-all duration-300 h-full">
                {/* Icon */}
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>

                {/* Arrow */}
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-6 inline-block text-purple-400 font-bold"
                >
                  →
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
