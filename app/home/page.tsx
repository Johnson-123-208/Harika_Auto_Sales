"use client";
import React from 'react';
import { Settings, Disc } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useTheme } from '@/contexts/ThemeContext';

function getThemeColors(theme: string) {
  const themeColors: { [key: string]: { primary: string; secondary: string; text: string; hover: string } } = {
    'navy-white': { primary: '#001f3f', secondary: '#ffffff', text: '#ffffff', hover: '#003366' },
    'emerald-mint': { primary: '#064e3b', secondary: '#a7f3d0', text: '#ffffff', hover: '#065f46' },
    'purple-lavender': { primary: '#581c87', secondary: '#e9d5ff', text: '#ffffff', hover: '#6b21a8' },
    'red-white': { primary: '#7f1d1d', secondary: '#ffffff', text: '#ffffff', hover: '#991b1b' },
    'blue-white': { primary: '#1e3a8a', secondary: '#93c5fd', text: '#ffffff', hover: '#1e40af' },
    'orange-white': { primary: '#7c2d12', secondary: '#fed7aa', text: '#ffffff', hover: '#9a3412' },
    'teal-white': { primary: '#134e4a', secondary: '#99f6e4', text: '#ffffff', hover: '#155e75' },
    'indigo-white': { primary: '#312e81', secondary: '#c7d2fe', text: '#ffffff', hover: '#3730a3' },
    'rose-white': { primary: '#881337', secondary: '#fbcfe8', text: '#ffffff', hover: '#9f1239' },
    'amber-white': { primary: '#78350f', secondary: '#fde68a', text: '#ffffff', hover: '#92400e' },
  };
  
  return themeColors[theme] || themeColors['navy-white'];
}

export default function HomePage() {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* About Section */}
      <section 
        className="min-h-screen flex items-center justify-center px-6" 
        style={{ 
          backgroundColor: colors.primary,
          paddingLeft: 'var(--padding)', 
          paddingRight: 'var(--padding)' 
        }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight" style={{ color: colors.text }}>
              HAC – Harika Auto Center
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed mb-6 max-w-3xl mx-auto" style={{ color: colors.text, opacity: 0.9 }}>
              Your trusted partner for premium automotive clutch systems and components.
              We specialize in high-quality cover assemblies and clutch discs engineered
              for durability, performance, and reliability.
            </p>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: colors.text, opacity: 0.7 }}>
              With years of expertise in the automotive industry, HAC delivers excellence
              in every component, ensuring your vehicles operate at peak performance.
            </p>
          </div>
        </div>
      </section>

      {/* Split Screen Categories */}
      <section className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        {/* Cover Assembly - Left Side */}
        <Link href="/products/cover-assembly">
          <div
            className="min-h-screen flex items-center justify-center cursor-pointer relative"
            style={{ 
              backgroundColor: colors.primary,
              borderRight: `1px solid ${colors.hover}33`
            }}
          >
            <div className="text-center px-6">
              <div className="mb-10">
                <Settings className="mx-auto" size={100} style={{ color: colors.text, opacity: 0.9 }} />
              </div>
              <h2 className="text-5xl md:text-7xl font-bold mb-4 leading-tight" style={{ color: colors.text }}>
                Cover Assembly
              </h2>
              <p className="text-lg md:text-xl opacity-80" style={{ color: colors.text }}>Premium Clutch Cover Systems</p>
            </div>
          </div>
        </Link>

        {/* Clutch Disc - Right Side */}
        <Link href="/products/clutch-disc">
          <div
            className="min-h-screen flex items-center justify-center cursor-pointer relative"
            style={{ backgroundColor: colors.secondary }}
          >
            <div className="text-center px-6">
              <div className="mb-10">
                <Disc className="mx-auto" size={100} style={{ color: colors.primary, opacity: 0.9 }} />
              </div>
              <h2 className="text-5xl md:text-7xl font-bold mb-4 leading-tight" style={{ color: colors.primary }}>
                Clutch Disc
              </h2>
              <p className="text-lg md:text-xl opacity-80" style={{ color: colors.primary }}>High-Performance Clutch Discs</p>
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}

