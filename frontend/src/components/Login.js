import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';

// Componente de inicio de sesión

function Login() {
  const [LoginData, setLoginData] = useState({
    correoElectronico: '',
    contrasena: ''
  });
  const navigate = useNavigate();

  // Maneja el cambio de los campos de entradabv

  const handleChange = (e) => {
    setLoginData({ ...LoginData, [e.target.name]: e.target.value });
  };

  // Maneja el envío del formulario

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch('http://localhost:3001/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(LoginData),
      });
      const data = await respuesta.json();
      
      if (respuesta.ok) {
        alert(`¡Bienvenido, ${data.usuario}!`);
        console.log('Usuario autenticado:', data.usuario);

        // Almacena el nombre de usuario en sessionStorage
        sessionStorage.setItem('userName', data.usuario);
         // Redirige a la página principal después de un inicio de sesión exitoso
        navigate('/home');
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Hubo un error al iniciar sesión.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Inicio de Sesión</h1>
      <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
      <button type="submit">Iniciar Sesión</button>
      <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
    </form>
  );
}

export default Login;
