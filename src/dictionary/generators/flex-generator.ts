import { TranslationEntry, TranslationGenerator } from "../types";

const flexMap: Record<string, { css: string; description: string }> = {
  'flex-1': { css: 'flex: 1 1 0%;', description: 'flex-grow:1, flex-shrink:1, flex-basis:0% にします。' },
  'flex-auto': { css: 'flex: 1 1 auto;', description: 'flex-grow:1, flex-shrink:1, flex-basis:auto にします。' },
  'flex-initial': { css: 'flex: 0 1 auto;', description: 'flex-grow:0, flex-shrink:1, flex-basis:auto にします。' },
  'flex-none': { css: 'flex: none;', description: 'flex: none（伸縮しない）にします。' },
  'grow': { css: 'flex-grow: 1;', description: 'flex-grow: 1（拡大可能）にします。' },
  'grow-0': { css: 'flex-grow: 0;', description: 'flex-grow: 0（拡大不可）にします。' },
  'shrink': { css: 'flex-shrink: 1;', description: 'flex-shrink: 1（縮小可能）にします。' },
  'shrink-0': { css: 'flex-shrink: 0;', description: 'flex-shrink: 0（縮小不可）にします。' },
};

const basisMap: Record<string, string> = {
  '0': '0px',
  'px': '1px',
  '0.5': '0.125rem',
  '1': '0.25rem',
  '1.5': '0.375rem',
  '2': '0.5rem',
  '2.5': '0.625rem',
  '3': '0.75rem',
  '3.5': '0.875rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '7': '1.75rem',
  '8': '2rem',
  '9': '2.25rem',
  '10': '2.5rem',
  '11': '2.75rem',
  '12': '3rem',
  '14': '3.5rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
  '28': '7rem',
  '32': '8rem',
  '36': '9rem',
  '40': '10rem',
  '44': '11rem',
  '48': '12rem',
  '52': '13rem',
  '56': '14rem',
  '60': '15rem',
  '64': '16rem',
  '72': '18rem',
  '80': '20rem',
  '96': '24rem',
};

export const generateFlexTranslation: TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray
): TranslationEntry | null => {
  if (flexMap[className]) return flexMap[className];
  if (matchResult[1]) {
    const basis = basisMap[matchResult[1]];
    if (!basis) return null;
    return {
      css: `flex-basis: ${basis};`,
      description: `flex-basisを${basis}にします。`,
    };
  }
  return null;
}; 