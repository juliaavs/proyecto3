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

// Cerrar sesion
export const cerrarSesion = async () => {
  try {
    const response = await axios.post(`${apiUrl}/usuarios`);
    return response.data;
  } catch (error) {
    console.error("Error al cerrar sesión", error);
    throw error;
  }
};


//añadir pelis
export const añadirPelicula = async (peliculaData) => {
  try {
    const response = await axios.post(`${apiUrl}/peliculas`, peliculaData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al añadir película", error);
    throw error;
  }
};

// Obtener todas las películas
export const obtenerPeliculas = async () => {
  try {
    const response = await axios.get(`${apiUrl}/peliculas`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener películas", error);
    throw error;
  }
};

// Obtener una película por ID
export const obtenerPeliculaPorId = async (id) => {
  try {
    const response = await axios.get(`${apiUrl}/peliculas/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener película", error);
    throw error;
  }
};
// Actualizar una película
export const actualizarPelicula = async (id, peliculaData) => {
  try {
    const response = await axios.put(`${apiUrl}/peliculas/${id}`, peliculaData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar película", error);
    throw error;
  }
};
// Eliminar una película  
export const eliminarPelicula = async (id) => {
  try {
    const response = await axios.delete(`${apiUrl}/peliculas/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar película", error);
    throw error;
  }
};

// Obtener películas por usuario
export const obtenerPeliculasPorUsuario = async (usuarioId) => {
  try {
    const response = await axios.get(`${apiUrl}/peliculas?usuarioId=${usuarioId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener películas por usuario", error);
    throw error;
  }
};



