import { CorrelationId } from '../src/correlation';

describe('CorrelationId', () => {
  beforeEach(() => {
    CorrelationId.clear();
  });

  it('should generate a new correlation ID', () => {
    const id1 = CorrelationId.generate();
    const id2 = CorrelationId.generate();
    
    expect(id1).toBeDefined();
    expect(id2).toBeDefined();
    expect(id1).not.toBe(id2);
  });

  it('should get the current correlation ID', () => {
    const id = CorrelationId.generate();
    expect(CorrelationId.get()).toBe(id);
  });

  it('should set a custom correlation ID', () => {
    const customId = 'custom-123';
    CorrelationId.set(customId);
    expect(CorrelationId.get()).toBe(customId);
  });

  it('should clear the correlation ID', () => {
    CorrelationId.generate();
    CorrelationId.clear();
    
    // After clearing, get() should generate a new one
    const newId = CorrelationId.get();
    expect(newId).toBeDefined();
  });
});