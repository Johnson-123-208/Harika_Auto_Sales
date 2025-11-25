// Explicit mapping of image filenames to product part numbers
// This ensures correct matching between images and product information from the PDF

export interface ImageProductMapping {
  [filename: string]: {
    category: string;
    size: string;
    partNumber: string;
  };
}

// Mapping image filenames to product part numbers
// Format: 'exact filename': { category, size, partNumber }
export const IMAGE_PRODUCT_MAP: ImageProductMapping = {
  // 430mm Cover Assembly images
  '430mm (17") Benz Cover Assembly.png': {
    category: 'cover-assembly',
    size: '430',
    partNumber: 'G-BB4302-DCA'
  },
  '430mm (17") Eicher Pro Cover Assembly.png': {
    category: 'cover-assembly',
    size: '430',
    partNumber: 'G-E4305-DCA'
  },
  '430mm (17") Man Cover Assembly.png': {
    category: 'cover-assembly',
    size: '430',
    partNumber: 'G-M4311-DCA'
  },
  '430mm (17") Prima Cover Assembly.png': {
    category: 'cover-assembly',
    size: '430',
    partNumber: 'G-BB4302-DCA' // Prima may use same as Benz
  },
  
  // 430mm Clutch Disc images
  '430mm (17 ") Prima Disc Assembly.png': {
    category: 'clutch-disc',
    size: '430',
    partNumber: '430mm (17) Prima Disc Assembly'
  },
  '430mm (17") Benz Disc Assembly.png': {
    category: 'clutch-disc',
    size: '430',
    partNumber: '430mm (17) Benz Disc Assembly'
  },
  '430mm (17") Eicher Pro Disc Assembly.png': {
    category: 'clutch-disc',
    size: '430',
    partNumber: 'G-E4306-CD'
  },
  
  // 395mm Cover Assembly images
  '395mm(15.5) AL Diaphragm Cover Assembly.png': {
    category: 'cover-assembly',
    size: '395',
    partNumber: '395mm(15.5) AL Diaphragm Cover Assembly'
  },
  '395mm(15.5") Benz Diaphragm Cover Assembly.png': {
    category: 'cover-assembly',
    size: '395',
    partNumber: '395mm(15.5) Benz Diaphragm Cover Assembly'
  },
  '395mm(15.5 ") Eicher Pro Diaphragm Assembly.png': {
    category: 'cover-assembly',
    size: '395',
    partNumber: '395mm(15.5) Eicher Pro Diaphragm Assembly'
  },
  '395mm(15.5") Mahindra Navistar Cover Assembly.png': {
    category: 'cover-assembly',
    size: '395',
    partNumber: '395mm(15.5) Mahindra Navistar Cover Assembly'
  },
  
  // 395mm Clutch Disc images
  '395mm(15.5) Mahindra Navistar Disc Assembly.png': {
    category: 'clutch-disc',
    size: '395',
    partNumber: '395mm(15.5) Mahindra Navistar Disc Assembly'
  },
  '395mm(15.5") 8 Pad Ceramic AL Clutch Disc Assembly.png': {
    category: 'clutch-disc',
    size: '395',
    partNumber: '395mm(15.5) 8 Pad Ceramic AL Clutch Disc Assembly'
  },
  '395mm(15.5") AL Organic Cushion Disc Assembly.png': {
    category: 'clutch-disc',
    size: '395',
    partNumber: '395mm(15.5) AL Organic Cushion Disc Assembly'
  },
  '395mm(15.5") Benz Clutch Disc Assembly.png': {
    category: 'clutch-disc',
    size: '395',
    partNumber: '395mm(15.5) Benz Clutch Disc Assembly'
  },
  '395mm(15.5") Ceramic & Organic Eicher Pro Disc Assembly.png': {
    category: 'clutch-disc',
    size: '395',
    partNumber: '395mm(15.5) Ceramic & Organic Eicher Pro Disc Assembly'
  },
  
  // 380mm Cover Assembly images
  '380mm (15") Conventional Cover Assembly.png': {
    category: 'cover-assembly',
    size: '380',
    partNumber: '380mm (15) Conventional Cover Assembly'
  },
  '380mm(15") Diaphragm Cover Assembly.png': {
    category: 'cover-assembly',
    size: '380',
    partNumber: '380mm(15) Diaphragm Cover Assembly'
  },
  
  // 380mm Clutch Disc images
  "380mm (15')AL Clutch Disc Assembly.png": {
    category: 'clutch-disc',
    size: '380',
    partNumber: "380mm (15')AL Clutch Disc Assembly"
  },
  '380mm (15") Ceramic Clutch Disc Assembly.png': {
    category: 'clutch-disc',
    size: '380',
    partNumber: '380mm (15) Ceramic Clutch Disc Assembly'
  },
  '380mm (15") Organic Clutch Disc Assembly.png': {
    category: 'clutch-disc',
    size: '380',
    partNumber: '380mm (15) Organic Clutch Disc Assembly'
  },
  
  // 362mm Cover Assembly images
  '362mm (14.5") M & M Diaphragm Cover Assembly.png': {
    category: 'cover-assembly',
    size: '360',
    partNumber: '362mm (14.5) M & M Diaphragm Cover Assembly'
  },
  
  // 362mm Clutch Disc images
  '362mm (14.5") Benz Clutch Disc Assembly.png': {
    category: 'clutch-disc',
    size: '360',
    partNumber: '362mm (14.5) Benz Clutch Disc Assembly'
  },
  '362mm (14.5") M & M Clutch Disc Assembly.png': {
    category: 'clutch-disc',
    size: '360',
    partNumber: '362mm (14.5) M & M Clutch Disc Assembly'
  },
  
  // 352mm Cover Assembly images
  '352mm (14") Conventational Cover Assembly.png': {
    category: 'cover-assembly',
    size: '350',
    partNumber: '352mm (14) Conventational Cover Assembly'
  },
  '352mm (14") Conventional CoverAssembly.png': {
    category: 'cover-assembly',
    size: '350',
    partNumber: '352mm (14) Conventional CoverAssembly'
  },
  
  // 352mm Clutch Disc images
  '352mm (14") Ceramic Clutch Disc Assembly.png': {
    category: 'clutch-disc',
    size: '350',
    partNumber: 'G-T352-BD / G-T353-BD / G-AL352-BD'
  },
  '352mm (14") Clutch Disc Assembly.png': {
    category: 'clutch-disc',
    size: '350',
    partNumber: 'G-T352-F510'
  },
};

// Helper to normalize filenames for comparison (handles Unicode quotes and spaces)
function normalizeFilename(filename: string): string {
  return filename
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Helper to find best matching product when exact match isn't found
function findBestMatchByKeywords(
  filename: string,
  products: any[]
): any | undefined {
  const normalizedFilename = normalizeFilename(filename.toLowerCase());
  
  // Extract meaningful keywords from filename
  const keywords = normalizedFilename
    .replace(/^\d+mm[^a-z]*/, '')
    .replace(/\.png$/, '')
    .split(/\s+/)
    .filter(term => term.length > 2 && !['mm', 'pad', 'al', 'clutch', 'disc', 'assembly', 'cover'].includes(term));
  
  if (keywords.length === 0) return undefined;
  
  let bestMatch: any | undefined = undefined;
  let bestScore = 0;
  
  for (const product of products) {
    const partNumber = normalizeFilename(product.partNumber?.toLowerCase() || '');
    const modelApp = product.modelApplication?.toLowerCase() || '';
    const features = product.specialFeatures?.toLowerCase() || '';
    const productText = `${partNumber} ${modelApp} ${features}`;
    
    // Calculate match score
    let score = 0;
    for (const keyword of keywords) {
      if (productText.includes(keyword)) {
        score += keyword.length; // Longer matches are better
      }
    }
    
    // Bonus for part number matches
    if (keywords.some(k => partNumber.includes(k))) {
      score *= 2;
    }
    
    if (score > bestScore) {
      bestScore = score;
      bestMatch = product;
    }
  }
  
  return bestMatch;
}

// Helper function to find product by part number
export function findProductByPartNumber(
  products: any[],
  partNumber: string
): any | undefined {
  return products.find(
    (p) => p.partNumber === partNumber || 
           p.partNumber?.toLowerCase() === partNumber.toLowerCase()
  );
}

// Helper function to get product for an image filename
export function getProductForImage(
  filename: string,
  category: string,
  size: string,
  products: any[]
): any | undefined {
  const mapping = IMAGE_PRODUCT_MAP[filename];
  
  // First try explicit mapping
  if (mapping && mapping.category === category && mapping.size === size) {
    const matchedProduct = findProductByPartNumber(products, mapping.partNumber);
    if (matchedProduct) return matchedProduct;
  }
  
  // Second try: check if filename (without extension) exactly matches a product part number
  const filenameWithoutExt = filename.replace(/\.png$/i, '').trim();
  const exactMatch = products.find(
    (p) => p.partNumber && 
           (normalizeFilename(p.partNumber) === normalizeFilename(filenameWithoutExt) ||
            p.partNumber === filenameWithoutExt)
  );
  if (exactMatch) return exactMatch;
  
  // Third try: intelligent keyword matching
  const keywordMatch = findBestMatchByKeywords(filename, products);
  if (keywordMatch) return keywordMatch;
  
  return undefined;
}

