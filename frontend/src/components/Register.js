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
       <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
         <div className="text">
           <form
             onSubmit={handleSubmit}
             className="bg-white p-5 rounded shadow-sm w-100"
             style={{ maxWidth: '400px' }}
           >
             <h2 className="text-center mb-4 text-black">Formulario de Registro</h2>

             <div className="mb-3">
               <label htmlFor="nombre" className="form-label text-black">
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
               <label htmlFor="email" className="form-label text-black">
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
               <label htmlFor="password" className="form-label text-black">
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
               Entrar
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
export default Register;
