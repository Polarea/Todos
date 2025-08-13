import type { Request, Response, NextFunction } from 'express';

export const logger = {
  info: (..._args: any[]) => {},
  error: (..._args: any[]) => {},
  child: (_b: any) => logger,
} as any;

export const commonMiddleware = [((_req: Request, _res: Response, next: NextFunction) => next())] as any;
export const metricsMiddleware = ((_req: Request, _res: Response, next: NextFunction) => next()) as any;
export const metricsHandler = async (_req: Request, res: Response) => res.send('');
