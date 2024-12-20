// src/components/FoodList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FoodList({ foods }) {
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/food/${id}`);
  };

  const handleCardClick = (id) => {
    navigate(`/food/${id}`);
  };

  return (
    <div className="mt-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Comidas Disponibles</h2>
        <div className="grid grid-cols-2 gap-4">
          {foods.map((food) => (
            <div
              key={food.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
              onClick={() => handleCardClick(food.id)}
            >
              <img
                src={`${process.env.REACT_APP_API_BACKEND}${food.foto_url}`}
                alt={food.nombre}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold mb-2 truncate">{food.nombre}</h3>
                <p className="text-xs text-gray-500 mb-2 truncate">{food.descripcion}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[#FF4500] font-bold">
                      ${food.precio.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Función del carrito en desarrollo
                      console.log(`Agregar ${food.nombre} al carrito`);
                    }}
                    className="w-8 h-8 bg-[#FF4500] text-white rounded-full flex items-center justify-center"
                    aria-label={`Agregar ${food.nombre} al carrito`}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}