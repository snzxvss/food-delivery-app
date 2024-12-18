import { useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-[#FF4500] p-4 sticky top-0 z-10">
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Arroz de pollo, carne asada..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-full bg-white shadow-sm focus:outline-none"
        />
        <ShoppingCart className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
      </div>
    </header>
  );
}
