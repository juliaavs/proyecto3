const mongoose = require("mongoose");

const peliculaSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  genero: { type: String, required: true },
  duracion: { type: Number, required: true },
  puntuacion: { type: Number, required: true },
  director: { type: String, required: true },
});

module.exports = mongoose.model("Pelicula", peliculaSchema);
