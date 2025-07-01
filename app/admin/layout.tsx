'use client';

import { useState } from 'react';
import { toast, Toaster } from 'sonner';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState('');

  // Authentication handler
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminKey === 'laine-admin-2025') {
      setIsAuthenticated(true);
      toast.success('Authentication successful');
    } else {
      toast.error('Invalid admin key');
    }
  };

  // Sign out handler
  const handleSignOut = () => {
    setAdminKey('');
    setIsAuthenticated(false);
    toast.info('You have been signed out.');
  };

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Toaster position="top-center" richColors />
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h1>
            <p className="text-gray-600">Enter admin key to access the admin panel</p>
          </div>
          
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label htmlFor="adminKey" className="block text-sm font-medium text-gray-700 mb-1">
                Admin Key
              </label>
              <input
                type="password"
                id="adminKey"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#09474C] focus:border-transparent"
                placeholder="Enter admin key"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-[#09474C] text-white py-2 px-4 rounded-md hover:bg-[#083c40] transition-colors duration-200 font-medium"
            >
              Access Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // If authenticated, show main admin layout
  return (
    <div className="min-h-screen flex">
      <Toaster position="top-center" richColors />
      <Sidebar onSignOut={handleSignOut} />
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
} 