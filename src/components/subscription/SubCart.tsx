"use client";

import React from "react";
import { Check, Crown, Rocket, Users, X } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MagicCard } from "@/components/magicui/magic-card";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface SubscriptionPlan {
  name: string;
  description: string;
  price: number;
  features: PlanFeature[];
  popular?: boolean;
  buttonText: string;
  gradientFrom?: string;
  gradientTo?: string;
  icon: React.ReactNode;
  highlightText?: string;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    name: "پایه",
    description: "شروع یادگیری برنامه‌نویسی با دسترسی به امکانات اصلی",
    price: 99000,
    features: [
      { text: "دسترسی به ۱۰ دوره پایه", included: true },
      { text: "پشتیبانی ایمیلی (پاسخ تا ۴۸ ساعت)", included: true },
      { text: "دسترسی به انجمن‌های گفتگو", included: true },
      { text: "دانلود محتوا برای مطالعه آفلاین", included: false },
      { text: "پروژه‌های عملی با کد آماده", included: false },
      { text: "گواهینامه پایان دوره", included: false },
    ],
    buttonText: "شروع یادگیری",
    gradientFrom: "#60A5FA",
    gradientTo: "#3B82F6",
    icon: <Rocket className="h-8 w-8" />,
  },
  {
    name: "حرفه‌ای",
    description: "برای توسعه‌دهندگان جدی که می‌خواهند به سطح بعدی برسند",
    price: 199000,
    features: [
      { text: "دسترسی به تمام دوره‌ها (۵۰+ دوره)", included: true },
      { text: "پشتیبانی ایمیلی (پاسخ تا ۲۴ ساعت)", included: true },
      { text: "دسترسی به انجمن‌های گفتگو", included: true },
      { text: "دانلود محتوا برای مطالعه آفلاین", included: true },
      { text: "پروژه‌های عملی با کد آماده", included: true },
      { text: "گواهینامه پایان دوره", included: false },
    ],
    popular: true,
    buttonText: "انتخاب پلن حرفه‌ای",
    gradientFrom: "#8B5CF6",
    gradientTo: "#6366F1",
    icon: <Crown className="h-8 w-8" />,
    highlightText: "محبوب‌ترین",
  },
  {
    name: "سازمانی",
    description: "برای شرکت‌ها و تیم‌هایی که به دنبال رشد مهارت‌های تیمی هستند",
    price: 499000,
    features: [
      { text: "دسترسی به تمام دوره‌ها (۵۰+ دوره)", included: true },
      { text: "پشتیبانی تلفنی و ایمیلی اختصاصی", included: true },
      { text: "دسترسی تیمی (تا ۱۰ کاربر)", included: true },
      { text: "دانلود محتوا برای مطالعه آفلاین", included: true },
      { text: "پروژه‌های عملی با کد آماده", included: true },
      { text: "گواهینامه پایان دوره", included: true },
    ],
    buttonText: "درخواست مشاوره",
    gradientFrom: "#F59E0B",
    gradientTo: "#F97316",
    icon: <Users className="h-8 w-8" />,
  },
];

export default function SubCart() {
  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-8">پلن‌های اشتراکی</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto py-4">
          اشتراک مناسب خود را برای یادگیری حرفه‌ای برنامه‌نویسی انتخاب کنید. با هر پلن، به مسیر موفقیت خود سرعت ببخشید.
        </p>
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-3 ">
        {subscriptionPlans.map((plan) => (
          <div 
            key={plan.name} 
            className={`relative ${plan.popular ? "mt-[-20px] md:mt-[-40px]" : ""}`}
          >
            {plan.highlightText && (
              <div className="absolute top-0 inset-x-0 flex justify-center -translate-y-1/2 z-10">
                <Badge className="bg-primary text-white py-1 px-4 text-sm font-medium rounded-full shadow-lg">
                  {plan.highlightText}
                </Badge>
              </div>
            )}
            
            <Card className={`overflow-hidden h-full ${plan.popular ? "border-primary border-2 shadow-lg" : "shadow-md"}`}>
              <MagicCard
                gradientFrom={plan.gradientFrom}
                gradientTo={plan.gradientTo}
                gradientSize={400}
                gradientOpacity={0.15}
                className="h-full"
              >
                <CardHeader className="pb-8">
                  <div className="flex items-start gap-2">
                    <div className={`p-2.5 rounded-lg ${plan.popular ? "bg-primary/10" : "bg-muted"} text-primary`}>
                      {plan.icon}
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                      <CardDescription className="mt-1 text-sm">{plan.description}</CardDescription>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-baseline">
                    <span className="text-3xl font-extrabold">
                      {new Intl.NumberFormat("fa-IR").format(plan.price)}
                    </span>
                    <span className="mr-2 text-muted-foreground font-medium">تومان / ماهانه</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        ) : (
                          <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? "" : "text-muted-foreground"}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter className="pt-4 pb-8">
                  <Button 
                    className="w-full rounded-full py-6 text-base font-medium" 
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.buttonText}
                  </Button>
                </CardFooter>
              </MagicCard>
            </Card>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center text-muted-foreground">
        <p className="text-sm">
          تمامی قیمت‌ها شامل مالیات بر ارزش افزوده هستند. اشتراک به صورت خودکار تمدید می‌شود و می‌توانید در هر زمان آن را لغو کنید.
        </p>
      </div>
    </div>
  );
}
