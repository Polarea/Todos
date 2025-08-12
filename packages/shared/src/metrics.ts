import { register, collectDefaultMetrics, Counter, Histogram, Gauge } from 'prom-client';

// Collect default metrics
collectDefaultMetrics({
  register,
  prefix: 'todos_',
});

// Custom metrics
export const httpRequestsTotal = new Counter({
  name: 'todos_http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

export const httpRequestDuration = new Histogram({
  name: 'todos_http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10],
});

export const activeConnections = new Gauge({
  name: 'todos_active_connections',
  help: 'Number of active connections',
});

// Register custom metrics
register.registerMetric(httpRequestsTotal);
register.registerMetric(httpRequestDuration);
register.registerMetric(activeConnections);

export { register as metricsRegistry };