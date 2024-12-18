import Navbar from './components/Navbar';
import NavButton from './components/NavButton';
import Card from './components/Card';

export default function FoodDeliveryApp() {
  const categories = [
    { name: 'Del Barrio', icon: '🏪' },
    { name: 'Desayuno', icon: '🍳' },
    { name: 'Colombiana', icon: '🇨🇴' },
    { name: 'Postres', icon: '🍰' },
    { name: 'Exprés', icon: '🚀' },
  ];

  const products = [
    {
      name: 'Empanada Hawai',
      originalPrice: 11000,
      discountedPrice: 5500,
      discount: '50% OFF',
      image: '/placeholder.svg?height=200&width=200'
    },
    {
      name: 'Vaquerito de Pechuga',
      originalPrice: 28800,
      discountedPrice: 11520,
      discount: '60% OFF',
      image: '/placeholder.svg?height=200&width=200'
    },
    {
      name: '3 Buñuelos',
      originalPrice: 11000,
      discountedPrice: 5500,
      discount: '50% OFF',
      image: '/placeholder.svg?height=200&width=200'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-gradient-to-r from-[#FF4500] to-[#FF6B00] p-4 text-white">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Restaurante Nombre</h2>
              <p className="text-sm">Comida con un precio especial.</p>
            </div>
            <div className="text-right">
              <p className="text-sm"></p>
              <p className="text-2xl font-bold"></p>
              <p className="text-xs"></p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="max-w-md mx-auto">
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((category) => (
              <div
                key={category.name}
                className="flex flex-col items-center space-y-2 flex-shrink-0"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-2">Come hasta por $22500</h2>
          <p className="text-gray-500 mb-4">Platillos en súper precio</p>
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {products.map((product) => (
              <Card key={product.name} product={product} />
            ))}
          </div>
        </div>
      </div>
      <NavButton />
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
