import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar/navbar";

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}
