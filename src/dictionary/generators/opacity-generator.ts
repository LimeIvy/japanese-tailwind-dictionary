import { TranslationEntry, TranslationGenerator } from "../types";

const opacityMap: Record<string, string> = {
  '0': '0',
  '5': '0.05',
  '10': '0.1',
  '20': '0.2',
  '25': '0.25',
  '30': '0.3',
  '40': '0.4',
  '50': '0.5',
  '60': '0.6',
  '70': '0.7',
  '75': '0.75',
  '80': '0.8',
  '90': '0.9',
  '95': '0.95',
  '100': '1',
};

export const generateOpacityTranslation: TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray
): TranslationEntry | null => {
  const value = opacityMap[matchResult[1]];
  if (value === undefined) return null;
  return {
    css: `opacity: ${value};`,
    description: `透明度を${Number(value) * 100}%にします。`,
  };
}; 