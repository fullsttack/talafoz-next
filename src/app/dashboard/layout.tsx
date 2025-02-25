'use client'

import { Sidebar } from '@/components/dashboard/sidebar'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="min-h-screen flex">
      <Sidebar isCollapsed={isCollapsed} onCollapse={setIsCollapsed} />
      <main 
        className={cn(
          "flex-1 transition-all duration-300",
          isCollapsed ? "md:mr-[80px]" : "md:mr-[240px]"
        )}
      >
        <div className="container mx-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
} 