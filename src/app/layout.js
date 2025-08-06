import "./globals.css";
import Link from "next/link";
import { CartProvider } from "@/app/context/CartContext.jsx";
import CartPopover from "@/components/CartPopover";
import BelifyText from "@/components/BelifyButton";
import Search from "@/components/Search";
import { Suspense } from "react";

export const metadata = {
  title: "BeliFy.",
  description: "Next.js E-Commerce",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className="antialiased bg-white text-black font-sans">
        <CartProvider>
          <div className="mx-auto mt-6 mb-10 max-w-[1440px] rounded-xl overflow-visible shadow-lg">
            <div className="flex w-full">
              <div className="bg-lime-400 px-8 py-4 flex items-center justify-center rounded-l-xl">
                <span className="text-2xl font-bold text-black tracking-widest">
                  <BelifyText />
                </span>
              </div>
              <div className="flex items-center justify-end bg-black flex-grow px-10 py-4 gap-4 rounded-r-xl">
                
                <Link href="/" className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition">
                  Home
                </Link>
                
                
                <Link href="/catalog" className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition">
                  Katalog
                </Link>

                <Link href="/profile" className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-200 transition">
                  Profile
                </Link>

                <Suspense fallback={<div>Loading...</div>}>
                <Search />
                </Suspense>
                <CartPopover />
              </div>
            </div>
          </div>
          <main className="max-w-5xl mx-auto px-6 pb-20">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}