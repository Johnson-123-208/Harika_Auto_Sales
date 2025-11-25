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

// Helper function to format list items consistently
function formatListItems(text: string | undefined): string[] {
  if (!text || !text.trim()) return [];
  return text.split(',').map(item => item.trim()).filter(item => item.length > 0);
}

// Animation variants for smooth, unified animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] // Custom cubic-bezier for smoothness
    }
  }
};

const slideVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction * 40,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

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
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="pt-20 sm:pt-24 md:pt-28 pb-6 sm:pb-8 md:pb-10 px-4 sm:px-6 relative overflow-hidden" 
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
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link 
              href={`/products/${category}`} 
              className="inline-flex items-center mb-4 sm:mb-6 group transition-all duration-300 hover:translate-x-1"
              style={{ color: 'var(--theme-text-primary)' }}
            >
              <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px] mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
              <span className="text-xs sm:text-sm font-medium opacity-80 group-hover:opacity-100">Back to {categoryDisplayName}</span>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full"
          >
            <div className="relative">
              {/* Decorative accent line - hidden on mobile */}
              <div 
                className="hidden sm:block absolute -left-6 top-0 bottom-0 w-1 rounded-full opacity-30"
                style={{ backgroundColor: 'var(--theme-text-primary)' }}
              />
              
              <div className="space-y-2 sm:space-y-3 pl-0 sm:pl-6">
                {/* Category Badge */}
                <div className="inline-block">
                  <span 
                    className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border"
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
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]" style={{ color: 'var(--theme-text-primary)' }}>
                  <span className="block">{categoryDisplayName}</span>
                  <span 
                    className="inline-block mt-1 sm:mt-2 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light opacity-70"
                    style={{ color: 'var(--theme-text-primary)' }}
                  >
                    {size}mm Diameter
                  </span>
                </h1>
                
                {/* Subtitle with decorative elements */}
                <div className="flex items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
                  <div 
                    className="h-px flex-1 opacity-20"
                    style={{ backgroundColor: 'var(--theme-text-primary)' }}
                  />
                  <p 
                    className="text-[10px] sm:text-xs md:text-sm font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase whitespace-nowrap"
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

      {/* Product Display - Always show same sections for consistency */}
      {productDisplays.map((display, idx) => {
        const themeConfig = getThemeConfig(theme, idx);
        const isImageLeft = idx % 2 !== 0;
        const slideDirection = isImageLeft ? -1 : 1;

        // Get product data or use defaults
        const product = display.product;
        const partNumber = product?.partNumber || display.imageAlt || 'Product Information';
        const oemRef = product?.oemCrossReference?.trim() || 'Not Available';
        const modelApp = product?.modelApplication?.trim() || 'Not Available';
        const features = formatListItems(product?.specialFeatures);
        const specs = formatListItems(product?.specs);

        return (
          <motion.section
            key={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="min-h-screen lg:h-screen flex items-center relative overflow-hidden py-12 lg:py-0"
            style={{ backgroundColor: themeConfig.bg }}
          >
            {/* Decorative gradient overlay */}
            <motion.div 
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                background: `linear-gradient(${idx % 2 === 0 ? '135deg' : '45deg'}, transparent 0%, currentColor 50%, transparent 100%)`
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.05 }}
              transition={{ duration: 1 }}
            />
            
            <div className="max-w-7xl mx-auto w-full h-full px-4 sm:px-6 lg:px-8 py-6 lg:py-8 relative z-10 flex items-center" style={{ paddingLeft: 'var(--padding)', paddingRight: 'var(--padding)' }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center w-full h-full">
                {/* Image Side */}
                <motion.div 
                  className={`${isImageLeft ? 'lg:order-1' : 'lg:order-2'} order-1`}
                  custom={slideDirection}
                  variants={slideVariants}
                >
                  <motion.div 
                    className="relative w-full h-[50vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh] min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] rounded-xl overflow-hidden border group"
                    style={{ 
                      backgroundColor: idx % 2 === 0 
                        ? 'rgba(0, 0, 0, 0.3)' 
                        : 'rgba(255, 255, 255, 0.1)',
                      borderColor: themeConfig.border,
                      backdropFilter: 'blur(10px)'
                    }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <motion.div
                      initial={{ scale: 1.05, opacity: 0.8 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <ProductImage
                        src={display.image}
                        alt={display.imageAlt}
                        fill
                        className="object-contain p-4 sm:p-6 md:p-8 transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Text Side - Always show all sections */}
                <motion.div 
                  className={`${isImageLeft ? 'lg:order-2' : 'lg:order-1'} order-2 h-full flex flex-col justify-center`}
                  custom={-slideDirection}
                  variants={slideVariants}
                >
                  <motion.div
                    variants={containerVariants}
                    className="space-y-4 sm:space-y-5 max-h-[calc(100vh-200px)] lg:max-h-[calc(100vh-200px)] overflow-y-auto pr-2 scrollbar-thin"
                    style={{
                      scrollbarColor: `${themeConfig.textMuted} transparent`
                    }}
                  >
                    {/* Part Number - Always shown */}
                    <motion.div variants={itemVariants}>
                      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 leading-tight break-words" style={{ color: themeConfig.text }}>
                        {partNumber}
                      </h2>
                    </motion.div>

                    {/* Model Application - Always shown */}
                    <motion.div 
                      variants={itemVariants}
                      className="pb-3 sm:pb-4 border-b"
                      style={{ borderColor: themeConfig.border }}
                    >
                      <h3 className="text-[10px] sm:text-xs font-bold uppercase mb-1.5 sm:mb-2 tracking-widest" style={{ color: themeConfig.textMuted, letterSpacing: '0.1em' }}>
                        MODEL APPLICATION
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed break-words" style={{ color: themeConfig.text }}>
                        {modelApp}
                      </p>
                    </motion.div>

                    {/* OEM Cross Reference - Always shown */}
                    <motion.div 
                      variants={itemVariants}
                      className="pb-3 sm:pb-4 border-b"
                      style={{ borderColor: themeConfig.border }}
                    >
                      <h3 className="text-[10px] sm:text-xs font-bold uppercase mb-1.5 sm:mb-2 tracking-widest" style={{ color: themeConfig.textMuted, letterSpacing: '0.1em' }}>
                        OEM REFERENCE
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed break-words" style={{ color: themeConfig.text }}>
                        {oemRef}
                      </p>
                    </motion.div>

                    {/* Special Features - Always shown */}
                    <motion.div 
                      variants={itemVariants}
                      className="pb-3 sm:pb-4 border-b"
                      style={{ borderColor: themeConfig.border }}
                    >
                      <h3 className="text-[10px] sm:text-xs font-bold uppercase mb-1.5 sm:mb-2 tracking-widest" style={{ color: themeConfig.textMuted, letterSpacing: '0.1em' }}>
                        SPECIAL FEATURES
                      </h3>
                      {features.length > 0 ? (
                        <ul className="space-y-1 sm:space-y-1.5">
                          {features.map((feature, featureIdx) => (
                            <li 
                              key={featureIdx} 
                              className="flex items-start"
                            >
                              <span className="mr-2 mt-1 sm:mt-1.5 flex-shrink-0 text-xs" style={{ color: themeConfig.textMuted }}>•</span>
                              <span className="text-xs sm:text-sm leading-relaxed flex-1 break-words" style={{ color: themeConfig.textMuted }}>
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs sm:text-sm leading-relaxed italic" style={{ color: themeConfig.textMuted }}>
                          Not Available
                        </p>
                      )}
                    </motion.div>

                    {/* Specifications - Always shown */}
                    <motion.div variants={itemVariants}>
                      <h3 className="text-[10px] sm:text-xs font-bold uppercase mb-1.5 sm:mb-2 tracking-widest" style={{ color: themeConfig.textMuted, letterSpacing: '0.1em' }}>
                        SPECIFICATIONS
                      </h3>
                      {specs.length > 0 ? (
                        <ul className="space-y-1 sm:space-y-1.5">
                          {specs.map((spec, specIdx) => (
                            <li 
                              key={specIdx} 
                              className="flex items-start"
                            >
                              <span className="mr-2 mt-1 sm:mt-1.5 flex-shrink-0 text-xs" style={{ color: themeConfig.textMuted }}>•</span>
                              <span className="text-xs sm:text-sm leading-relaxed flex-1 break-words" style={{ color: themeConfig.textMuted }}>
                                {spec}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs sm:text-sm leading-relaxed italic" style={{ color: themeConfig.textMuted }}>
                          Not Available
                        </p>
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.section>
        );
      })}
    </div>
  );
}
