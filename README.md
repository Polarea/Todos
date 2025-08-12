# Todos - AI-Enabled E-Commerce Platform

## Enhanced Monorepo with Integrated Observability

Modern TypeScript monorepo with built-in monitoring, logging, and distributed tracing capabilities from day 1.

### Architecture

This monorepo includes:
- **apps/frontend** - Frontend application with observability (Port 3000)
- **apps/backend** - Backend API server with metrics (Port 3001) 
- **apps/mcp** - MCP (Model Context Protocol) AI server (Port 3002)
- **packages/shared** - Shared utilities for logging, metrics, and correlation IDs

### Features

✅ **Turborepo Configuration** - Optimized build system with caching  
✅ **Integrated Winston Logging** - Structured logging across all services  
✅ **Prometheus Metrics** - Basic metrics collection and monitoring  
✅ **Correlation ID Tracing** - Distributed request tracing  
✅ **TypeScript Monorepo** - Type-safe development environment  
✅ **CI/CD Pipeline** - Automated testing and validation  

## Getting Started

### Prerequisites
- Node.js 18.x or 20.x
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/Polarea/Todos.git
cd Todos

# Install all dependencies
npm install

# Build all packages
npm run build
```

### Development

Start all services with monitoring:
```bash
npm run dev
```

This will start:
- Frontend server on http://localhost:3000
- Backend API on http://localhost:3001
- MCP server on http://localhost:3002

### Available Scripts

```bash
# Development
npm run dev      # Start all services in development mode
npm run build    # Build all packages
npm run test     # Run all tests
npm run lint     # Lint all packages

# Individual package development
cd apps/frontend && npm run dev
cd apps/backend && npm run dev  
cd apps/mcp && npm run dev
cd packages/shared && npm run dev
```

### Monitoring & Observability

#### Health Checks
- Frontend: http://localhost:3000/health
- Backend: http://localhost:3001/health  
- MCP: http://localhost:3002/health

#### Metrics (Prometheus format)
- Frontend: http://localhost:3000/metrics
- Backend: http://localhost:3001/metrics
- MCP: http://localhost:3002/metrics

#### API Endpoints
- Backend API: http://localhost:3001/api/todos
- MCP Chat: POST http://localhost:3002/api/chat

### Observability Features

#### Correlation IDs
All requests are automatically assigned correlation IDs for distributed tracing:
```bash
curl -H "x-correlation-id: my-trace-123" http://localhost:3001/api/todos
```

#### Structured Logging
All services use Winston with structured JSON logging:
```json
{
  "timestamp": "2023-12-07T10:30:00.000Z",
  "level": "info", 
  "message": "Request processed",
  "correlationId": "abc-123-def"
}
```

#### Metrics Collection
Basic Prometheus metrics are collected:
- HTTP request counters and durations
- System metrics (CPU, memory)
- Custom business metrics

### Testing

```bash
# Run all tests
npm test

# Run tests for specific package
cd packages/shared && npm test
```

### Project Structure

```
├── apps/
│   ├── frontend/           # Frontend application
│   ├── backend/           # Backend API server
│   └── mcp/              # MCP AI server  
├── packages/
│   └── shared/           # Shared utilities
├── .github/workflows/    # CI/CD configuration
├── turbo.json           # Turborepo configuration
└── package.json         # Root package configuration
```

### Contributing

1. Make your changes
2. Run `npm test` to ensure tests pass
3. Run `npm run build` to ensure everything builds
4. Submit a pull request

The CI/CD pipeline will automatically run tests and builds on your pull request.

## AI-Enabled E-Commerce Core Features

### Modern E-Commerce Core
- Product browsing with filtering and sorting
- Real-time cart updates and responsive UI

### Voice & Text AI Interaction  
- Seamless voice and chat-based product search powered by a secure MCP server
- Context-aware AI responses that guide users through browsing, cart updates, and checkout
