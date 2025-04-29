// server.js
const express = require('express');
const cors = require('cors');  // Importamos cors
const app = express();
const router = require('./routes/routes'); // O donde tengas tus rutas
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const corsOptions = {
  origin: 'http://localhost:3000',  // Asegúrate de que este sea el puerto donde corre tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Métodos permitidos
  allowedHeaders: ['Content-Type'],  // Headers permitidos
};


const PORT = 3001;

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', router);
app.use(bodyParser.json());



// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/ProyectoFinal', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado'))
.catch((err) => console.error('Error de conexión a MongoDB:', err));


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
