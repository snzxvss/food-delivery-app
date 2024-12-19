import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import FoodDeliveryApp from './App';
import Login from './components/Login';
import { jwtDecode } from 'jwt-decode';
import { fetchAllData } from './services/dataService';


const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return isTokenValid(token) ? children : <Navigate to="/" />;
};

const AppRouter = () => {
  useEffect(() => {
    fetchAllData()
      .then((data) => {
        console.log('Datos cargados:', data);
      })
      .catch((error) => {
        console.error('Error al cargar los datos iniciales:', error);
      });
  }, []);
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
      {/* Más rutas protegidas aquí */}
      <Route path="*" element={<Navigate to="/" />} /> {/* Redirige rutas no definidas a "/" */}
    </Routes>
  );
};

export default AppRouter;