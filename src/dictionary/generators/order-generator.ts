import { TranslationEntry, TranslationGenerator } from "../types";

const orderMap: Record<string, string> = {
  'first': '-9999',
  'last': '9999',
  'none': '0',
};

export const generateOrderTranslation: TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray
): TranslationEntry | null => {
  // order-1 ~ order-12
  if (matchResult[1]) {
    return {
      css: `order: ${matchResult[1]};`,
      description: `orderを${matchResult[1]}にします。`,
    };
  }
  // order-first, order-last, order-none
  if (matchResult[2] && orderMap[matchResult[2]]) {
    return {
      css: `order: ${orderMap[matchResult[2]]};`,
      description: `orderを${orderMap[matchResult[2]]}にします。`,
    };
  }
  return null;
}; 