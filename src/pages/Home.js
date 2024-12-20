// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import NavButton from '../components/NavButton';
import Categories from '../components/Categories';
import ProductList from '../components/ProductList';
import FoodList from '../components/FoodList'; // Importar FoodList
import { fetchAllData } from '../services/dataService';
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [foods, setFoods] = useState([]); // Nuevo estado para comidas
  const [loadingData, setLoadingData] = useState(true);
  const [dataError, setDataError] = useState('');

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

        // Obtener comidas
        const fetchedFoods = data.comidas.data.map(food => ({
          id: food.id,
          nombre: food.nombre,
          descripcion: food.descripcion,
          precio: food.precio,
          foto_url: food.foto_url,
        }));
        setFoods(fetchedFoods);

        setLoadingData(false);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setDataError('Error al cargar los datos. Por favor, intenta nuevamente más tarde.');
        setLoadingData(false);
      }
    };

    loadData();
  }, []);

  if (loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (dataError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{dataError}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-gradient-to-r from-[#FF4500] to-[#FF6B00] p-4 text-white">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Restaurante Nombre</h2>
              <p className="text-sm">Comida con un precio especial.</p>
            </div>
            <div className="text-right">
              <p className="text-sm">Fecha Actual:</p>
              <p className="text-2xl font-bold">{new Date().toLocaleDateString()}</p>
              <p className="text-xs">Bienvenido!</p>
            </div>
          </div>
        </div>
      </div>
      {/* Ajuste en el contenedor de contenido para evitar que NavButton oculte el contenido */}
      <div className="flex-grow overflow-auto p-4 pb-24">
        <div className="max-w-md mx-auto">
          <Categories categories={categories} /> {/* Utilizar Categories */}
        </div>
        <ProductList products={products} /> {/* Utilizar ProductList */}

        {/* Nuevo Componente FoodList */}
        <FoodList foods={foods} />
      </div>
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