'use client';

import { motion } from 'framer-motion';

interface Prediction {
  breed: string;
  confidence: number;
  type: 'dog' | 'cat';
  image: string;
  timestamp: string;
}

interface RecentPredictionsProps {
  predictions: Prediction[];
}

export default function RecentPredictions({ predictions }: RecentPredictionsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const getBreedEmoji = (type: string) => {
    return type === 'dog' ? '🐕' : '🐱';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-50';
    if (confidence >= 80) return 'text-blue-600 bg-blue-50';
    return 'text-yellow-600 bg-yellow-50';
  };

  const displayPredictions = predictions.slice(0, 10);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 p-6 shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Predictions</h2>

      {displayPredictions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-5xl mb-4">📊</p>
          <p className="text-gray-500">No predictions yet. Upload an image to get started!</p>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="overflow-x-auto"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Breed</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Type</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Confidence</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-900">Time</th>
              </tr>
            </thead>
            <tbody>
              {displayPredictions.map((pred, idx) => (
                <motion.tr
                  key={idx}
                  variants={rowVariants}
                  whileHover={{ backgroundColor: '#F9FAFB' }}
                  className="border-b border-gray-100 transition hover:bg-gray-50"
                >
                  <td className="py-4 px-4">
                    <span className="font-semibold text-gray-900">
                      {getBreedEmoji(pred.type)} {pred.breed}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      {pred.type === 'dog' ? 'Dog' : 'Cat'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-bold px-3 py-1 rounded-full ${getConfidenceColor(pred.confidence)}`}>
                      {pred.confidence}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600 text-xs">{pred.timestamp}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {displayPredictions.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <p className="text-sm text-gray-600">
                Showing {displayPredictions.length} of {predictions.length} predictions
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

