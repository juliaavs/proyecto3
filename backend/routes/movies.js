const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Ruta para obtener todas las películas
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para añadir una nueva película
router.post('/', async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    year: req.body.year,
    rating: req.body.rating,
    comment: req.body.comment
  });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para eliminar una película
router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    await movie.remove();
    res.json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
