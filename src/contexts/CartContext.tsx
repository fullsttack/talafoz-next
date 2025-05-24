'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      
      if (existingItem) {
        toast.info(`${item.title} قبلاً در سبد خرید موجود است`);
        return prevItems;
      }
      
      toast.success(`${item.title} به سبد خرید اضافه شد`);
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  // حذف از سبد خرید
  const removeFromCart = (id: number) => {
    setItems(prevItems => {
      const item = prevItems.find(i => i.id === id);
      if (item) {
        toast.info(`${item.title} از سبد خرید حذف شد`);
      }
      return prevItems.filter(item => item.id !== id);
    });
  };

  // به‌روزرسانی تعداد
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // پاک کردن کل سبد خرید
  const clearCart = () => {
    setItems([]);
    toast.success('سبد خرید پاک شد');
  };

  // محاسبه قیمت کل
  const getTotalPrice = (): number => {
    return items.reduce((total, item) => {
      const price = parsePersianPrice(item.price);
      return total + (price * item.quantity);
    }, 0);
  };

  // تعداد کل آیتم‌ها
  const getTotalItems = (): number => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  // بررسی وجود در سبد خرید
  const isInCart = (id: number): boolean => {
    return items.some(item => item.id === id);
  };

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