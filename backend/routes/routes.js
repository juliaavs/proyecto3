// backend/routes/index.js

const express = require('express');
const router = express.Router();

// Importar las rutas específicas por modelo
const usersRoutes = require('./usuarios');

// ... añade más si los tienes

// Usar las rutas
router.use('/usuarios', usersRoutes);

// ... añade más si los tienes

module.exports = router;
