// src/components/Login.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { login } from '../services/authService';

export default function Login() {
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(telefono);
      console.log('Navegando a Home')
      navigate('/home');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#FF4500] to-[#FF6B00] p-4 text-white">
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label>Ingrese Número de Celular</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full px-3 py-2 border rounded text-lg text-black"
            required
          />
        </div>
        <motion.button
          type="submit"
          className="w-full bg-[#FF4500] text-white py-2 rounded"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Ingresar
        </motion.button>
      </motion.form>
      <style>
        {`
          label {
            display: block;
            color: white;
            text-align: center;
            text-shadow: 1px 1px 2px #000, 2px 2px 4px;
            font-size: 1.5rem;
            margin-bottom: 1rem;
          }
        `}
      </style>
    </div>
  );
}