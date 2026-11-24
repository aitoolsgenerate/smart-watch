export type WatchCategory =
  | 'All Watches'
  | 'Chronographs'
  | 'Diver & Sport'
  | 'Dress & Heritage'
  | 'Pre-Owned'
  | 'Accessories';

export type WatchCondition = 'New' | 'Pre-Owned';

export interface WatchSpecifications {
  reference: string;
  caliber: string;
  powerReserve: string;
  caseDiameter: string;
  lugToLug: string;
  waterResistance: string;
  crystal: string;
}

export interface WatchProduct {
  id: string;
  brand: string;
  name: string;
  category: Exclude<WatchCategory, 'All Watches'>;
  isPreOwned: boolean;
  condition: WatchCondition;
  movementType: 'Automatic' | 'Mechanical' | 'Chronograph' | 'Leather Craft';
  price: number;
  originalPrice?: number;
  image: string;
  straps: string[];
  badge?: string;
  description: string;
  specs: WatchSpecifications;
}

export interface CartItem {
  product: WatchProduct;
  selectedStrap: string;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  watchPurchased: string;
  quote: string;
  rating: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface OrderConfirmation {
  orderNumber: string;
  customerName: string;
  email: string;
  paymentMethod: 'Card' | 'Cash on Delivery';
  total: number;
  itemCount: number;
}
