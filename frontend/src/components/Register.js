import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/usuarios/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
  
      // Aquí manejamos la respuesta JSON
      const data = await response.json();
      console.log(data);
      alert('Usuario registrado exitosamente!');
      // Redirige a la página de inicio de sesión después de un registro exitoso
      navigate('/');

    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Hubo un error al registrar el usuario.');
    }
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <h1>Registro de usuario</h1>
      <input type="text" name="nombre" placeholder="Nombre de usuario" onChange={handleChange} />
      <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
      <button type="submit">Registrarse</button>
      <p>¿Ya tienes cuenta? <Link to="/">Inicia sesión aquí</Link></p>
    </form>
  );
}

export default Register;
