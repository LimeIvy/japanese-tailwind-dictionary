import { TranslationEntry, TranslationGenerator } from "../types";

const colRowMap = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
const rowSpanMap = Array.from({ length: 6 }, (_, i) => (i + 1).toString());

const gapMap: Record<string, string> = {
  '0': '0px',
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

export const generateGridTranslation: TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray
): TranslationEntry | null => {
  // grid-cols-1 ~ grid-cols-12
  if (matchResult[1] && colRowMap.includes(matchResult[1])) {
    return {
      css: `grid-template-columns: repeat(${matchResult[1]}, minmax(0, 1fr));`,
      description: `カラム数を${matchResult[1]}にします。`,
    };
  }
  // grid-rows-1 ~ grid-rows-6
  if (matchResult[2] && rowSpanMap.includes(matchResult[2])) {
    return {
      css: `grid-template-rows: repeat(${matchResult[2]}, minmax(0, 1fr));`,
      description: `行数を${matchResult[2]}にします。`,
    };
  }
  // col-span-1 ~ col-span-12
  if (matchResult[3] && colRowMap.includes(matchResult[3])) {
    return {
      css: `grid-column: span ${matchResult[3]} / span ${matchResult[3]};`,
      description: `カラムのスパンを${matchResult[3]}にします。`,
    };
  }
  // row-span-1 ~ row-span-6
  if (matchResult[4] && rowSpanMap.includes(matchResult[4])) {
    return {
      css: `grid-row: span ${matchResult[4]} / span ${matchResult[4]};`,
      description: `行のスパンを${matchResult[4]}にします。`,
    };
  }
  // gap, gap-x, gap-y
  if (matchResult[5] && gapMap[matchResult[5]]) {
    return {
      css: `gap: ${gapMap[matchResult[5]]};`,
      description: `グリッドの隙間を${gapMap[matchResult[5]]}にします。`,
    };
  }
  if (matchResult[6] && gapMap[matchResult[6]]) {
    return {
      css: `column-gap: ${gapMap[matchResult[6]]};`,
      description: `カラム間の隙間を${gapMap[matchResult[6]]}にします。`,
    };
  }
  if (matchResult[7] && gapMap[matchResult[7]]) {
    return {
      css: `row-gap: ${gapMap[matchResult[7]]};`,
      description: `行間の隙間を${gapMap[matchResult[7]]}にします。`,
    };
  }
  return null;
}; 