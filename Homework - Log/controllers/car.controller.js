const Car = require('../models/car.model')

async function getAll(req, res, next) {
  try {
    const cars = await Car.find().sort({ createdAt: -1 })
    res.json(cars)
  } catch (err) {
    next(err)
  }
}

async function create(req, res, next) {
  try {
    const { make, model, year } = req.body
    if (!make || !model || !year) {
      return res.status(400).json({ error: 'make, model, year required' })
    }
    const car = new Car(req.body)
    await car.save()
    res.status(201).json(car)
  } catch (err) {
    next(err)
  }
}

async function update(req, res, next) {
  try {
    const updated = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if (!updated) return res.status(404).json({ error: 'Not found' })
    res.json(updated)
  } catch (err) {
    next(err)
  }
}

async function remove(req, res, next) {
  try {
    const deleted = await Car.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: 'Not found' })
    res.json({ message: 'Deleted' })
  } catch (err) {
    next(err)
  }
}

module.exports = { getAll, create, update, remove }
