import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import { UserProvider } from "@/contexts/user-context";
import { ThemeProvider } from "@/components/ui/theme-provider";

const vazir = localFont({
  src: "./fonts/Yekan.woff",
  variable: "--font-vazir",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Talafoz - Online Learning Platform",
  description: "Learn coding, design, and more with interactive courses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={vazir.variable}
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: `
          img, video, svg, canvas, picture {
            display: block;
            max-width: 100%;
            height: auto;
          }
          @font-face {
            font-family: 'Yekan';
            font-display: swap;
          }
        `}} />
      </head>
      <body
        className={`${vazir.className} antialiased min-h-screen bg-background`}
      >
        <UserProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster position="top-center" richColors />
            {children}
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
