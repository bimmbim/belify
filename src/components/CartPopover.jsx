"use client";

import Image from 'next/image';
import { useCart } from '@/app/context/CartContext.jsx';

export default function CartPopover() {
  const { cart, increaseQty, decreaseQty } = useCart();

  return (
    <div className="relative group p-3 -m-3">
      <Image
        src="/cart2.png"
        width={32}
        height={32}
        alt="Cart"
        className="cursor-pointer"
      />

      {cart.length > 0 && (
        <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center pointer-events-none">
          {cart.reduce((total, item) => total + item.quantity, 0)}
        </span>
      )}

      <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-xl p-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 ease-in-out z-50">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center text-center">
            <img src="/wow.jpeg" className="w-20 h-20 mb-2 rounded-xl" />
            <h2 className="text-lg font-semibold text-black">Wah, keranjang belanjamu kosong</h2>
            <p className="text-sm text-gray-500">Yuk, isi dengan barang-barang impianmu!</p>
          </div>
        ) : (
          <div>
            <h3 className="text-md font-semibold text-black mb-3 border-b pb-2">Isi Keranjang</h3>
            <ul className="space-y-4 max-h-64 overflow-y-auto">
              {cart.map(item => (
                <li key={item.id} className="flex justify-between items-center">
                  {/* Info produk */}
                  <div className="flex items-center gap-3 flex-1">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded-md object-cover"
                    />
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-black">{item.name}</p>
                      <p className="text-sm text-gray-700">{item.price}</p>
                    </div>
                  </div>

                  {/* Tombol + dan - */}
                  <div className="flex items-center gap-2 ml-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="w-6 h-6 flex items-center justify-center bg-gray-200 text-black rounded hover:bg-red-400"
                      aria-label={`Kurangi ${item.name}`}
                    >
                      −
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="w-6 h-6 flex items-center justify-center bg-gray-200 text-black rounded hover:bg-green-400"
                      aria-label={`Tambah ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
