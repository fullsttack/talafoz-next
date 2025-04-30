# راهنمای جامع امکانات جدید Next.js 15 (و نسخه‌های 15.1 و 15.3)

این فایل خلاصه‌ای از مهم‌ترین تغییرات، امکانات و مثال‌های کد Next.js 15 و نسخه‌های جدیدتر است. این مرجع برای توسعه سریع و به‌روز نگه داشتن پروژه‌ها با آخرین امکانات Next.js تهیه شده است.

---

## 1. پشتیبانی کامل از React 19
- **React 19** اکنون به طور کامل در App Router و Pages Router پشتیبانی می‌شود.
- **React Compiler (آزمایشی):** بهینه‌سازی خودکار کد React با حذف نیاز به memo و useCallback دستی.

---

## 2. Server Actions (امنیت و سادگی بیشتر)
- **امنیت بیشتر:** Endpointها غیرقابل حدس هستند و فقط اکشن‌های استفاده‌شده در باندل قرار می‌گیرند.
- **حذف خودکار اکشن‌های بلااستفاده:** کدهای بلااستفاده در build حذف می‌شوند.
- **کَش پیش‌فرض no-store:** داده‌ها همیشه تازه هستند مگر اینکه خودتان کش را فعال کنید.

**مثال:**
```ts
// app/actions.ts
"use server";
export async function addTask(task: string) {
  // Endpoint امن و داینامیک
  await db.tasks.create({ task });
}
```

در کلاینت:
```tsx
"use client";
import { addTask } from "@/app/actions";
export default function TaskForm() {
  // ...
  async function handleSubmit(e) {
    e.preventDefault();
    await addTask(task);
  }
  // ...
}
```

---

## 3. React Server Components (RSC)
- **کاهش حجم جاوااسکریپت کلاینت:** بخش‌های غیرتعاملی فقط روی سرور رندر می‌شوند.
- **تفکیک واضح سرور و کلاینت:** با "use client" فقط بخش‌های تعاملی به کلاینت می‌روند.

**مثال:**
```tsx
// app/products/page.server.tsx
export default async function ProductsPage() {
  const res = await fetch("https://api.example.com/products");
  const products = await res.json();
  return (
    <ul>
      {products.map((p) => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}
```

---

## 4. Dynamic HTML Streaming و Partial Prerendering (PPR)
- **استریم داینامیک:** بخش‌های استاتیک سریع نمایش داده می‌شوند و بخش‌های داینامیک به تدریج بارگذاری می‌شوند.
- **PPR (آزمایشی):** ترکیب SSR و SSG در یک صفحه.

**مثال:**
```tsx
// app/landing/page.server.tsx
export const experimental_ppr = true;
import { Suspense } from "react";
import DynamicProducts from "@/components/DynamicProducts.server";
export default function LandingPage() {
  return (
    <div>
      <header>...</header>
      <Suspense fallback={<p>در حال بارگذاری محصولات...</p>}>
        <DynamicProducts />
      </Suspense>
    </div>
  );
}
```

---

## 5. API جدید after (اجرای کد پس از ارسال پاسخ)
- **اجرای کارهای پس‌زمینه (مثل لاگ، آنالیتیکس) بعد از ارسال پاسخ به کاربر.**

**مثال:**
```ts
import { after } from 'next/server';
import { log } from '@/app/utils';
export default function Layout({ children }) {
  after(() => {
    log();
  });
  return <>{children}</>;
}
```

---

## 6. فرم جدید <Form> با ناوبری کلاینت
- **پیش‌بارگذاری، ناوبری کلاینت و بهبود Progressive Enhancement**

**مثال:**
```tsx
import Form from 'next/form';
export default function Page() {
  return (
    <Form action="/search">
      <input name="query" />
      <button type="submit">جستجو</button>
    </Form>
  );
}
```

---

## 7. بهبود Caching
- **fetch و GET Routeها دیگر به طور پیش‌فرض کش نمی‌شوند.**
- **امکان فعال‌سازی کش با گزینه‌های explicit:**
```ts
fetch('https://...', { cache: 'force-cache' });
```

---

## 8. پشتیبانی از next.config.ts و تایپ NextConfig
- **پیکربندی تایپ‌سیف و اتوکامپلیت:**
```ts
import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  /* تنظیمات */
};
export default nextConfig;
```

---

## 9. بهبود ابزار توسعه و خطایابی
- **نمایش بهتر خطاها و استک‌ترِیس در مرورگر و ترمینال**
- **پروفایلینگ بهتر و مخفی‌سازی استک‌فریم‌های کتابخانه‌ها**

---

## 10. APIهای جدید forbidden و unauthorized (آزمایشی)
- **نمایش صفحات 401 و 403 سفارشی با توابع forbidden() و unauthorized()**

**مثال:**
```ts
import { forbidden } from 'next/navigation';
export default async function AdminPage() {
  const session = await verifySession();
  if (session.role !== 'admin') forbidden();
  return <h1>Admin Page</h1>;
}
```

---

## 11. Turbopack (ساخت سریع‌تر)
- **next dev --turbopack** و **next build --turbopack** (آلفا) برای سرعت بیشتر build و dev

---

## 12. Client Instrumentation و Navigation Hooks (15.3)
- **instrumentation-client.js:** اجرای کد مانیتورینگ قبل از شروع اپلیکیشن کلاینت
- **onNavigate و useLinkStatus:** کنترل دقیق‌تر ناوبری و نمایش وضعیت لودینگ لینک‌ها

---

## 13. سایر تغییرات مهم
- پشتیبانی از ESLint 9
- بهبود self-hosting و کنترل Cache-Control
- حذف کامل Squoosh و استفاده از sharp برای بهینه‌سازی تصاویر
- بهبود HMR و build performance
- پشتیبانی از Rspack (آزمایشی)

---

## منابع بیشتر
- [مستندات رسمی Next.js 15](https://nextjs.org/blog/next-15)
- [راهنمای مهاجرت Next.js 15](https://nextjs.org/docs/upgrade-guide)
- [وبلاگ Next.js](https://nextjs.org/blog)

---

> این فایل را همیشه به‌روز نگه دارید و برای توسعه پروژه‌های جدید Next.js طبق این راهنما عمل کنید. 