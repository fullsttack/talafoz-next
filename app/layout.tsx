import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/tools/theme-provider";
import { Toaster } from "sonner";

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
