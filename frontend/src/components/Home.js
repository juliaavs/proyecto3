import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Pelicula.css';
import Swal from 'sweetalert2';

const Home = ({ searchTerm }) => {
  const usuarioId = sessionStorage.getItem('usuarioId');
  const [peliculas, setPeliculas] = useState([]);
  const [viewMode, setViewMode] = useState('cards'); // Estado para alternar entre cards y lista
  const [generos, setGeneros] = useState([]); // Lista de géneros únicos
  const [directores, setDirectores] = useState([]); // Lista de directores únicos
  const [selectedGenero, setSelectedGenero] = useState(''); // Filtro por género
  const [selectedDirector, setSelectedDirector] = useState(''); // Filtro por director

  useEffect(() => {
    if (!usuarioId) {
      console.error('No se encontró el usuarioId');
      return;
    }

    // Obtener todas las películas del usuario
    fetch(`${process.env.REACT_APP_API_URL}/api/peliculas?usuarioId=${usuarioId}`)
      .then((res) => res.json())
      .then((data) => {
        setPeliculas(data);
        actualizarFiltros(data); // Actualizar géneros y directores
      })
      .catch((err) => console.error('Error al obtener películas:', err));
  }, [usuarioId]);

  const actualizarFiltros = (peliculas) => {
    // Calcular géneros y directores únicos
    const nuevosGeneros = [...new Set(peliculas.map((peli) => peli.genero))];
    const nuevosDirectores = [...new Set(peliculas.map((peli) => peli.director))];
    setGeneros(nuevosGeneros);
    setDirectores(nuevosDirectores);
  };

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
        fetch(`${process.env.REACT_APP_API_URL}/api/peliculas/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ usuarioId }),
        })
          .then((res) => {
            if (res.ok) {
              Swal.fire({
                icon: 'success',
                title: 'Eliminada',
                text: 'La película se ha eliminado correctamente.',
              });
              const nuevasPeliculas = peliculas.filter((peli) => peli._id !== id);
              setPeliculas(nuevasPeliculas); // Actualiza el estado local
              actualizarFiltros(nuevasPeliculas); // Actualiza los filtros dinámicamente
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

  // Filtrar las películas según el término de búsqueda, género y director
  const filteredPeliculas = peliculas.filter((peli) => {
    const matchesSearch = peli.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenero = selectedGenero ? peli.genero === selectedGenero : true;
    const matchesDirector = selectedDirector ? peli.director === selectedDirector : true;
    return matchesSearch && matchesGenero && matchesDirector;
  });

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Filtros en el lateral izquierdo */}
        <div className="col-md-3">
          <div className="filters">
            <h5>Filtrar por Género</h5>
            <ul className="filter-list">
              {generos.map((genero) => (
                <li key={genero}>
                  <button
                    className={`filter-button ${selectedGenero === genero ? 'active' : ''}`}
                    onClick={() => setSelectedGenero(selectedGenero === genero ? '' : genero)}
                  >
                    {genero}
                  </button>
                </li>
              ))}
            </ul>

            <h5>Filtrar por Director</h5>
            <ul className="filter-list">
              {directores.map((director) => (
                <li key={director}>
                  <button
                    className={`filter-button ${selectedDirector === director ? 'active' : ''}`}
                    onClick={() => setSelectedDirector(selectedDirector === director ? '' : director)}
                  >
                    {director}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lista de películas */}
        <div className="col-md-9">
          <h2 className="mb-4 text-white">Mis Películas ({filteredPeliculas.length})</h2>

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
                  <div className="card movie-card">
                    <Link to={`/detalle-pelicula/${peli._id}`} className="card-link">
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
                    </Link>
                    {/* Botones de acciones */}
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
          ) : (
            <ul className="list-group">
              {filteredPeliculas.map((peli) => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={peli._id}>
                  <div>
                    <h5>{peli.nombre}</h5>
                    <p className="mb-1"><strong>Género:</strong> {peli.genero}</p>
                    <p className="mb-1"><strong>Puntuación:</strong> {peli.puntuacion}/10</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;


