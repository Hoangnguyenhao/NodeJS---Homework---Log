const mongoose = require('mongoose')

async function connectDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/carDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB connected')
  } catch (err) {
    console.error('MongoDB error:', err.message)
    process.exit(1)
  }
}

module.exports = connectDB
