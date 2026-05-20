export const sharedPackageName = '@futura/shared';
export {
  addMoney,
  createMoney,
  currencies,
  isCurrency,
  isSameCurrency,
  parseMoney,
  serializeMoney,
} from './money/index.js';

export type { Currency, Money, SerializedMoney } from './money/index.js';
