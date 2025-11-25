"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';

export default function LandingPage() {
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    // Simple, clean transition to home
    const timer = setTimeout(() => {
      router.push('/home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  const getThemeBg = () => {
    switch(theme) {
      case 'navy-white': return '#001f3f';
      case 'emerald-mint': return '#064e3b';
      case 'purple-lavender': return '#581c87';
      default: return '#001f3f';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: getThemeBg() }}
    >
      <div className="relative">
        <Image
          src="/images/logo.png"
          alt="HAC Logo"
          width={500}
          height={500}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
