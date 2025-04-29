const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Obtener todas las películas
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener películas' });
  }
});

// Endpoint para agregar una nueva película
router.post('/', async (req, res) => {
  const { title, duration, description } = req.body;

  try {
    const newMovie = new Movie({
      nombre,
      duracion,
      comentario,
      puntuacion,
      // Otros campos que quieras agregar
    });

    await newMovie.save();
    res.status(201).json(newMovie); // Devuelve la película recién creada
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al agregar la película' });
  }
});

module.exports = router;
