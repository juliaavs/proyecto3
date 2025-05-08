import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Pelicula.css';
import Swal from 'sweetalert2';

const Home = ({ searchTerm }) => {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/peliculas')
      .then((res) => res.json())
      .then((data) => setPeliculas(data))
      .catch((err) => console.error('Error al obtener películas:', err));
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
      <h1 className="mb-4">Mis Películas</h1>
      <div className="row">
        {filteredPeliculas.map((peli) => (
          <div className="col-md-4 col-sm-6" key={peli._id}>
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
                </div>
              </div>
              <div className="movie-actions">
                <Link to={`/editar-pelicula/${peli._id}`}>
                  <button className="btn-action" title="Editar">
                    <i className="fas fa-edit"></i>
                  </button>
                </Link>
                <button
                  className="btn-action"
                  title="Eliminar"
                  onClick={() => handleDelete(peli._id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;