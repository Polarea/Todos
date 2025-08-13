import type { Request, Response, NextFunction } from 'express';
import { correlationMiddleware } from './correlation.js';
import { logger } from './logger.js';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info('http_request', {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration_ms: duration,
      userAgent: req.get('user-agent'),
      ip: req.ip,
    });
  });
  next();
}

export const commonMiddleware = [correlationMiddleware, requestLogger];
