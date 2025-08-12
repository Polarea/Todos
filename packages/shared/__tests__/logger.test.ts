import { logger } from '../src/logger';
import { CorrelationId } from '../src/correlation';

describe('Logger', () => {
  beforeEach(() => {
    CorrelationId.clear();
  });

  it('should be defined', () => {
    expect(logger).toBeDefined();
  });

  it('should log messages with correlation ID', () => {
    // Set a test correlation ID
    CorrelationId.set('test-correlation-id');
    
    // Mock winston transports
    const mockLog = jest.fn();
    (logger as any).transports[0].log = mockLog;
    
    logger.info('Test message');
    
    expect(mockLog).toHaveBeenCalled();
  });
});