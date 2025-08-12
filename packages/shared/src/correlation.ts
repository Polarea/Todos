import { v4 as uuidv4 } from 'uuid';

export class CorrelationId {
  private static current: string | null = null;

  static generate(): string {
    const id = uuidv4();
    CorrelationId.current = id;
    return id;
  }

  static get(): string {
    return CorrelationId.current || CorrelationId.generate();
  }

  static set(id: string): void {
    CorrelationId.current = id;
  }

  static clear(): void {
    CorrelationId.current = null;
  }
}