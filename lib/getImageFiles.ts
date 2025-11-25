import { readdir } from 'fs/promises';
import { join } from 'path';

// Cache for file listings
let fileCache: { [size: string]: string[] } | null = null;

export async function getActualImageFiles(): Promise<{ [size: string]: string[] }> {
  if (fileCache) {
    return fileCache;
  }

  const productsDir = join(process.cwd(), 'public', 'images', 'products');
  
  try {
    const files = await readdir(productsDir);
    
    // Group files by size
    const filesBySize: { [size: string]: string[] } = {
      '430': [],
      '395': [],
      '380': [],
      '360': [],
      '350': []
    };
    
    files.forEach(file => {
      // Extract size from filename
      const sizeMatch = file.match(/^(\d+)mm/);
      if (sizeMatch) {
        const size = sizeMatch[1];
        // Map to our size keys
        if (size === '430') filesBySize['430'].push(file);
        else if (size === '395') filesBySize['395'].push(file);
        else if (size === '380') filesBySize['380'].push(file);
        else if (size === '362') filesBySize['360'].push(file);  // Map 362 to 360
        else if (size === '352') filesBySize['350'].push(file);  // Map 352 to 350
      }
    });
    
    fileCache = filesBySize;
    return filesBySize;
  } catch (error) {
    console.error('Error reading image directory:', error);
    return {};
  }
}

