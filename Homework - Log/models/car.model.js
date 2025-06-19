const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
  make: { type: String, required: true, trim: true },
  model: { type: String, required: true, trim: true },
  year: {
    type: Number,
    required: true,
    min: 1886,
    max: new Date().getFullYear() + 1
  },
  color: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Car', carSchema)
