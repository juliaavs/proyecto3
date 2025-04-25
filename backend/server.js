// server.js

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());


const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = 3001;

app.use(bodyParser.json());



// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/proyecto3', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Esquema de Película
const PeliculaSchema = new mongoose.Schema({
  nombre: String,
  comentario: String,
  puntuacion: Number,
  duracion: String,
});

const Pelicula = mongoose.model('Pelicula', PeliculaSchema);

// Ruta POST para añadir una película
app.post('/api/peliculas', async (req, res) => {
  const { nombre, comentario, puntuacion, duracion } = req.body;

  try {
    const nuevaPelicula = new Pelicula({ nombre, comentario, puntuacion, duracion });
    await nuevaPelicula.save();
    res.status(201).json({ message: 'Película guardada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar la película', error });
  }
});














const users = []; // aquí se guardan usuarios temporalmente

app.get('/', (req, res) => {
  res.send('Backend funcionando');
});

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  users.push({ name, email, password });
  res.json({ message: 'PRRRRRRR Bicus Dicus De Bicus De Dicus' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  res.json({ message: `Bienvenido, ${user.name}` });
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
