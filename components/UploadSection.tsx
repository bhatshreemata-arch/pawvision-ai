'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { detectBreed } from '@/lib/breedDetection';

interface UploadSectionProps {
  onPrediction: (prediction: any) => void;
  onImageUpload: (image: string) => void;
}

export default function UploadSection({ onPrediction, onImageUpload }: UploadSectionProps) {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageData = e.target?.result as string;
      setImage(imageData);
      onImageUpload(imageData);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handlePredict = async () => {
    if (!image || loading) return;
    
    setLoading(true);

    // Simulate API call with realistic delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const prediction = detectBreed(image);
    const predictionData = {
      breed: prediction.breed,
      confidence: prediction.confidence,
      type: prediction.type,
      image: image,
      timestamp: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    onPrediction(predictionData);
    setLoading(false);
  };

  const handleClear = () => {
    setImage(null);
    fileInputRef.current && (fileInputRef.current.value = '');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-white via-blue-50 to-white rounded-2xl border border-gray-200 p-8 shadow-lg hover:shadow-xl transition-shadow"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Pet Image</h2>

      {/* Upload Area */}
      <motion.div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        whileHover={{ scale: 1.02 }}
        className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          className="hidden"
        />

        {!image ? (
          <div className="space-y-4">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl"
            >
              📸
            </motion.div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Drop your pet image here</h3>
              <p className="text-gray-500 text-sm">or click to browse from your computer</p>
            </div>
            <p className="text-xs text-gray-400">JPG, PNG, WebP • Up to 10MB</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-green-600 font-semibold">✓ Image Selected</p>
            <p className="text-sm text-gray-600">Click to change image</p>
          </div>
        )}
      </motion.div>

      {/* Image Preview */}
      {image && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6"
        >
          <p className="text-sm font-semibold text-gray-700 mb-3">Preview</p>
          <div className="relative rounded-xl overflow-hidden border border-gray-300 shadow-md bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center min-h-64">
            <img src={image} alt="Preview" className="w-full h-auto max-h-96 object-contain p-2" />
            {loading && (
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 bg-blue-500/20 flex items-center justify-center"
              >
                <div className="flex flex-col items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-12 h-12 border-3 border-blue-500 border-t-transparent rounded-full"
                  />
                  <span className="text-white font-semibold">Analyzing...</span>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePredict}
          disabled={!image || loading}
          className={`flex-1 py-3 rounded-lg font-semibold transition ${
            image && !loading
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 cursor-pointer'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {loading ? 'Analyzing Pet...' : 'Predict Breed'}
        </motion.button>
        {image && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClear}
            disabled={loading}
            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
          >
            Clear
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
