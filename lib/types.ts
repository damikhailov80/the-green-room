export interface Product {
  id: string;
  slug: string;
  name: string;
  latinName: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  category: string;
  images: string[];
  height: string;
  light: string;
  watering: string;
  petFriendly: boolean;
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  stock: number;
  rating: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  total: number;
  details: OrderDetails;
  createdAt: Date;
}
