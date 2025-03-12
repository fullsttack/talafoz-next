import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'تماشای اپیزود',
  description: 'پلتفرم آموزش آنلاین تلفظ',
};

// فقط bypass کردن layout دوره‌ها و استفاده از layout اصلی
export default function EpisodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="fixed inset-0 w-screen h-screen max-w-none p-0 m-0 overflow-hidden ">
      {children}
    </main>
  );
} 