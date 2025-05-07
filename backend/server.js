// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/routes');

const app = express();
const PORT = 3001;

// Configuración de middleware
app.use(cors({
  origin: 'http://localhost:3000',  // Puerto donde corre el frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para manejar formularios codificados
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/api', router);



// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/ProyectoFinal', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado'))
.catch((err) => console.error('Error de conexión a MongoDB:', err));

app.use("/api/usuarios", router);

app.use("/api/peliculas", router);


app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
