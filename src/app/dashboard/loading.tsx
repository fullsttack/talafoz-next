export default function DashboardLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="h-6 w-24 bg-muted animate-pulse rounded" />
          <div className="h-8 w-8 bg-muted animate-pulse rounded-full" />
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="space-y-4">
          <div className="h-8 w-1/3 bg-muted animate-pulse rounded" />
          <div className="h-20 bg-muted animate-pulse rounded" />
          <div className="h-20 bg-muted animate-pulse rounded" />
        </div>
      </main>
    </div>
  )
} 