const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 25,
    unique: true
  },
  releaseDate: {
    type: String,
    required: true,
    match: /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/(\d{2}|\d{4})$/
  },
  genre: {
    type: String,
    enum: ['Action', 'MMO', 'FPS', 'Puzzle', 'Platformer'],
    required: true
  }
},
{timestamps: true})

module.exports = mongoose.model('Game', gameSchema);