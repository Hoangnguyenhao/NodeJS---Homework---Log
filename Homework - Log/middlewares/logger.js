const fs = require('fs')
const path = require('path')

const logDir = path.join(__dirname, '../logs')
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir)

function formatDate(date = new Date()) {
  const d = date
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function writeLog(fileName, content) {
  const filePath = path.join(logDir, `${fileName}-${formatDate()}.log`)
  fs.appendFile(filePath, content + '\n', () => {})
}

function requestLogger(req, res, next) {
  const start = Date.now()
  const { method, originalUrl, ip, headers, body } = req

  res.on('finish', () => {
    const duration = Date.now() - start
    const log = `[${new Date().toISOString()}] ${method} ${originalUrl} - ${res.statusCode} - ${ip} - ${headers['user-agent']} - ${duration}ms\nPayload: ${JSON.stringify(body)}`
    writeLog('access', log)
  })

  next()
}

function errorLogger(err, req, res, next) {
  const { method, originalUrl, ip, headers, body } = req
  const log = `[${new Date().toISOString()}] ERROR ${method} ${originalUrl} - ${ip} - ${headers['user-agent']}\nPayload: ${JSON.stringify(body)}\nMessage: ${err.message}`
  writeLog('error', log)
  next(err)
}

module.exports = { requestLogger, errorLogger }
