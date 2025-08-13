// Minimal browser logger with correlation id support
export function getCorrelationId(): string | null {
  const w = window as any;
  if (!w.__corrId) w.__corrId = crypto.randomUUID();
  return w.__corrId;
}

export const log = {
  info: (message: string, data?: Record<string, unknown>) =>
    console.log(JSON.stringify({ level: 'info', message, correlationId: getCorrelationId(), ...data })),
  error: (message: string, data?: Record<string, unknown>) =>
    console.error(JSON.stringify({ level: 'error', message, correlationId: getCorrelationId(), ...data })),
};
