import { NextRequest, NextResponse } from 'next/server';
import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const resolvedParams = await params;
    // Reconstruct the filename from the path segments
    let requestedFilename = resolvedParams.path.join('/');
    
    // Try to decode if it's URL encoded
    try {
      requestedFilename = decodeURIComponent(requestedFilename);
    } catch {
      // Already decoded or invalid encoding, use as-is
    }
    
    const productsDir = join(process.cwd(), 'public', 'images', 'products');
    
    // Always read directory first to get actual filenames
    let actualFilename = requestedFilename;
    let imagePath = join(productsDir, actualFilename);
    
    try {
      const files = await readdir(productsDir);
      
      console.log(`[API] Looking for: "${requestedFilename}"`);
      console.log(`[API] Total files in directory: ${files.length}`);
      
      // Try exact match first (byte-for-byte)
      let matchingFile = files.find(file => file === requestedFilename);
      
      if (matchingFile) {
        console.log(`[API] ✓ Exact match found: "${matchingFile}"`);
      } else {
        console.log(`[API] No exact match, trying normalized match...`);
      
        // Normalize the requested filename for comparison
        // Handle Unicode quotes (" and ") and regular quotes (")
        const normalizeForMatch = (str: string) => {
          return str
            .toLowerCase()
            .replace(/\s+/g, ' ')
            .replace(/[""""]/g, '"')  // Normalize all quote types to regular quote
            .replace(/[''']/g, "'")  // Normalize all apostrophe types
            .trim();
        };
        
        const normalizedRequested = normalizeForMatch(requestedFilename);
        
        // Try normalized comparison
        matchingFile = files.find(file => {
          const normalizedFile = normalizeForMatch(file);
          if (normalizedFile === normalizedRequested) {
            return true;
          }
          // Also try byte-by-byte comparison after normalization
          return normalizedFile === normalizedRequested;
        });
        
        // If still no match, try character-by-character comparison ignoring quote variations
        if (!matchingFile) {
          matchingFile = files.find(file => {
            // Compare ignoring Unicode vs regular quotes
            const fileNormalized = file.replace(/[""""]/g, '"').replace(/[''']/g, "'");
            const requestedNormalized = requestedFilename.replace(/[""""]/g, '"').replace(/[''']/g, "'");
            return fileNormalized.toLowerCase() === requestedNormalized.toLowerCase();
          });
        }
        
        // If still no match, try partial matching with key words
        if (!matchingFile) {
          const extractKeywords = (str: string) => {
            return str
              .toLowerCase()
              .replace(/^\d+mm[^(]*\([^)]*\)\s*/, '') // Remove size prefix
              .split(/\s+/)
              .filter(part => part.length > 2 && !['mm', 'pad', 'al'].includes(part))
              .join(' ');
          };
          
          const requestedKeywords = extractKeywords(requestedFilename);
          
          matchingFile = files.find(file => {
            const fileKeywords = extractKeywords(file);
            return fileKeywords.includes(requestedKeywords) || requestedKeywords.includes(fileKeywords);
          });
        }
      
        if (matchingFile) {
          actualFilename = matchingFile;
          imagePath = join(productsDir, actualFilename);
          console.log(`[API] ✓ Found file: "${actualFilename}"`);
        } else {
          console.error(`[API] ✗ File not found: "${requestedFilename}"`);
          console.log(`[API] Available files that start with "430":`, files.filter(f => f.startsWith('430')).slice(0, 3));
          console.log(`[API] First 5 files:`, files.slice(0, 5));
          return new NextResponse(`Image not found: ${requestedFilename}`, { status: 404 });
        }
      }
    } catch (dirError) {
      console.error('Error reading directory:', dirError);
      return new NextResponse('Error reading directory', { status: 500 });
    }
    
    // Check if file exists
    if (!existsSync(imagePath)) {
      console.error('Image file not found. Requested:', requestedFilename, 'Path:', imagePath);
      return new NextResponse(`Image not found: ${requestedFilename}`, { status: 404 });
    }
    
    try {
      // Read the image file
      const imageBuffer = await readFile(imagePath);
      
      // Determine content type
      const ext = actualFilename.split('.').pop()?.toLowerCase();
      const contentType = ext === 'png' ? 'image/png' : 
                         ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 
                         'image/png';
      
      return new NextResponse(imageBuffer, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    } catch (fileError) {
      console.error('Error reading file:', imagePath, fileError);
      return new NextResponse('Error reading image', { status: 500 });
    }
  } catch (error) {
    console.error('Error serving image:', error);
    return new NextResponse('Error serving image', { status: 500 });
  }
}

