import { Home, Grid, Clock } from 'lucide-react';

export default function NavButton() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="max-w-md mx-auto flex justify-around p-4">
        <button className="flex flex-col items-center text-[#FF4500]">
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Inicio</span>
        </button>
        <button className="flex flex-col items-center text-gray-400">
          <Grid className="w-6 h-6" />
          <span className="text-xs mt-1">Categorías</span>
        </button>
        <button className="flex flex-col items-center text-gray-400">
          <Clock className="w-6 h-6" />
          <span className="text-xs mt-1">Pedidos</span>
        </button>
      </div>
    </div>
  );
}
