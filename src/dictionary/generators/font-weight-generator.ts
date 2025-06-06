import { TranslationEntry, TranslationGenerator } from "../types";

const fontWeightMap: Record<string, { css: string; description: string }> = {
  'font-thin': { css: 'font-weight: 100;', description: 'フォントウェイトを100（極細）にします。' },
  'font-extralight': { css: 'font-weight: 200;', description: 'フォントウェイトを200（特細）にします。' },
  'font-light': { css: 'font-weight: 300;', description: 'フォントウェイトを300（細字）にします。' },
  'font-normal': { css: 'font-weight: 400;', description: 'フォントウェイトを400（標準）にします。' },
  'font-medium': { css: 'font-weight: 500;', description: 'フォントウェイトを500（中間）にします。' },
  'font-semibold': { css: 'font-weight: 600;', description: 'フォントウェイトを600（やや太字）にします。' },
  'font-bold': { css: 'font-weight: 700;', description: 'フォントウェイトを700（太字）にします。' },
  'font-extrabold': { css: 'font-weight: 800;', description: 'フォントウェイトを800（特太字）にします。' },
  'font-black': { css: 'font-weight: 900;', description: 'フォントウェイトを900（極太字）にします。' },
  'font-100': { css: 'font-weight: 100;', description: 'フォントウェイトを100にします。' },
  'font-200': { css: 'font-weight: 200;', description: 'フォントウェイトを200にします。' },
  'font-300': { css: 'font-weight: 300;', description: 'フォントウェイトを300にします。' },
  'font-400': { css: 'font-weight: 400;', description: 'フォントウェイトを400にします。' },
  'font-500': { css: 'font-weight: 500;', description: 'フォントウェイトを500にします。' },
  'font-600': { css: 'font-weight: 600;', description: 'フォントウェイトを600にします。' },
  'font-700': { css: 'font-weight: 700;', description: 'フォントウェイトを700にします。' },
  'font-800': { css: 'font-weight: 800;', description: 'フォントウェイトを800にします。' },
  'font-900': { css: 'font-weight: 900;', description: 'フォントウェイトを900にします。' },
};

export const generateFontWeightTranslation: TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray
): TranslationEntry | null => {
  return fontWeightMap[className] || null;
}; 