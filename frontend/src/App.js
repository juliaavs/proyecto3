import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import AddPelicula from './components/AddPelicula';
import EditarPelicula from './components/EditarPelicula';
import Navbar from './components/Navbar';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add" element={<AddPelicula />} />
        <Route path="/editar-pelicula/:id" element={<EditarPelicula />} />
      </Routes>
    </Router>
  );
}

export default App;
