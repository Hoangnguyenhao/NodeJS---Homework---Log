const Car = require('../models/car.model');
const logger = require('../middlewares/logger');

const getAll = async (req, res) => {
  try {
    const cars = await Car.find();
    logger.info('GET /cars - success');
    res.json(cars);
  } catch (err) {
    logger.error(`GET /cars - ${err.message}`);
    res.status(500).json({ error: 'Server error' });
  }
};

const create = async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    logger.info('POST /cars - created');
    res.status(201).json(car);
  } catch (err) {
    logger.error(`POST /cars - ${err.message}`);
    res.status(400).json({ error: 'Invalid input' });
  }
};

const getById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      logger.warn(`GET /cars/${req.params.id} - not found`);
      return res.status(404).json({ error: 'Car not found' });
    }
    logger.info(`GET /cars/${req.params.id} - success`);
    res.json(car);
  } catch (err) {
    logger.error(`GET /cars/${req.params.id} - ${err.message}`);
    res.status(500).json({ error: 'Server error' });
  }
};

const update = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!car) {
      logger.warn(`PUT /cars/${req.params.id} - not found`);
      return res.status(404).json({ error: 'Car not found' });
    }
    logger.info(`PUT /cars/${req.params.id} - updated`);
    res.json(car);
  } catch (err) {
    logger.error(`PUT /cars/${req.params.id} - ${err.message}`);
    res.status(500).json({ error: 'Server error' });
  }
};

const remove = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      logger.warn(`DELETE /cars/${req.params.id} - not found`);
      return res.status(404).json({ error: 'Car not found' });
    }
    logger.info(`DELETE /cars/${req.params.id} - deleted`);
    res.json({ message: 'Car deleted successfully' });
  } catch (err) {
    logger.error(`DELETE /cars/${req.params.id} - ${err.message}`);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getAll, create, getById, update, remove };
