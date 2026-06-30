'use client';

import { Container } from '@/components/Container';
import { ProductCard } from '@/components/ProductCard';
import { SearchInput } from '@/components/SearchInput';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Product, Category } from '@/lib/types';

export default function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  const selectedCategory = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  // Load data once on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products').then(r => r.json()),
          fetch('/api/categories').then(r => r.json())
        ]);
        setAllProducts(productsRes);
        setCategories(categoriesRes);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Client-side filtering - instant!
  const filteredProducts = allProducts.filter(product => {
    // Filter by category
    if (selectedCategory && product.category !== selectedCategory) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.latinName.toLowerCase().includes(query) ||
        product.shortDescription.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  // Calculate page title
  let pageTitle = 'All Plants';
  if (selectedCategory) {
    const category = categories.find(c => c.slug === selectedCategory);
    if (category) {
      pageTitle = category.name;
    }
  }
  if (searchQuery) {
    pageTitle = `Search results for "${searchQuery}"`;
  }

  if (loading) {
    return (
      <div className="py-12">
        <Container>
          <div className="text-center">
            <p className="text-lg text-gray-600">Loading products...</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12">
      <Container>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{pageTitle}</h1>
          <div className="flex items-center justify-between">
            <p className="text-lg text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
            </p>
            <SearchInput />
          </div>
          {/* Проблема: Низкий контраст текста */}
          <p className="text-sm mt-2" style={{ color: '#999999' }}>
            Free shipping on orders over $50
          </p>
        </div>

        {/* Categories Filter */}
        <div className="mb-12">
          <h2 className="text-sm font-medium text-gray-900 mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.delete('category');
                const newUrl = params.toString() ? `/shop?${params.toString()}` : '/shop';
                router.push(newUrl);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                !selectedCategory
                  ? 'bg-green-800 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Plants
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set('category', category.slug);
                  router.push(`/shop?${params.toString()}`);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                  selectedCategory === category.slug
                    ? 'bg-green-800 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 mb-4">No products found</p>
            {searchQuery && (
              <button
                onClick={() => {
                  router.push('/shop');
                }}
                className="text-green-800 hover:text-green-900 font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded"
              >
                Clear search and view all products
              </button>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}
