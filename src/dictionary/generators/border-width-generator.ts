import { TranslationEntry, TranslationGenerator } from "../types";

const borderWidthMap: Record<string, string> = {
  '0': '0',
  '2': '2px',
  '4': '4px',
  '8': '8px',
};

const borderSideMap: Record<string, string> = {
  't': 'top',
  'r': 'right',
  'b': 'bottom',
  'l': 'left',
};

export const generateBorderWidthTranslation: TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray
): TranslationEntry | null => {
  // border, border-2, border-t, border-t-0, ...
  if (className === 'border') {
    return {
      css: 'border-width: 1px;',
      description: 'ボーダー幅を1pxにします。',
    };
  }
  // border-{width}
  if (matchResult[1] && !matchResult[2]) {
    const width = borderWidthMap[matchResult[1]];
    if (!width) return null;
    return {
      css: `border-width: ${width};`,
      description: `ボーダー幅を${width}にします。`,
    };
  }
  // border-{side}
  if (matchResult[2] && !matchResult[3]) {
    const side = borderSideMap[matchResult[2]];
    if (!side) return null;
    return {
      css: `border-${side}-width: 1px;`,
      description: `${side}ボーダー幅を1pxにします。`,
    };
  }
  // border-{side}-{width}
  if (matchResult[2] && matchResult[3]) {
    const side = borderSideMap[matchResult[2]];
    const width = borderWidthMap[matchResult[3]];
    if (!side || !width) return null;
    return {
      css: `border-${side}-width: ${width};`,
      description: `${side}ボーダー幅を${width}にします。`,
    };
  }
  return null;
}; 