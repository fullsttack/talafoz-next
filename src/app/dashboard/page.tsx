import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">داشبورد</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>آمار کلی</CardTitle>
            <CardDescription>خلاصه وضعیت شما</CardDescription>
          </CardHeader>
          <CardContent>
            {/* محتوای کارت */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>فعالیت‌های اخیر</CardTitle>
            <CardDescription>آخرین فعالیت‌های شما</CardDescription>
          </CardHeader>
          <CardContent>
            {/* محتوای کارت */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>اعلان‌ها</CardTitle>
            <CardDescription>پیام‌های مهم</CardDescription>
          </CardHeader>
          <CardContent>
            {/* محتوای کارت */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 