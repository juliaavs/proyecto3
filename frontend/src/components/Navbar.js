import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const userName = sessionStorage.getItem('userName') || 'U';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/home">FilmTracker</Link>
        
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
              <div className="user-avatar">{userName.charAt(0).toUpperCase()}</div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;