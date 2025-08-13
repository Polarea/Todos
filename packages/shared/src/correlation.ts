import { AsyncLocalStorage } from 'node:async_hooks';
import type { Request, Response, NextFunction } from 'express';

type Store = { correlationId: string };
const als = new AsyncLocalStorage<Store>();

export function getCorrelationId(): string | undefined {
  return als.getStore()?.correlationId;
}

export function withCorrelationId<T>(correlationId: string, fn: () => T): T {
  return als.run({ correlationId }, fn);
}

export function correlationMiddleware(req: Request, _res: Response, next: NextFunction) {
  const header = (req.headers['x-correlation-id'] as string) || crypto.randomUUID();
  als.run({ correlationId: header }, next);
}

export function addCorrelationToHeaders(headers: Record<string, string> = {}) {
  const id = getCorrelationId();
  if (id) headers['x-correlation-id'] = id;
  return headers;
}
