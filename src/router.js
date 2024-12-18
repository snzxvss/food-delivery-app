import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import FoodDeliveryApp from './App';
import Login from './components/Login';
import { jwtDecode } from 'jwt-decode'; // Importación corregida

// Función para validar el token
const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token); // Uso correcto de la función importada
    const currentTime = Date.now() / 1000; // Tiempo actual en segundos
    return decoded.exp > currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
};

// Componente para rutas protegidas
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return isTokenValid(token) ? children : <Navigate to="/" />;
};

// Componente del router principal
const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          isTokenValid(localStorage.getItem('token')) ? <Navigate to="/app" /> : <Login />
        }
      />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <FoodDeliveryApp />
          </ProtectedRoute>
        }
      />
      {/* Puedes agregar más rutas protegidas aquí */}
      <Route path="*" element={<Navigate to="/" />} /> {/* Redirige rutas no definidas a "/" */}
    </Routes>
  );
};

export default AppRouter;