# The Green Room 🌱

A minimalist e-commerce demo application for indoor plants and succulents, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Complete Shopping Experience**: Browse products, view details, add to cart, and checkout
- **20 Products**: Curated collection of indoor plants, succulents, and planters
- **Category Filtering**: Browse by Indoor Plants, Succulents, Large Plants, Easy Care, or Pots
- **Product Details**: Comprehensive information including care instructions and specifications
- **Shopping Cart**: Full cart management with quantity controls
- **Checkout Flow**: Simple form-based checkout with order confirmation
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop
- **Accessibility First**: WCAG AA compliant with semantic HTML and proper ARIA labels

## Design Philosophy

The design is inspired by Scandinavian minimalism:
- Bright, clean layouts with ample whitespace
- Subtle green accent color (#166534)
- System fonts for optimal performance
- Rounded corners and soft shadows
- Premium, boutique aesthetic

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: React hooks + localStorage
- **No external dependencies** for UI components
- **No database** - all data is mocked
- **No authentication** required

## Project Structure

```
├── app/                    # Next.js app router pages
│   ├── about/             # About page
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout page
│   ├── contact/           # Contact page
│   ├── order-success/     # Order confirmation page
│   ├── products/[slug]/   # Dynamic product pages
│   └── shop/              # Product listing page
├── components/            # Reusable React components
├── lib/                   # Business logic and utilities
│   ├── api/              # Mock API functions
│   ├── data/             # Mock product and category data
│   ├── cart.ts           # Cart management utilities
│   ├── types.ts          # TypeScript type definitions
│   └── utils.ts          # Helper functions
└── public/images/plants/  # Product placeholder images
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## User Journey

1. Land on the homepage with hero section and featured products
2. Browse all products in the shop
3. Filter by category or search for specific plants
4. View detailed product information with care instructions
5. Add items to cart with quantity selection
6. Review cart and adjust quantities
7. Complete checkout with shipping information
8. View order confirmation with order number

## Mock Data

The application includes:
- **15 plants**: Monstera, Snake Plant, Peace Lily, Rubber Plant, Fiddle Leaf Fig, ZZ Plant, Pothos, Bird of Paradise, Calathea, Chinese Evergreen, Philodendron Birkin, Aloe Vera, Jade Plant, Echeveria, String of Pearls
- **5 pots/accessories**: Ceramic pots, macrame hanger, terracotta set, plant stand
- **5 categories**: Indoor Plants, Succulents, Large Plants, Easy Care, Pots

Each product includes realistic descriptions, care instructions, pricing, and ratings.

## Accessibility

- Semantic HTML5 elements
- Proper heading hierarchy
- ARIA labels and landmarks
- Keyboard navigation support
- Focus indicators
- Sufficient color contrast
- Alt text for images
- Form labels and fieldsets

## Mock API

All API functions simulate network latency (200-500ms) to create a realistic experience:
- `getProducts()` - Fetch all products
- `getProduct(slug)` - Fetch single product
- `searchProducts(query)` - Search products
- `getProductsByCategory(category)` - Filter by category
- `createOrder(items, details)` - Place order

## Customization

### Replace Placeholder Images
Replace SVG placeholders in `/public/images/plants/` with actual product photos (800x800px recommended).

### Add More Products
Edit `/lib/data/products.ts` to add more products to the catalog.

### Adjust Colors
Update green color values in Tailwind classes:
- Primary: `green-800` (#166534)
- Light: `green-100` (#f0fdf4)
- Background: `green-50` (#f7fee7)

## Build for Production

```bash
npm run build
npm start
```

## License

This is a demo project for educational purposes.

---

Built with ❤️ and ☕
