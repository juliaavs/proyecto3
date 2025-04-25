const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  titulo: String,
  puntuacion: Number,
  comentario: String,
  duracion: Number
});

module.exports = mongoose.model('Movie', movieSchema);
