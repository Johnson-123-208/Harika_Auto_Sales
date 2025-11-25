"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { searchProducts } from '@/lib/search';
import { useTheme } from '@/contexts/ThemeContext';
import { Palette } from 'lucide-react';
import LogoPopup from './LogoPopup';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  
  const { theme, cycleTheme, themeName } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoPopupOpen, setLogoPopupOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Hide navbar on landing page
  const isLandingPage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const timer = setTimeout(() => {
      const results = searchProducts(searchQuery);
      setSearchResults(results);
      setShowResults(results.length > 0);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchResultClick = (result: any) => {
    router.push(`/products/${result.category}/${result.diameter}/${result.id}`);
    setSearchQuery('');
    setShowResults(false);
    setIsSearchFocused(false);
  };

  if (isLandingPage) {
    return null;
  }

  return (
    <nav 
      className="fixed w-full z-50 transition-all duration-300 backdrop-blur-xl"
      style={{ 
        height: '80px',
        backgroundColor: 'var(--theme-bg-primary)',
        opacity: scrolled ? 0.98 : 0.95,
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="max-w-7xl mx-auto h-full" style={{ paddingLeft: 'var(--padding)', paddingRight: 'var(--padding)' }}>
        <div className="h-full flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setLogoPopupOpen(true)}
              className="relative w-14 h-14 flex items-center justify-center transition-transform duration-300 hover:scale-110 cursor-pointer"
            >
              <Image
                src="/images/logo.png"
                alt="HAC – Harika Auto Center Logo"
                width={56}
                height={56}
                className="object-contain transition-transform duration-300 hover:rotate-12"
                priority
              />
            </button>
            <Link 
              href="/home" 
              className="text-2xl font-bold transition-colors duration-300 text-[var(--theme-text-primary)] hover:text-[var(--theme-bg-secondary)]"
            >
              Harika Auto Center
            </Link>
          </div>
          
          {/* Logo Popup */}
          <LogoPopup 
            isOpen={logoPopupOpen} 
            onClose={() => setLogoPopupOpen(false)} 
          />

          {/* Menu Items */}
          <div className="flex items-center space-x-6">
            <Link 
              href="/home" 
              className="relative font-medium transition-colors duration-300 text-[var(--theme-text-primary)] hover:text-[var(--theme-bg-secondary)]"
              style={{
                color: pathname === '/home' 
                  ? 'var(--theme-bg-secondary)'
                  : 'var(--theme-text-primary)'
              }}
            >
              {pathname === '/home' && (
                <div
                  className="absolute -bottom-1 left-0 right-0 h-0.5"
                  style={{ backgroundColor: 'var(--theme-bg-secondary)' }}
                />
              )}
              <span className="block">
                Home
              </span>
            </Link>
            <Link 
              href="/products" 
              className="relative font-medium transition-colors duration-300 text-[var(--theme-text-primary)] hover:text-[var(--theme-bg-secondary)]"
              style={{
                color: pathname?.startsWith('/products')
                  ? 'var(--theme-bg-secondary)'
                  : 'var(--theme-text-primary)'
              }}
            >
              {pathname?.startsWith('/products') && (
                <div
                  className="absolute -bottom-1 left-0 right-0 h-0.5"
                  style={{ backgroundColor: 'var(--theme-bg-secondary)' }}
                />
              )}
              <span className="block">
                Products
              </span>
            </Link>
            
            {/* Theme Switcher */}
            <div className="relative group">
              <button
                onClick={cycleTheme}
                className="p-2 rounded-lg transition-all duration-300 relative overflow-hidden border"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'var(--theme-text-primary)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
                aria-label="Change theme"
                title={`Current theme: ${themeName}. Click to change.`}
              >
                <Palette size={20} />
                {/* Theme indicator dot */}
                <div
                  className="absolute bottom-1 right-1 w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: 'var(--theme-bg-secondary)'
                  }}
                />
              </button>
              
              {/* Tooltip */}
              <div
                className="absolute top-full right-0 mt-2 px-3 py-1.5 rounded-lg text-xs font-medium pointer-events-none whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                {themeName}
              </div>
            </div>
            
            {/* Search Bar */}
            <div ref={searchRef} className="relative">
              <div 
                className={`relative flex items-center transition-all duration-300 ${
                  isSearchFocused ? 'w-80' : 'w-64'
                }`}
              >
                <Search 
                  className="absolute left-3 transition-colors opacity-70" 
                  size={18} 
                  style={{ color: 'var(--theme-text-primary)' }}
                />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search products…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    setIsSearchFocused(true);
                    if (searchResults.length > 0) setShowResults(true);
                  }}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl transition-all duration-300 border focus:outline-none"
                  style={{
                    backgroundColor: 'var(--theme-bg-primary)',
                    borderColor: 'var(--theme-accent)50',
                    color: 'var(--theme-text-primary)',
                    opacity: 0.9
                  }}
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setShowResults(false);
                      inputRef.current?.focus();
                    }}
                    className="absolute right-3 transition-opacity hover:opacity-70"
                    style={{ color: 'var(--theme-text-primary)' }}
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div
                  className="absolute top-full right-0 mt-3 w-96 rounded-lg shadow-xl max-h-96 overflow-hidden backdrop-blur-xl border"
                  style={{
                    backgroundColor: 'var(--theme-bg-primary)',
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="max-h-96 overflow-y-auto scrollbar-thin">
                    {searchResults.map((result, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSearchResultClick(result)}
                        className="p-4 cursor-pointer border-b transition-colors hover:opacity-80 last:border-0"
                        style={{
                          borderColor: 'var(--theme-accent)20',
                          color: 'var(--theme-text-primary)'
                        }}
                      >
                        <div className="flex items-start space-x-3">
                          {result.image && (
                            <div 
                              className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden"
                              style={{ backgroundColor: 'var(--theme-accent)20' }}
                            >
                              <Image
                                src={result.image}
                                alt={result.title}
                                fill
                                className="object-contain p-1"
                                sizes="64px"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold truncate" style={{ color: 'var(--theme-text-primary)' }}>{result.title}</h4>
                            <p className="text-sm opacity-70">
                              {result.diameter}mm • {result.category}
                            </p>
                            {result.partNumber && (
                              <p className="text-xs mt-1" style={{ color: 'var(--theme-bg-secondary)' }}>Part: {result.partNumber}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
