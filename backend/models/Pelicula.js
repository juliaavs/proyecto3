const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  nombre: String,
  puntuacion: Number,
  comentario: String,
  duracion: Number,
  genero: String,
  director: String,
  imagen: String
});

module.exports = mongoose.model('Pelicula', movieSchema);
