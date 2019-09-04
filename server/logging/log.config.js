require('winston-mongodb');
const config = require('config');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

const logger = createLogger({
  format: combine(
    label({ label: 'R_App' }),
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: './logging/logs.txt'
    }),
    new transports.MongoDB({
      db: config.get('DB.LOG')
    })
  ]
});

module.exports = logger;
