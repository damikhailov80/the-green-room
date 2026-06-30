import { Product } from '../types';
import { products } from '../data/products';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getProducts(): Promise<Product[]> {
  await delay(300);
  return products;
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  await delay(200);
  return products.find(p => p.slug === slug);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  await delay(200);
  return products.find(p => p.id === id);
}

export async function searchProducts(query: string): Promise<Product[]> {
  await delay(300);
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.latinName.toLowerCase().includes(lowerQuery) ||
    p.shortDescription.toLowerCase().includes(lowerQuery)
  );
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  await delay(300);
  return products.filter(p => p.category === categorySlug);
}

export async function getFeaturedProducts(limit: number = 4): Promise<Product[]> {
  await delay(300);
  return products
    .filter(p => p.rating >= 4.7)
    .slice(0, limit);
}

export async function getRelatedProducts(productId: string, limit: number = 4): Promise<Product[]> {
  await delay(300);
  const product = products.find(p => p.id === productId);
  if (!product) return [];
  
  return products
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, limit);
}
