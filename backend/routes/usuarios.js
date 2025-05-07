const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");

// Ruta para crear un usuario
router.post("/register", async (req, res) => {
  const { nombre, email, password } = req.body;
  try {
    console.log('Datos recibidos:', req.body); // 👈 Verifica que los datos llegan bien
    const salt = await bcrypt.genSalt(10); // Generar un "salt"
    const hashedPassword = await bcrypt.hash(password, salt); // Encriptar la contraseña
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      password: hashedPassword,
    });
    await nuevoUsuario.save();
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al registrar usuario", details: err.message });
  }
});

// Ruta para inciar sesion

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Buscar al usuario por email (asegúrate de que tu modelo está utilizando email como campo único)
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Comparar la contraseña ingresada con la contraseña encriptada en la base de datos
    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    res.status(200).json({ usuario: usuario.nombre });
  } catch (err) {
    res.status(500).json({ error: "Error al iniciar sesión", details: err.message });
  }
});



module.exports = router;
