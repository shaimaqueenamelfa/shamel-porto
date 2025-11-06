import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar/navbar";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Shaima Portfolio",
  description: "My Next.js Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
