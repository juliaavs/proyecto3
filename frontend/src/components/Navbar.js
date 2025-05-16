import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo4.png'; // Asegúrate de que la ruta sea correcta
import { useNavigate } from "react-router-dom";


const Navbar = ({ searchTerm, setSearchTerm }) => {
  const userName = sessionStorage.getItem('usuarioName') || 'U';
  const navigate = useNavigate();

  const handleLogout = () => {
    // Si tienes que hacer logout en el backend, usa fetch:
    fetch("/api/usuarios/logout", { method: "POST", credentials: "include" })
      .then(() => {
        sessionStorage.clear();
        localStorage.clear();
        navigate("/");
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
      <Link className="navbar-brand" to="/home">
          <img
            src={
              logo // Ruta de la imagen
            }// Ruta de la imagen
            alt="FilmTracker Logo"
            className="navbar-logo"
            style={{ width: '220px', height: '130px', display: '-moz-initial'}} // Ajusta el tamaño según sea necesario
          />
      </Link>        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="navbar-content d-flex align-items-center w-100">
            <div className="search-box mx-auto">
              <i className="fas fa-search search-icon"></i>
              <input
                type="text"
                className="form-control search-input"
                placeholder="Buscar películas..."
                value={searchTerm} // Muestra el término actual
                onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
              />
            </div>
            
            <div className="user-controls d-flex align-items-center">
              <Link to="/add">
                <button className="btn btn-add">
                  <i className="fas fa-plus me-1"></i>Añadir Nueva Película
                </button>
              </Link>
            </div>
            <div className="navbar-links d-flex align-items-center">
              {/* ✅ Botón de logout corregido */}
              <button onClick={handleLogout} className="btn btn-logout">
                <i className="fas fa-sign-out-alt me-1"></i>Cerrar Sesión
              </button>
            </div>
              <Link to="/dashboard">
                <div className="user-avatar">{userName.charAt(0).toUpperCase()}</div>
              </Link>
            </div>
          </div>
        </div>
      
    </nav>
  );
};

export default Navbar;