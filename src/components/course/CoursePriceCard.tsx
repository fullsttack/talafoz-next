"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Calendar, CheckCircle, Clock, Share2, ShoppingCart, Star } from "lucide-react";
import { CourseType } from "@/types/course";

interface CoursePriceCardProps {
  course: CourseType;
  isPurchased?: boolean;
}

export default function CoursePriceCard({ course, isPurchased = false }: CoursePriceCardProps) {
  const [loading, setLoading] = useState(false);

  // Format price display
  const formatPriceDisplay = (price: string) => {
    if (!price) return "رایگان";

    // If the price already contains "تومان", just return it
    if (price.includes("تومان")) {
      return price;
    }

    // Display as formatted price with تومان
    return `${price} تومان`;
  };
  
  // Calculate discounted price
  const getDiscountedPrice = (price: string, discountPercent: number) => {
    if (discountPercent === 0) return null;
    
    // Try to find numeric parts in the price string
    const match = price.match(/(\d[\d,]*)/);
    
    if (match) {
      try {
        // Remove commas before parsing
        const numericPart = match[0].replace(/,/g, '');
        const priceValue = parseInt(numericPart);
        
        if (!isNaN(priceValue)) {
          const discountedValue = Math.round(priceValue * (1 - discountPercent / 100));
          return discountedValue.toLocaleString('fa-IR');
        }
      } catch (e) {
        console.error("Error calculating discount:", e);
      }
    }
    
    return null;
  };

  // Handle purchase
  const handlePurchase = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("دوره با موفقیت به سبد خرید اضافه شد");
    }, 1500);
  };

  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: course.description,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Copy to clipboard fallback
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert("لینک دوره در کلیپ‌بورد ذخیره شد"))
        .catch(err => console.error('Failed to copy: ', err));
    }
  };

  return (
    <Card className="border-2 shadow-md">
      <CardContent className="p-0">
        {course.discount > 0 && (
          <div className="bg-red-100 dark:bg-red-900/20 p-3 text-center">
            <Badge className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full text-white">
              {course.discount}% تخفیف
            </Badge>
            <p className="text-sm mt-1">
              <span className="line-through text-muted-foreground ml-2">
                {formatPriceDisplay(course.price)}
              </span>
              <span className="font-bold">
                {formatPriceDisplay(getDiscountedPrice(course.price, course.discount) + " تومان")}
              </span>
            </p>
          </div>
        )}

        <div className="p-6 space-y-6">
          {!course.discount && (
            <div className="text-center">
              <span className="text-2xl font-bold">
                {formatPriceDisplay(course.price)}
              </span>
            </div>
          )}

          {isPurchased ? (
            <Button className="w-full" size="lg">
              ادامه یادگیری
            </Button>
          ) : (
            <Button 
              className="w-full gap-2" 
              size="lg" 
              onClick={handlePurchase}
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin w-4 h-4 border-2 border-t-transparent rounded-full" />
              ) : (
                <ShoppingCart className="w-4 h-4" />
              )}
              <span>افزودن به سبد خرید</span>
            </Button>
          )}

          <Button 
            variant="outline" 
            className="w-full gap-2" 
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4" />
            <span>اشتراک‌گذاری دوره</span>
          </Button>

          <Separator />

          <div className="space-y-3">
            <FeatureItem icon={Calendar} text={`دسترسی: ${isPurchased ? 'مادام‌العمر' : 'پس از خرید'}`} />
            <FeatureItem icon={BookOpen} text={`سطح دوره: ${course.level}`} />
            <FeatureItem icon={Clock} text={`مدت دوره: ${course.duration}`} />
            <FeatureItem 
              icon={Star} 
              text={
                <div className="flex items-center gap-1">
                  <span>{course.rating}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`w-3 h-3 ${
                          index < Math.floor(course.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground">({course.students})</span>
                </div>
              } 
            />
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="font-medium mb-2">این دوره شامل:</h4>
            <BenefitItem text="گواهی پایان دوره" />
            <BenefitItem text="دسترسی به منابع و فایل‌های تمرینی" />
            <BenefitItem text="پشتیبانی آنلاین" />
            <BenefitItem text="به‌روزرسانی‌های رایگان" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FeatureItem({ icon: Icon, text }: { icon: any; text: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-muted-foreground" />
      <div className="text-sm">{text}</div>
    </div>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <CheckCircle className="w-4 h-4 text-green-500" />
      <span className="text-sm">{text}</span>
    </div>
  );
} 