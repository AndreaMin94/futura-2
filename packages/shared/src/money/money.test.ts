import { describe, expect, it } from 'vitest';

import { addMoney, createMoney, isSameCurrency, parseMoney, serializeMoney } from './money.js';

describe('money', () => {
  it('creates money using minor units', () => {
    const money = createMoney(1234n, 'EUR');
    expect(money).toEqual({
      amountMinor: 1234n,
      currency: 'EUR',
    });
  });

  it('uses EUR as the default currency', () => {
    const money = createMoney(500n);
    expect(money.currency).toBe('EUR');
  });

  it('adds money with the same currency', () => {
    const result = addMoney(createMoney(1234n), createMoney(66n));
    expect(result).toEqual({
      amountMinor: 1300n,
      currency: 'EUR',
    });
  });

  it('detects matching currencies', () => {
    expect(isSameCurrency(createMoney(100n), createMoney(200n))).toBe(true);
  });

  it('serializes money for JSON transport', () => {
    const serialized = serializeMoney(createMoney(1234n));

    expect(serialized).toEqual({
      amountMinor: '1234',
      currency: 'EUR',
    });
  });

  it('parses serialized money from JSON transport', () => {
    const money = parseMoney({
      amountMinor: '1234',
      currency: 'EUR',
    });

    expect(money).toEqual({
      amountMinor: 1234n,
      currency: 'EUR',
    });
  });

  it('rejects non-integer serialized amounts', () => {
    expect(() =>
      parseMoney({
        amountMinor: '12.34',
        currency: 'EUR',
      }),
    ).toThrow('Money amountMinor must be an integer string.');
  });

  it('supports EUR, GBP, and USD currencies', () => {
    expect(createMoney(100n, 'EUR').currency).toBe('EUR');
    expect(createMoney(100n, 'GBP').currency).toBe('GBP');
    expect(createMoney(100n, 'USD').currency).toBe('USD');
  });

  it('rejects unsupported currencies from serialized money', () => {
    expect(() =>
      parseMoney({
        amountMinor: '1234',
        currency: 'CHF',
      }),
    ).toThrow('Money currency is not supported.');
  });

  it('rejects adding money with different currencies', () => {
    expect(() => addMoney(createMoney(100n, 'EUR'), createMoney(100n, 'USD'))).toThrow(
      'Cannot add money with different currencies.',
    );
  });
});
