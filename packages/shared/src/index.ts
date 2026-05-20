export const sharedPackageName = '@futura/shared';

// NodeNext emits ESM files to dist, so relative exports point to the runtime .js output.
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
