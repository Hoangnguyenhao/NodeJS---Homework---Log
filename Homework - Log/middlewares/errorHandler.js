const { errorLogger } = require('./logger')

function errorHandler(err, req, res, next) {
  errorLogger(err, req, res, () => {})

  if (res.headersSent) return next(err)

  res.status(500).json({
    error: err.message || 'Internal Server Error'
  })
}

module.exports = { errorHandler }
