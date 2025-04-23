const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Importa las rutas
const movieRoutes = require('./routes/movies');

const app = express();

// Middleware
app.use(cors()); // Permite solicitudes de dominios diferentes
app.use(express.json()); // Para manejar JSON en las solicitudes

// Rutas
app.use('/api/movies', movieRoutes);

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  }))
  .catch((err) => console.log(err));
