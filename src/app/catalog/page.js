"use client";

import { useCart } from "@/app/context/CartContext";
import { useSearchParams } from "next/navigation";
import { useMemo, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SimpleProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col">
      <div className="relative">
        <img
          className="rounded-t-lg w-full h-48 object-cover"
          src={product.image}
          alt={product.name}
        />
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <p className="text-gray-800 truncate font-medium">{product.name}</p>
        <p className="text-lg font-bold text-gray-900 mt-1">{product.price}</p>
        <button
          onClick={() => onAddToCart(product)}
          className="mt-4 w-full bg-lime-400 text-black font-bold py-2 px-4 rounded-lg hover:bg-lime-500 transition-colors"
        >
          + Tambah
        </button>
      </div>
    </div>
  );
};

const products = [
  { id: 1, name: "Buku Ajaib", price: "Rp50.000", image: "/book.jpg" },
  { id: 2, name: "Helm Kematian", price: "Rp250.000", image: "/helm2.jpg" },
  { id: 3, name: "Sepatu Keren Maksimal", price: "Rp500.000", image: "/shoes2.jpg" },
  { id: 4, name: "Laptop Gacor Pisan", price: "Rp1.000.000", image: "/laptop.jpg" },
];

// ⬇️ Komponen client yang pakai useSearchParams
function CatalogClientContent() {
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
  }, [query]);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-black">Ayo Belanja</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <SimpleProductCard
                  product={product}
                  onAddToCart={addToCart}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ⬇️ Bungkus dengan Suspense
export default function CatalogPage() {
  return (
    <Suspense fallback={<div>Memuat...</div>}>
      <CatalogClientContent />
    </Suspense>
  );
}
