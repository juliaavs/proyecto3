import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logo from '../img/logo4.png'; // Asegúrate de que la ruta sea correcta
import './Login.css'; // Importar estilos personalizados

function Login() {
  const [LoginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...LoginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await fetch('https://localhost:3001/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(LoginData),
      });
      const data = await respuesta.json();

      if (respuesta.ok) {
        sessionStorage.setItem('usuarioId', data.usuarioId);
        sessionStorage.setItem('usuarioName', data.usuarioName);
        sessionStorage.setItem('usuarioEmail', data.usuarioEmail);
        console.log('Usuario logueado:', data);

        // Mostrar mensaje de bienvenida con SweetAlert2
        Swal.fire({
          icon: 'success',
          title: `¡Bienvenido, ${data.usuarioName}!`,
          text: 'Has iniciado sesión correctamente.',
          timer: 3000, // El mensaje desaparecerá automáticamente después de 3 segundos
          timerProgressBar: true,
          showConfirmButton: false,
        });

        navigate('/home'); // Redirige a la página principal
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.error || 'Hubo un problema al iniciar sesión.',
        });
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al iniciar sesión.',
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-image">
          <img
            src={Logo}
            alt="Logo FilmTracker"
            className="logo-large-login"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="login-form"
        >
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={LoginData.email}
              onChange={handleChange}
              required
              placeholder="ejemplo@correo.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={LoginData.password}
              onChange={handleChange}
              required
              placeholder="Tu contraseña"
            />
          </div>
          <button type="submit" className="btn btn-secondary w-100">
            Entrar
          </button>
          <p className="mt-3 text-center">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-primary">
              Regístrate aquí
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
