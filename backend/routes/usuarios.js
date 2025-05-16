const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { exec } = require('child_process');
const Usuario = require("../models/Usuario");
const path = require('path');

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

    console.log('Usuario guardado:', nuevoUsuario); // 👈 Verifica que el usuario se guarda correctamente

    const scriptPath = path.join(__dirname, '..', 'scripts', 'enviar_correo.py');
    const comando = `python3 "${scriptPath}" "${nuevoUsuario.email}" "${nuevoUsuario.nombre}"`;

    // Ejecutar el script de Python para enviar el correo
    exec(comando, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al ejecutar el script: ${error.message}`);
        return res.status(500).json({ error: "Error al enviar el correo" });
      }
      if (stderr) {
        console.error(`Error en el script: ${stderr}`);
        return res.status(500).json({ error: "Error en el script de envío de correo" });
      }
      console.log(`Salida del script: ${stdout}`);
      console.log(`Correo enviado a: ${nuevoUsuario.email}`);
    });
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
    
    

    res.status(200).json({
      mensaje: 'Inicio de sesion exitoso',
      usuarioId: usuario._id,
      usuarioName: usuario.nombre
    });
    
  } catch (err) {
    res.status(500).json({ error: "Error al iniciar sesión", details: err.message });
  }
});

// Ruta para cerrar sesion

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.status(200).json({ message: "Sesión cerrada exitosamente" });
});

module.exports = router;
  
  


module.exports = router;
