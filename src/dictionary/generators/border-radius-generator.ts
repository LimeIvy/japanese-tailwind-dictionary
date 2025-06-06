import { TranslationEntry, TranslationGenerator } from "../types";

const radiusMap: Record<string, string> = {
  'none': '0',
  'sm': '0.125rem',
  '': '0.25rem', // デフォルト
  'md': '0.375rem',
  'lg': '0.5rem',
  'xl': '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  'full': '9999px',
};

const cornerMap: Record<string, string> = {
  't': 'top',
  'r': 'right',
  'b': 'bottom',
  'l': 'left',
  'tl': 'top-left',
  'tr': 'top-right',
  'br': 'bottom-right',
  'bl': 'bottom-left',
};

export const generateBorderRadiusTranslation: TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray
): TranslationEntry | null => {
  // rounded, rounded-lg, rounded-t, rounded-tl-2xl など
  if (className === 'rounded') {
    return {
      css: 'border-radius: 0.25rem;',
      description: '角丸を0.25remにします。',
    };
  }
  if (matchResult[1] && !matchResult[2]) {
    // rounded-none, rounded-lg など
    const size = radiusMap[matchResult[1]];
    if (size === undefined) return null;
    return {
      css: `border-radius: ${size};`,
      description: `角丸を${size}にします。`,
    };
  }
  if (matchResult[2]) {
    // rounded-t, rounded-tl, rounded-tl-2xl など
    const corner = cornerMap[matchResult[1]];
    const size = radiusMap[matchResult[2] || ''];
    if (!corner || size === undefined) return null;
    const cssProp = corner.includes('-') ? `border-${corner}-radius` : `border-${corner}-radius`;
    return {
      css: `${cssProp}: ${size};`,
      description: `${corner}の角丸を${size}にします。`,
    };
  }
  return null;
}; 