import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, OrderDetails } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
  shippingFee: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  grandTotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  toastMessage: string | null;
  clearToast: () => void;
  orders: OrderDetails[];
  createOrder: (orderData: Omit<OrderDetails, 'orderId' | 'createdAt' | 'status'>) => OrderDetails;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'manikanta_cart_v1';
const ORDERS_STORAGE_KEY = 'manikanta_orders_v1';
const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 90;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<OrderDetails[]>(() => {
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.filter(
            (o: OrderDetails) =>
              !o.customer?.addressLine1?.toLowerCase().includes('shanti vihar') &&
              !o.customer?.city?.toLowerCase().includes('indiranagar')
          );
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const clearToast = () => {
    setToastMessage(null);
  };

  const addToCart = (product: Product, size: string, quantity = 1) => {
    const selectedSizeOption = product.jarSizes.find((s) => s.size === size) || product.jarSizes[0];
    const cartItemId = `${product.id}-${selectedSizeOption.size}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          productSlug: product.slug,
          name: product.name,
          category: product.category,
          size: selectedSizeOption.size,
          price: selectedSizeOption.price,
          quantity,
          image: product.heroImage
        }
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const grandTotal = subtotal + shippingFee;

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const createOrder = (orderData: Omit<OrderDetails, 'orderId' | 'createdAt' | 'status'>): OrderDetails => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: OrderDetails = {
      ...orderData,
      orderId: `MKG-${Date.now().toString().slice(-6)}-${randomSuffix}`,
      createdAt: new Date().toISOString(),
      status: 'Confirmed'
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        subtotal,
        shippingFee,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        grandTotal,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        toastMessage,
        clearToast,
        orders,
        createOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
