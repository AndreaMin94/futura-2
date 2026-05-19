export const currencies = ['EUR', 'GBP', 'USD'] as const;

export type Currency = (typeof currencies)[number];

export type Money = {
  amountMinor: bigint;
  currency: Currency;
};

export type SerializedMoney = {
  amountMinor: string;
  currency: string;
};

export function isCurrency(value: string): value is Currency {
  return currencies.includes(value as Currency);
}

export function createMoney(amountMinor: bigint, currency: Currency = 'EUR'): Money {
  return {
    amountMinor,
    currency,
  };
}

export function isSameCurrency(left: Money, right: Money): boolean {
  return left.currency === right.currency;
}

export function addMoney(left: Money, right: Money): Money {
  if (!isSameCurrency(left, right)) {
    throw new Error('Cannot add money with different currencies.');
  }
  return createMoney(left.amountMinor + right.amountMinor, left.currency);
}

export function serializeMoney(money: Money): SerializedMoney {
  return {
    amountMinor: money.amountMinor.toString(),
    currency: money.currency,
  };
}

export function parseMoney(input: SerializedMoney): Money {
  if (!/^-?\d+$/.test(input.amountMinor)) {
    throw new Error('Money amountMinor must be an integer string.');
  }

  if (!isCurrency(input.currency)) {
    throw new Error('Money currency is not supported.');
  }

  return createMoney(BigInt(input.amountMinor), input.currency);
}
