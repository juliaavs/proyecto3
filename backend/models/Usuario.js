const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // Debes hashear la contraseña
});

module.exports = mongoose.model("Usuario", usuarioSchema);
