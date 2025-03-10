# Next.js 15 Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Key Features](#key-features)
3. [Getting Started](#getting-started)
4. [Breaking Changes](#breaking-changes)
   - [Caching Model Changes](#caching-model-changes)
   - [Async Request APIs](#async-request-apis)
5. [Data Fetching](#data-fetching)
   - [Data Fetching and Caching](#data-fetching-and-caching)
   - [Server Actions and Mutations](#server-actions-and-mutations)
   - [Incremental Static Regeneration (ISR)](#incremental-static-regeneration-isr)
6. [New Features](#new-features)
   - [after API](#after-api)
   - [instrumentation.js API](#instrumentationjs-api)
   - [Form Component](#form-component)
   - [Static Indicator](#static-indicator)
7. [React 19 Support](#react-19-support)
   - [Pages Router with React 18](#pages-router-with-react-18)
   - [React Compiler](#react-compiler)
   - [Hydration Error Improvements](#hydration-error-improvements)
8. [Routing](#routing)
9. [Server Components](#server-components)
10. [Authentication](#authentication)
11. [Error Handling](#error-handling)
12. [Configuration](#configuration)
13. [API Reference](#api-reference)
14. [Upgrade Guide](#upgrade-guide)

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
- **after API (Stable):** Execute code after a response finishes streaming
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
npm install next@latest react@latest react-dom@latest
```

## Breaking Changes

### Caching Model Changes

Next.js 15 introduces significant changes to the caching strategy:

#### Fetch Requests
- **Before:** Used `force-cache` strategy by default (were cached)
- **Now:** Use `no-store` strategy by default (not cached)

To enable caching:
```typescript
// Cache a fetch request
const res = await fetch('https://api.example.com', { cache: 'force-cache' });

// Or set caching strategy for the entire route
export const dynamic = 'force-static';
```

#### GET Route Handlers
- **Before:** Cached by default
- **Now:** Not cached by default

To enable caching:
```typescript
// app/api/data/route.ts
import { NextResponse } from 'next/server';

// Enable caching for this route handler
export const dynamic = 'force-static';

export async function GET() {
  const data = await fetchSomeData();
  return NextResponse.json({ data });
}
```

#### Client Router Cache
- **Before:** Page components were cached during navigation
- **Now:** Page components are not cached by default during navigation

To configure client router cache:
```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30, // Cache time for dynamic routes (in seconds)
      static: 180, // Cache time for static routes (in seconds)
    },
  },
};

export default nextConfig;
```

### Async Request APIs

Next.js 15 has moved to async request APIs. These APIs include:
- `cookies`
- `headers`
- `draftMode`
- `params` in `layout.js`, `page.js`, `route.js`
- `searchParams` in `page.js`

Previous code:
```typescript
import { cookies } from 'next/headers';

export function AdminPanel() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  // ...
}
```

New code:
```typescript
import { cookies } from 'next/headers';

export async function AdminPanel() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');
  // ...
}
```

For automatic migration:
```bash
npx @next/codemod@canary next-async-request-api
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

## New Features

### after API

This API (previously `unstable_after`) provides the ability to execute code after sending a response to the user, without making the user wait for its completion. Ideal for tasks like logging, analytics, and syncing with external systems.

To use this API in Next.js 15:

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
import { after } from 'next/server';
import { log } from '@/app/utils';

export default function Layout({ children }) {
  // Secondary task
  after(() => {
    log();
  });

  // Main task
  return <>{children}</>;
}
```

In Next.js 15.1, this API has become stable:

```typescript
// app/api/route.ts
import { after } from 'next/server';
import { cookies, headers } from 'next/headers';
import { logUserAction } from '@/app/utils';

export async function POST(request: Request) {
  // Primary operation
  // ...

  // Log user activity for analytics
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

### instrumentation.js API

This API, now stable in Next.js 15, enables monitoring of the Next.js server lifecycle. You can use it for performance monitoring, error tracking, and integration with monitoring tools like OpenTelemetry.

To use it, place an `instrumentation.js` or `instrumentation.ts` file in your project root or inside the `src` folder:

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

This API provides two main functions:
- `register()`: Called when the Next.js server starts up
- `onRequestError()`: Used to log and report server errors

### Form Component

The new `Form` component in Next.js 15 provides preloading, client-side navigation on form submission, and progressive enhancement.

Basic example:

```typescript
// app/ui/search.tsx
import Form from 'next/form';

export default function Page() {
  return (
    <Form action="/search">
      {/* On submit, the input value gets added to the URL, e.g., /search?query=abc */}
      <input name="query" />
      <button type="submit">Search</button>
    </Form>
  );
}
```

Using with Server Actions:

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

    // Save operation
    // Revalidate cache
  }

  return <Form action={createInvoice}>...</Form>;
}
```

### Static Indicator

Next.js 15 displays a visual indicator in the development environment that shows whether a route is pre-rendered at build time. This feature helps you identify static and dynamic routes.

To disable this indicator:

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

If you expect a route to be static but the indicator is not showing, the route has likely opted out of static rendering. Possible reasons:
- Using dynamic APIs that depend on runtime information
- Requesting uncached data, like an ORM or database driver call

## React 19 Support

Next.js 15 supports React 19 while maintaining backward compatibility with React 18 for the Pages Router. This flexibility allows you to upgrade to React 19 at your own pace.

### Pages Router with React 18

If you're using the Pages Router, you can continue using React 18 while benefiting from Next.js 15 improvements.

> **Important Note**: While it's possible to run Pages Router with React 18 and App Router with React 19 in the same application, this configuration is not recommended as it may lead to unpredictable behavior and typing inconsistencies.

### React Compiler

Next.js 15 supports React Compiler, a new compiler from the React team at Meta. This compiler deeply understands your code and adds automatic optimizations to it.

Benefits of React Compiler:
- Reduced need for manual use of `useMemo` and `useCallback`
- Simpler code and easier maintenance
- Reduced chance of bugs

> **Note**: Currently, React Compiler is only available as a Babel plugin which results in slower development and build times.

### Hydration Error Improvements

Next.js 15 has improved the display of hydration errors. Hydration errors now show the source code of the error along with suggestions for fixing the issue.

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

## Upgrade Guide

To upgrade to Next.js 15, you can use the automated upgrade CLI:

```bash
# Use the automated upgrade CLI
npx @next/codemod@canary upgrade latest

# Or upgrade manually
npm install next@latest react@latest react-dom@latest
```

### Important Upgrade Notes

1. **Check Caching Changes**: Review your code for caching strategy changes and explicitly enable caching if needed.

2. **Check Async Request APIs**: Use the `next-async-request-api` codemod to automatically convert synchronous request APIs to asynchronous.

3. **Update Tests**: Make sure your tests are compatible with the changes.

4. **Review React 19 Changes**: If you use specific React features, check the React 19 upgrade guide.

5. **Self-hosting Considerations**: If you self-host, review the improvements to `Cache-Control` headers.

For more detailed information, visit the [official Next.js documentation](https://nextjs.org/docs).




px-4 py-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full text-sm hover:from-teal-600 hover:to-emerald-600 transition-colors
