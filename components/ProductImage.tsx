"use client";
import React, { useState } from 'react';
import Image from 'next/image';

interface ProductImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  width?: number;
  height?: number;
}

export default function ProductImage({ 
  src, 
  alt, 
  fill = false, 
  className = "", 
  sizes,
  width,
  height 
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  // Handle image loading errors
  const handleError = () => {
    if (!hasError) {
      // If using API route, try direct path as fallback
      if (src.startsWith('/api/images/')) {
        const filename = src.replace('/api/images/products/', '');
        try {
          const decoded = decodeURIComponent(filename);
          setImgSrc(`/images/products/${decoded}`);
        } catch {
          setHasError(true);
        }
      } else {
        setHasError(true);
      }
    } else {
      setHasError(true);
      console.error('Failed to load image:', src);
    }
  };

  if (hasError) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={fill ? undefined : { width, height }}>
        <span className="text-slate-400">Image not available</span>
      </div>
    );
  }

  // Convert image path to use API route if it's from /images/products/
  // This ensures proper handling of special characters
  const getImageSrc = (src: string): string => {
    if (src.startsWith('/images/products/')) {
      const filename = src.replace('/images/products/', '');
      // Use API route for proper file handling
      return `/api/images/products/${encodeURIComponent(filename)}`;
    }
    return src;
  };

  const imageSrc = getImageSrc(imgSrc);
  
  // Use regular img tag for better compatibility with special characters
  if (fill) {
    return (
      <div className={`relative ${className}`} style={{ width: '100%', height: '100%' }}>
        <img
          src={imageSrc}
          alt={alt}
          className="object-contain w-full h-full p-8"
          onError={handleError}
          loading="lazy"
        />
      </div>
    );
  }
  
  return (
    <img
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );

}

