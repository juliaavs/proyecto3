// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
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

app.post('/api/register', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Encriptar contraseña
    const passwordEncriptada = await bcrypt.hash(password, 10); // 10 rondas de sal

    const newUsuario = new Usuario({ 
      nombre, 
      email, 
      password: passwordEncriptada 
    });

    await newUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar el usuario' });
  }
});

app.post('/api/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar el usuario por correo
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'El correo electrónico no está registrado' });
    }

    // Comparar contraseñas
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Si todo está bien
    res.json({ mensaje: 'Inicio de sesión exitoso', usuario: usuario.nombre });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
});



app.use("/api/usuarios", require("./routes/usuarios"));


app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
