import axios from 'axios';

const API_BACKEND = process.env.REACT_APP_API_BACKEND;

export const login = async (telefono) => {
  try {
    const response = await axios.post(`${API_BACKEND}/api/auth/login/phone`, { telefono });
    if (response.data.success) {
      const token = response.data.data.token;
      console.log('Token: ', token);
      localStorage.setItem('token', token);
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      try {
        const registerResponse = await axios.post(`${API_BACKEND}/api/users/phone`, { telefono });
        if (registerResponse.data.success) {
          const loginResponse = await axios.post(`${API_BACKEND}/api/auth/login/phone`, { telefono });
          if (loginResponse.data.success) {
            const token = loginResponse.data.data.token;
            console.log('Token after registration: ', token);
            localStorage.setItem('token', token);
            return loginResponse.data;
          }
        } else {
          throw new Error(registerResponse.data.message);
        }
      } catch (registerError) {
        throw registerError.response.data;
      }
    } else {
      throw error.response.data;
    }
  }
};