'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Prediction {
  breed: string;
  confidence: number;
  type: 'dog' | 'cat';
  image: string;
  timestamp: string;
}

interface ReportsProps {
  predictions: Prediction[];
}

export default function Reports({ predictions }: ReportsProps) {
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null>(null);

  const generateReport = (prediction: Prediction) => {
    const reportHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>PawVision AI Report - ${prediction.breed}</title>
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
          .header p {
            margin: 0;
            opacity: 0.9;
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
                <img src="${prediction.image}" alt="${prediction.breed}">
              </div>
            </div>

            <div class="section">
              <div class="section-title">Detection Results</div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Detected Breed</div>
                  <div class="info-value">${prediction.breed}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Pet Type</div>
                  <div class="info-value">
                    <span class="badge ${prediction.type === 'dog' ? 'badge-dog' : 'badge-cat'}">
                      ${prediction.type === 'dog' ? '🐕 Dog' : '🐱 Cat'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Confidence Score</div>
              <div class="info-item">
                <div class="info-label">AI Confidence Level</div>
                <div class="info-value">${prediction.confidence}%</div>
                <div class="confidence-bar">
                  <div class="confidence-fill" style="width: ${prediction.confidence}%">
                    ${prediction.confidence}%
                  </div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Analysis Details</div>
              <div class="info-grid">
                <div class="info-item">
                  <div class="info-label">Analysis Date & Time</div>
                  <div class="info-value">${prediction.timestamp}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Model Version</div>
                  <div class="info-value">2.1</div>
                </div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Quick Facts</div>
              <ul style="margin: 0; padding-left: 20px; color: #4b5563; line-height: 1.8;">
                <li>This detection was performed using advanced AI models trained on thousands of pet images</li>
                <li>The confidence score indicates how certain the AI is about this breed identification</li>
                <li>Higher confidence scores (90%+) indicate more reliable predictions</li>
                <li>For animals that don't match common breeds, confidence may be lower</li>
              </ul>
            </div>
          </div>

          <div class="footer">
            <p>Generated by PawVision AI • ${new Date().toLocaleString()} • www.pawvision.ai</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create blob and download
    const blob = new Blob([reportHTML], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PawVision_Report_${prediction.breed}_${Date.now()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Prediction Reports</h2>
        <p className="text-gray-600">Generate and download detailed analysis reports for each prediction</p>
      </div>

      {predictions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 p-12 shadow-lg text-center"
        >
          <p className="text-5xl mb-4">📋</p>
          <p className="text-gray-600 text-lg">No predictions yet. Upload images to generate reports!</p>
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-4"
        >
          {predictions.map((pred, idx) => (
            <motion.div
              key={idx}
              variants={rowVariants}
              whileHover={{ y: -5, shadow: 'lg' }}
              className="bg-gradient-to-br from-white via-blue-50 to-white rounded-2xl border border-gray-200 p-6 shadow-lg transition-all hover:shadow-xl"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                {/* Prediction Info */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {pred.type === 'dog' ? '🐕' : '🐱'}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{pred.breed}</h3>
                      <p className="text-sm text-gray-600">
                        {pred.type === 'dog' ? 'Dog' : 'Cat'} • {pred.timestamp}
                      </p>
                    </div>
                  </div>

                  {/* Confidence Badge */}
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex-1 max-w-xs bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pred.confidence}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      />
                    </div>
                    <span className="text-sm font-bold text-gray-900 whitespace-nowrap">
                      {pred.confidence}%
                    </span>
                  </div>
                </div>

                {/* Thumbnail */}
                <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-300 bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <img
                    src={pred.image}
                    alt={pred.breed}
                    className="w-full h-full object-contain p-1"
                  />
                </div>

                {/* Download Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => generateReport(pred)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition whitespace-nowrap"
                >
                  📥 Download Report
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
