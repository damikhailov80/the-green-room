import { Category } from '../types';
import { categories } from '../data/categories';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getCategories(): Promise<Category[]> {
  await delay(200);
  return categories;
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  await delay(200);
  return categories.find(c => c.slug === slug);
}
