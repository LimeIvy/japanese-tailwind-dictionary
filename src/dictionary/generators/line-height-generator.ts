import { TranslationEntry, TranslationGenerator } from "../types";

const lineHeightMap: Record<string, { css: string; description: string }> = {
  'leading-none': { css: 'line-height: 1;', description: '行間を1（詰める）にします。' },
  'leading-tight': { css: 'line-height: 1.25;', description: '行間を1.25（やや詰める）にします。' },
  'leading-snug': { css: 'line-height: 1.375;', description: '行間を1.375にします。' },
  'leading-normal': { css: 'line-height: 1.5;', description: '標準の行間（1.5）にします。' },
  'leading-relaxed': { css: 'line-height: 1.625;', description: '行間を1.625（やや広げる）にします。' },
  'leading-loose': { css: 'line-height: 2;', description: '行間を2（広げる）にします。' },
  'leading-3': { css: 'line-height: .75rem;', description: '行間を0.75remにします。' },
  'leading-4': { css: 'line-height: 1rem;', description: '行間を1remにします。' },
  'leading-5': { css: 'line-height: 1.25rem;', description: '行間を1.25remにします。' },
  'leading-6': { css: 'line-height: 1.5rem;', description: '行間を1.5remにします。' },
  'leading-7': { css: 'line-height: 1.75rem;', description: '行間を1.75remにします。' },
  'leading-8': { css: 'line-height: 2rem;', description: '行間を2remにします。' },
  'leading-9': { css: 'line-height: 2.25rem;', description: '行間を2.25remにします。' },
  'leading-10': { css: 'line-height: 2.5rem;', description: '行間を2.5remにします。' },
};

export const generateLineHeightTranslation: TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray
): TranslationEntry | null => {
  return lineHeightMap[className] || null;
}; 