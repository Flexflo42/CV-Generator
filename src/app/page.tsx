'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SunIcon, MoonIcon } from 'lucide-react';

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);

  // Effect for initial setup - runs once on component mount
  useEffect(() => {
    // Check local storage first
    const storedPreference = localStorage.getItem('darkMode');
    
    if (storedPreference !== null) {
      // Use stored preference if available
      setDarkMode(storedPreference === 'true');
    } else {
      // Otherwise use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
      localStorage.setItem('darkMode', String(prefersDark));
    }
  }, []);

  // Effect to apply theme changes whenever darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [darkMode]);

  // Toggle function
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Theme toggle button */}
        <div className="absolute top-4 right-4">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
          </button>
        </div>
        
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            Professional CV Generator
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Create a standout resume in minutes with our AI-powered tools. 
            Perfect for job seekers at any career stage.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">Quick & Easy</h3>
              <p className="text-gray-600 dark:text-gray-400">Generate a professional CV in just a few simple steps</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">ATS-Friendly</h3>
              <p className="text-gray-600 dark:text-gray-400">Optimized formats to pass applicant tracking systems</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">Customizable</h3>
              <p className="text-gray-600 dark:text-gray-400">Tailor your CV to match specific job requirements</p>
            </div>
          </div>
          
          <Link 
            href="/generator" 
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white text-lg font-medium px-8 py-3 rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Create Your CV Now
          </Link>
          
          <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
            No sign-up required • Free to use • Download in multiple formats
          </p>
        </div>
      </div>
      
      <footer className="bg-gray-800 dark:bg-gray-900 text-gray-300 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">Helping professionals showcase their skills since 2025</p>
          <div className="flex justify-center space-x-6">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/templates" className="hover:text-white">Templates</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}