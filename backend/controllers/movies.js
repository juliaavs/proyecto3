const express = require('express');
const Movie = require('../models/Movie');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Crear película (solo admin)
router.post('/', authMiddleware, async (req, res) => {
  const { title, year, rating, comment } = req.body;
  const newMovie = new Movie({ title, year, rating, comment });

  try {
    const movie = await newMovie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ msg: 'Error creando la película' });
  }
});

// Obtener todas las películas
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener las películas' });
  }
});

// Editar película (solo admin)
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, year, rating, comment } = req.body;
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, { title, year, rating, comment }, { new: true });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ msg: 'Error editando la película' });
  }
});

// Agregar comentario a película (solo usuarios)
router.post('/:id/comment', authMiddleware, async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const movie = await Movie.findById(req.params.id);
    movie.comments.push({ rating, comment, userId: req.user });
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ msg: 'Error añadiendo el comentario' });
  }
});

module.exports = router;
