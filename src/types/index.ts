export type GheeCategory = 'traditional-bilona' | 'modern-buffalo';

export interface JarSizeOption {
  size: string; // e.g., '250ml', '500ml', '1000ml', '2000ml'
  weightGrams: number;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  sku: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: GheeCategory;
  categoryDisplayName: string;
  tagline: string;
  shortDescription: string;
  longDescription: string[];
  heroImage: string;
  gallery: string[];
  jarSizes: JarSizeOption[];
  features: string[];
  processSummary: string[];
  specifications: {
    label: string;
    value: string;
  }[];
  nutritionalInfo: {
    servingSize: string;
    energyKcal: string;
    totalFat: string;
    saturatedFat: string;
    monounsaturatedFat: string;
    polyunsaturatedFat: string;
    cholesterol: string;
    transFat: string;
    carbohydrates: string;
    protein: string;
    sodium: string;
  };
  ingredients: string;
  storageInstructions: string;
  manufacturingInfo: string;
  labVerificationNotice: string;
  badge?: string;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string; // composite key: `${productId}-${size}`
  productId: string;
  productSlug: string;
  name: string;
  category: GheeCategory;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CustomerReview {
  id: string;
  productId: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  isSamplePlaceholder: boolean;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  vesselOrTool?: string;
  duration?: string;
}

export interface OrderDetails {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
  paymentId?: string;
  status: 'Confirmed' | 'Dispatched' | 'Out for Delivery' | 'Delivered';
  shippingDetails?: {
    courierName: string;
    awbNumber: string;
    trackingUrl: string;
    pickupStatus: 'Pending Pickup' | 'Picked Up' | 'In Transit' | 'Out for Delivery' | 'Delivered';
    estimatedDelivery?: string;
    weightKg?: number;
    pickupLocation?: string;
    dispatchedAt?: string;
  };
}
