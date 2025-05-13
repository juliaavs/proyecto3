import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Pelicula.css';
import Swal from 'sweetalert2';

import './Pelicula.css';

const Home = ({ searchTerm }) => {
const Home = () => {
  const usuarioName = sessionStorage.getItem('usuarioName') || 'Usuario';
  const [peliculas, setPeliculas] = useState([]);
  const [viewMode, setViewMode] = useState('cards'); // Estado para alternar entre cards y lista

  useEffect(() => {
    fetch('http://localhost:3001/api/peliculas')
      .then((res) => res.json())
      .then((data) => setPeliculas(data))
      .catch((err) => console.error('Error al obtener películas:', err));
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
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3001/api/peliculas/${id}`, {
          method: 'DELETE',
        })
          .then((res) => {
            if (res.ok) {
              Swal.fire({
                icon: 'success',
                title: 'Eliminada',
                text: 'La película se ha eliminado correctamente.',
              });
              setPeliculas(peliculas.filter((peli) => peli._id !== id)); // Actualiza el estado local
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al eliminar la película.',
              });
            }
          })
          .catch((err) => {
            console.error('Error al eliminar película:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al eliminar la película.',
            });
          });
      }
    });
  };

  // Filtrar las películas según el término de búsqueda
  const filteredPeliculas = peliculas.filter((peli) =>
    peli.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Mis Películas ({filteredPeliculas.length})</h2>

      {/* Botones para alternar entre cards y lista */}
      <div className="mb-4" id="botones">
        <button
            className={`btn ${viewMode === 'cards' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
            onClick={() => setViewMode('cards')}
            title="Ver en cuadrícula"
        >
            <i className="fas fa-th"></i>
        </button>
        <button
            className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setViewMode('list')}
            title="Ver en lista"
        >
            <i className="fas fa-bars"></i>
        </button>
     </div>

      {/* Renderizar las películas según el formato seleccionado */}
      {viewMode === 'cards' ? (
        <div className="row">
  {filteredPeliculas.map((peli) => (
    <div className="col-md-4 col-sm-6" key={peli._id}>
      <Link to={`/detalle-pelicula/${peli._id}`} className="card-link">
        <div className="card movie-card">
          <div className="movie-poster">
            {peli.imagen ? (
              <img
                src={`http://localhost:3001${peli.imagen.startsWith('/') ? '' : '/'}${peli.imagen}`}
                alt={peli.nombre}
              />
            ) : (
              <div className="movie-poster-placeholder">
                <i className="fas fa-film"></i>
              </div>
            )}
          </div>
          <div className="movie-info">
            <h5 className="movie-title">{peli.nombre}</h5>
            <div className="movie-details">
              <span className="movie-year-genre">{peli.genero}</span>
              <div className="movie-rating">
                <i className="fas fa-star"></i> {peli.puntuacion}/10
              </div>
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
          </div>
        </div>
      </Link>
    </div>
  ))}
</div>
      ) : (
        <ul className="list-group">
          {filteredPeliculas.map((peli) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={peli._id}>
              <div>
                <h5>{peli.nombre}</h5>
                <p className="mb-1"><strong>Género:</strong> {peli.genero}</p>
                <p className="mb-1"><strong>Puntuación:</strong> {peli.puntuacion}/10</p>
              </div>
              <div>
                <Link to={`/editar-pelicula/${peli._id}`}>
                  <button className="btn btn-sm btn-outline-primary me-2">Editar</button>
                </Link>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(peli._id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
          ))
        ) : (
          <p>No tienes películas registradas.</p>
        )}
      </div>
    </div>
  );
};

export default Home;

