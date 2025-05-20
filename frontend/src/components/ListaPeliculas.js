import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Pelicula.css';

function ListaPeliculas() {
  const [peliculas, setPeliculas] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const peliculasPorPagina = 6;
  const navigate = useNavigate();

  useEffect(() => {
    fetchPeliculas();
  }, []);

  const fetchPeliculas = () => {
    fetch('https://localhost:3443/api/peliculas')
      .then(res => res.json())
      .then(data => setPeliculas(data))
      .catch(err => console.error('Error al obtener películas:', err));
  };

  const handleEdit = (id) => {
    navigate(`/editar-pelicula/${id}`);
  };

  const handleDeleteClick = (peli) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar la película "${peli.nombre}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarPelicula(peli._id);
      }
    });
  };

  const eliminarPelicula = (id) => {
    fetch(`http://localhost:3443/api/peliculas/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          Swal.fire('Eliminado', 'La película ha sido eliminada.', 'success');
          fetchPeliculas();
        } else {
          Swal.fire('Error', 'No se pudo eliminar la película.', 'error');
        }
      })
      .catch(err => {
        console.error('Error al eliminar película:', err);
        Swal.fire('Error', 'Ocurrió un error al eliminar.', 'error');
      });
  };

  // Paginación
  const indiceUltima = paginaActual * peliculasPorPagina;
  const indicePrimera = indiceUltima - peliculasPorPagina;
  const peliculasPagina = peliculas.slice(indicePrimera, indiceUltima);
  const totalPaginas = Math.ceil(peliculas.length / peliculasPorPagina);

  return (
    <div className="peliculas-container">
      <h1>Películas Añadidas</h1>
      <button className="btn-add" onClick={() => navigate('/add')}>
        Añadir Película
      </button>

      <div className="peliculas-grid">
        {peliculasPagina.map(peli => (
          <div className="pelicula-card" key={peli._id}>
            <h2>{peli.nombre}</h2>
            {peli.imagen && (
              <img
                src={`https://localhost:3443/${peli.imagen.replace(/^\/?/, '')}`}
                alt="Carátula"
                className="pelicula-imagen"
              />
            )}
            <div className="pelicula-contenido">
              <p><strong>Comentario:</strong> {peli.comentario}</p>
              <p><strong>Puntuación:</strong> {peli.puntuacion}</p>
              <p><strong>Duración:</strong> {peli.duracion} min</p>
              <p><strong>Género:</strong> {peli.genero}</p>
              <p><strong>Director/a:</strong> {peli.director}</p>
              <div className="botones">
                <button className="btn-editar" onClick={() => handleEdit(peli._id)}>Editar</button>
                <button className="btn-eliminar" onClick={() => handleDeleteClick(peli)}>Eliminar</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginación */}
      <div className="paginacion">
        {[...Array(totalPaginas)].map((_, index) => (
          <button
            key={index}
            onClick={() => setPaginaActual(index + 1)}
            className={paginaActual === index + 1 ? "activo" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ListaPeliculas;
