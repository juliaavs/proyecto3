import axios from 'axios';

const apiUrl = 'http://localhost:3001/api';  // Cambia esto si tu backend tiene otro puerto o URL

// Crear un usuario
export const crearUsuario = async (usuarioData) => {
  try {
    const response = await axios.post(`${apiUrl}/usuarios`, usuarioData);
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario", error);
    throw error;
  }
};

// Iniciar sesión
export const iniciarSesion = async (loginData) => {
  try {
    const response = await axios.post(`${apiUrl}/usuarios`, loginData);
    return response.data;
  } catch (error) {
    console.error("Error al iniciar sesión", error);
    throw error;
  }
};



