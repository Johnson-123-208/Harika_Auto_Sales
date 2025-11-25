"use client";
import React, { useRef } from 'react';
import { Settings, Disc } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

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
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth spring animation for scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax transforms
  const heroY = useTransform(smoothProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.5], [1, 0.8]);
  
  // Category section transforms
  const categoryY = useTransform(smoothProgress, [0.3, 1], [100, 0]);
  const categoryOpacity = useTransform(smoothProgress, [0.3, 0.7], [0, 1]);
  
  // Background gradient rotation
  const gradientRotate = useTransform(smoothProgress, [0, 1], [0, 360]);
  
  // Floating particles animation
  const particle1Y = useTransform(smoothProgress, [0, 1], [0, -200]);
  const particle2Y = useTransform(smoothProgress, [0, 1], [0, -150]);
  const particle3Y = useTransform(smoothProgress, [0, 1], [0, -250]);
  
  return (
    <div ref={containerRef} className="min-h-screen overflow-x-hidden">
      <Navbar />
      
      {/* About Section with Parallax */}
      <motion.section 
        className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden" 
        style={{ 
          backgroundColor: colors.primary,
          paddingLeft: 'var(--padding)', 
          paddingRight: 'var(--padding)',
          y: heroY,
          opacity: heroOpacity,
          scale: heroScale
        }}
      >
        {/* Animated Background Gradient */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: `conic-gradient(from ${gradientRotate}deg, transparent, ${colors.secondary}40, transparent)`,
            filter: 'blur(80px)'
          }}
        />
        
        {/* Floating Particles */}
        <motion.div
          className="absolute top-20 left-10 w-2 h-2 rounded-full"
          style={{
            backgroundColor: colors.secondary,
            opacity: 0.6,
            y: particle1Y,
            x: useTransform(smoothProgress, [0, 1], [0, 50])
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-3 h-3 rounded-full"
          style={{
            backgroundColor: colors.secondary,
            opacity: 0.4,
            y: particle2Y,
            x: useTransform(smoothProgress, [0, 1], [0, -30])
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: colors.secondary,
            opacity: 0.5,
            y: particle3Y,
            x: useTransform(smoothProgress, [0, 1], [0, 40])
          }}
        />
        
        {/* Decorative Grid Pattern */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            transform: useTransform(smoothProgress, [0, 1], ['translate(0, 0)', 'translate(50px, 50px)'])
          }}
        />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
              style={{ color: colors.text }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              HAC – Harika Auto Center
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl leading-relaxed mb-6 max-w-3xl mx-auto" 
              style={{ color: colors.text, opacity: 0.9 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Your trusted partner for premium automotive clutch systems and components.
              We specialize in high-quality cover assemblies and clutch discs engineered
              for durability, performance, and reliability.
            </motion.p>
            
            <motion.p 
              className="text-lg max-w-3xl mx-auto leading-relaxed" 
              style={{ color: colors.text, opacity: 0.7 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              With years of expertise in the automotive industry, HAC delivers excellence
              in every component, ensuring your vehicles operate at peak performance.
            </motion.p>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-2"
            style={{ borderColor: colors.text, opacity: 0.6 }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="w-1 h-3 rounded-full"
              style={{ backgroundColor: colors.text, opacity: 0.6 }}
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Split Screen Categories with Scroll Animations */}
      <motion.section 
        className="min-h-screen grid grid-cols-1 md:grid-cols-2 relative"
        style={{
          y: categoryY,
          opacity: categoryOpacity
        }}
      >
        {/* Cover Assembly - Left Side */}
        <Link href="/products/cover-assembly">
          <motion.div
            className="min-h-screen flex items-center justify-center cursor-pointer relative overflow-hidden group"
            style={{ 
              backgroundColor: colors.primary,
              borderRight: `1px solid ${colors.hover}33`
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Animated Background Pattern */}
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle at 30% 50%, currentColor 2px, transparent 2px)',
                backgroundSize: '60px 60px',
                transform: useTransform(smoothProgress, [0.3, 1], ['translate(0, 0)', 'translate(30px, 30px)'])
              }}
            />
            
            {/* Hover Gradient Overlay */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${colors.secondary}40, transparent)`
              }}
            />
            
            <motion.div 
              className="text-center px-6 relative z-10"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.div 
                className="mb-10"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Settings className="mx-auto" size={100} style={{ color: colors.text, opacity: 0.9 }} />
              </motion.div>
              
              <motion.h2 
                className="text-5xl md:text-7xl font-bold mb-4 leading-tight" 
                style={{ color: colors.text }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Cover Assembly
              </motion.h2>
              
              <motion.p 
                className="text-lg md:text-xl opacity-80" 
                style={{ color: colors.text }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Premium Clutch Cover Systems
              </motion.p>
            </motion.div>
          </motion.div>
        </Link>

        {/* Clutch Disc - Right Side */}
        <Link href="/products/clutch-disc">
          <motion.div
            className="min-h-screen flex items-center justify-center cursor-pointer relative overflow-hidden group"
            style={{ backgroundColor: colors.secondary }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Animated Background Pattern */}
            <motion.div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle at 70% 50%, currentColor 2px, transparent 2px)',
                backgroundSize: '60px 60px',
                transform: useTransform(smoothProgress, [0.3, 1], ['translate(0, 0)', 'translate(-30px, 30px)'])
              }}
            />
            
            {/* Hover Gradient Overlay */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
              style={{
                background: `linear-gradient(45deg, ${colors.primary}40, transparent)`
              }}
            />
            
            <motion.div 
              className="text-center px-6 relative z-10"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.div 
                className="mb-10"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ duration: 0.3 }}
              >
                <Disc className="mx-auto" size={100} style={{ color: colors.primary, opacity: 0.9 }} />
              </motion.div>
              
              <motion.h2 
                className="text-5xl md:text-7xl font-bold mb-4 leading-tight" 
                style={{ color: colors.primary }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Clutch Disc
              </motion.h2>
              
              <motion.p 
                className="text-lg md:text-xl opacity-80" 
                style={{ color: colors.primary }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.8 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                High-Performance Clutch Discs
              </motion.p>
            </motion.div>
          </motion.div>
        </Link>
      </motion.section>
    </div>
  );
}
