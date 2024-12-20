// src/pages/Categories.js
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import NavButton from '../components/NavButton';
import Categories from '../components/Categories';
import { fetchAllData } from '../services/dataService';
import CircularProgress from '@mui/material/CircularProgress';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [dataError, setDataError] = useState('');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchAllData();

        // Obtener categorías
        const fetchedCategories = data.categorias.data.map(cat => ({
          name: cat.nombre,
          icon: `${process.env.REACT_APP_API_BACKEND}${cat.imagen}`,
        }));
        setCategories(fetchedCategories);
        setLoadingData(false);
      } catch (error) {
        console.error('Error al cargar las categorías:', error);
        setDataError('Error al cargar las categorías. Por favor, intenta nuevamente más tarde.');
        setLoadingData(false);
      }
    };

    loadCategories();
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-gradient-to-r from-[#FF4500] to-[#FF6B00] p-4 text-white">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold">Categorías Disponibles</h2>
          <p className="text-sm">Selecciona una categoría para ver más detalles.</p>
        </div>
      </div>
      <div className="p-4">
        <div className="max-w-md mx-auto">
          <Categories categories={categories} />
        </div>
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