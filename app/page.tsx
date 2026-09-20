'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import UploadSection from '@/components/UploadSection';
import ResultCard from '@/components/ResultCard';
import StatisticsCards from '@/components/StatisticsCards';
import Analytics from '@/components/Analytics';
import RecentPredictions from '@/components/RecentPredictions';
import Reports from '@/components/Reports';

interface Prediction {
  breed: string;
  confidence: number;
  type: 'dog' | 'cat';
  image: string;
  timestamp: string;
}

interface User {
  email: string;
  name: string;
}

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [currentResult, setCurrentResult] = useState<Prediction | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('dashboard');

  // Check authentication on mount
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const userData = JSON.parse(stored);
        setUser(userData);
      } catch (error) {
        localStorage.removeItem('user');
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
    setLoading(false);
  }, [router]);

  // Redirect if not authenticated
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
            PV
          </div>
          <p className="text-gray-600 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  const handlePrediction = (prediction: Prediction) => {
    setCurrentResult(prediction);
    setPredictions([prediction, ...predictions]);
  };

  const handleImageUpload = (image: string) => {
    setUploadedImage(image);
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
  };

  const handleNewPrediction = () => {
    setCurrentResult(null);
    setUploadedImage(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  // Dashboard Section
  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Statistics Cards */}
      <StatisticsCards totalPredictions={predictions.length} />

      {/* Main Layout - Upload and Result */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <UploadSection
          onPrediction={handlePrediction}
          onImageUpload={handleImageUpload}
        />

        {/* Result Section */}
        {currentResult ? (
          <ResultCard
            breed={currentResult.breed}
            confidence={currentResult.confidence}
            type={currentResult.type}
            image={currentResult.image}
            onNewPrediction={handleNewPrediction}
          />
        ) : (
          <div className="bg-gradient-to-br from-white via-blue-50 to-white rounded-2xl border border-gray-200 p-8 shadow-lg flex items-center justify-center min-h-96">
            <div className="text-center space-y-4">
              <p className="text-6xl">🎯</p>
              <h3 className="text-2xl font-bold text-gray-900">No Results Yet</h3>
              <p className="text-gray-600">
                Upload an image on the left to see the breed prediction results here
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Recent Predictions Table */}
      <RecentPredictions predictions={predictions} />
    </div>
  );

  // Analytics Section
  const renderAnalytics = () => (
    <div className="space-y-8">
      <StatisticsCards totalPredictions={predictions.length} />
      <Analytics predictions={predictions} />
    </div>
  );

  // Predictions Section
  const renderPredictions = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-white via-blue-50 to-white rounded-2xl border border-gray-200 p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Prediction History</h2>
        {predictions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-5xl mb-4">📝</p>
            <p className="text-gray-500 text-lg">No predictions yet. Upload an image to get started!</p>
          </div>
        ) : (
          <RecentPredictions predictions={predictions} />
        )}
      </div>
    </div>
  );

  // Reports Section
  const renderReports = () => <Reports predictions={predictions} />;

  // Settings Section
  const renderSettings = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-white via-blue-50 to-white rounded-2xl border border-gray-200 p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Settings & Preferences</h2>
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Information</h3>
            <p className="text-gray-600 mb-4">Manage your account details</p>
            <div className="space-y-3">
              <div className="px-4 py-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 font-semibold">Email</p>
                <p className="text-gray-900 font-medium">{user.email}</p>
              </div>
              <div className="px-4 py-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 font-semibold">Name</p>
                <p className="text-gray-900 font-medium">{user.name}</p>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">General Settings</h3>
            <p className="text-gray-600 mb-4">Manage your preferences</p>
            <label className="flex items-center gap-3 mb-3">
              <input type="checkbox" defaultChecked className="w-5 h-5" />
              <span className="text-gray-700">Enable notifications</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-5 h-5" />
              <span className="text-gray-700">Keep prediction history</span>
            </label>
          </div>

          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy</h3>
            <p className="text-gray-600 mb-4">Control how your data is used</p>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-5 h-5" />
              <span className="text-gray-700">Allow data usage for AI model improvement</span>
            </label>
          </div>

          <div className="pt-6 flex gap-3">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold">
              Save Settings
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        userEmail={user.email}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col">
        <Header />

        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {activeSection === 'dashboard' && renderDashboard()}
            {activeSection === 'predictions' && renderPredictions()}
            {activeSection === 'analytics' && renderAnalytics()}
            {activeSection === 'reports' && renderReports()}
            {activeSection === 'settings' && renderSettings()}
          </div>
        </main>
      </div>

      {/* Mobile Responsive Adjustment */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .lg\:ml-64 {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
}
