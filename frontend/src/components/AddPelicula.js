
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function AddPelicula() {
  const navigate = useNavigate();

  
  useEffect(() => {
    
    const userName = sessionStorage.getItem('userName');
    console.log('Usuario autenticado:', userName);

    if (!userName) {
      navigate('/login');
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
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
  
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
      <h2>🎬 Añadir Nueva Película</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
        
        <textarea name="comentario" placeholder="Comentario" onChange={handleChange}></textarea>
        <input type="number" name="puntuacion" placeholder="Puntuación (máx 10)" onChange={handleChange} required />
        <input type="number" name="duracion" placeholder="Duración (min)" onChange={handleChange} required />
        <input type="text" name="genero" placeholder="Género" onChange={handleChange} required />
        <input type="text" name="director" placeholder="Director/a" onChange={handleChange} required />
        <input type="file" name="imagen" accept="image/*" onChange={handleChange} />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default AddPelicula;
