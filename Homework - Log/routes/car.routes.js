const express = require('express')
const ctrl = require('../controllers/car.controller')
const router = express.Router()

router.route('/')
  .get(ctrl.getAll)
  .post(ctrl.create)

router.route('/:id')
  .put(ctrl.update)
  .delete(ctrl.remove)

module.exports = router
