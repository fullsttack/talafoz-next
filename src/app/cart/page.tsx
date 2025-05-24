"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();

  // فرمت قیمت به فارسی
  const formatPrice = (price: number): string => {
    return price.toLocaleString('fa-IR') + ' تومان';
  };

  const handleRemoveFromCart = useCallback((itemId: number) => {
    removeFromCart(itemId);
  }, [removeFromCart]);

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-gray-600 dark:text-gray-300">
        <Image src="/vector/cart.svg" alt="cart" width={300} height={300} priority />
        <h2 className="mt-6 font-bold text-2xl">سبد خرید شما خالی است</h2>
        <p className="mt-2 text-gray-500 dark:text-gray-600">هیچ دوره‌ای به سبد خرید اضافه نکرده‌اید.</p>
        <Link href="/courses" className="mt-6">
          <Button className="gap-2">
            <ShoppingBag size={20} />
            مشاهده دوره‌ها
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">سبد خرید</h1>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={clearCart} 
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          پاک کردن سبد خرید
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* لیست محصولات */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* تصویر دوره */}
                  <Link href={`/courses/${item.id}`} className="block w-full sm:w-48 h-32 overflow-hidden rounded-lg">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={200}
                      height={120}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </Link>

                  {/* اطلاعات دوره */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <Link href={`/courses/${item.id}`}>
                          <h3 className="font-bold text-lg hover:text-primary transition-colors">{item.title}</h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">مدرس: {item.instructor}</p>
                      </div>
                      
                      {/* دکمه حذف موبایل */}
                      <Button
                        size="icon"
                        variant="ghost"
                        className="sm:hidden text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-lg font-bold text-primary">
                        {item.isFree ? (
                          <Badge variant="secondary">رایگان</Badge>
                        ) : (
                          item.price
                        )}
                      </div>
                      
                      {/* دکمه‌های تعداد و حذف */}
                      <div className="flex items-center gap-2">
                        {!item.isFree && (
                          <div className="flex items-center border rounded-lg">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus size={16} />
                            </Button>
                            <span className="px-3 text-sm font-medium min-w-[40px] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} />
                            </Button>
                          </div>
                        )}
                        
                        <Button
                          size="icon"
                          variant="ghost"
                          className="hidden sm:flex text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* خلاصه سفارش */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>خلاصه سفارش</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">تعداد دوره‌ها</span>
                <span className="font-medium">{getTotalItems()} دوره</span>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="line-clamp-1 flex-1 text-muted-foreground">{item.title}</span>
                    <span className="mr-2 font-medium">
                      {item.isFree ? 'رایگان' : `${item.quantity} × ${item.price}`}
                    </span>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-bold text-lg">
                <span>مجموع</span>
                <span className="text-primary">{formatPrice(getTotalPrice())}</span>
              </div>
              
              {/* کد تخفیف */}
              <div className="space-y-2">
                <Label htmlFor="discount-code">کد تخفیف</Label>
                <div className="flex gap-2">
                  <Input
                    id="discount-code"
                    type="text"
                    placeholder="کد تخفیف را وارد کنید"
                    className="flex-1"
                  />
                  <Button size="sm" variant="outline">
                    اعمال
                  </Button>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col gap-3">
              <Button className="w-full gap-2" size="lg">
                <ArrowLeft size={20} />
                ادامه و پرداخت
              </Button>
              
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}