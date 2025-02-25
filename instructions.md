Nextjs 15 ts server actions


How to update data
You can update data in Next.js using React's Server Functions. This page will go through how you can create and invoke Server Functions.

Creating Server Functions
A Server Function can be defined by using the use server directive. You can place the directive at the top of an asynchronous function to mark the function as a Server Function, or at the top of a separate file to mark all exports of that file. We recommend using a separate file in most instances.

app/lib/actions.ts
TypeScript

TypeScript

'use server'
 
export async function createPost(formData: FormData) {}
 
export async function deletePost(formData: FormData) {}
Server Components
Server Functions can be inlined in Server Components by adding the "use server" directive to the top of the function body:

app/page.tsx
TypeScript

TypeScript

export default function Page() {
  // Server Action
  async function createPost() {
    'use server'
    // Update data
    // ...
 
  return <></>
}
Client Components
It's not possible to define Server Functions in Client Components. However, you can invoke them in Client Components by importing them from a file that has the "use server" directive at the top of it:

app/actions.ts
TypeScript

TypeScript

'use server'
 
export async function createPost() {}
app/ui/button.tsx
TypeScript

TypeScript

'use client'
 
import { createPost } from '@/app/actions'
 
export function Button() {
  return <button formAction={createPost}>Create</button>
}
Invoking Server Functions
There are two mains ways you can invoke a Server Function:

Forms in Server and Client Components
Event Handlers in Client Components
Forms
React extends the HTML <form> element to allow Server Function to be invoked with the HTML action prop.

When invoked in a form, the function automatically receives the FormData object. You can extract the data using the native FormData methods:

app/ui/form.tsx
TypeScript

TypeScript

import { createPost } from '@/app/actions'
 
export function Form() {
  return (
    <form action={createPost}>
      <input type="text" name="title" />
      <input type="text" name="content" />
      <button type="submit">Create</button>
    </form>
  )
}
app/actions.ts
TypeScript

TypeScript

'use server'
 
export async function createPost(formData: FormData) {
  const title = formData.get('title')
  const content = formData.get('content')
 
  // Update data
  // Revalidate cache
}
Good to know: When passed to the action prop, Server Functions are also known as Server Actions.

Event Handlers
You can invoke a Server Function in a Client Component by using event handlers such as onClick.

app/like-button.tsx
TypeScript

TypeScript

'use client'
 
import { incrementLike } from './actions'
import { useState } from 'react'
 
export default function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes)
 
  return (
    <>
      <p>Total Likes: {likes}</p>
      <button
        onClick={async () => {
          const updatedLikes = await incrementLike()
          setLikes(updatedLikes)
        }}
      >
        Like
      </button>
    </>
  )
}
Showing a pending state
While executing a Server Function, you can show a loading indicator with React's useActionState hook. This hook returns a pending boolean:

app/ui/button.tsx
TypeScript

TypeScript

'use client'
 
import { useActionState } from 'react'
import { createPost } from '@/app/actions'
import { LoadingSpinner } from '@/app/ui/loading-spinner'
 
export function Button() {
  const [state, action, pending] = useActionState(createPost, false)
 
  return (
    <button onClick={async () => action()}>
      {pending ? <LoadingSpinner /> : 'Create Post'}
    </button>
  )
}
Revalidating the cache
After performing an update, you can revalidate the Next.js cache and show the updated data by calling revalidatePath or revalidateTag within the Server Function:

app/lib/actions.ts
TypeScript

TypeScript

'use server'
 
import { revalidatePath } from 'next/cache'
 
export async function createPost(formData: FormData) {
  // Update data
  // ...
 
  revalidatePath('/posts')
}
Redirecting
You may want to redirect the user to a different page after performing an update. You can do this by calling redirect within the Server Function:

app/lib/actions.ts
TypeScript

TypeScript

'use server'
 
import { redirect } from 'next/navigation'
 
export async function createPost(formData: FormData) {
  // Update data
  // ...
 
  redirect('/posts')
}
API Reference
Learn more about the features mentioned in this page by reading the API Reference.

How to handle errors
Errors can be divided into two categories: expected errors and uncaught exceptions. This page will walk you through how you can handle these errors in your Next.js application.

Handling expected errors
Expected errors are those that can occur during the normal operation of the application, such as those from server-side form validation or failed requests. These errors should be handled explicitly and returned to the client.

Server Actions
You can use the useActionState hook to manage the state of Server Functions and handle expected errors. Avoid using try/catch blocks for expected errors. Instead, you can model expected errors as return values, not as thrown exceptions.

app/actions.ts
TypeScript

TypeScript

'use server'
 
export async function createPost(prevState: any, formData: FormData) {
  const title = formData.get('title')
  const content = formData.get('content')
 
  const res = await fetch('https://api.vercel.app/posts', {
    method: 'POST',
    body: { title, content },
  })
  const json = await res.json()
 
  if (!res.ok) {
    return { message: 'Failed to create post' }
  }
}
Then, you can pass your action to the useActionState hook and use the returned state to display an error message.

app/ui/form.tsx
TypeScript

TypeScript

'use client'
 
import { useActionState } from 'react'
import { createPost } from '@/app/actions'
 
const initialState = {
  message: '',
}
 
export function Form() {
  const [state, formAction, pending] = useActionState(createPost, initialState)
 
  return (
    <form action={formAction}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" name="title" required />
      <label htmlFor="content">Content</label>
      <textarea id="content" name="content" required />
      {state?.message && <p aria-live="polite">{state.message}</p>}
      <button disabled={pending}>Create Post</button>
    </form>
  )
}
Server Components
When fetching data inside of a Server Component, you can use the response to conditionally render an error message or redirect.

app/page.tsx
TypeScript

TypeScript

export default async function Page() {
  const res = await fetch(`https://...`)
  const data = await res.json()
 
  if (!res.ok) {
    return 'There was an error.'
  }
 
  return '...'
}
Not found
You can call the notFound function within a route segment and use the not-found.js file to show a 404 UI.

app/blog/[slug]/page.tsx
TypeScript

TypeScript

import { getPostBySlug } from '@/lib/posts'
 
export default async function Page({ params }: { params: { slug: string } }) {
  const post = getPostBySlug((await params).slug)
 
  if (!post) {
    notFound()
  }
 
  return <div>{post.title}</div>
}
app/blog/[slug]/not-found.tsx
TypeScript

TypeScript

export default function NotFound() {
  return <div>404 - Page Not Found</div>
}
Handling uncaught exceptions
Uncaught exceptions are unexpected errors that indicate bugs or issues that should not occur during the normal flow of your application. These should be handled by throwing errors, which will then be caught by error boundaries.

Nested error boundaries
Next.js uses error boundaries to handle uncaught exceptions. Error boundaries catch errors in their child components and display a fallback UI instead of the component tree that crashed.

Create an error boundary by adding an error.js file inside a route segment and exporting a React component:

app/dashboard/error.tsx
TypeScript

TypeScript

'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}
Errors will bubble up to the nearest parent error boundary. This allows for granular error handling by placing error.tsx files at different levels in the route hierarchy.

Nested Error Component Hierarchy
Global errors
While less common, you can handle errors in the root layout using the global-error.js file, located in the root app directory, even when leveraging internationalization. Global error UI must define its own <html> and <body> tags, since it is replacing the root layout or template when active.

app/global-error.tsx
TypeScript

TypeScript

'use client' // Error boundaries must be Client Components
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}

revalidatePath
revalidatePath allows you to purge cached data on-demand for a specific path.

Good to know:

revalidatePath only invalidates the cache when the included path is next visited. This means calling revalidatePath with a dynamic route segment will not immediately trigger many revalidations at once. The invalidation only happens when the path is next visited.
Currently, revalidatePath invalidates all the routes in the client-side Router Cache when used in a server action. This behavior is temporary and will be updated in the future to apply only to the specific path.
Using revalidatePath invalidates only the specific path in the server-side Route Cache.
Parameters

revalidatePath(path: string, type?: 'page' | 'layout'): void;
path: Either a string representing the filesystem path associated with the data you want to revalidate (for example, /product/[slug]/page), or the literal route segment (for example, /product/123). Must be less than 1024 characters. This value is case-sensitive.
type: (optional) 'page' or 'layout' string to change the type of path to revalidate. If path contains a dynamic segment (for example, /product/[slug]/page), this parameter is required. If path refers to the literal route segment, e.g., /product/1 for a dynamic page (e.g., /product/[slug]/page), you should not provide type.
Returns
revalidatePath does not return a value.

Examples
Revalidating A Specific URL

import { revalidatePath } from 'next/cache'
revalidatePath('/blog/post-1')
This will revalidate one specific URL on the next page visit.

Revalidating A Page Path

import { revalidatePath } from 'next/cache'
revalidatePath('/blog/[slug]', 'page')
// or with route groups
revalidatePath('/(main)/blog/[slug]', 'page')
This will revalidate any URL that matches the provided page file on the next page visit. This will not invalidate pages beneath the specific page. For example, /blog/[slug] won't invalidate /blog/[slug]/[author].

Revalidating A Layout Path

import { revalidatePath } from 'next/cache'
revalidatePath('/blog/[slug]', 'layout')
// or with route groups
revalidatePath('/(main)/post/[slug]', 'layout')
This will revalidate any URL that matches the provided layout file on the next page visit. This will cause pages beneath with the same layout to revalidate on the next visit. For example, in the above case, /blog/[slug]/[another] would also revalidate on the next visit.

Revalidating All Data

import { revalidatePath } from 'next/cache'
 
revalidatePath('/', 'layout')
This will purge the Client-side Router Cache, and revalidate the Data Cache on the next page visit.

Server Action
app/actions.ts
TypeScript

TypeScript

'use server'
 
import { revalidatePath } from 'next/cache'
 
export default async function submit() {
  await submitForm()
  revalidatePath('/')
}
Route Handler
app/api/revalidate/route.ts
TypeScript

TypeScript

import { revalidatePath } from 'next/cache'
import type { NextRequest } from 'next/server'
 
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path')
 
  if (path) {
    revalidatePath(path)
    return Response.json({ revalidated: true, now: Date.now() })
  }
 
  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: 'Missing path to revalidate',
  })
}


How to fetch data and stream
This page will walk you through how you can fetch data in Server Components and Client Components. As well as how to stream content that depends on data.

Fetching data
Server Components
You can fetch data in Server Components using:

The fetch API
An ORM or database
With the fetch API
To fetch data with the fetch API, turn your component into an asynchronous function, and await the fetch call. For example:

app/blog/page.tsx
TypeScript

TypeScript

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
With an ORM or database
You can fetch data with an ORM or database by turning your component into an asynchronous function, and awaiting the call:

app/blog/page.tsx
TypeScript

TypeScript

import { db, posts } from '@/lib/db'
 
export default async function Page() {
  const allPosts = await db.select().from(posts)
  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
Client Components
There are two ways to fetch data in Client Components, using:

React's use hook
A community library like SWR or React Query
With the use hook
You can use React's use hook to stream data from the server to client. Start by fetching data in your Server component, and pass the promise to your Client Component as prop:

app/blog/page.tsx
TypeScript

TypeScript

import Posts from '@/app/ui/posts
import { Suspense } from 'react'
 
export default function Page() {
  // Don't await the data fetching function
  const posts = getPosts()
 
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Posts posts={posts} />
    </Suspense>
  )
}
Then, in your Client Component, use the use hook read the promise:

app/ui/posts.tsx
TypeScript

TypeScript

'use client'
import { use } from 'react'
 
export default function Posts({
  posts,
}: {
  posts: Promise<{ id: string; title: string }[]>
}) {
  const allPosts = use(posts)
 
  return (
    <ul>
      {allPosts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
In the example above, you need to wrap the <Posts /> component in a <Suspense> boundary. This means the fallback will be shown while the promise is being resolved. Learn more about streaming.

Community libraries
You can use a community library like SWR or React Query to fetch data in Client Components. These libraries have their own semantics for caching, streaming, and other features. For example, with SWR:

app/blog/page.tsx
TypeScript

TypeScript

'use client'
import useSWR from 'swr'
 
const fetcher = (url) => fetch(url).then((r) => r.json())
 
export default function BlogPage() {
  const { data, error, isLoading } = useSWR(
    'https://api.vercel.app/blog',
    fetcher
  )
 
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
 
  return (
    <ul>
      {data.map((post: { id: string; title: string }) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
Streaming
Warning: The content below assumes the dynamicIO config option is enabled in your application. The flag was introduced in Next.js 15 canary.

When using async/await in Server Components, Next.js will opt into dynamic rendering. This means the data will be fetched and rendered on the server for every user request. If there are any slow data requests, the whole route will be blocked from rendering.

To improve the initial load time and user experience, you can use streaming to break up the page's HTML into smaller chunks and progressively send those chunks from the server to the client.

How Server Rendering with Streaming Works
There are two ways you can implement streaming in your application:

With the loading.js file
With React's <Suspense> component
With loading.js
You can create a loading.js file in the same folder as your page to stream the entire page while the data is being fetched. For example, to stream app/blog/page.js, add the file inside the app/blog folder.

Blog folder structure with loading.js file
app/blog/loading.tsx
TypeScript

TypeScript

export default function Loading() {
  // Define the Loading UI here
  return <div>Loading...</div>
}
On navigation, the user will immediately see the layout and a loading state while the page is being rendered. The new content will then be automatically swapped in once rendering is complete.

Loading UI
Behind-the-scenes, loading.js will be nested inside layout.js, and will automatically wrap the page.js file and any children below in a <Suspense> boundary.

loading.js overview
This approach works well for route segments (layouts and pages), but for more granular streaming, you can use <Suspense>.

With <Suspense>
<Suspense> allows you to be more granular about what parts of the page to stream. For example, you can immediately show any page content that falls outside of the <Suspense> boundary, and stream in the list of blog posts inside the boundary.

app/blog/page.tsx
TypeScript

TypeScript

import { Suspense } from 'react'
import BlogList from '@/components/BlogList'
import BlogListSkeleton from '@/components/BlogListSkeleton'
 
export default function BlogPage() {
  return (
    <div>
      {/* This content will be sent to the client immediately */}
      <header>
        <h1>Welcome to the Blog</h1>
        <p>Read the latest posts below.</p>
      </header>
      <main>
        {/* Any content wrapped in a <Suspense> boundary will be streamed */}
        <Suspense fallback={<BlogListSkeleton />}>
          <BlogList />
        </Suspense>
      </main>
    </div>
  )
}
Creating meaningful loading states
An instant loading state is fallback UI that is shown immediately to the user after navigation. For the best user experience, we recommend designing loading states that are meaningful and help users understand the app is responding. For example, you can use skeletons and spinners, or a small but meaningful part of future screens such as a cover photo, title, etc.

In development, you can preview and inspect the loading state of your components using the React Devtools.



Authentication
Understanding authentication is crucial for protecting your application's data. This page will guide you through what React and Next.js features to use to implement auth.

Before starting, it helps to break down the process into three concepts:

Authentication: Verifies if the user is who they say they are. It requires the user to prove their identity with something they have, such as a username and password.
Session Management: Tracks the user's auth state across requests.
Authorization: Decides what routes and data the user can access.
This diagram shows the authentication flow using React and Next.js features:

Diagram showing the authentication flow with React and Next.js features
The examples on this page walk through basic username and password auth for educational purposes. While you can implement a custom auth solution, for increased security and simplicity, we recommend using an authentication library. These offer built-in solutions for authentication, session management, and authorization, as well as additional features such as social logins, multi-factor authentication, and role-based access control. You can find a list in the Auth Libraries section.

Authentication
Sign-up and login functionality
You can use the <form> element with React's Server Actions and useActionState to capture user credentials, validate form fields, and call your Authentication Provider's API or database.

Since Server Actions always execute on the server, they provide a secure environment for handling authentication logic.

Here are the steps to implement signup/login functionality:

1. Capture user credentials
To capture user credentials, create a form that invokes a Server Action on submission. For example, a signup form that accepts the user's name, email, and password:

app/ui/signup-form.tsx
TypeScript

TypeScript

import { signup } from '@/app/actions/auth'
 
export function SignupForm() {
  return (
    <form action={signup}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Name" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  )
}
app/actions/auth.ts
TypeScript

TypeScript

export async function signup(formData: FormData) {}
2. Validate form fields on the server
Use the Server Action to validate the form fields on the server. If your authentication provider doesn't provide form validation, you can use a schema validation library like Zod or Yup.

Using Zod as an example, you can define a form schema with appropriate error messages:

app/lib/definitions.ts
TypeScript

TypeScript

import { z } from 'zod'
 
export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
})
 
export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined
To prevent unnecessary calls to your authentication provider's API or database, you can return early in the Server Action if any form fields do not match the defined schema.

app/actions/auth.ts
TypeScript

TypeScript

import { SignupFormSchema, FormState } from '@/app/lib/definitions'
 
export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
 
  // Call the provider or db to create a user...
}
Back in your <SignupForm />, you can use React's useActionState hook to display validation errors while the form is submitting:

app/ui/signup-form.tsx
TypeScript

TypeScript

'use client'
 
import { signup } from '@/app/actions/auth'
import { useActionState } from 'react'
 
export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)
 
  return (
    <form action={action}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Name" />
      </div>
      {state?.errors?.name && <p>{state.errors.name}</p>}
 
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" placeholder="Email" />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}
 
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <button disabled={pending} type="submit">
        Sign Up
      </button>
    </form>
  )
}
Good to know:

In React 19, useFormStatus includes additional keys on the returned object, like data, method, and action. If you are not using React 19, only the pending key is available.
Before mutating data, you should always ensure a user is also authorized to perform the action. See Authentication and Authorization.
3. Create a user or check user credentials
After validating form fields, you can create a new user account or check if the user exists by calling your authentication provider's API or database.

Continuing from the previous example:

app/actions/auth.tsx
TypeScript

TypeScript

export async function signup(state: FormState, formData: FormData) {
  // 1. Validate form fields
  // ...
 
  // 2. Prepare data for insertion into database
  const { name, email, password } = validatedFields.data
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10)
 
  // 3. Insert the user into the database or call an Auth Library's API
  const data = await db
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
    })
    .returning({ id: users.id })
 
  const user = data[0]
 
  if (!user) {
    return {
      message: 'An error occurred while creating your account.',
    }
  }
 
  // TODO:
  // 4. Create user session
  // 5. Redirect user
}
After successfully creating the user account or verifying the user credentials, you can create a session to manage the user's auth state. Depending on your session management strategy, the session can be stored in a cookie or database, or both. Continue to the Session Management section to learn more.

Tips:

The example above is verbose since it breaks down the authentication steps for the purpose of education. This highlights that implementing your own secure solution can quickly become complex. Consider using an Auth Library to simplify the process.
To improve the user experience, you may want to check for duplicate emails or usernames earlier in the registration flow. For example, as the user types in a username or the input field loses focus. This can help prevent unnecessary form submissions and provide immediate feedback to the user. You can debounce requests with libraries such as use-debounce to manage the frequency of these checks.
Session Management
Session management ensures that the user's authenticated state is preserved across requests. It involves creating, storing, refreshing, and deleting sessions or tokens.

There are two types of sessions:

Stateless: Session data (or a token) is stored in the browser's cookies. The cookie is sent with each request, allowing the session to be verified on the server. This method is simpler, but can be less secure if not implemented correctly.
Database: Session data is stored in a database, with the user's browser only receiving the encrypted session ID. This method is more secure, but can be complex and use more server resources.
Good to know: While you can use either method, or both, we recommend using a session management library such as iron-session or Jose.

Stateless Sessions
To create and manage stateless sessions, there are a few steps you need to follow:

Generate a secret key, which will be used to sign your session, and store it as an environment variable.
Write logic to encrypt/decrypt session data using a session management library.
Manage cookies using the Next.js cookies API.
In addition to the above, consider adding functionality to update (or refresh) the session when the user returns to the application, and delete the session when the user logs out.

Good to know: Check if your auth library includes session management.

1. Generating a secret key
There are a few ways you can generate secret key to sign your session. For example, you may choose to use the openssl command in your terminal:

terminal

openssl rand -base64 32
This command generates a 32-character random string that you can use as your secret key and store in your environment variables file:

.env

SESSION_SECRET=your_secret_key
You can then reference this key in your session management logic:

app/lib/session.js

const secretKey = process.env.SESSION_SECRET
2. Encrypting and decrypting sessions
Next, you can use your preferred session management library to encrypt and decrypt sessions. Continuing from the previous example, we'll use Jose (compatible with the Edge Runtime) and React's server-only package to ensure that your session management logic is only executed on the server.

app/lib/session.ts
TypeScript

TypeScript

import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from '@/app/lib/definitions'
 
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)
 
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}
 
export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
  }
}
Tips:

The payload should contain the minimum, unique user data that'll be used in subsequent requests, such as the user's ID, role, etc. It should not contain personally identifiable information like phone number, email address, credit card information, etc, or sensitive data like passwords.
3. Setting cookies (recommended options)
To store the session in a cookie, use the Next.js cookies API. The cookie should be set on the server, and include the recommended options:

HttpOnly: Prevents client-side JavaScript from accessing the cookie.
Secure: Use https to send the cookie.
SameSite: Specify whether the cookie can be sent with cross-site requests.
Max-Age or Expires: Delete the cookie after a certain period.
Path: Define the URL path for the cookie.
Please refer to MDN for more information on each of these options.

app/lib/session.ts
TypeScript

TypeScript

import 'server-only'
import { cookies } from 'next/headers'
 
export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, expiresAt })
  const cookieStore = await cookies()
 
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}
Back in your Server Action, you can invoke the createSession() function, and use the redirect() API to redirect the user to the appropriate page:

app/actions/auth.ts
TypeScript

TypeScript

import { createSession } from '@/app/lib/session'
 
export async function signup(state: FormState, formData: FormData) {
  // Previous steps:
  // 1. Validate form fields
  // 2. Prepare data for insertion into database
  // 3. Insert the user into the database or call an Library API
 
  // Current steps:
  // 4. Create user session
  await createSession(user.id)
  // 5. Redirect user
  redirect('/profile')
}
Tips:

Cookies should be set on the server to prevent client-side tampering.
🎥 Watch: Learn more about stateless sessions and authentication with Next.js → YouTube (11 minutes).
Updating (or refreshing) sessions
You can also extend the session's expiration time. This is useful for keeping the user logged in after they access the application again. For example:

app/lib/session.ts
TypeScript

TypeScript

import 'server-only'
import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
 
export async function updateSession() {
  const session = (await cookies()).get('session')?.value
  const payload = await decrypt(session)
 
  if (!session || !payload) {
    return null
  }
 
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
 
  const cookieStore = await cookies()
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}
Tip: Check if your auth library supports refresh tokens, which can be used to extend the user's session.

Deleting the session
To delete the session, you can delete the cookie:

app/lib/session.ts
TypeScript

TypeScript

import 'server-only'
import { cookies } from 'next/headers'
 
export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}
Then you can reuse the deleteSession() function in your application, for example, on logout:

app/actions/auth.ts
TypeScript

TypeScript

import { cookies } from 'next/headers'
import { deleteSession } from '@/app/lib/session'
 
export async function logout() {
  deleteSession()
  redirect('/login')
}
Database Sessions
To create and manage database sessions, you'll need to follow these steps:

Create a table in your database to store session and data (or check if your Auth Library handles this).
Implement functionality to insert, update, and delete sessions
Encrypt the session ID before storing it in the user's browser, and ensure the database and cookie stay in sync (this is optional, but recommended for optimistic auth checks in Middleware).
For example:

app/lib/session.ts
TypeScript

TypeScript

import cookies from 'next/headers'
import { db } from '@/app/lib/db'
import { encrypt } from '@/app/lib/session'
 
export async function createSession(id: number) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
 
  // 1. Create a session in the database
  const data = await db
    .insert(sessions)
    .values({
      userId: id,
      expiresAt,
    })
    // Return the session ID
    .returning({ id: sessions.id })
 
  const sessionId = data[0].id
 
  // 2. Encrypt the session ID
  const session = await encrypt({ sessionId, expiresAt })
 
  // 3. Store the session in cookies for optimistic auth checks
  const cookieStore = await cookies()
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}
Tips:

For faster data retrieval, consider using a database like Vercel Redis. However, you can also keep the session data in your primary database, and combine data requests to reduce the number of queries.
You may opt to use database sessions for more advanced use cases, such as keeping track of the last time a user logged in, or number of active devices, or give users the ability to log out of all devices.
After implementing session management, you'll need to add authorization logic to control what users can access and do within your application. Continue to the Authorization section to learn more.

Authorization
Once a user is authenticated and a session is created, you can implement authorization to control what the user can access and do within your application.

There are two main types of authorization checks:

Optimistic: Checks if the user is authorized to access a route or perform an action using the session data stored in the cookie. These checks are useful for quick operations, such as showing/hiding UI elements or redirecting users based on permissions or roles.
Secure: Checks if the user is authorized to access a route or perform an action using the session data stored in the database. These checks are more secure and are used for operations that require access to sensitive data or actions.
For both cases, we recommend:

Creating a Data Access Layer to centralize your authorization logic
Using Data Transfer Objects (DTO) to only return the necessary data
Optionally use Middleware to perform optimistic checks.
Optimistic checks with Middleware (Optional)
There are some cases where you may want to use Middleware and redirect users based on permissions:

To perform optimistic checks. Since Middleware runs on every route, it's a good way to centralize redirect logic and pre-filter unauthorized users.
To protect static routes that share data between users (e.g. content behind a paywall).
However, since Middleware runs on every route, including prefetched routes, it's important to only read the session from the cookie (optimistic checks), and avoid database checks to prevent performance issues.

For example:

middleware.ts
TypeScript

TypeScript

import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/app/lib/session'
import { cookies } from 'next/headers'
 
// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/signup', '/']
 
export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
 
  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
 
  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
 
  // 5. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
While Middleware can be useful for initial checks, it should not be your only line of defense in protecting your data. The majority of security checks should be performed as close as possible to your data source, see Data Access Layer for more information.

Tips:

In Middleware, you can also read cookies using req.cookies.get('session').value.
Middleware uses the Edge Runtime, check if your Auth library and session management library are compatible.
You can use the matcher property in the Middleware to specify which routes Middleware should run on. Although, for auth, it's recommended Middleware runs on all routes.
Creating a Data Access Layer (DAL)
We recommend creating a DAL to centralize your data requests and authorization logic.

The DAL should include a function that verifies the user's session as they interact with your application. At the very least, the function should check if the session is valid, then redirect or return the user information needed to make further requests.

For example, create a separate file for your DAL that includes a verifySession() function. Then use React's cache API to memoize the return value of the function during a React render pass:

app/lib/dal.ts
TypeScript

TypeScript

import 'server-only'
 
import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
 
export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
 
  if (!session?.userId) {
    redirect('/login')
  }
 
  return { isAuth: true, userId: session.userId }
})
You can then invoke the verifySession() function in your data requests, Server Actions, Route Handlers:

app/lib/dal.ts
TypeScript

TypeScript

export const getUser = cache(async () => {
  const session = await verifySession()
  if (!session) return null
 
  try {
    const data = await db.query.users.findMany({
      where: eq(users.id, session.userId),
      // Explicitly return the columns you need rather than the whole user object
      columns: {
        id: true,
        name: true,
        email: true,
      },
    })
 
    const user = data[0]
 
    return user
  } catch (error) {
    console.log('Failed to fetch user')
    return null
  }
})
Tip:

A DAL can be used to protect data fetched at request time. However, for static routes that share data between users, data will be fetched at build time and not at request time. Use Middleware to protect static routes.
For secure checks, you can check if the session is valid by comparing the session ID with your database. Use React's cache function to avoid unnecessary duplicate requests to the database during a render pass.
You may wish to consolidate related data requests in a JavaScript class that runs verifySession() before any methods.
Using Data Transfer Objects (DTO)
When retrieving data, it's recommended you return only the necessary data that will be used in your application, and not entire objects. For example, if you're fetching user data, you might only return the user's ID and name, rather than the entire user object which could contain passwords, phone numbers, etc.

However, if you have no control over the returned data structure, or are working in a team where you want to avoid whole objects being passed to the client, you can use strategies such as specifying what fields are safe to be exposed to the client.

app/lib/dto.ts
TypeScript

TypeScript

import 'server-only'
import { getUser } from '@/app/lib/dal'
 
function canSeeUsername(viewer: User) {
  return true
}
 
function canSeePhoneNumber(viewer: User, team: string) {
  return viewer.isAdmin || team === viewer.team
}
 
export async function getProfileDTO(slug: string) {
  const data = await db.query.users.findMany({
    where: eq(users.slug, slug),
    // Return specific columns here
  })
  const user = data[0]
 
  const currentUser = await getUser(user.id)
 
  // Or return only what's specific to the query here
  return {
    username: canSeeUsername(currentUser) ? user.username : null,
    phonenumber: canSeePhoneNumber(currentUser, user.team)
      ? user.phonenumber
      : null,
  }
}
By centralizing your data requests and authorization logic in a DAL and using DTOs, you can ensure that all data requests are secure and consistent, making it easier to maintain, audit, and debug as your application scales.

Good to know:

There are a couple of different ways you can define a DTO, from using toJSON(), to individual functions like the example above, or JS classes. Since these are JavaScript patterns and not a React or Next.js feature, we recommend doing some research to find the best pattern for your application.
Learn more about security best practices in our Security in Next.js article.
Server Components
Auth check in Server Components are useful for role-based access. For example, to conditionally render components based on the user's role:

app/dashboard/page.tsx
TypeScript

TypeScript

import { verifySession } from '@/app/lib/dal'
 
export default function Dashboard() {
  const session = await verifySession()
  const userRole = session?.user?.role // Assuming 'role' is part of the session object
 
  if (userRole === 'admin') {
    return <AdminDashboard />
  } else if (userRole === 'user') {
    return <UserDashboard />
  } else {
    redirect('/login')
  }
}
In the example, we use the verifySession() function from our DAL to check for 'admin', 'user', and unauthorized roles. This pattern ensures that each user interacts only with components appropriate to their role.

Layouts and auth checks
Due to Partial Rendering, be cautious when doing checks in Layouts as these don't re-render on navigation, meaning the user session won't be checked on every route change.

Instead, you should do the checks close to your data source or the component that'll be conditionally rendered.

For example, consider a shared layout that fetches the user data and displays the user image in a nav. Instead of doing the auth check in the layout, you should fetch the user data (getUser()) in the layout and do the auth check in your DAL.

This guarantees that wherever getUser() is called within your application, the auth check is performed, and prevents developers forgetting to check the user is authorized to access the data.

app/layout.tsx
TypeScript

TypeScript

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
 
  return (
    // ...
  )
}
app/lib/dal.ts
TypeScript

TypeScript

export const getUser = cache(async () => {
  const session = await verifySession()
  if (!session) return null
 
  // Get user ID from session and fetch data
})
Good to know:

A common pattern in SPAs is to return null in a layout or a top-level component if a user is not authorized. This pattern is not recommended since Next.js applications have multiple entry points, which will not prevent nested route segments and Server Actions from being accessed.
Server Actions
Treat Server Actions with the same security considerations as public-facing API endpoints, and verify if the user is allowed to perform a mutation.

In the example below, we check the user's role before allowing the action to proceed:

app/lib/actions.ts
TypeScript

TypeScript

'use server'
import { verifySession } from '@/app/lib/dal'
 
export async function serverAction(formData: FormData) {
  const session = await verifySession()
  const userRole = session?.user?.role
 
  // Return early if user is not authorized to perform the action
  if (userRole !== 'admin') {
    return null
  }
 
  // Proceed with the action for authorized users
}
Route Handlers
Treat Route Handlers with the same security considerations as public-facing API endpoints, and verify if the user is allowed to access the Route Handler.

For example:

app/api/route.ts
TypeScript

TypeScript

import { verifySession } from '@/app/lib/dal'
 
export async function GET() {
  // User authentication and role verification
  const session = await verifySession()
 
  // Check if the user is authenticated
  if (!session) {
    // User is not authenticated
    return new Response(null, { status: 401 })
  }
 
  // Check if the user has the 'admin' role
  if (session.user.role !== 'admin') {
    // User is authenticated but does not have the right permissions
    return new Response(null, { status: 403 })
  }
 
  // Continue for authorized users
}
The example above demonstrates a Route Handler with a two-tier security check. It first checks for an active session, and then verifies if the logged-in user is an 'admin'.

Context Providers
Using context providers for auth works due to interleaving. However, React context is not supported in Server Components, making them only applicable to Client Components.

This works, but any child Server Components will be rendered on the server first, and will not have access to the context provider’s session data:

app/layout.ts
TypeScript

TypeScript

import { ContextProvider } from 'auth-lib'
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  )
}

"use client";
 
import { useSession } from "auth-lib";
 
export default function Profile() {
  const { userId } = useSession();
  const { data } = useSWR(`/api/user/${userId}`, fetcher)
 
  return (
    // ...
  );
}
If session data is needed in Client Components (e.g. for client-side data fetching), use React’s taintUniqueValue API to prevent sensitive session data from being exposed to the client.

Resources
Now that you've learned about authentication in Next.js, here are Next.js-compatible libraries and resources to help you implement secure authentication and session management: