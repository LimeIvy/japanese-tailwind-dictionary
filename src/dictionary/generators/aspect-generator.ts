import { TranslationEntry, TranslationGenerator } from "../types";

const aspectMap: Record<string, string> = {
  'auto': 'auto',
  'square': '1 / 1',
  'video': '16 / 9',
};

export const generateAspectTranslation: TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray
): TranslationEntry | null => {
  if (matchResult[1] && aspectMap[matchResult[1]]) {
    return {
      css: `aspect-ratio: ${aspectMap[matchResult[1]]};`,
      description: `アスペクト比を${aspectMap[matchResult[1]]}にします。`,
    };
  }
  return null;
}; 