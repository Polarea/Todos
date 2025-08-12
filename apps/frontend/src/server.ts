import express from 'express';
import path from 'path';
import { logger, CorrelationId, metricsRegistry } from '@todos/shared';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for correlation ID
app.use((req, res, next) => {
  const correlationId = req.headers['x-correlation-id'] as string || CorrelationId.generate();
  CorrelationId.set(correlationId);
  res.setHeader('x-correlation-id', correlationId);
  next();
});

app.use(express.static(path.join(__dirname, '../public')));

app.get('/health', (req, res) => {
  logger.info('Frontend health check requested');
  res.json({ status: 'healthy', service: 'frontend' });
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', metricsRegistry.contentType);
  res.end(await metricsRegistry.metrics());
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  logger.info(`Frontend server started on port ${PORT}`);
});

export default app;