
# Next.js Agent Rules

> **Note:** This guide applies to all projects initialized with `npx create-next-app@latest`.

## 1. The "Next.js" You Know Is Outdated

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## 2. File Structure and Routing

- **App Router:** All new Next.js projects use the App Router (`app/`).
- **Server Components:** All components in `app/` are Server Components by default.
- **Client Components:** Use the `'use client';` directive at the top of the file to opt into client-side behavior.
- **Layouts:** Define shared UI in `layout.tsx` files. Nested layouts compose automatically.

## 3. Component API

### Server Components

```typescript
// app/page.tsx
export default async function Page() {
  const data = await fetchData();
  return <div>{data.title}</div>;
}
```

### Client Components

```typescript
// app/components/Counter.tsx
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

## 4. Data Fetching

### Server-Side Fetching

```typescript
async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}
```

### Client-Side Fetching

```typescript
'use client';

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function DataDisplay() {
  const { data, error } = useSWR('/api/data', fetcher);
  return <div>{data?.title}</div>;
}
```

## 5. Styling

### Tailwind CSS

All projects come with Tailwind CSS configured out of the box.

```typescript
export default function Page() {
  return (
    <h1 className="text-3xl font-bold underline text-blue-600">
      Hello world!
    </h1>
  );
}
```

### CSS Modules

```typescript
// components/Button.module.css
.button {
  @apply bg-blue-500 text-white py-2 px-4 rounded;
}
```

```typescript
import styles from './Button.module.css';

export function Button() {
  return <button className={styles.button}>Click me</button>;
}
```

## 6. Middleware and Edge

Use `middleware.ts` for Edge Runtime logic that needs to run before a request is completed.

```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: '/about',
};
```

## 7. TypeScript

Next.js uses TypeScript by default. Run `npm run dev` to start the development server and type-check your code.

## 8. Performance Features

### Image Optimization

```typescript
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={500}
  height={500}
/>
```

### Font Optimization

```typescript
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Page() {
  return <h1 className={inter.className}>Hello</h1>;
}
```

### Script Optimization

```typescript
import Script from 'next/script';

<Script
  src="https://external-script.com/analytics.js"
  strategy="lazyOnload"
/>
```

## 9. Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Run production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code (Prettier) |

## 10. Deprecation Notices

Always check `node_modules/next/dist/docs/` for the latest deprecation notices. Some common changes include:

- `getStaticProps` and `getServerSideProps` are deprecated in favor of Server Components and data fetching methods
- `pages/` directory is still supported but `app/` is the recommended approach
- `next/image` replaces `<img>` tags for optimal performance
