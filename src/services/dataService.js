import axios from 'axios';

const API_BACKEND = process.env.REACT_APP_API_BACKEND;

const cache = {};

/**
 * Obtiene todos los datos necesarios desde el backend.
 * @returns {Object} Objeto que contiene los datos de todos los endpoints.
 */
export const fetchAllData = async () => {
  // Verifica si los datos ya están en caché
  if (Object.keys(cache).length > 0) {
    return cache;
  }

  try {
    const [
      comidas,
      pedidos,
      detallePedidos,
      estadosPedido,
      ofertas,
      categorias,
      sugerencias,
      valoraciones
    ] = await Promise.all([
      axios.get(`${API_BACKEND}/api/comidas`),
      axios.get(`${API_BACKEND}/api/pedidos`),
      axios.get(`${API_BACKEND}/api/detallepedidos`),
      axios.get(`${API_BACKEND}/api/estadospedido`),
      axios.get(`${API_BACKEND}/api/ofertas`),
      axios.get(`${API_BACKEND}/api/categorias`),
      axios.get(`${API_BACKEND}/api/sugerencias`),
      axios.get(`${API_BACKEND}/api/valoraciones`)
    ]);

    cache.comidas = comidas.data;
    cache.pedidos = pedidos.data;
    cache.detallePedidos = detallePedidos.data;
    cache.estadosPedido = estadosPedido.data;
    cache.ofertas = ofertas.data;
    cache.categorias = categorias.data;
    cache.sugerencias = sugerencias.data;
    cache.valoraciones = valoraciones.data;

    return cache;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
};