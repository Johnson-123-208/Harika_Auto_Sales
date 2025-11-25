"use client";
import React from 'react';
import Link from 'next/link';
import { Settings, Disc } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useTheme } from '@/contexts/ThemeContext';

export default function ProductsPage() {
  const { theme } = useTheme();
  
  const categories = [
    {
      icon: Settings,
      title: "Cover Assembly",
      link: "/products/cover-assembly",
    },
    {
      icon: Disc,
      title: "Clutch Disc",
      link: "/products/clutch-disc",
    }
  ];

  const getThemeColors = () => {
    switch(theme) {
      case 'navy-white':
        return {
          bg: '#001f3f',
          card: '#003366',
          text: '#ffffff',
          accent: '#ffffff',
          border: 'rgba(255, 255, 255, 0.1)'
        };
      case 'emerald-mint':
        return {
          bg: '#064e3b',
          card: '#065f46',
          text: '#ffffff',
          accent: '#a7f3d0',
          border: 'rgba(167, 243, 208, 0.1)'
        };
      case 'purple-lavender':
        return {
          bg: '#581c87',
          card: '#6b21a8',
          text: '#ffffff',
          accent: '#e9d5ff',
          border: 'rgba(233, 213, 255, 0.1)'
        };
      default:
        return {
          bg: '#001f3f',
          card: '#003366',
          text: '#ffffff',
          accent: '#ffffff',
          border: 'rgba(255, 255, 255, 0.1)'
        };
    }
  };

  const colors = getThemeColors();

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bg }}>
      <Navbar />
      
      <section 
        className="pt-32 pb-24 px-6 min-h-screen flex items-center justify-center" 
        style={{ 
          paddingLeft: 'var(--padding)', 
          paddingRight: 'var(--padding)',
          backgroundColor: colors.bg
        }}
      >
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-4" style={{ color: colors.text }}>
              Our Products
            </h1>
            <p className="text-xl opacity-80" style={{ color: colors.text }}>
              Select a category to browse our catalog
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, idx) => (
              <Link key={idx} href={category.link}>
                <div 
                  className="p-12 rounded-xl border cursor-pointer transition-all duration-300 hover:opacity-90"
                  style={{
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    color: colors.text
                  }}
                >
                  <div className="text-center">
                    <category.icon className="mx-auto mb-6" size={80} style={{ color: colors.accent }} />
                    <h2 className="text-4xl font-bold">
                      {category.title}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
