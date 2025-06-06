import { TranslationEntry, TranslationGenerator } from "../types";

const fontStyleMap: Record<string, { css: string; description: string }> = {
  italic: { css: 'font-style: italic;', description: 'イタリック体（斜体）にします。' },
  'not-italic': { css: 'font-style: normal;', description: 'イタリック体を解除します。' },
};

export const generateFontStyleTranslation: TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray
): TranslationEntry | null => {
  return fontStyleMap[className] || null;
}; 