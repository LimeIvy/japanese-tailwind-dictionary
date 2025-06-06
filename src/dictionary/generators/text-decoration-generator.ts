import { TranslationEntry, TranslationGenerator } from "../types";

const textDecorationMap: Record<string, { css: string; description: string }> = {
  underline: { css: 'text-decoration-line: underline;', description: '下線を引きます。' },
  'line-through': { css: 'text-decoration-line: line-through;', description: '取り消し線を引きます。' },
  'no-underline': { css: 'text-decoration-line: none;', description: '下線・取り消し線を消します。' },
};

export const generateTextDecorationTranslation: TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray
): TranslationEntry | null => {
  return textDecorationMap[className] || null;
}; 