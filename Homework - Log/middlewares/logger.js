const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');
const today = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');
const logPath = path.join(__dirname, `../logs/${today}.log`);

if (!fs.existsSync(path.dirname(logPath))) {
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
}

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [new transports.File({ filename: logPath })]
});

const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
};

module.exports = requestLogger;
module.exports.info = (msg) => logger.info(msg);
module.exports.warn = (msg) => logger.warn(msg);
module.exports.error = (msg) => logger.error(msg);
