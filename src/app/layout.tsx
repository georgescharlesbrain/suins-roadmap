import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { StatsTicker } from "@/components/StatsTicker";
import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "The Future of SuiNS",
  description:
    "The naming and identity layer for the Sui economy. From .sui domains to a rich identity, social, and discovery protocol — powered by the $NS token.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <StatsTicker />
        <SiteNav />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
