import { TranslationEntry, TranslationGenerator } from "../types";

const letterSpacingMap: Record<string, { css: string; description: string }> = {
  'tracking-tighter': { css: 'letter-spacing: -0.05em;', description: '文字間を非常に詰めます。' },
  'tracking-tight': { css: 'letter-spacing: -0.025em;', description: '文字間を詰めます。' },
  'tracking-normal': { css: 'letter-spacing: 0em;', description: '標準の文字間にします。' },
  'tracking-wide': { css: 'letter-spacing: 0.025em;', description: '文字間をやや広げます。' },
  'tracking-wider': { css: 'letter-spacing: 0.05em;', description: '文字間を広げます。' },
  'tracking-widest': { css: 'letter-spacing: 0.1em;', description: '文字間を非常に広げます。' },
};

export const generateLetterSpacingTranslation: TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray
): TranslationEntry | null => {
  return letterSpacingMap[className] || null;
}; 