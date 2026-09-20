'use client';

import { motion } from 'framer-motion';

interface ResultCardProps {
  breed: string;
  confidence: number;
  type: 'dog' | 'cat';
  image: string;
  onNewPrediction?: () => void;
}

export default function ResultCard({ breed, confidence, type, image, onNewPrediction }: ResultCardProps) {
  const getBreedIcon = () => {
    if (type === 'dog') {
      if (breed.includes('Labrador')) return '🐕';
      if (breed.includes('Pug')) return '🐶';
      if (breed.includes('Golden')) return '🐕';
      if (breed.includes('Husky')) return '🐕';
      return '🐕';
    } else {
      if (breed.includes('Persian')) return '😺';
      if (breed.includes('Siamese')) return '🐱';
      if (breed.includes('Bengal')) return '🐱';
      if (breed.includes('British')) return '😸';
      return '🐱';
    }
  };

  const handleNewPrediction = () => {
    onNewPrediction?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-white via-purple-50 to-white rounded-2xl border border-gray-200 p-8 shadow-lg"
    >
      <div className="space-y-6">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative rounded-xl overflow-hidden border border-gray-300 shadow-md bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
        >
          <img src={image} alt={breed} className="w-full h-auto max-h-96 object-contain p-2" />
        </motion.div>

        {/* Result Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Type Badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block w-fit px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg"
          >
            <span className="text-sm font-semibold text-blue-700">
              {type === 'dog' ? '🐕 Dog' : '🐱 Cat'}
            </span>
          </motion.div>

          {/* Breed Name */}
          <div>
            <p className="text-sm text-gray-500 mb-2">Detected Breed</p>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold text-gray-900 flex items-center gap-3"
            >
              {getBreedIcon()} {breed}
            </motion.h2>
          </div>

          {/* Confidence Score */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-gray-200"
          >
            <p className="text-sm text-gray-600 mb-3">Confidence Score</p>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                {confidence}%
              </span>
              <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${confidence}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Info Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200"
          >
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-xs">Analysis Time</p>
              <p className="text-lg font-bold text-gray-900">1.5s</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-xs">Model v</p>
              <p className="text-lg font-bold text-gray-900">2.1</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-600 text-xs">Status</p>
              <p className="text-lg font-bold text-green-600">✓</p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const reportHTML = `
                  <!DOCTYPE html>
                  <html>
                  <head>
                    <meta charset="UTF-8">
                    <title>PawVision AI Report - ${breed}</title>
                    <style>
                      body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        margin: 0;
                        padding: 20px;
                        background: linear-gradient(135deg, #f0f7ff 0%, #e0f2fe 100%);
                      }
                      .container {
                        max-width: 900px;
                        margin: 0 auto;
                        background: white;
                        border-radius: 12px;
                        overflow: hidden;
                        box-shadow: 0 20px 60px rgba(0,0,0,0.1);
                      }
                      .header {
                        background: linear-gradient(135deg, #3b82f6 0%, #a855f7 100%);
                        color: white;
                        padding: 30px;
                        text-align: center;
                      }
                      .header h1 {
                        margin: 0 0 10px 0;
                        font-size: 32px;
                      }
                      .content {
                        padding: 40px;
                      }
                      .section {
                        margin-bottom: 30px;
                      }
                      .section-title {
                        font-size: 18px;
                        font-weight: 600;
                        color: #1f2937;
                        margin-bottom: 15px;
                        padding-bottom: 10px;
                        border-bottom: 2px solid #e5e7eb;
                      }
                      .image-container {
                        text-align: center;
                        margin: 20px 0;
                      }
                      .image-container img {
                        max-width: 100%;
                        height: auto;
                        max-height: 300px;
                        border-radius: 8px;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                      }
                      .info-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 20px;
                        margin: 20px 0;
                      }
                      .info-item {
                        background: #f3f4f6;
                        padding: 15px;
                        border-radius: 8px;
                        border-left: 4px solid #3b82f6;
                      }
                      .info-label {
                        font-size: 12px;
                        color: #6b7280;
                        text-transform: uppercase;
                        font-weight: 600;
                        margin-bottom: 5px;
                      }
                      .info-value {
                        font-size: 18px;
                        color: #1f2937;
                        font-weight: 600;
                      }
                      .confidence-bar {
                        width: 100%;
                        height: 24px;
                        background: #e5e7eb;
                        border-radius: 12px;
                        overflow: hidden;
                        margin-top: 10px;
                      }
                      .confidence-fill {
                        height: 100%;
                        background: linear-gradient(90deg, #3b82f6, #a855f7);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        font-size: 12px;
                        font-weight: 600;
                        width: ${confidence}%;
                      }
                      .footer {
                        background: #f9fafb;
                        padding: 20px 40px;
                        border-top: 1px solid #e5e7eb;
                        text-align: center;
                        font-size: 12px;
                        color: #6b7280;
                      }
                      .badge {
                        display: inline-block;
                        padding: 6px 12px;
                        border-radius: 20px;
                        font-size: 12px;
                        font-weight: 600;
                        margin-right: 10px;
                      }
                      .badge-dog {
                        background: #fef3c7;
                        color: #92400e;
                      }
                      .badge-cat {
                        background: #dbeafe;
                        color: #0c4a6e;
                      }
                    </style>
                  </head>
                  <body>
                    <div class="container">
                      <div class="header">
                        <h1>🐾 PawVision AI Report</h1>
                        <p>Pet Breed Detection Analysis</p>
                      </div>
                      
                      <div class="content">
                        <div class="section">
                          <div class="section-title">Pet Image</div>
                          <div class="image-container">
                            <img src="${image}" alt="${breed}">
                          </div>
                        </div>

                        <div class="section">
                          <div class="section-title">Detection Results</div>
                          <div class="info-grid">
                            <div class="info-item">
                              <div class="info-label">Detected Breed</div>
                              <div class="info-value">${breed}</div>
                            </div>
                            <div class="info-item">
                              <div class="info-label">Pet Type</div>
                              <div class="info-value">
                                <span class="badge ${type === 'dog' ? 'badge-dog' : 'badge-cat'}">
                                  ${type === 'dog' ? '🐕 Dog' : '🐱 Cat'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="section">
                          <div class="section-title">Confidence Score</div>
                          <div class="info-item">
                            <div class="info-label">AI Confidence Level</div>
                            <div class="info-value">${confidence}%</div>
                            <div class="confidence-bar">
                              <div class="confidence-fill"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="footer">
                        <p>Generated by PawVision AI • ${new Date().toLocaleString()} • www.pawvision.ai</p>
                      </div>
                    </div>
                  </body>
                  </html>
                `;
                const blob = new Blob([reportHTML], { type: 'text/html' });
                const url = window.URL.createObjectURL(blob);
                window.open(url, '_blank');
              }}
              className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition"
            >
              View Full Report
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNewPrediction}
              className="flex-1 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              New Prediction
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
