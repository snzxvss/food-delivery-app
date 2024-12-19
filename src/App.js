import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import NavButton from './components/NavButton';
import Categories from './components/Categories'; // Asegúrate de que esta ruta es correcta
import ProductList from './components/ProductList'; // Importa ProductList
import { fetchAllData } from './services/dataService';

export default function FoodDeliveryApp() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]); // Agrega estado para productos

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAllData();

        // Obtener categorías
        const fetchedCategories = data.categorias.data.map(cat => ({
          name: cat.nombre,
          icon: `${process.env.REACT_APP_API_BACKEND}${cat.imagen}`,
        }));
        setCategories(fetchedCategories);

        // Obtener ofertas y mapearlas a productos
        const fetchedProducts = data.ofertas.data.map(offer => ({
          name: offer.descripcion,
          originalPrice: 10000, // Placeholder: Reemplaza con el precio original real si está disponible
          discountedPrice: 10000 - (10000 * offer.descuento) / 100, // Calcula el precio descontado
          discount: `${offer.descuento}% OFF`,
          image: `${process.env.REACT_APP_API_BACKEND}${offer.foto_url}`,
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };

    loadData();
  }, []);

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
          <Categories categories={categories} /> {/* Utilizar Categories */}
        </div>
      </div>
      <ProductList products={products} /> {/* Utilizar ProductList */}
      <NavButton />
      <style>{`
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