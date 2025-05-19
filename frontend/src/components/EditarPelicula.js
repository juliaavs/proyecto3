import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function EditarPelicula() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    comentario: '',
    puntuacion: '',
    duracion: '',
    genero: '',
    director: '',
    imagen: null
  });

  useEffect(() => {
    fetch(`http://localhost:3001/api/peliculas/${id}`)
      .then(res => res.json())
      .then(data => setFormData(data))
      .catch(err => console.error('Error al obtener película:', err));
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === 'imagen') {
      setFormData({ ...formData, imagen: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
  
    fetch(`https://localhost:3001/api/peliculas/${id}`, {
      method: 'PUT',
      body: data,
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Película actualizada',
          text: 'La película se ha actualizado correctamente.',
        }).then(() => navigate('/home'));
      })
      .catch((err) => {
        console.error('Error al actualizar película:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al actualizar la película.',
        });
      });
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Editar Película</h1>
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
        <button type="submit" className="btn btn-primary">Actualizar</button>
      </form>
    </div>
  );
}

export default EditarPelicula;
