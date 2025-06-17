const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  maker: { type: String, required: true },
  model: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  cost: { type: Number, required: true }
});

module.exports = mongoose.model('Car', CarSchema);
