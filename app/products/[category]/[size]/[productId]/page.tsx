"use client";
import React from 'react';
import Link from 'next/link';
import ProductImage from '@/components/ProductImage';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import productsData from '@/data/products.json';
import { getProductImages } from '@/lib/imageMapping';
import { useTheme } from '@/contexts/ThemeContext';

interface PageProps {
  params: {
    category: string;
    size: string;
    productId: string;
  };
}

const categoryNames: { [key: string]: string } = {
  'cover-assembly': 'cover_assembly',
  'clutch-disc': 'clutch_disc',
};

function getThemeColors(theme: string) {
  switch(theme) {
    case 'navy-white':
      return {
        bg: '#001f3f',
        card: '#003366',
        text: '#ffffff',
        textMuted: 'rgba(255, 255, 255, 0.7)',
        border: 'rgba(255, 255, 255, 0.1)'
      };
    case 'emerald-mint':
      return {
        bg: '#064e3b',
        card: '#065f46',
        text: '#ffffff',
        textMuted: 'rgba(255, 255, 255, 0.7)',
        border: 'rgba(167, 243, 208, 0.2)'
      };
    case 'purple-lavender':
      return {
        bg: '#581c87',
        card: '#6b21a8',
        text: '#ffffff',
        textMuted: 'rgba(255, 255, 255, 0.7)',
        border: 'rgba(233, 213, 255, 0.2)'
      };
    default:
      return {
        bg: '#001f3f',
        card: '#003366',
        text: '#ffffff',
        textMuted: 'rgba(255, 255, 255, 0.7)',
        border: 'rgba(255, 255, 255, 0.1)'
      };
  }
}

export default function SingleProductPage({ params }: PageProps) {
  const { category, size, productId } = params;
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const categoryKey = categoryNames[category] || category;
  
  // Parse productId to get index
  const productIndex = parseInt(productId.split('-').pop() || '0');
  
  // Get products for this category and size
  const categoryData = (productsData as any)[categoryKey];
  const products = categoryData?.[size] || [];

  // Get product images for this category and size
  const productImages = getProductImages(category, size);
  
  const product = products[productIndex];
  const image = productImages[productIndex];

  const categoryDisplayName = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  if (!image && !product) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: colors.bg }}>
        <Navbar />
        <section className="pt-32 pb-24 px-6 text-center">
          <p className="text-lg" style={{ color: colors.textMuted }}>Product not found.</p>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.bg }}>
      <Navbar />
      
      <section 
        className="pt-32 pb-24 px-6" 
        style={{ 
          paddingLeft: 'var(--padding)', 
          paddingRight: 'var(--padding)',
          backgroundColor: colors.bg
        }}
      >
        <div className="max-w-7xl mx-auto">
          <Link 
            href={`/products/${category}/${size}`} 
            className="inline-flex items-center mb-8 transition-opacity hover:opacity-70"
            style={{ color: colors.textMuted }}
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to {categoryDisplayName} {size}mm
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            {image && (
              <div className="sticky top-24">
                <div 
                  className="relative w-full h-[600px] rounded-xl overflow-hidden border backdrop-blur-sm"
                  style={{
                    backgroundColor: colors.card + '80',
                    borderColor: colors.border
                  }}
                >
                  <ProductImage
                    src={image.path}
                    alt={image.alt}
                    fill
                    className="object-contain p-8"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            )}

            {/* Product Details */}
            <div className="space-y-8">
              {/* Part Number - Prominent Title */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight" style={{ color: colors.text }}>
                  {product?.partNumber || image?.alt || 'Product Details'}
                </h1>
              </div>

              {/* Model Application - Subtitle */}
              {product?.modelApplication && (
                <div>
                  <p className="text-base md:text-lg leading-relaxed" style={{ color: colors.textMuted }}>
                    {product.modelApplication}
                  </p>
                </div>
              )}

              {product && (
                <div className="space-y-8">
                  {/* OEM Cross Reference */}
                  {product.oemCrossReference && product.oemCrossReference.trim() && (
                    <div className="pb-8 border-b" style={{ borderColor: colors.border }}>
                      <h3 className="text-xs font-bold uppercase mb-4 tracking-widest" style={{ color: colors.textMuted, letterSpacing: '0.1em' }}>
                        OEM REFERENCE
                      </h3>
                      <p className="text-base leading-relaxed" style={{ color: colors.text }}>
                        {product.oemCrossReference}
                      </p>
                    </div>
                  )}

                  {/* Special Features - Formatted as List */}
                  {product.specialFeatures && product.specialFeatures.trim() && (
                    <div className="pb-8 border-b" style={{ borderColor: colors.border }}>
                      <h3 className="text-xs font-bold uppercase mb-4 tracking-widest" style={{ color: colors.textMuted, letterSpacing: '0.1em' }}>
                        SPECIAL FEATURES
                      </h3>
                      <ul className="space-y-2">
                        {product.specialFeatures.split(',').map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <span className="mr-3 mt-1.5" style={{ color: colors.textMuted }}>•</span>
                            <span className="text-base leading-relaxed flex-1" style={{ color: colors.textMuted }}>
                              {feature.trim()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Specifications - Formatted List */}
                  {product.specs && product.specs.trim() && (
                    <div>
                      <h3 className="text-xs font-bold uppercase mb-4 tracking-widest" style={{ color: colors.textMuted, letterSpacing: '0.1em' }}>
                        SPECIFICATIONS
                      </h3>
                      <ul className="space-y-2">
                        {product.specs.split(',').map((spec: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <span className="mr-3 mt-1.5" style={{ color: colors.textMuted }}>•</span>
                            <span className="text-base leading-relaxed flex-1" style={{ color: colors.textMuted }}>
                              {spec.trim()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {!product && image && (
                <div>
                  <p className="text-lg leading-relaxed" style={{ color: colors.textMuted }}>
                    {image.alt}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

