'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

const menuItems = [
  { icon: '📊', label: 'Dashboard', id: 'dashboard' },
  { icon: '🐾', label: 'Predictions', id: 'predictions' },
  { icon: '📈', label: 'Analytics', id: 'analytics' },
  { icon: '📋', label: 'Reports', id: 'reports' },
  { icon: '⚙️', label: 'Settings', id: 'settings' },
];

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  userEmail?: string;
  onLogout?: () => void;
}

export default function Sidebar({ activeSection, onNavigate, userEmail, onLogout }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } h-screen bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 flex flex-col transition-all duration-300 fixed left-0 top-0 z-40 hidden lg:flex`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                PV
              </div>
              <div>
                <h1 className="font-bold text-gray-900">PawVision</h1>
                <p className="text-xs text-gray-500">AI Dashboard</p>
              </div>
            </motion.div>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-gray-200 rounded-lg transition"
          >
            {collapsed ? '→' : '←'}
          </motion.button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ x: 5 }}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              activeSection === item.id
                ? 'bg-blue-100 text-blue-600 font-semibold'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </motion.button>
        ))}
      </nav>

      {/* User Info */}
      {userEmail && !collapsed && (
        <div className="p-4 border-t border-gray-200 space-y-3">
          <div className="px-3 py-2 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 font-semibold">Logged in as</p>
            <p className="text-xs text-gray-900 truncate font-medium">{userEmail}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold text-sm"
          >
            Sign Out
          </motion.button>
        </div>
      )}

      {/* Footer - only shows Sign Out when logged in */}
      {!userEmail && (
        <div className="p-4 border-t border-gray-200">
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold text-sm"
            >
              {collapsed ? '↗️' : 'Sign In'}
            </motion.button>
          </Link>
        </div>
      )}
    </motion.aside>
  );
}
