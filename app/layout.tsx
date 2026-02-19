import type { Metadata } from "next";
import { Inter, Caveat } from "next/font/google"; // Import fonts
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elsia | Handmade Gifts",
  description: "Handmade scrunchies, polaroids & custom hampers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${caveat.variable} antialiased`} suppressHydrationWarning>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
