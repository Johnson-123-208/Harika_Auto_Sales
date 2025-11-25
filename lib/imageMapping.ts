// Image mapping utility to match product images to categories and sizes
// Using EXACT filenames from the products folder as listed in directory

export interface ImageInfo {
  path: string;
  alt: string;
  exactFilename: string; // Store exact filename for API route
}

// EXACT filenames from public/images/products/ directory
// These are copied EXACTLY from the directory listing - DO NOT MODIFY CHARACTERS
const EXACT_FILENAMES: { [key: string]: string[] } = {
  '430': [
    '430mm (17 ") Prima Disc Assembly.png',
    '430mm (17") Benz Cover Assembly.png',
    '430mm (17") Benz Disc Assembly.png',
    '430mm (17") Eicher Pro Cover Assembly.png',
    '430mm (17") Eicher Pro Disc Assembly.png',
    '430mm (17") Man Cover Assembly.png',
    '430mm (17") Prima Cover Assembly.png'
  ],
  '395': [
    '395mm(15.5 ") Eicher Pro Diaphragm Assembly.png',
    '395mm(15.5) AL Diaphragm Cover Assembly.png',
    '395mm(15.5) Mahindra Navistar Disc Assembly.png',
    '395mm(15.5") 8 Pad Ceramic AL Clutch Disc Assembly.png',
    '395mm(15.5") AL Organic Cushion Disc Assembly.png',
    '395mm(15.5") Benz Clutch Disc Assembly.png',
    '395mm(15.5") Benz Diaphragm Cover Assembly.png',
    '395mm(15.5") Ceramic & Organic Eicher Pro Disc Assembly.png',
    '395mm(15.5") Mahindra Navistar Cover Assembly.png'
  ],
  '380': [
    "380mm (15')AL Clutch Disc Assembly.png",
    '380mm (15") Ceramic Clutch Disc Assembly.png',
    '380mm (15") Conventional Cover Assembly.png',
    '380mm (15") Organic Clutch Disc Assembly.png',
    '380mm(15") Diaphragm Cover Assembly.png'
  ],
  '360': [
    '362mm (14.5") Benz Clutch Disc Assembly.png',
    '362mm (14.5") M & M Clutch Disc Assembly.png',
    '362mm (14.5") M & M Diaphragm Cover Assembly.png'
  ],
  '350': [
    '352mm (14") Ceramic Clutch Disc Assembly.png',
    '352mm (14") Clutch Disc Assembly.png',
    '352mm (14") Conventational Cover Assembly.png',
    '352mm (14") Conventional CoverAssembly.png'
  ]
};

// Get all available images for a category and size
export function getProductImages(category: string, size: string): ImageInfo[] {
  const images: ImageInfo[] = [];
  
  const files = EXACT_FILENAMES[size] || [];
  if (files.length === 0) return images;
  
  // Category keywords to match images
  const categoryKeywords: { [key: string]: string[] } = {
    'cover-assembly': [
      'Cover Assembly',
      'CoverAssembly',
      'Diaphragm Cover Assembly',
      'Diaphragm Assembly',
      'Conventional Cover Assembly',
      'Conventational Cover Assembly'
    ],
    'clutch-disc': [
      'Clutch Disc Assembly',
      'Disc Assembly',
      'Clutch Disc',
      'Ceramic Clutch Disc',
      'Organic Clutch Disc',
      'AL Clutch Disc',
      'Ceramic & Organic',
      '8 Pad Ceramic',
      'AL Organic Cushion Disc',
      'Mahindra Navistar Disc'
    ],
    'repair-kits': [],
    'fly-wheel': []
  };

  const keywords = categoryKeywords[category] || [];
  
  // Create image path - use API route with exact filename
  const createImageInfo = (filename: string): ImageInfo => {
    return {
      path: `/images/products/${filename}`,  // Component will convert to API route
      alt: extractAltText(filename),
      exactFilename: filename
    };
  };
  
  // If no keywords, return all files for that size
  if (keywords.length === 0) {
    return files.map(file => createImageInfo(file));
  }
  
  // Filter files by category keywords
  files.forEach(file => {
    const fileLower = file.toLowerCase();
    const matchesCategory = keywords.some(keyword => 
      fileLower.includes(keyword.toLowerCase())
    );
    
    if (matchesCategory) {
      images.push(createImageInfo(file));
    }
  });

  return images;
}

// Extract a clean alt text from filename
function extractAltText(filename: string): string {
  // Remove .png extension
  let alt = filename.replace('.png', '');
  
  // Remove size prefix (e.g., "430mm (17") " or "395mm(15.5") ")
  alt = alt.replace(/^\d+mm\s*\([^)]*\)\s*/, '');
  alt = alt.replace(/^\d+mm\s*\([^)]*\)/, '');
  
  // Clean up any remaining extra spaces
  alt = alt.trim().replace(/\s+/g, ' ');
  
  return alt || filename.replace('.png', '');
}
