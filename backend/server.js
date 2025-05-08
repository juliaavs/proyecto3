// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/routes');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3001;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


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

// Importar modelo de Película
const Pelicula = require('./models/Pelicula');



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




app.post('/api/peliculas/add', upload.single('imagen'), async (req, res) => {
  try {
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);
    // Asegúrate de que los datos estén disponibles en req.body
    const { nombre, comentario, puntuacion, duracion, director, genero } = req.body;
    const imagen = req.file ? '/uploads/' + req.file.filename : null;

    // Verifica que los campos obligatorios estén presentes
    if (!nombre || !comentario || !puntuacion || !duracion || !director || !genero) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    // Crea una nueva película
    const nuevaPelicula = new Pelicula({
      nombre,
      comentario,
      puntuacion,
      duracion,
      director,
      genero,
      imagen,
    });

    const peliculaGuardada = await nuevaPelicula.save();
    console.log('Película guardada:', peliculaGuardada);

    res.status(201).json({ mensaje: 'Película creada correctamente', pelicula: peliculaGuardada });
  } catch (error) {
    console.error('Error al guardar en la base de datos:', error);
    res.status(500).json({ mensaje: 'Error del servidor al guardar la película', error });
  }
});



app.post('/api/usuarios/register', async (req, res) => {
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

app.post('/api/usuarios/login', async (req, res) => {
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

app.get('/api/peliculas', async (req, res) => {
  try {
    const peliculas = await Pelicula.find(); // Usando Mongoose para obtener todas las películas
    res.json(peliculas); // Devuelve las películas en formato JSON
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las películas', error });
  }
});


app.use("/api/usuarios", require("./routes/usuarios"));

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

/*
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
*/

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
