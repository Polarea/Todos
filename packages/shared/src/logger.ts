import winston from 'winston';
import { getCorrelationId } from './correlation.js';

const { combine, timestamp, printf, errors, splat, json } = winston.format;

const level = process.env.LOG_LEVEL || 'info';
const service = process.env.SERVICE_NAME || 'unknown-service';

const correlationFormat = printf((info) => {
  const base: any = {
    timestamp: info.timestamp,
    level: info.level,
    message: info.message,
    service,
    correlationId: getCorrelationId() || undefined,
  };
  const { timestamp: _t, level: _l, message: _m, ...rest } = info as any;
  return JSON.stringify({ ...base, ...rest });
});

export const logger = winston.createLogger({
  level,
  format: combine(errors({ stack: true }), splat(), timestamp(), correlationFormat),
  transports: [new winston.transports.Console()],
});

export type Logger = typeof logger;

export function child(bindings: Record<string, unknown>) {
  return logger.child(bindings);
}
