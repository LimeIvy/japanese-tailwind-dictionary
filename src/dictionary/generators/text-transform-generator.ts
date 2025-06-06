import { TranslationEntry, TranslationGenerator } from "../types";

const textTransformMap: Record<string, { css: string; description: string }> = {
  uppercase: { css: 'text-transform: uppercase;', description: '英字をすべて大文字にします。' },
  lowercase: { css: 'text-transform: lowercase;', description: '英字をすべて小文字にします。' },
  capitalize: { css: 'text-transform: capitalize;', description: '英単語の先頭文字を大文字にします。' },
  'normal-case': { css: 'text-transform: none;', description: 'テキスト変換を無効にします。' },
};

export const generateTextTransformTranslation: TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray
): TranslationEntry | null => {
  return textTransformMap[className] || null;
}; 