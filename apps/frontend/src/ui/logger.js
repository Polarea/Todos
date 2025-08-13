// Minimal browser logger with correlation id support
export function getCorrelationId() {
    const w = window;
    if (!w.__corrId)
        w.__corrId = crypto.randomUUID();
    return w.__corrId;
}
export const log = {
    info: (message, data) => console.log(JSON.stringify({ level: 'info', message, correlationId: getCorrelationId(), ...data })),
    error: (message, data) => console.error(JSON.stringify({ level: 'error', message, correlationId: getCorrelationId(), ...data })),
};
