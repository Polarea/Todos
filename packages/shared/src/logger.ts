import winston from 'winston';
import { CorrelationId } from './correlation';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
    winston.format.printf((info) => {
      const correlationId = CorrelationId.get();
      const logEntry: any = {
        timestamp: info.timestamp,
        level: info.level,
        message: info.message,
        correlationId,
      };
      
      if (info.stack) {
        logEntry.stack = info.stack;
      }
      
      return JSON.stringify(logEntry);
    })
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
  ],
});

export { logger };