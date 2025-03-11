import React from 'react';

export const metadata = {
  title: 'پخش اپیزود',
  description: 'صفحه پخش اپیزود دوره'
};

export default function EpisodeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="episode-layout">
      {children}
    </div>
  );
} 