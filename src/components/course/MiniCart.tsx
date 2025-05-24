'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default function MiniCart() {
  const { items, removeFromCart, getTotalPrice, getTotalItems } = useCart();
  const cartItemsCount = getTotalItems();

  // فرمت قیمت به فارسی
  const formatPrice = (price: number): string => {
    return price.toLocaleString('fa-IR') + ' تومان';
  };

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative rounded-full border-none shadow-lg hover:bg-secondary transition-colors duration-300 h-8 w-8 sm:h-9 sm:w-9"
          aria-label={`سبد خرید - ${cartItemsCount} مورد`}
        >
          {cartItemsCount > 0 && (
            <Badge
              variant="default"
              className="absolute -top-1 -right-1 flex items-center justify-center min-w-[16px] h-4 text-[10px] p-0 px-1"
              aria-hidden="true"
            >
              {cartItemsCount > 99 ? '99+' : cartItemsCount}
            </Badge>
          )}
          <ShoppingCart className="w-4 h-4" aria-hidden="true" />
        </Button>
      </HoverCardTrigger>
      
      <HoverCardContent className="w-80 p-0" align="end">
        {items.length === 0 ? (
          <div className="p-6 text-center">
            <ShoppingCart className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">سبد خرید شما خالی است</p>
            <Button size="sm" className="mt-4" asChild>
              <Link href="/courses">مشاهده دوره‌ها</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="p-4 border-b">
              <h3 className="font-bold text-sm">سبد خرید ({cartItemsCount} دوره)</h3>
            </div>
            
            <ScrollArea className="h-[300px]">
              <div className="p-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 p-2 hover:bg-accent rounded-lg transition-colors">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={60}
                      height={40}
                      className="rounded "
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.instructor}</p>
                      <p className="text-sm font-bold text-primary mt-1">
                        {item.isFree ? (
                          <Badge variant="secondary" className="text-xs">رایگان</Badge>
                        ) : (
                          item.price
                        )}
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={(e) => {
                        e.preventDefault();
                        removeFromCart(item.id);
                      }}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <Separator />
            
            <div className="p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">جمع کل:</span>
                <span className="font-bold text-primary">{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/cart">مشاهده سبد</Link>
                </Button>
                <Button size="sm" className="w-full" asChild>
                  <Link href="/checkout">پرداخت</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}