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
  
    fetch(`http://localhost:3001/api/peliculas/${id}`, {
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
      <h1>Editar Película</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
        <textarea name="comentario" value={formData.comentario} onChange={handleChange}></textarea>
        <input type="number" name="puntuacion" value={formData.puntuacion} onChange={handleChange} />
        <input type="number" name="duracion" value={formData.duracion} onChange={handleChange} />
        <input type="text" name="genero" value={formData.genero} onChange={handleChange} />
        <input type="text" name="director" value={formData.director} onChange={handleChange} />
        <input type="file" name="imagen" accept="image/*" onChange={handleChange} />
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
}

export default EditarPelicula;
