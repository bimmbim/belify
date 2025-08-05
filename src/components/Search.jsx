// components/Search.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('query') || ''
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (searchTerm) {
        params.set('query', searchTerm);
      } else {
        params.delete('query');
      }
      replace(`${pathname}?${params.toString()}`);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, searchParams, pathname, replace]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-container flex items-center bg-white rounded-md overflow-hidden">
      <div className="p-2">
        <Image
          src="/search.gif" 
          alt="Search Icon"
          width={20} 
          height={20} 
        />
      </div>
      <input
        type="text"
        placeholder="Cari produk"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input flex-grow px-2 py-2 text-black border-none focus:outline-none"
        style={{ minWidth: '150px' }} 
      />
    </div>
  );
}

export default Search;