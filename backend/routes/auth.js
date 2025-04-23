// routes/auth.js o donde tengas tu lógica de login
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // asegúrate del nombre del modelo
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  console.log('Email recibido:', email);  // Verifica que el email recibido es correcto
  console.log('Contraseña recibida:', password);  // Verifica que la contraseña es la correcta
  
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Usuario no encontrado' });

    if (user.password !== password) {
      return res.status(400).json({ msg: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, 'secreto', { expiresIn: '1d' });
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ msg: 'Error en el servidor' });
  }
});


module.exports = router;
