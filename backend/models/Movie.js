const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  rating: Number,
  comment: String,
  comments: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: Number,
    comment: String
  }]
});

module.exports = mongoose.model('Movie', movieSchema);
