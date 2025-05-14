import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import AddPelicula from './components/AddPelicula';
import EditarPelicula from './components/EditarPelicula';
import Navbar from './components/Navbar';
import DetallePelicula from './components/DetallePelicula';
import UserDashboard from './components/UserDashboard';



function AppWrapper() {
  const [searchTerm, setSearchTerm] = useState(''); // Estado global para el término de búsqueda
  const location = useLocation();
  const showNavbar = location.pathname === '/home'; // Mostrar Navbar solo en la ruta /home

  return (
    <div>
      {showNavbar && <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} {/* Pasar el estado y la función al Navbar */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home searchTerm={searchTerm} />} />
        <Route path="/add" element={<AddPelicula />} />
        <Route path="/editar-pelicula/:id" element={<EditarPelicula />} />
        <Route path="/detalle-pelicula/:id" element={<DetallePelicula />} /> {/* Nueva ruta */}
        <Route path="/dashboard" element={<UserDashboard />} /> {/* Nueva ruta */}
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
// El componente AppWrapper maneja la lógica de enrutamiento y el estado global del término de búsqueda