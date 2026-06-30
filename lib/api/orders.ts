import { Order, OrderDetails, CartItem } from '../types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `TGR-${timestamp}-${random}`;
}

export async function createOrder(
  items: CartItem[],
  details: OrderDetails
): Promise<Order> {
  await delay(500);
  
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  
  const order: Order = {
    id: Math.random().toString(36).substring(7),
    orderNumber: generateOrderNumber(),
    items,
    total,
    details,
    createdAt: new Date(),
  };
  
  return order;
}
