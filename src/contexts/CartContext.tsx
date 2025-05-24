'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useRef, useCallback } from 'react';
import { toast } from 'sonner';

// نوع دوره در سبد خرید
export interface CartItem {
  id: number;
  title: string;
  instructor: string;
  price: string;
  image: string;
  quantity: number;
  isFree: boolean;
}

// نوع Context
interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  isInCart: (id: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const toastRef = useRef<Set<string>>(new Set());

  // بارگذاری سبد خرید از localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // ذخیره سبد خرید در localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  // تابع تبدیل قیمت فارسی به عدد
  const parsePersianPrice = (price: string): number => {
    if (!price || price === 'رایگان') return 0;
    
    // حذف کلمه "تومان" و فاصله‌ها
    const cleanPrice = price.replace(/[^\d۰-۹]/g, '');
    
    // تبدیل اعداد فارسی به انگلیسی
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    let englishPrice = cleanPrice;
    
    persianDigits.forEach((persian, index) => {
      const regex = new RegExp(persian, 'g');
      englishPrice = englishPrice.replace(regex, index.toString());
    });
    
    return parseInt(englishPrice) || 0;
  };

  // اضافه کردن به سبد خرید
  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      
      if (existingItem) {
        const toastKey = `exists-${item.id}`;
        if (!toastRef.current.has(toastKey)) {
          toastRef.current.add(toastKey);
          toast.info(`${item.title} قبلاً در سبد خرید موجود است`);
          setTimeout(() => toastRef.current.delete(toastKey), 1000);
        }
        return prevItems;
      }
      
      const toastKey = `add-${item.id}`;
      if (!toastRef.current.has(toastKey)) {
        toastRef.current.add(toastKey);
        toast.success(`${item.title} به سبد خرید اضافه شد`);
        setTimeout(() => toastRef.current.delete(toastKey), 1000);
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  }, []);

  // حذف از سبد خرید
  const removeFromCart = useCallback((id: number) => {
    setItems(prevItems => {
      const item = prevItems.find(i => i.id === id);
      if (item) {
        const toastKey = `remove-${id}`;
        if (!toastRef.current.has(toastKey)) {
          toastRef.current.add(toastKey);
          toast.info(`${item.title} از سبد خرید حذف شد`);
          setTimeout(() => toastRef.current.delete(toastKey), 1000);
        }
      }
      return prevItems.filter(item => item.id !== id);
    });
  }, []);

  // به‌روزرسانی تعداد
  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, []);

  // پاک کردن کل سبد خرید
  const clearCart = useCallback(() => {
    setItems([]);
    const toastKey = `clear`;
    if (!toastRef.current.has(toastKey)) {
      toastRef.current.add(toastKey);
      toast.success('سبد خرید پاک شد');
      setTimeout(() => toastRef.current.delete(toastKey), 1000);
    }
  }, []);

  // محاسبه قیمت کل
  const getTotalPrice = useCallback((): number => {
    return items.reduce((total, item) => {
      const price = parsePersianPrice(item.price);
      return total + (price * item.quantity);
    }, 0);
  }, [items]);

  // تعداد کل آیتم‌ها
  const getTotalItems = useCallback((): number => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  // بررسی وجود در سبد خرید
  const isInCart = useCallback((id: number): boolean => {
    return items.some(item => item.id === id);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}