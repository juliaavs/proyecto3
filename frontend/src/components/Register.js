import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../img/logo4.png'; // Asegúrate de que la ruta sea correcta
import './Register.css'; // Asegúrate de que la ruta sea correcta

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
        const response = await fetch('https://localhost:3001/api/usuarios/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
    
        const data = await response.json(); // intenta parsear la respuesta SIEMPRE
    
        if (!response.ok) {
          console.error('Respuesta del servidor:', data);  // <-- VER ERROR COMPLETO
          throw new Error(data.error || 'Error en la respuesta del servidor');
        }
    
        console.log(data);
        alert('Usuario registrado exitosamente!');
        navigate('/');
      } catch (error) {
        console.error('Error al registrar:', error);
        alert(`Hubo un error al registrar el usuario: ${error.message}`);
      }
    };

   return (
       <div className="register-container">
         <div className="register-content">
          <div className="register-image">
                <img
                  src={Logo}
                  alt="Logo FilmTracker"
                  className="logo-large-register"
                />
            </div>
           <form
             onSubmit={handleSubmit}
             className="register-form"
           >
             <h2 className="text-center mb-4">Formulario de Registro</h2>

             <div className="mb-3">
               <label htmlFor="nombre" className="form-label">
                 Nombre
               </label>
               <input
                 type="text"
                 className="form-control"
                 id="nombre"
                 name="nombre"
                 value={formData.nombre}
                 onChange={handleChange}
                 required
                 placeholder="Tu nombre"
              />
              </div>
   
             <div className="mb-3">
               <label htmlFor="email" className="form-label">
                 Correo electrónico
               </label>
               <input
                 type="email"
                 className="form-control"
                 id="email"
                 name="email"
                 value={formData.email}
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
                 value={formData.password}
                 onChange={handleChange}
                 required
                 placeholder="Tu contraseña"
               />
             </div>
   
             <button type="submit" className="btn btn-secondary w-100">
               Registrar
             </button>
             <p className="mt-3 text-center">
               ¿Ya tienes cuenta?{' '}
               <Link to="/" className="text-primary">
                 Inicia sesión aquí
               </Link>
             </p>
           </form>
         </div>
       </div>
     );
   }
   console.log(document.styleSheets);

export default Register;
