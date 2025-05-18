
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function AddPelicula() {
  const navigate = useNavigate();
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    const usuarioName = sessionStorage.getItem('usuarioName');
    const usuarioId = sessionStorage.getItem('usuarioId');

    console.log('Usuario autenticado:', usuarioName);
    console.log('ID de usuario:', usuarioId);

    if (!usuarioName) {
      navigate('/login');
    } else {
      setUsuarioId(usuarioId);
    }
  }, [navigate]);
  

  
  const [formData, setFormData] = useState({
    nombre: '',
    comentario: '',
    puntuacion: '',
    duracion: '',
    genero: '',
    director: '',
    imagen: null
  });

 

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagen') {
      setFormData({ ...formData, imagen: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (formData.puntuacion > 10) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La puntuación no puede ser mayor que 10.',
      });
      return;
    }


  
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    data.append('usuarioId', usuarioId);
    // Verifica qué datos se están enviando
    for (let pair of data.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }
  
    fetch('http://localhost:3001/api/peliculas/add', {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Película creada',
          text: 'La película se ha añadido correctamente.',
        }).then(() => {
          navigate('/home'); // Redirige a la página principal
        });
      })
      .catch((err) => {
        console.error('Error al añadir película:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al añadir la película.',
        });
      });
  };

  return (
    <div className="form-container">
      <h1 className="form-title">🎬 Añadir Nueva Película</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="genero">Género</label>
            <input
              type="text"
              id="genero"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="puntuacion">Puntuación (máx 10)</label>
            <input
              type="number"
              id="puntuacion"
              name="puntuacion"
              value={formData.puntuacion}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="duracion">Duración (min)</label>
            <input
              type="number"
              id="duracion"
              name="duracion"
              value={formData.duracion}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="director">Director/a</label>
            <input
              type="text"
              id="director"
              name="director"
              value={formData.director}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imagen">Imagen</label>
            <input
              type="file"
              id="imagen"
              name="imagen"
              accept="image/*"
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="comentario">Comentario</label>
          <textarea
            id="comentario"
            name="comentario"
            value={formData.comentario}
            onChange={handleChange}
            className="form-control"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
}

export default AddPelicula;
