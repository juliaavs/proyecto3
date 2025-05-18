const mongoose = require("mongoose");

const UsuarioPeliculaSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  peliculaId: { type: mongoose.Schema.Types.ObjectId, ref: "Pelicula", required: true },
  fecha: { type: Date, default: Date.now },
});

// Índice único para evitar duplicados (usuario-pelicula)
UsuarioPeliculaSchema.index({ usuarioId: 1, peliculaId: 1 }, { unique: true });

module.exports = mongoose.model("UsuarioPelicula", UsuarioPeliculaSchema);
