// server.js
const express = require('express');
const cors = require('cors');
const app = express();

const multer = require('multer');
const path = require('path');


app.use(cors());
app.use(express.json());


//imagen hacer la carpeta publica
app.use('/uploads', express.static('uploads'));



const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = 3001;

app.use(bodyParser.json());



// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/proyecto3', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // ✅ guarda con extensión

  }
});

const upload = multer({ storage });






// Esquema de Película
const PeliculaSchema = new mongoose.Schema({
  nombre: String,
  comentario: String,
  puntuacion: Number,
  duracion: String,
  genero: String,
  director: String,
  imagen: String
});

const Pelicula = mongoose.model('Pelicula', PeliculaSchema);


// Ruta POST para añadir una película
app.post('/api/peliculas', upload.single('imagen'), async (req, res) => {


  const { nombre, comentario, puntuacion, duracion,director,genero } = req.body;
  const imagen = req.file ? '/uploads/' + req.file.filename : null;

  try {
    const nuevaPelicula = new Pelicula({ nombre, comentario, puntuacion, duracion,director,genero, imagen });
    await nuevaPelicula.save();
    res.status(201).json({ message: 'Película guardada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al guardar la película', error });
  }
});

app.get('/api/peliculas', async (req, res) => {
  try {
    const peliculas = await Pelicula.find(); // Usando Mongoose para obtener todas las películas
    res.json(peliculas); // Devuelve las películas en formato JSON
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las películas', error });
  }
});



// Ruta para obtener una película por su ID
app.get('/api/peliculas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const pelicula = await Pelicula.findById(id);
    if (!pelicula) {
      return res.status(404).json({ message: 'Película no encontrada' });
    }
    res.json(pelicula);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la película', error });
  }
});

// Ruta para actualizar una película

app.put('/api/peliculas/:id', upload.single('imagen'), async (req, res) => {
  try {
    const updateData = {
      nombre: req.body.nombre,
      comentario: req.body.comentario,
      puntuacion: req.body.puntuacion,
      duracion: req.body.duracion,
      genero: req.body.genero,
      director: req.body.director
    };
  
    if (req.file) {
      updateData.imagen = `uploads/${req.file.filename}`;
    }
    
    await Pelicula.findByIdAndUpdate(req.params.id, updateData);
    res.status(200).json({ message: 'Película actualizada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la película' });
  }
});


// Eliminar una película
app.delete('/api/peliculas/:id', async (req, res) => {
  try {
    const pelicula = await Pelicula.findByIdAndDelete(req.params.id);
    if (!pelicula) return res.status(404).json({ message: 'Película no encontrada' });

    res.json({ message: 'Película eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la película', error });
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
