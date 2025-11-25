import productsData from '@/data/products.json';
import { getProductImages } from './imageMapping';

export interface SearchResult {
  id: string;
  title: string;
  category: string;
  diameter: string;
  image?: string;
  partNumber?: string;
  oemReference?: string;
  model?: string;
}

// Flatten product data for searching
function flattenProducts(): SearchResult[] {
  const results: SearchResult[] = [];
  const data = productsData as any;

  Object.keys(data).forEach((categoryKey) => {
    const category = categoryKey.replace('_', '-');
    const categoryData = data[categoryKey];

    Object.keys(categoryData).forEach((diameter) => {
      const products = categoryData[diameter] || [];
      const images = getProductImages(category, diameter);

      products.forEach((product: any, idx: number) => {
        results.push({
          id: `${category}-${diameter}-${idx}`,
          title: product.partNumber || `${category} ${diameter}mm`,
          category,
          diameter,
          image: images[idx]?.path || images[0]?.path,
          partNumber: product.partNumber,
          oemReference: product.oemCrossReference,
          model: product.modelApplication,
        });
      });

      // Also add image-only entries if no product data exists
      if (products.length === 0 && images.length > 0) {
        images.forEach((image, idx) => {
          results.push({
            id: `${category}-${diameter}-${idx}`,
            title: image.alt || `${category} ${diameter}mm`,
            category,
            diameter,
            image: image.path,
          });
        });
      }
    });
  });

  return results;
}

let cachedProducts: SearchResult[] | null = null;

function getCachedProducts(): SearchResult[] {
  if (!cachedProducts) {
    cachedProducts = flattenProducts();
  }
  return cachedProducts;
}

export function searchProducts(query: string): SearchResult[] {
  if (!query.trim()) return [];

  const products = getCachedProducts();
  const lowerQuery = query.toLowerCase();

  return products.filter((product) => {
    const searchableText = [
      product.title,
      product.partNumber,
      product.oemReference,
      product.model,
      product.category,
      product.diameter,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return searchableText.includes(lowerQuery);
  });
}

