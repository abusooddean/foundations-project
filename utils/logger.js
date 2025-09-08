// https://github.com/winstonjs/winston
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    label({ label: 'Log' }),
    timestamp(),
    myFormat
  ),
   transports: 
      [
      new (transports.File)({filename: 'logfile.log'}),
      // new transports.Console()
      ]
});

module.exports = { 
    logger
}