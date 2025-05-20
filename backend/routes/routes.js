// backend/routes/index.js
const express = require('express');
const router = express.Router();

// Importar las rutas específicas por modelo
const usersRoutes = require('./usuarios');
const peliculasRoutes = require('./peliculas');

router.get('/api/info', (req, res) => {
  const tenant = req.tenant;

  // Simulación de una base de datos de clientes
  const tenantData = {
    cliente1: { name: "Cliente Uno", color: "blue" },
    cliente2: { name: "Cliente Dos", color: "green" }
  };

  if (tenantData[tenant]) {
    res.json(tenantData[tenant]);
  } else {
    res.status(404).json({ error: "Cliente no encontrado" });
  }
});




// ... añade más si los tienes

// Usar las rutas
router.use('/usuarios', usersRoutes);
router.use('/peliculas', peliculasRoutes);

// ... añade más si los tienes

module.exports = router;
