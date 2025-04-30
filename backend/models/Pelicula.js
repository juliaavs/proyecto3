const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  titulo: String,
  puntuacion: Number,
  comentario: String,
  duracion: Number,
  genero: String,
  director: String,
  imagen: String
});

module.exports = mongoose.model('Movie', movieSchema);
