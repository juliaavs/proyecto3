import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import AddPelicula from './components/AddPelicula';
import EditarPelicula from './components/EditarPelicula';
import Navbar from './components/Navbar';
import DetallePelicula from './components/DetallePelicula';
import UserDashboard from './components/UserDashboard';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("usuarioId");
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirige al login, y guarda la ruta a la que quería entrar
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

function AppWrapper() {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const showNavbar = location.pathname === '/home';


  return (
    <div style={{ minHeight: '100vh' }}>
      {showNavbar && <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home searchTerm={searchTerm} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddPelicula />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editar-pelicula/:id"
          element={
            <ProtectedRoute>
              <EditarPelicula />
            </ProtectedRoute>
          }
        />
        <Route
          path="/detalle-pelicula/:id"
          element={
            <ProtectedRoute>
              <DetallePelicula />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}