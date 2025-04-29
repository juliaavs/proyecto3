import React, { useState } from 'react';

function AddPelicula() {
  const [pelicula, setPelicula] = useState({
    nombre: '',
    comentario: '',
    puntuacion: '',
    duracion: ''
  });

  const handleChange = (e) => {
    setPelicula({ ...pelicula, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/peliculas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pelicula)
      });
      if (res.ok) {
        alert('Película añadida correctamente');
        setPelicula({ nombre: '', comentario: '', puntuacion: '', duracion: '' });
      } else {
        alert('Error al enviar la película');
      }
    } catch (error) {
      console.error(error);
      alert('Error de conexión');
    }
  };

  return (
    <div>
      <h2>🎬Añadir Película</h2>
      <form onSubmit={handleSubmit}>


        <label>
          Nombre:
          <input type="text" name="nombre" value={pelicula.nombre} onChange={handleChange} />
        </label><br />

        <label>
          Comentario:
          <input type="text" name="comentario" value={pelicula.comentario} onChange={handleChange} />
        </label><br />

        <label>
          Puntuación:
          <input type="number" name="puntuacion" value={pelicula.puntuacion} onChange={handleChange} />
        </label><br />

        <label>
          Duración (minutos):
          <input type="number" name="duracion" value={pelicula.duracion} onChange={handleChange} />
        </label><br />

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default AddPelicula;
