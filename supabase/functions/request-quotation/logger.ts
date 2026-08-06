import type { LogEntry } from './types.ts';

// Server-side logger. In production this would forward to a log aggregator
// (Datadog, Logflare, etc.). For now it writes to console with structure.
export function log(entry: LogEntry): void {
  const timestamp = new Date().toISOString();
  const line = JSON.stringify({ timestamp, ...entry });
  if (entry.level === 'error') {
    console.error(line);
  } else if (entry.level === 'warn') {
    console.warn(line);
  } else {
    console.log(line);
  }
}

export function logInfo(message: string, meta?: Record<string, unknown>): void {
  log({ level: 'info', message, meta });
}

export function logWarn(message: string, meta?: Record<string, unknown>): void {
  log({ level: 'warn', message, meta });
}

export function logError(message: string, meta?: Record<string, unknown>): void {
  log({ level: 'error', message, meta });
}
