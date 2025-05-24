'use client';

import React, { useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FileVideo2, Clock, ShoppingCart, Check, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

interface CourseCardProps {
  id?: number;
  image: string;
  title: string;
  instructor: string;
  description: string;
  price: string;
  episodes: number;
  duration: string;
  isFree: boolean;
  isVipFree?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  id = 1, 
  image, 
  title, 
  instructor, 
  description, 
  price, 
  episodes, 
  duration, 
  isFree,
  isVipFree 
}) => {
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(id);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (!inCart) {
      addToCart({
        id,
        title,
        instructor,
        price: isFree ? 'رایگان' : price,
        image,
        isFree,
      });
    }
  }, [addToCart, id, title, instructor, price, isFree, image, inCart]);

  return (
    <div className="border rounded-2xl shadow-lg overflow-hidden flex flex-col relative transition-shadow hover:shadow-2xl hover:-translate-y-1 duration-200 group">
      {/* بج VIP در صورت وجود */}
      {isVipFree && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
            رایگان VIP
          </Badge>
        </div>
      )}
      
      <Link href={`/courses/${id}`} className="block">
        <Image width={320} height={180} src={image} alt={title} className="w-full h-48 object-cover" />
      </Link>
      
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/courses/${id}`} className="block">
          <h2 className="text-lg font-bold mb-1 hover:text-primary transition-colors">{title}</h2>
        </Link>
        <span className="text-xs text-muted-foreground mb-2">مدرس: {instructor}</span>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">{description}</p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <FileVideo2 size={16} /> 
            <b>{episodes} جلسه</b>
          </span>
          <span className="flex items-center gap-1">
            <Clock size={16} /> 
            <b>{duration}</b>
          </span>
        </div>
        
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col">
            {isFree ? (
              <Badge variant="outline" className="text-base px-3 py-1 border-none">
                رایگان
              </Badge>
            ) : (
              <span className="text-primary font-bold text-xl">{price}</span>
            )}
          </div>
          
          {isFree ? (
            // دوره رایگان: فقط دکمه مشاهده جزییات
            <Button
              size="icon"
              variant="outline"
              className="rounded-full"
              asChild
            >
              <Link href={`/courses/${id}`} title="مشاهده جزییات دوره">
                <ArrowLeft size={16} />
              </Link>
            </Button>
          ) : (
            // دوره غیررایگان: دو دکمه آیکون
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                className="rounded-full"
                asChild
              >
                <Link href={`/courses/${id}`} title="مشاهده جزییات دوره">
                  <ArrowLeft size={16} />
                </Link>
              </Button>
              
              <Button
                onClick={handleAddToCart}
                size="icon"
                variant={inCart ? "outline" : "outline"}
                className={`rounded-full ${
                  inCart 
                    ? 'bg-blue-100 hover:bg-blue-200 text-base-1 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 dark:text-base-1' 
                    : ''
                }`}
                disabled={inCart}
                title={inCart ? "در سبد خرید" : "افزودن به سبد خرید"}
              >
                {inCart ? (
                  <Check size={16} />
                ) : (
                  <ShoppingCart size={16} />
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;