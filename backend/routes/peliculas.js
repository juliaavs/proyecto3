const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const Pelicula = require('../models/Pelicula');

// Configuración de multer para subida de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage });

// Agregar película
router.post('/add', upload.single('imagen'), async (req, res) => {
  try {
    const { nombre, comentario, puntuacion, duracion, director, genero } = req.body;
    const imagen = req.file ? '/uploads/' + req.file.filename : null;

    if (!nombre || !comentario || !puntuacion || !duracion || !director || !genero) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const nuevaPelicula = new Pelicula({ nombre, comentario, puntuacion, duracion, director, genero, imagen });
    const peliculaGuardada = await nuevaPelicula.save();

    res.status(201).json({ mensaje: 'Película creada correctamente', pelicula: peliculaGuardada });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error del servidor al guardar la película', error });
  }
});

// Obtener todas las películas
router.get('/', async (req, res) => {
  try {
    const peliculas = await Pelicula.find();
    res.json(peliculas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las películas', error });
  }
});

// Obtener película por ID
router.get('/:id', async (req, res) => {
  try {
    const pelicula = await Pelicula.findById(req.params.id);
    if (!pelicula) return res.status(404).json({ message: 'Película no encontrada' });
    res.json(pelicula);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la película', error });
  }
});

// Actualizar película
router.put('/:id', upload.single('imagen'), async (req, res) => {
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
      updateData.imagen = '/uploads/' + req.file.filename;
    }

    await Pelicula.findByIdAndUpdate(req.params.id, updateData);
    res.status(200).json({ message: 'Película actualizada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la película', error });
  }
});

// Eliminar película
router.delete('/:id', async (req, res) => {
  try {
    const pelicula = await Pelicula.findByIdAndDelete(req.params.id);
    if (!pelicula) return res.status(404).json({ message: 'Película no encontrada' });

    res.json({ message: 'Película eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la película', error });
  }
});

module.exports = router;
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcryptjs');