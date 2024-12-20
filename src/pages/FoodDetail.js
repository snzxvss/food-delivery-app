// src/pages/FoodDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { fetchAllData } from '../services/dataService';
import CircularProgress from '@mui/material/CircularProgress';

export default function FoodDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getFood = async () => {
      try {
        const data = await fetchAllData();
        const foundFood = data.comidas.data.find((foodItem) => foodItem.id === Number(id));
        if (foundFood) {
          setFood(foundFood);
        } else {
          setError('No se encontró la comida.');
        }
        setLoading(false);
      } catch (err) {
        console.error('Error al obtener la comida:', err);
        setError('Error al obtener la información de la comida.');
        setLoading(false);
      }
    };

    getFood();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      {/* Contenedor principal que se adapta debajo del Navbar */}
      <div className="flex-grow max-w-md mx-auto p-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-[#FF4500] hover:underline"
        >
          &larr; Volver
        </button>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={`${process.env.REACT_APP_API_BACKEND}${food.foto_url}`}
            alt={food.nombre}
            className="w-full h-60 object-cover"
          />
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-2">{food.nombre}</h2>
            <p className="text-gray-600 mb-4">{food.descripcion}</p>
            <p className="text-xl font-bold text-[#FF4500]">
              Precio: ${food.precio.toLocaleString()}
            </p>
            {/* Aquí puedes agregar más detalles si están disponibles */}
          </div>
        </div>
      </div>
    </div>
  );
}