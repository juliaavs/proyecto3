const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const Pelicula = require('../models/Pelicula');
const UsuarioPelicula = require('../models/UsuarioPelicula');
const mongoose = require('mongoose');

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
    if (puntuacion > 10) {
        return res.status(400).json({ mensaje: 'La puntuación no puede ser mayor que 10' });
    };
    if (duracion <= 0) {
        return res.status(400).json({ mensaje: 'La duración debe ser mayor que 0' });
    };    
    let pelicula = await Pelicula.findOne({ nombre });

    if (!pelicula) {
        pelicula = new Pelicula({ nombre, comentario, puntuacion, duracion, director, genero, imagen });
        await pelicula.save();
    }

    const yaVista = await UsuarioPelicula.findOne({ idPelicula: pelicula._id, idUsuario: req.body.idUsuario });

    if (yaVista) {
        return res.status(400).json({ mensaje: 'Ya has visto esta película' });
    
    }

    console.log('usuarioId recibido:', req.body.usuarioId);
    console.log('peliculaId que se va a guardar:', pelicula._id);


    const relacion = new UsuarioPelicula({
        usuarioId: new mongoose.Types.ObjectId(req.body.usuarioId),
        peliculaId: new mongoose.Types.ObjectId(pelicula._id)
    });

    await relacion.save();

    console.log('usuarioId:', req.body.usuarioId);
    console.log('pelicula._id:', pelicula._id);



    
    res.status(201).json({ mensaje: 'Pelicula creada correctamente y añadida a visualizadas ', pelicula: pelicula });
  } catch (error) {
    console.error('Error al guardar la película:', error);
    res.status(500).json({ mensaje: 'Error del servidor al guardar la película', error });
  }
});

// Obtener todas las peliculas registradas como vistas por cada usuario
router.get('/', async (req, res) => {
  try {
    const { usuarioId } = req.query;

    if (!usuarioId) {
      return res.status(400).json({ message: 'usuarioId es obligatorio' });
    }

    // Buscar relaciones del usuario
    const relaciones = await UsuarioPelicula.find({ usuarioId: usuarioId });

    const peliculaIds = relaciones.map(rel => rel.peliculaId);

    // Obtener las películas correspondientes
    const peliculas = await Pelicula.find({ _id: { $in: peliculaIds } });

    res.json(peliculas);
  } catch (error) {
    console.error('Error al obtener películas del usuario:', error);
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
    const { usuarioId } = req.body;

    if (!usuarioId) {
      return res.status(400).json({ message: 'usuarioId es obligatorio' });
    }

    // Solo eliminar la relación del usuario con esa película
    const resultado = await UsuarioPelicula.deleteOne({
      usuarioId: new mongoose.Types.ObjectId(usuarioId),
      peliculaId: new mongoose.Types.ObjectId(req.params.id)
    });

    if (resultado.deletedCount === 0) {
      return res.status(404).json({ message: 'No se encontró la relación a eliminar' });
    }

    res.json({ message: 'Relación eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la relación:', error);
    res.status(500).json({ message: 'Error del servidor al eliminar la relación', error });
  }
});


module.exports = router;
