import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/tools/theme-provider";
import { Toaster } from "sonner";

// Mejorar los metadatos para SEO y rendimiento
export const metadata: Metadata = {
  title: {
    template: "%s | تلفظ - پلتفرم آموزش آنلاین",
    default: "تلفظ - پلتفرم آموزش آنلاین",
  },
  description: "یادگیری برنامه‌نویسی، طراحی و بیشتر با دوره‌های تعاملی",
  creator: "Talafoz Team",
  // manifest: "/manifest.json",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      dir="rtl"
      lang="fa"
      suppressHydrationWarning
    >
      
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors position="top-center" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
