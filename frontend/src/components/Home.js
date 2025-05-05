import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Pelicula.css'; // Asegúrate de importar tu archivo CSS

const Home = () => {
  const userName = sessionStorage.getItem('userName') || 'Usuario';
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/peliculas')
      .then(res => res.json())
      .then(data => setPeliculas(data))
      .catch(err => console.error('Error al obtener películas:', err));
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1 style={{ fontSize: '2em', color: '#333' }}>Bienvenido, {userName}</h1>
      <p style={{ fontSize: '1.2em', color: '#555' }}>¡Explora tu colección de películas!</p>

      <Link to="/add">
        <button>Añadir Nueva Película</button>
      </Link>

      <div className="peliculas-grid">
        {peliculas.map(peli => (
          <div className="pelicula-card" key={peli._id}>
            <h2>{peli.nombre}</h2>
            {peli.imagen && (
                console.log(peli.imagen),
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
