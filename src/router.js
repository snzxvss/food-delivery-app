// src/router.js
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CategoriesPage from './pages/Categories';
import OrdersPage from './pages/Orders';
import FoodDetail from './pages/FoodDetail'; // Importar FoodDetail
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
          isTokenValid(localStorage.getItem('token')) ? <Navigate to="/home" /> : <Login />
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <CategoriesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />
      {/* Nueva Ruta para FoodDetail */}
      <Route
        path="/food/:id"
        element={
          <ProtectedRoute>
            <FoodDetail />
          </ProtectedRoute>
        }
      />
      {/* Más rutas protegidas aquí */}
      <Route path="*" element={<Navigate to="/" />} /> {/* Redirige rutas no definidas a "/" */}
    </Routes>
  );
};

export default AppRouter;