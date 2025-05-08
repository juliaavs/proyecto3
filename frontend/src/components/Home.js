import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Pelicula.css';

const Home = () => {
  const usuarioName = sessionStorage.getItem('usuarioName') || 'Usuario';
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    const usuarioId = sessionStorage.getItem('usuarioId');

    // Verifica si existe el usuarioId antes de hacer la petición
    if (usuarioId) {
      fetch(`http://localhost:3001/api/peliculas?usuarioId=${usuarioId}`)
        .then(res => res.json())
        .then(data => setPeliculas(data))  // Si no es un array, setPeliculas podría fallar
        .catch(err => console.error('Error al obtener películas:', err));
    } else {
      console.error('No se encontró el usuarioId');
    }
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta película?')) {
      fetch(`http://localhost:3001/api/peliculas/${id}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok) {
            alert('Película eliminada correctamente');
            setPeliculas(peliculas.filter((peli) => peli._id !== id)); // Actualiza el estado local
          } else {
            alert('Error al eliminar la película');
          }
        })
        .catch((err) => console.error('Error al eliminar película:', err));
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1 style={{ fontSize: '2em', color: '#333' }}>Bienvenido, {usuarioName}</h1>
      <p style={{ fontSize: '1.2em', color: '#555' }}>¡Explora tu colección de películas!</p>

      <Link to="/add">
        <button>Añadir Nueva Película</button>
      </Link>

      <div className="peliculas-grid">
        {/* Verifica si peliculas es un array antes de hacer el .map */}
        {Array.isArray(peliculas) && peliculas.length > 0 ? (
          peliculas.map(peli => (
            <div className="pelicula-card" key={peli._id}>
              <h2>{peli.nombre}</h2>
              {peli.imagen && (
                <img
                  src={`http://localhost:3001/${peli.imagen}`}
                  alt="Carátula"
                  className="pelicula-imagen"
                />
              )}

              <div className="pelicula-contenido">
                <p><strong>Nombre:</strong> {peli.nombre}</p>
                <p><strong>Comentario:</strong> {peli.comentario}</p>
                <p><strong>Puntuación:</strong> {peli.puntuacion}</p>
                <p><strong>Duración:</strong> {peli.duracion} min</p>
                <p><strong>Género:</strong> {peli.genero}</p>
                <p><strong>Director/a:</strong> {peli.director}</p>
                {/* Botón para editar */}
                <Link to={`/editar-pelicula/${peli._id}`}>
                  <button>Editar</button>
                </Link>
                <button onClick={() => handleDelete(peli._id)}>Eliminar</button>
              </div>
            </div>
          ))
        ) : (
          <p>No tienes películas registradas.</p>
        )}
      </div>
    </div>
  );
};

export default Home;

