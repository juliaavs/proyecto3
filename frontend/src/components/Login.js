import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import Logo from '../img/logo2.jpeg'; // Asegúrate de que la ruta sea correcta
import 'bootstrap/dist/css/bootstrap.min.css';

// Componente de inicio de sesión

function Login() {
  const [LoginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  // Maneja el cambio de los campos de entrada
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
        sessionStorage.setItem('usuarioId', data.usuarioId);
        sessionStorage.setItem('usuarioName', data.usuarioName);
        sessionStorage.setItem('usuarioEmail', data.usuarioEmail);
        alert(`¡Bienvenido, ${data.usuarioName}!`);
        console.log('Usuario autenticado:', data.usuarioName);
        console.log('ID de usuario:', data.usuarioId);
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
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        
        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 rounded shadow-sm w-100"
          style={{ maxWidth: '400px' }}
        >
          <div className="d-flex justify-content-center mb-4">
            <img
              src={Logo}
              style={{ width: '200px', height: '100px' }} // Ajusta el tamaño según sea necesario
              alt="Logo FilmTracker"
            />
          </div>
          <h2 className="text-center mb-4 text-black">Iniciar Sesión</h2>

          <div className="mb-3">
            <label htmlFor="email" className="form-label text-black">
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
            <label htmlFor="password" className="form-label text-black">
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
  );
}

export default Login;
