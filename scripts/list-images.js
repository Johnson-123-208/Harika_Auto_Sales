const fs = require('fs');
const path = require('path');

const productsDir = path.join(process.cwd(), 'public', 'images', 'products');

try {
  const files = fs.readdirSync(productsDir);
  console.log('=== EXACT FILENAMES IN DIRECTORY ===');
  files.forEach((file, index) => {
    console.log(`${index + 1}. "${file}"`);
    // Show character codes for special characters
    const specialChars = file.match(/[""''&()]/g);
    if (specialChars) {
      console.log(`   Special chars: ${specialChars.map(c => `${c} (${c.charCodeAt(0)})`).join(', ')}`);
    }
  });
  console.log(`\nTotal files: ${files.length}`);
  
  // Group by size
  const bySize = {};
  files.forEach(file => {
    const sizeMatch = file.match(/^(\d+)mm/);
    if (sizeMatch) {
      const size = sizeMatch[1];
      if (!bySize[size]) bySize[size] = [];
      bySize[size].push(file);
    }
  });
  
  console.log('\n=== GROUPED BY SIZE ===');
  Object.keys(bySize).sort().forEach(size => {
    console.log(`\n${size}mm (${bySize[size].length} files):`);
    bySize[size].forEach(file => console.log(`  - "${file}"`));
  });
} catch (error) {
  console.error('Error reading directory:', error);
}

