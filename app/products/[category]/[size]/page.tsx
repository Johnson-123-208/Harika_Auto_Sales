"use client";
import React from 'react';
import Link from 'next/link';
import ProductImage from '@/components/ProductImage';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import productsData from '@/data/products.json';
import { getProductImages } from '@/lib/imageMapping';
import { getProductForImage } from '@/lib/imageProductMapping';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

interface PageProps {
  params: {
    category: string;
    size: string;
  };
}

const categoryNames: { [key: string]: string } = {
  'cover-assembly': 'cover_assembly',
  'clutch-disc': 'clutch_disc',
};

// Get background colors and text colors based on theme
function getThemeConfig(theme: string, index: number) {
  const isDark = index % 2 === 0; // Even indices are dark backgrounds
  
  const themeConfigs: { [key: string]: { dark: string; light: string; darkText: string; lightText: string } } = {
    'navy-white': { dark: '#001f3f', light: '#ffffff', darkText: '#ffffff', lightText: '#001f3f' },
    'emerald-mint': { dark: '#064e3b', light: '#a7f3d0', darkText: '#ffffff', lightText: '#064e3b' },
    'purple-lavender': { dark: '#581c87', light: '#e9d5ff', darkText: '#ffffff', lightText: '#581c87' },
    'red-white': { dark: '#7f1d1d', light: '#ffffff', darkText: '#ffffff', lightText: '#7f1d1d' },
    'blue-white': { dark: '#1e3a8a', light: '#93c5fd', darkText: '#ffffff', lightText: '#1e3a8a' },
    'orange-white': { dark: '#7c2d12', light: '#fed7aa', darkText: '#ffffff', lightText: '#7c2d12' },
    'teal-white': { dark: '#134e4a', light: '#99f6e4', darkText: '#ffffff', lightText: '#134e4a' },
    'indigo-white': { dark: '#312e81', light: '#c7d2fe', darkText: '#ffffff', lightText: '#312e81' },
    'rose-white': { dark: '#881337', light: '#fbcfe8', darkText: '#ffffff', lightText: '#881337' },
    'amber-white': { dark: '#78350f', light: '#fde68a', darkText: '#ffffff', lightText: '#78350f' },
  };
  
  const config = themeConfigs[theme] || themeConfigs['navy-white'];
  const bg = isDark ? config.dark : config.light;
  const text = isDark ? config.darkText : config.lightText;
  
  return {
    bg,
    text,
    textMuted: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
    border: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
  };
}

interface Product {
  partNumber: string;
  oemCrossReference?: string;
  modelApplication?: string;
  specialFeatures?: string;
  specs?: string;
}

interface ProductDisplay {
  image: string;
  imageAlt: string;
  product?: Product;
  index: number;
}

export default function ProductDisplayPage({ params }: PageProps) {
  const { category, size } = params;
  const { theme } = useTheme();

  const categoryKey = categoryNames[category] || category;
  
  // Get products for this category and size
  const categoryData = (productsData as any)[categoryKey];
  const products: Product[] = categoryData?.[size] || [];

  // Get product images for this category and size
  const productImages = getProductImages(category, size);

  // Combine images with product data using intelligent matching
  const productDisplays: ProductDisplay[] = productImages.map((img, idx) => {
    // Extract filename from image path
    const filename = img.exactFilename || img.path.split('/').pop() || '';
    
    // Try to find matching product using mapping
    const matchedProduct = getProductForImage(filename, category, size, products);
    
    return {
      image: img.path,
      imageAlt: img.alt,
      product: matchedProduct || products[idx] || undefined, // Fallback to index if mapping fails
      index: idx,
    };
  });

  const categoryDisplayName = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  if (productDisplays.length === 0) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--theme-bg-primary)' }}>
        <Navbar />
        <section className="pt-32 pb-24 px-6" style={{ paddingLeft: 'var(--padding)', paddingRight: 'var(--padding)' }}>
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-lg" style={{ color: 'var(--theme-text-primary)' }}>No products available for this size.</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ scrollBehavior: 'smooth' }}>
      <Navbar />
      
      {/* Header */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pt-28 pb-10 px-6 relative overflow-hidden" 
        style={{ 
          backgroundColor: 'var(--theme-bg-primary)',
          paddingLeft: 'var(--padding)', 
          paddingRight: 'var(--padding)' 
        }}
      >
        {/* Decorative background element */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, currentColor 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link 
              href={`/products/${category}`} 
              className="inline-flex items-center mb-6 group transition-all duration-300 hover:translate-x-1"
              style={{ color: 'var(--theme-text-primary)' }}
            >
              <ArrowLeft size={18} className="mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="text-sm font-medium opacity-80 group-hover:opacity-100">Back to {categoryDisplayName}</span>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full"
          >
            <div className="relative">
              {/* Decorative accent line */}
              <div 
                className="absolute -left-6 top-0 bottom-0 w-1 rounded-full opacity-30"
                style={{ backgroundColor: 'var(--theme-text-primary)' }}
              />
              
              <div className="space-y-3 pl-6">
                {/* Category Badge */}
                <div className="inline-block">
                  <span 
                    className="text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border"
                    style={{ 
                      color: 'var(--theme-text-primary)',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      letterSpacing: '0.2em'
                    }}
                  >
                    {categoryDisplayName}
                  </span>
                </div>
                
                {/* Main Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]" style={{ color: 'var(--theme-text-primary)' }}>
                  <span className="block">{categoryDisplayName}</span>
                  <span 
                    className="inline-block mt-2 text-2xl md:text-3xl lg:text-4xl font-light opacity-70"
                    style={{ color: 'var(--theme-text-primary)' }}
                  >
                    {size}mm Diameter
                  </span>
                </h1>
                
                {/* Subtitle with decorative elements */}
                <div className="flex items-center gap-3 pt-2">
                  <div 
                    className="h-px flex-1 opacity-20"
                    style={{ backgroundColor: 'var(--theme-text-primary)' }}
                  />
                  <p 
                    className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase whitespace-nowrap"
                    style={{ color: 'var(--theme-text-primary)', opacity: 0.6 }}
                  >
                    Product Catalog
                  </p>
                  <div 
                    className="h-px flex-1 opacity-20"
                    style={{ backgroundColor: 'var(--theme-text-primary)' }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Zig-zag Product Display */}
      {productDisplays.map((display, idx) => {
        const themeConfig = getThemeConfig(theme, idx);
        const isImageLeft = idx % 2 !== 0;
        const slideDirection = isImageLeft ? -1 : 1;

        return (
          <motion.section
            key={idx}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-screen flex items-center relative overflow-hidden"
            style={{ backgroundColor: themeConfig.bg }}
          >
            {/* Decorative gradient overlay */}
            <div 
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                background: `linear-gradient(${idx % 2 === 0 ? '135deg' : '45deg'}, transparent 0%, currentColor 50%, transparent 100%)`
              }}
            />
            
            <div className="max-w-7xl mx-auto w-full h-full px-6 py-8 relative z-10 flex items-center" style={{ paddingLeft: 'var(--padding)', paddingRight: 'var(--padding)' }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center w-full h-full">
                {/* Image Side */}
                <motion.div 
                  className={isImageLeft ? 'order-1' : 'order-2'}
                  initial={{ opacity: 0, x: slideDirection * 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                  <motion.div 
                    className="relative w-full h-[70vh] min-h-[600px] rounded-xl overflow-hidden border group"
                    style={{ 
                      backgroundColor: idx % 2 === 0 
                        ? 'rgba(0, 0, 0, 0.3)' 
                        : 'rgba(255, 255, 255, 0.1)',
                      borderColor: themeConfig.border,
                      backdropFilter: 'blur(10px)'
                    }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <motion.div
                      initial={{ scale: 1.1, opacity: 0.8 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      <ProductImage
                        src={display.image}
                        alt={display.imageAlt}
                        fill
                        className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Text Side */}
                <motion.div 
                  className={`${isImageLeft ? 'order-2' : 'order-1'} h-full flex flex-col justify-center overflow-y-auto`}
                  initial={{ opacity: 0, x: -slideDirection * 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  style={{ maxHeight: 'calc(100vh - 200px)' }}
                >
                  <div className="space-y-4">
                    {/* Part Number - Prominent Title */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <h2 className="text-xl md:text-2xl lg:text-2xl font-bold mb-2 leading-tight" style={{ color: themeConfig.text }}>
                        {display.product?.partNumber || display.imageAlt}
                      </h2>
                    </motion.div>

                    {/* Model Application - Subtitle */}
                    {display.product?.modelApplication && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                      >
                        <p className="text-sm md:text-base leading-relaxed" style={{ color: themeConfig.textMuted }}>
                          {display.product.modelApplication}
                        </p>
                      </motion.div>
                    )}

                    {display.product && (
                      <motion.div 
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        {/* OEM Cross Reference */}
                        {display.product.oemCrossReference && display.product.oemCrossReference.trim() && (
                          <motion.div 
                            className="pb-4 border-b" 
                            style={{ borderColor: themeConfig.border }}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                          >
                            <h3 className="text-xs font-bold uppercase mb-2 tracking-widest" style={{ color: themeConfig.textMuted, letterSpacing: '0.1em' }}>
                              OEM REFERENCE
                            </h3>
                            <p className="text-xs md:text-sm leading-relaxed" style={{ color: themeConfig.text }}>
                              {display.product.oemCrossReference}
                            </p>
                          </motion.div>
                        )}

                        {/* Special Features - Formatted as List */}
                        {display.product.specialFeatures && display.product.specialFeatures.trim() && (
                          <motion.div 
                            className="pb-4 border-b" 
                            style={{ borderColor: themeConfig.border }}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                          >
                            <h3 className="text-xs font-bold uppercase mb-2 tracking-widest" style={{ color: themeConfig.textMuted, letterSpacing: '0.1em' }}>
                              SPECIAL FEATURES
                            </h3>
                            <ul className="space-y-1">
                              {display.product.specialFeatures.split(',').map((feature: string, featureIdx: number) => (
                                <motion.li 
                                  key={featureIdx} 
                                  className="flex items-start"
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.4, delay: 0.9 + featureIdx * 0.05 }}
                                >
                                  <span className="mr-2 mt-1" style={{ color: themeConfig.textMuted }}>•</span>
                                  <span className="text-xs md:text-sm leading-relaxed flex-1" style={{ color: themeConfig.textMuted }}>
                                    {feature.trim()}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        )}

                        {/* Specifications - Formatted List */}
                        {display.product.specs && display.product.specs.trim() && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 1.0 }}
                          >
                            <h3 className="text-xs font-bold uppercase mb-2 tracking-widest" style={{ color: themeConfig.textMuted, letterSpacing: '0.1em' }}>
                              SPECIFICATIONS
                            </h3>
                            <ul className="space-y-1">
                              {display.product.specs.split(',').map((spec: string, specIdx: number) => (
                                <motion.li 
                                  key={specIdx} 
                                  className="flex items-start"
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.4, delay: 1.1 + specIdx * 0.05 }}
                                >
                                  <span className="mr-2 mt-1" style={{ color: themeConfig.textMuted }}>•</span>
                                  <span className="text-xs md:text-sm leading-relaxed flex-1" style={{ color: themeConfig.textMuted }}>
                                    {spec.trim()}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </motion.div>
                    )}

                    {!display.product && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        <p className="text-lg md:text-xl leading-relaxed" style={{ color: themeConfig.textMuted }}>
                          {display.imageAlt}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        );
      })}
    </div>
  );
}
