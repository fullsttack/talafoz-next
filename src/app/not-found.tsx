"use client";

import {
  ArrowLeftIcon,
  RefreshCwIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
export default function NotFound() {
  const router = useRouter();


  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 relative overflow-hidden py-44">


        <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
          {/* Error code */}
          <div className="relative mb-6">
            <h1 className="text-9xl font-bold text-gray-100 select-none opacity-20">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold text-primary">404</span>
            </div>
          </div>

          {/* Error message */}
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            صفحه مورد نظر پیدا نشد!
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mb-8">
            متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا به آدرس دیگری
            منتقل شده است.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
            <Button className="flex-1 gap-2 cursor-pointer" onClick={() => router.back()}>
              <ArrowLeftIcon className="h-4 w-4" />
              بازگشت به صفحه قبل
            </Button>
            <Button
              className="flex-1 gap-2 cursor-pointer"
              variant="outline"
              onClick={() => router.refresh()}
            >
              <RefreshCwIcon className="h-4 w-4" />
              بارگذاری مجدد
            </Button>
          </div>


        </div>
      </main>

      <Footer />
    </div>
  );
}
