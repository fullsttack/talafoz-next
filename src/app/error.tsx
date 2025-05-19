'use client';

import Link from 'next/link';
import { AlertTriangleIcon, HomeIcon, RefreshCwIcon, ArrowLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  


  return (
    <div className="min-h-screen flex flex-col">
      {/* small header */}
      <Header />

      {/* main content */}
      <main className="flex-1 relative overflow-hidden py-44">
        

        <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
          {/* error icon */}
          <div className="relative bg-red-100 dark:bg-red-900/30 p-6 rounded-full mb-8">
            <AlertTriangleIcon className="h-16 w-16 text-red-500" />
          </div>
          
          {/* error message */}
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            متأسفانه خطایی رخ داده است!
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mb-8">
            در پردازش درخواست شما خطایی رخ داده است. تیم فنی ما در حال بررسی و رفع این مشکل هستند.
          </p>
          
          {/* error code */}
          {error.digest && (
            <div className="bg-card border border-border rounded-lg p-3 mb-8 max-w-md mx-auto">
              <p className="text-sm text-muted-foreground">
                کد خطا: <code className="font-mono">{error.digest}</code>
              </p>
            </div>
          )}
          
          {/* action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
            <Button className="flex-1 gap-2" onClick={reset}>
              <RefreshCwIcon className="h-4 w-4" />
              تلاش مجدد
            </Button>
            <Button className="flex-1 gap-2" variant="outline" onClick={() => router.back()}>
              <ArrowLeftIcon className="h-4 w-4" />
              بازگشت به صفحه قبل
            </Button>
            <Button className="flex-1 gap-2" variant="secondary" asChild>
              <Link href="/">
                <HomeIcon className="h-4 w-4 ml-2" />
                صفحه اصلی
              </Link>
            </Button>
          </div>
          
          {/* help */}
          <div className="mt-16 border-t border-border pt-8 w-full max-w-2xl">
            <h3 className="text-lg font-medium mb-4">موارد زیر را می‌توانید امتحان کنید:</h3>
            <ul className="text-start list-disc list-inside space-y-2 text-muted-foreground">
              <li>صفحه را بارگذاری مجدد کنید</li>
              <li>تمام مرورگر را ببندید و دوباره باز کنید</li>
              <li>کوکی‌ها و کش مرورگر خود را پاک کنید</li>
              <li>اتصال اینترنت خود را بررسی کنید</li>
              <li>بعدا دوباره امتحان کنید</li>
            </ul>
          </div>
        </div>
      </main>
      
      {/* small footer */}
      <Footer />  
    </div>
  );
} 