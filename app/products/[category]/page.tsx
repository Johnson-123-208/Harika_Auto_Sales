"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useTheme } from '@/contexts/ThemeContext';

interface PageProps {
  params: {
    category: string;
  };
}

const categoryNames: { [key: string]: string } = {
  'cover-assembly': 'Cover Assembly',
  'clutch-disc': 'Clutch Disc',
};

const sizes = ['430', '395', '380', '350', '360'];

function getThemeColors(theme: string) {
  const themeColors: { [key: string]: { bg: string; card: string; cardHover: string; text: string; textMuted: string; border: string } } = {
    'navy-white': { bg: '#001f3f', card: '#003366', cardHover: '#003d7a', text: '#ffffff', textMuted: 'rgba(255, 255, 255, 0.7)', border: 'rgba(255, 255, 255, 0.1)' },
    'emerald-mint': { bg: '#064e3b', card: '#065f46', cardHover: '#047857', text: '#ffffff', textMuted: 'rgba(255, 255, 255, 0.7)', border: 'rgba(167, 243, 208, 0.2)' },
    'purple-lavender': { bg: '#581c87', card: '#6b21a8', cardHover: '#7c3aed', text: '#ffffff', textMuted: 'rgba(255, 255, 255, 0.7)', border: 'rgba(233, 213, 255, 0.2)' },
    'red-white': { bg: '#7f1d1d', card: '#991b1b', cardHover: '#b91c1c', text: '#ffffff', textMuted: 'rgba(255, 255, 255, 0.7)', border: 'rgba(255, 255, 255, 0.2)' },
    'blue-white': { bg: '#1e3a8a', card: '#1e40af', cardHover: '#2563eb', text: '#ffffff', textMuted: 'rgba(255, 255, 255, 0.7)', border: 'rgba(147, 197, 253, 0.2)' },
    'orange-white': { bg: '#7c2d12', card: '#9a3412', cardHover: '#c2410c', text: '#ffffff', textMuted: 'rgba(255, 255, 255, 0.7)', border: 'rgba(254, 215, 170, 0.2)' },
    'teal-white': { bg: '#134e4a', card: '#155e75', cardHover: '#0d9488', text: '#ffffff', textMuted: 'rgba(255, 255, 255, 0.7)', border: 'rgba(153, 246, 228, 0.2)' },
    'indigo-white': { bg: '#312e81', card: '#3730a3', cardHover: '#4f46e5', text: '#ffffff', textMuted: 'rgba(255, 255, 255, 0.7)', border: 'rgba(199, 210, 254, 0.2)' },
    'rose-white': { bg: '#881337', card: '#9f1239', cardHover: '#be185d', text: '#ffffff', textMuted: 'rgba(255, 255, 255, 0.7)', border: 'rgba(251, 207, 232, 0.2)' },
    'amber-white': { bg: '#78350f', card: '#92400e', cardHover: '#d97706', text: '#ffffff', textMuted: 'rgba(255, 255, 255, 0.7)', border: 'rgba(253, 230, 138, 0.2)' },
  };
  
  return themeColors[theme] || themeColors['navy-white'];
}

export default function CategoryPage({ params }: PageProps) {
  const { category } = params;
  const categoryName = categoryNames[category] || category;
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bg }}>
      <Navbar />
      
      <section 
        className="min-h-screen flex items-center justify-center px-6 pt-20" 
        style={{ 
          paddingLeft: 'var(--padding)', 
          paddingRight: 'var(--padding)',
          backgroundColor: colors.bg
        }}
      >
        <div className="max-w-4xl mx-auto w-full">
          <Link 
            href="/home" 
            className="inline-flex items-center mb-12 transition-opacity hover:opacity-70"
            style={{ color: colors.textMuted }}
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>

          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-4" style={{ color: colors.text }}>
              {categoryName}
            </h1>
            <p className="text-xl opacity-80" style={{ color: colors.text }}>
              Select a diameter to view products
            </p>
          </div>

          {/* Size Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {sizes.map((size) => (
              <Link key={size} href={`/products/${category}/${size}`}>
                <div
                  className="p-8 rounded-xl border cursor-pointer transition-all duration-300 hover:opacity-90"
                  style={{
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    color: colors.text
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.cardHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.card;
                  }}
                >
                  <div className="text-center">
                    <div className="text-6xl font-bold mb-2">
                      {size}
                    </div>
                    <p className="text-lg opacity-70">mm diameter</p>
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
