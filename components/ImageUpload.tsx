'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

export default function ImageUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setIsAnalyzing(true);
      setTimeout(() => setIsAnalyzing(false), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Try PawVision AI
          </h2>
          <p className="text-gray-400 text-lg">Upload an image and discover amazing insights about your pet</p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative p-12 rounded-2xl border-2 border-dashed transition-all duration-300 ${
            isDragging
              ? 'border-purple-400 bg-purple-500/10'
              : 'border-purple-500/30 bg-white/5'
          } backdrop-blur-xl cursor-pointer group hover:border-purple-400`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="hidden"
          />

          {!uploadedImage ? (
            <div className="text-center">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-6"
              >
                <svg
                  className="w-16 h-16 mx-auto text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">Drop your image here</h3>
              <p className="text-gray-400 mb-4">or click to browse from your device</p>
              <p className="text-gray-500 text-sm">Supported formats: JPG, PNG, WebP (Max 10MB)</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Image Preview */}
              <div className="relative rounded-xl overflow-hidden border border-purple-500/30">
                <img
                  src={uploadedImage}
                  alt="Uploaded pet"
                  className="w-full h-64 object-cover"
                />
                {isAnalyzing && (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0"
                  ></motion.div>
                )}
              </div>

              {/* Analysis Status */}
              {isAnalyzing ? (
                <motion.div
                  animate={{ opacity: [0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="flex items-center justify-center space-x-3"
                >
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-purple-400 font-semibold">Analyzing your pet...</span>
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4 space-y-3"
                >
                  <p className="text-green-400 font-semibold">✓ Analysis Complete!</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Breed</p>
                      <p className="text-white font-semibold">Golden Retriever</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Confidence</p>
                      <p className="text-white font-semibold">98.5%</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Health Status</p>
                      <p className="text-white font-semibold">Excellent</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Age Estimate</p>
                      <p className="text-white font-semibold">3-5 years</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Upload Another */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-shadow"
              >
                Upload Another Image
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
