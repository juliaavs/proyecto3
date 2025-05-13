import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import AddPelicula from './components/AddPelicula';
import EditarPelicula from './components/EditarPelicula';
import Navbar from './components/Navbar';
import DetallePelicula from './components/DetallePelicula';


function App() {
  const [searchTerm, setSearchTerm] = useState(''); // Estado global para el término de búsqueda

  return (
    <Router>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home searchTerm={searchTerm} />} />
        <Route path="/add" element={<AddPelicula />} />
        <Route path="/editar-pelicula/:id" element={<EditarPelicula />} />
        <Route path="/detalle-pelicula/:id" element={<DetallePelicula />} /> {/* Nueva ruta */}

      </Routes>
    </Router>
  );
}

export default App;