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

app.get('/echo', (req: Request, res: Response) => {
  const msg = String(req.query.msg || 'hello');
  logger.info('echo', { msg });
  res.json({ msg });
});

if (process.env.NODE_ENV !== 'test') {
  const port = parseInt(process.env.PORT || '4002', 10);
  app.listen(port, () => {
    logger.info(`mcp listening on :${port}`);
  });
}

export default app;
