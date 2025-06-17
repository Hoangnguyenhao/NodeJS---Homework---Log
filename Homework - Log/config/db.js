const mongoose = require('mongoose');
const logger = require('../middlewares/logger');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/garage', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    logger.info('Connected to MongoDB successfully');
  } catch (err) {
    logger.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
