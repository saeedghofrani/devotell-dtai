import { formatCompensation } from './format-thousand';

describe('formatCompensation', () => {
  it('should format compensation with whole numbers correctly', () => {
    const comp = {
      min: 1000,
      max: 2000,
      currency: 'USD',
    };
    const result = formatCompensation(comp);
    expect(result).toBe('1,000.00 USD - 2,000.00 USD');
  });

  it('should format compensation with decimal numbers correctly', () => {
    const comp = {
      min: 1000.5,
      max: 2000.75,
      currency: 'USD',
    };
    const result = formatCompensation(comp);
    expect(result).toBe('1,000.50 USD - 2,000.75 USD');
  });

  it('should format compensation with large numbers correctly', () => {
    const comp = {
      min: 1000000,
      max: 2000000000,
      currency: 'USD',
    };
    const result = formatCompensation(comp);
    expect(result).toBe('1,000,000.00 USD - 2,000,000,000.00 USD');
  });

  it('should handle very small numbers (less than 1) correctly', () => {
    const comp = {
      min: 0.00001,
      max: 0.00002,
      currency: 'USD',
    };
    const result = formatCompensation(comp);
    expect(result).toBe('0.00001 USD - 0.00002 USD');
  });

  it('should use the correct currency symbol for different currencies', () => {
    const compUSD = {
      min: 1000,
      max: 2000,
      currency: 'USD',
    };
    const compEUR = {
      min: 1000,
      max: 2000,
      currency: 'EUR',
    };
    const compGBP = {
      min: 1000,
      max: 2000,
      currency: 'GBP',
    };

    const resultUSD = formatCompensation(compUSD);
    const resultEUR = formatCompensation(compEUR);
    const resultGBP = formatCompensation(compGBP);

    expect(resultUSD).toBe('1,000.00 USD - 2,000.00 USD');
    expect(resultEUR).toBe('1,000.00 EUR - 2,000.00 EUR');
    expect(resultGBP).toBe('1,000.00 GBP - 2,000.00 GBP');
  });

  it('should handle negative numbers appropriately', () => {
    const comp = {
      min: -5000,
      max: -1000,
      currency: 'USD',
    };
    const result = formatCompensation(comp);
    expect(result).toBe('-5,000.00 USD - -1,000.00 USD');
  });

  it('should throw an error when min is greater than max', () => {
    const comp = {
      min: 2000,
      max: 1000,
      currency: 'USD',
    };
    expect(() => formatCompensation(comp)).toThrow(
      'Minimum value cannot be greater than maximum value',
    );
  });

  it('should handle cases where min and max are equal', () => {
    const comp = {
      min: 1000,
      max: 1000,
      currency: 'USD',
    };
    const result = formatCompensation(comp);
    expect(result).toBe('1,000.00 USD - 1,000.00 USD');
  });

  it('should throw an error when currency is an empty string', () => {
    const comp = {
      min: 1000,
      max: 2000,
      currency: '',
    };
    expect(() => formatCompensation(comp)).toThrow(
      'Currency cannot be an empty string',
    );
  });

  it('should handle non-standard currency codes correctly', () => {
    const comp = {
      min: 1000,
      max: 2000,
      currency: 'XYZ',
    };
    const result = formatCompensation(comp);
    expect(result).toBe('1,000.00 XYZ - 2,000.00 XYZ');
  });
});
