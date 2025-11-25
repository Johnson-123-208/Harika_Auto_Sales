"use client";
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

interface LogoPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogoPopup({ isOpen, onClose }: LogoPopupProps) {
  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[10000]"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            margin: 0,
            padding: 0,
          }}
        >
          {/* Backdrop with strong blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/70"
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              cursor: 'pointer',
            }}
          />
          
          {/* Popup Content - Absolutely Centered */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: '42rem',
              maxHeight: '90vh',
              margin: 0,
              padding: 0,
              pointerEvents: 'none',
            }}
          >
            <motion.div
              key="popup-content"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ 
                type: "spring",
                stiffness: 280,
                damping: 25,
                duration: 0.4
              }}
              className="rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                backgroundColor: 'var(--theme-bg-primary)',
                border: '2px solid rgba(255, 255, 255, 0.15)',
                pointerEvents: 'auto',
              }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-90"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'var(--theme-text-primary)',
                  backdropFilter: 'blur(10px)',
                }}
                aria-label="Close"
              >
                <X size={24} />
              </button>
              
              {/* Logo Container */}
              <div className="flex flex-col items-center justify-center p-12 md:p-16">
                {/* Logo Image with smooth fade-in and scale animation */}
                <motion.div
                  initial={{ 
                    opacity: 0,
                    scale: 0.4,
                    y: -20
                  }}
                  animate={{ 
                    opacity: 1,
                    scale: 1,
                    y: 0
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 22,
                    delay: 0.15,
                    opacity: { duration: 0.5 },
                  }}
                  className="relative w-64 h-64 md:w-80 md:h-80 mb-8"
                >
                  <Image
                    src="/images/logo.png"
                    alt="Harika Auto Center Logo"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </motion.div>
                
                {/* Company Name */}
                <motion.h2
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    delay: 0.35,
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                  className="text-3xl md:text-4xl font-bold mb-2 text-center"
                  style={{ color: 'var(--theme-text-primary)' }}
                >
                  Harika Auto Center
                </motion.h2>
                
                {/* Tagline */}
                <motion.p
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    delay: 0.45,
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                  className="text-lg opacity-70 text-center"
                  style={{ color: 'var(--theme-text-primary)' }}
                >
                  Premium Auto Parts & Clutch Systems
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
