import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetallePelicula.css';

const DetallePelicula = () => {
  const { id } = useParams(); // Obtener el ID de la película desde la URL
  const navigate = useNavigate();
  const [pelicula, setPelicula] = useState(null);

  useEffect(() => {
    // Obtener los detalles de la película desde el backend
    fetch(`${process.env.REACT_APP_API_URL}/api/peliculas/${id}`)
      .then((res) => res.json())
      .then((data) => setPelicula(data))
      .catch((err) => console.error('Error al obtener los detalles de la película:', err));
  }, [id]);

  if (!pelicula) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="detalle-container">
      <button className="btn btn-secondary mb-4" onClick={() => navigate('/home')}>
        Volver
      </button>
      <div className="detalle-content">
        <div className="detalle-image">
          {pelicula.imagen ? (
            <img
              src={`http://localhost:3001${pelicula.imagen.startsWith('/') ? '' : '/'}${pelicula.imagen}`}
              alt={pelicula.nombre}
            />
          ) : (
            <div className="no-image">
              <h3>Sin imagen disponible</h3>
            </div>
          )}
        </div>
        <div className="detalle-info">
          <h1>{pelicula.nombre}</h1>
          <p><strong>Director:</strong> {pelicula.director}</p>
          <p><strong>Género:</strong> {pelicula.genero}</p>
          <p><strong>Duración:</strong> {pelicula.duracion} min</p>
          <p><strong>Puntuación:</strong> {pelicula.puntuacion}/10</p>
          <p><strong>Comentario:</strong> {pelicula.comentario}</p>
        </div>
      </div>
    </div>
  );
};

export default DetallePelicula;