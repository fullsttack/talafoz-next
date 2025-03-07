# Next.js 15 Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Key Features](#key-features)
3. [Getting Started](#getting-started)
4. [Data Fetching](#data-fetching)
   - [Data Fetching and Caching](#data-fetching-and-caching)
   - [Server Actions and Mutations](#server-actions-and-mutations)
   - [Incremental Static Regeneration (ISR)](#incremental-static-regeneration-isr)
5. [Routing](#routing)
6. [Server Components](#server-components)
7. [Authentication](#authentication)
8. [Error Handling](#error-handling)
9. [Configuration](#configuration)
10. [API Reference](#api-reference)

## Introduction

Next.js 15 is the latest stable version of the React framework for production. This release builds on previous updates with a focus on stability while adding exciting new features. Next.js 15 aligns with the upcoming release of React 19, providing full support for the latest React features.

## Key Features

Next.js 15 introduces several new features and improvements:

- **@next/codemod CLI:** Easily upgrade to the latest Next.js and React versions
- **Async Request APIs (Breaking):** Incremental step towards a simplified rendering and caching model
- **Caching Semantics (Breaking):** `fetch` requests, `GET` Route Handlers, and client navigations are no longer cached by default
- **React 19 Support:** Support for React 19, React Compiler (Experimental), and hydration error improvements
- **Turbopack Dev (Stable):** Performance and stability improvements
- **Static Indicator:** New visual indicator shows static routes during development
- **unstable_after API (Experimental):** Execute code after a response finishes streaming
- **instrumentation.js API (Stable):** New API for server lifecycle observability
- **Enhanced Forms (next/form):** Enhance HTML forms with client-side navigation
- **next.config:** TypeScript support for `next.config.ts`
- **Self-hosting Improvements:** More control over `Cache-Control` headers
- **Server Actions Security:** Unguessable endpoints and removal of unused actions
- **Bundling External Packages (Stable):** New config options for App and Pages Router
- **ESLint 9 Support:** Added support for ESLint 9
- **Development and Build Performance:** Improved build times and Faster Fast Refresh

## Getting Started

To upgrade to Next.js 15:

```bash
# Use the new automated upgrade CLI
npx @next/codemod@canary upgrade latest

# ...or upgrade manually
npm install next@latest react@rc react-dom@rc
```

## Data Fetching

### Data Fetching and Caching

Next.js 15 provides powerful data fetching capabilities with built-in caching. Here's a basic example:

```typescript
export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog')
  const posts = await data.json()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

#### Key Data Fetching Features:

- **Server-side fetching with the fetch API**
- **Fetching data with ORMs or databases**
- **Client-side data fetching**
- **Caching data with ORMs or databases**
- **Reusing data across multiple functions**
- **Revalidating cached data**

#### Data Fetching Patterns:

- **Parallel and sequential data fetching**
- **Preloading data**
- **Using React cache and server-only with the Preload Pattern**
- **Preventing sensitive data from being exposed to the client**

### Server Actions and Mutations

Server Actions are asynchronous functions executed on the server. They can be called in both Server and Client Components to handle form submissions and data mutations.

#### Server Actions Behavior:

- Server actions can be invoked using the `action` attribute in a `<form>` element
- Server Components support progressive enhancement by default
- In Client Components, forms invoking Server Actions will queue submissions if JavaScript isn't loaded yet
- After hydration, the browser does not refresh on form submission
- Server Actions can be invoked from event handlers, `useEffect`, third-party libraries, and other form elements
- Server Actions integrate with Next.js caching and revalidation architecture
- Actions use the `POST` method, and only this HTTP method can invoke them
- Arguments and return values must be serializable by React
- Server Actions are reusable functions
- Server Actions inherit the runtime and Route Segment Config from the page or layout they are used on

#### Server Actions Usage:

```typescript
// Server Component
export default function Page() {
  // Server Action
  async function createTodo(formData: FormData) {
    'use server'
    
    const title = formData.get('title')
    await db.todo.create({ data: { title } })
    revalidatePath('/')
  }
  
  return (
    <form action={createTodo}>
      <input type="text" name="title" />
      <button type="submit">Create</button>
    </form>
  )
}
```

### Incremental Static Regeneration (ISR)

Incremental Static Regeneration (ISR) allows you to create or update static pages at runtime. This enables you to get the benefits of static generation while still keeping your content fresh.

## Routing

Next.js 15 continues to support both the App Router and Pages Router:

- **App Router:** Uses React Server Components and supports layouts, nested routing, and more
- **Pages Router:** The original Next.js routing system, now with backward compatibility for React 18

## Server Components

React Server Components allow you to render components on the server, reducing the JavaScript sent to the client and improving performance. Next.js 15 fully embraces Server Components in the App Router.

## Authentication

Authentication in Next.js 15 can be broken down into three key concepts:

1. **Authentication:** Verifies user identity through credentials like username and password
2. **Session Management:** Tracks the user's authentication state across requests
3. **Authorization:** Determines what routes and data the user can access

### Authentication Flow

Next.js 15 provides several features for implementing authentication:

#### Sign-up and Login Functionality:

1. **Capture user credentials:** Use forms with Server Actions to securely handle user input
2. **Validate form fields on the server:** Perform validation in Server Actions
3. **Create a user or check user credentials:** Interact with your database or auth provider

#### Session Management:

##### Stateless Sessions:

1. **Generate a secret key:** Use a secure method to create a key for signing sessions
2. **Encrypt/decrypt sessions:** Use a library like jose to handle JWT operations
3. **Set cookies with recommended options:** Use the Next.js cookies API with secure settings

```typescript
// Example of session encryption
import 'server-only'
import { SignJWT, jwtVerify } from 'jose'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(session = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
  }
}
```

##### Database Sessions:

Store session information in a database for more control and features like session revocation.

#### Authentication in Different Contexts:

- **Server Components:** Fetch session data directly on the server
- **Layouts and auth checks:** Implement auth checks in layouts to protect multiple routes
- **Server Actions:** Validate authentication in Server Actions
- **Route Handlers:** Check authentication in API routes
- **Middleware:** Implement auth checks at the edge

### Authentication Best Practices:

- Use HTTP-Only cookies for token storage
- Implement short-lived access tokens and refresh tokens
- Use Role-Based Access Control (RBAC) for authorization
- Implement CSRF protection
- Always serve your application over HTTPS and set secure headers

## Error Handling

Next.js 15 provides improved error handling capabilities:

- **Error Components:** Create custom error UI for specific segments of your application
- **Global Error Handling:** Implement application-wide error handling
- **Error Boundaries:** Use React's error boundaries to catch and handle errors
- **Hydration Error Improvements:** Better error messages and visualization for hydration errors

## Configuration

Next.js 15 adds TypeScript support for configuration files:

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

### Key Configuration Options:

- **assetPrefix**
- **basePath**
- **bundlePagesRouterDependencies**
- **compress**
- **crossOrigin**
- **devIndicators**
- **distDir**
- **env**
- **eslint**
- **exportPathMap**
- **generateBuildId**
- **generateEtags**
- **headers**
- **httpAgentOptions**
- **images**
- **onDemandEntries**
- **optimizePackageImports**
- **output**
- **pageExtensions**
- **poweredByHeader**
- **productionBrowserSourceMaps**
- **reactStrictMode**
- **redirects**
- **rewrites**
- **Runtime Config**
- **serverExternalPackages**
- **trailingSlash**
- **transpilePackages**
- **turbo**
- **typescript**
- **urlImports**
- **useLightningcss**
- **webpack**
- **webVitalsAttribution**

## API Reference

### Components

- **Font**
- **Form**
- **Head**
- **Image**
- **Image (Legacy)**
- **Link**
- **Script**

### Functions

- **getInitialProps**
- **getServerSideProps**
- **getStaticPaths**
- **getStaticProps**
- **NextRequest**
- **NextResponse**
- **useAmp**
- **useReportWebVitals**
- **useRouter**
- **userAgent**

For more detailed information, visit the [official Next.js documentation](https://nextjs.org/docs).

# تغییرات اساسی در Next.js 15

## تغییر در مدل کش‌کردن
Next.js 15 تغییرات مهمی در استراتژی کش‌کردن ایجاد کرده است:

### درخواست‌های `fetch`
- **قبل**: به طور پیش‌فرض از استراتژی `force-cache` استفاده می‌کردند (کش می‌شدند)
- **اکنون**: به طور پیش‌فرض از استراتژی `no-store` استفاده می‌کنند (کش نمی‌شوند)

برای فعال‌سازی کش:
```typescript
// کش‌کردن یک درخواست fetch
const res = await fetch('https://api.example.com', { cache: 'force-cache' });

// یا تنظیم استراتژی کش برای کل مسیر
export const dynamic = 'force-static';
```

### Route Handlers نوع GET
- **قبل**: به طور پیش‌فرض کش می‌شدند
- **اکنون**: به طور پیش‌فرض کش نمی‌شوند

برای فعال‌سازی کش:
```typescript
// app/api/data/route.ts
import { NextResponse } from 'next/server';

// فعال‌سازی کش برای این route handler
export const dynamic = 'force-static';

export async function GET() {
  const data = await fetchSomeData();
  return NextResponse.json({ data });
}
```

### کش روتر سمت کلاینت
- **قبل**: کامپوننت‌های صفحه در ناوبری کش می‌شدند
- **اکنون**: کامپوننت‌های صفحه به طور پیش‌فرض در ناوبری کش نمی‌شوند

برای تنظیم کش روتر سمت کلاینت:
```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30, // زمان کش برای مسیرهای پویا (به ثانیه)
      static: 180, // زمان کش برای مسیرهای استاتیک (به ثانیه)
    },
  },
};

export default nextConfig;
```

## API‌های درخواست ناهمگام
Next.js 15 به API‌های درخواست ناهمگام انتقال یافته است. این API‌ها شامل موارد زیر هستند:
- `cookies`
- `headers`
- `draftMode`
- `params` در `layout.js`، `page.js`، `route.js`
- `searchParams` در `page.js`

نمونه کد قبلی:
```typescript
import { cookies } from 'next/headers';

export function AdminPanel() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  // ...
}
```

نمونه کد جدید:
```typescript
import { cookies } from 'next/headers';

export async function AdminPanel() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  // ...
}
```

برای مهاجرت خودکار:
```bash
npx @next/codemod@canary next-async-request-api
```

## ویژگی‌های جدید در Next.js 15

## API `after` (قبلاً `unstable_after`)
این API امکان اجرای کد پس از ارسال پاسخ به کاربر را فراهم می‌کند، بدون اینکه کاربر منتظر تکمیل آن بماند. مناسب برای وظایفی مانند لاگینگ، آنالیتیکس و همگام‌سازی با سیستم‌های خارجی.

برای استفاده از این API در Next.js 15:

```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    after: true,
  },
};

export default nextConfig;
```

```typescript
// app/layout.tsx
import { unstable_after as after } from 'next/server';
import { log } from '@/app/utils';

export default function Layout({ children }) {
  // وظیفه ثانویه
  after(() => {
    log();
  });

  // وظیفه اصلی
  return <>{children}</>;
}
```

در نسخه 15.1، این API به حالت پایدار رسیده و نام آن به `after` تغییر کرده است:

```typescript
// app/api/route.ts
import { after } from 'next/server';
import { cookies, headers } from 'next/headers';
import { logUserAction } from '@/app/utils';

export async function POST(request: Request) {
  // انجام عملیات اصلی
  // ...

  // لاگ کردن فعالیت کاربر برای آنالیتیکس
  after(async () => {
    const userAgent = (await headers().get('user-agent')) || 'unknown';
    const sessionCookie = (await cookies().get('session-id'))?.value || 'anonymous';

    logUserAction({ sessionCookie, userAgent });
  });

  return new Response(JSON.stringify({ status: 'success' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
```

## API `instrumentation.js`
این API که در Next.js 15 به حالت پایدار رسیده، امکان نظارت بر چرخه حیات سرور Next.js را فراهم می‌کند. می‌توانید از آن برای مانیتورینگ عملکرد، ردیابی خطاها و ادغام با ابزارهای نظارتی مانند OpenTelemetry استفاده کنید.

برای استفاده، فایل `instrumentation.js` یا `instrumentation.ts` را در ریشه پروژه یا داخل پوشه `src` قرار دهید:

```typescript
// instrumentation.ts
import { registerOTel } from '@vercel/otel';

export function register() {
  registerOTel('next-app');
}

export async function onRequestError(err, request, context) {
  await fetch('https://your-monitoring-service.com', {
    method: 'POST',
    body: JSON.stringify({ message: err.message, request, context }),
    headers: { 'Content-Type': 'application/json' },
  });
}
```

این API دو تابع اصلی ارائه می‌دهد:
- `register()`: هنگام راه‌اندازی سرور Next.js فراخوانی می‌شود
- `onRequestError()`: برای ثبت و گزارش خطاهای سرور استفاده می‌شود

## کامپوننت `Form` از `next/form`
کامپوننت `Form` جدید در Next.js 15 امکان پیش‌بارگیری، ناوبری سمت کلاینت هنگام ارسال فرم و بهبود تدریجی را فراهم می‌کند.

مثال پایه:

```typescript
// app/ui/search.tsx
import Form from 'next/form';

export default function Page() {
  return (
    <Form action="/search">
      {/* هنگام ارسال، مقدار ورودی به URL اضافه می‌شود، مثلاً /search?query=abc */}
      <input name="query" />
      <button type="submit">جستجو</button>
    </Form>
  );
}
```

استفاده با Server Actions:

```typescript
// app/invoices/page.tsx
export default function Page() {
  async function createInvoice(formData: FormData) {
    'use server';

    const rawFormData = {
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    };

    // عملیات ذخیره‌سازی
    // بازنشانی کش
  }

  return <Form action={createInvoice}>...</Form>;
}
```

## نشانگر استاتیک (Static Indicator)
Next.js 15 یک نشانگر بصری در محیط توسعه نمایش می‌دهد که مشخص می‌کند آیا یک مسیر در زمان ساخت پیش‌رندر می‌شود یا خیر. این ویژگی به شما کمک می‌کند تا مسیرهای استاتیک و پویا را شناسایی کنید.

برای غیرفعال کردن این نشانگر:

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
  },
};

export default nextConfig;
```

اگر انتظار دارید مسیری استاتیک باشد اما نشانگر نمایش داده نمی‌شود، احتمالاً مسیر از رندرینگ استاتیک خارج شده است. دلایل احتمالی:
- استفاده از API‌های پویا که به اطلاعات زمان اجرا وابسته هستند
- درخواست داده‌ای که کش نشده، مانند فراخوانی ORM یا درایور پایگاه داده

# پشتیبانی از React 19

Next.js 15 از React 19 پشتیبانی می‌کند و همچنین سازگاری عقب‌گرد با React 18 برای Pages Router را حفظ کرده است. این انعطاف‌پذیری به شما امکان می‌دهد تا با سرعت خودتان به React 19 ارتقا دهید.

## Pages Router با React 18
اگر از Pages Router استفاده می‌کنید، می‌توانید همچنان از React 18 استفاده کنید و از بهبودهای Next.js 15 بهره‌مند شوید.

> **نکته مهم**: اگرچه می‌توان Pages Router را با React 18 و App Router را با React 19 در یک برنامه اجرا کرد، این پیکربندی توصیه نمی‌شود زیرا ممکن است به رفتار غیرقابل پیش‌بینی و ناسازگاری‌های تایپینگ منجر شود.

## React Compiler (آزمایشی)
Next.js 15 از React Compiler پشتیبانی می‌کند که یک کامپایلر جدید از تیم React در Meta است. این کامپایلر کد شما را در سطح عمیق درک می‌کند و بهینه‌سازی‌های خودکار را به کد شما اضافه می‌کند.

مزایای React Compiler:
- کاهش نیاز به استفاده دستی از `useMemo` و `useCallback`
- کد ساده‌تر و نگهداری آسان‌تر
- کاهش احتمال خطا

> **نکته**: React Compiler در حال حاضر فقط به عنوان یک پلاگین Babel در دسترس است که منجر به کندتر شدن زمان توسعه و ساخت می‌شود.

## بهبود پیام‌های خطای Hydration
Next.js 15 نمایش خطاهای hydration را بهبود بخشیده است. خطاهای hydration اکنون کد منبع خطا را همراه با پیشنهاداتی برای رفع مشکل نمایش می‌دهند.

# بهبودهای دیگر در Next.js 15

## پشتیبانی از `next.config.ts`
Next.js 15 از فایل پیکربندی TypeScript پشتیبانی می‌کند:

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* گزینه‌های پیکربندی */
};

export default nextConfig;
```

## امنیت Server Actions
Next.js 15 امنیت Server Actions را با دو ویژگی بهبود بخشیده است:
- نقاط پایانی غیرقابل حدس
- حذف اکشن‌های استفاده نشده

## بهبودهای میزبانی خودی (Self-hosting)
Next.js 15 کنترل بیشتری روی هدرهای `Cache-Control` ارائه می‌دهد:
- امکان پیکربندی مقدار `expireTime` در `next.config`
- به‌روزرسانی مقدار پیش‌فرض به یک سال
- عدم بازنویسی مقادیر سفارشی `Cache-Control` با مقادیر پیش‌فرض

## Turbopack پایدار برای توسعه
Next.js 15 شامل نسخه پایدار Turbopack برای محیط توسعه است که بهبودهای قابل توجهی در عملکرد ارائه می‌دهد:
- راه‌اندازی سرور محلی 76.7% سریعتر
- به‌روزرسانی‌های کد با Fast Refresh 96.3% سریعتر
- کامپایل اولیه مسیر 45.8% سریعتر

## پشتیبانی از ESLint 9
Next.js 15 از ESLint 9 با حفظ سازگاری عقب‌گرد با ESLint 8 پشتیبانی می‌کند.

# راهنمای ارتقا به Next.js 15

برای ارتقا به Next.js 15، می‌توانید از CLI ارتقای خودکار استفاده کنید:

```bash
# استفاده از CLI ارتقای خودکار
npx @next/codemod@canary upgrade latest

# یا ارتقای دستی
npm install next@latest react@latest react-dom@latest
```

## نکات مهم برای ارتقا

1. **بررسی تغییرات کش‌کردن**: کد خود را برای تغییرات در استراتژی کش‌کردن بررسی کنید و در صورت نیاز، کش را به صورت صریح فعال کنید.

2. **بررسی API‌های درخواست ناهمگام**: از کدمود `next-async-request-api` برای تبدیل خودکار API‌های درخواست همگام به ناهمگام استفاده کنید.

3. **به‌روزرسانی تست‌ها**: اطمینان حاصل کنید که تست‌های شما با تغییرات اعمال شده سازگار هستند.

4. **بررسی تغییرات React 19**: اگر از ویژگی‌های خاص React استفاده می‌کنید، راهنمای ارتقای React 19 را مطالعه کنید.
