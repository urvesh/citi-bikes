'use strict';

const winston = require('winston');
const {combine, timestamp} = winston.format;

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
    ],
    format: combine(
        timestamp(),
        winston.format.json(),
    ),
});

module.exports = logger;