import express from 'express';
import { logger, CorrelationId, metricsRegistry, httpRequestsTotal, httpRequestDuration } from '@todos/shared';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for correlation ID
app.use((req, res, next) => {
  const correlationId = req.headers['x-correlation-id'] as string || CorrelationId.generate();
  CorrelationId.set(correlationId);
  res.setHeader('x-correlation-id', correlationId);
  next();
});

// Middleware for metrics
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestsTotal.inc({ 
      method: req.method, 
      route: req.route?.path || req.path, 
      status_code: res.statusCode 
    });
    httpRequestDuration.observe(
      { method: req.method, route: req.route?.path || req.path }, 
      duration
    );
  });
  
  next();
});

app.use(express.json());

app.get('/health', (req, res) => {
  logger.info('Health check requested');
  res.json({ status: 'healthy', service: 'backend' });
});

app.get('/api/todos', (req, res) => {
  logger.info('Fetching todos');
  res.json([
    { id: 1, title: 'Sample Todo', completed: false },
    { id: 2, title: 'Another Todo', completed: true }
  ]);
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', metricsRegistry.contentType);
  res.end(await metricsRegistry.metrics());
});

app.listen(PORT, () => {
  logger.info(`Backend server started on port ${PORT}`);
});

export default app;