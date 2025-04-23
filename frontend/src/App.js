import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import AddMovie from './views/AddMovie';
import EditMovie from './views/EditMovie';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/añadir" element={<AddMovie />} />
        <Route path="/editar/:id" element={<EditMovie />} />
      </Routes>
    </Router>
  );
}

export default App;
