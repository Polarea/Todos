import express, { Request, Response } from 'express';
import cors from 'cors';
import { commonMiddleware, metricsMiddleware, metricsHandler, logger } from '@todos/shared';

const app = express();

app.use(cors());
app.use(express.json());
app.use(commonMiddleware);
app.use(metricsMiddleware);

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.get('/metrics', metricsHandler);

app.get('/todos', (_req: Request, res: Response) => {
  res.json([{ id: 1, title: 'First todo', done: false }]);
});

if (process.env.NODE_ENV !== 'test') {
  const port = parseInt(process.env.PORT || '4001', 10);
  app.listen(port, () => {
    logger.info(`backend listening on :${port}`);
  });
}

export default app;
