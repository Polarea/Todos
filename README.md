# Todos Monorepo with Observability

TypeScript monorepo powered by Turborepo with integrated observability from day 1:

- Apps: `apps/frontend` (Vite + React), `apps/backend` (Express API), `apps/mcp` (service)
- Shared package: `packages/shared` (logger, correlation IDs, metrics utilities)
- Logging: Winston with structured JSON and correlation IDs
- Metrics: Prometheus client with `/metrics` endpoint on backend services
- One-liner dev: `npm run dev` runs all apps with monitoring

## Prerequisites

- Node.js 18+ (recommended 20+)
- npm 8+

## Install

```powershell
npm install
```

## Develop

Runs frontend (Vite), backend (Express), and mcp service concurrently with live reload and monitoring.

```powershell
npm run dev
```

Services:

- Frontend: http://localhost:5173
- Backend: http://localhost:4001
- MCP: http://localhost:4002

Backend services expose:

- Health: `GET /health`
- Metrics: `GET /metrics` (Prometheus exposition)

## Observability

- Correlation IDs are generated and propagated via the `x-correlation-id` header.
- The shared logger adds `correlationId` and `service` fields to every log line.
- Logs are structured JSON with timestamp, level, message, service, correlationId, and HTTP request fields where applicable.
- Default Prometheus metrics are collected. Request duration histogram is exposed per service.

## Testing

```powershell
npm test
```

## Build

```powershell
npm run build
```

## Repository Structure

```
.
├── apps
│   ├── backend
│   ├── frontend
│   └── mcp
├── packages
│   └── shared
├── turbo.json
├── tsconfig.base.json
└── package.json
```

## CI/CD

GitHub Actions workflow `ci.yml` installs dependencies, builds, and runs tests on every push/PR.

## Notes

- Frontend uses a lightweight browser logger that mirrors the Winston API and injects correlation IDs; server-side packages use Winston directly.
- Set `LOG_LEVEL` env var to control verbosity (default `info`).

## AI-Enabled E-Commerce Platform
### Modern E-Commerce Core
- Product browsing with filtering and sorting.
- Real-time cart updates and responsive UI.

### Voice & Text AI Interaction
- Seamless voice and chat-based product search powered by a secure MCP server.
- Context-aware AI responses that guide users through browsing, cart updates, and checkout.
