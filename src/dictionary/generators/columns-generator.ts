import { TranslationEntry, TranslationGenerator } from "../types";

const columnsKeywordWidthMap: Record<string, string> = {
  '3xs': '16rem',
  '2xs': '18rem',
  'xs': '20rem',
  'sm': '24rem',
  'md': '28rem',
  'lg': '32rem',
  'xl': '36rem',
  '2xl': '42rem',
  '3xl': '48rem',
  '4xl': '56rem',
  '5xl': '64rem',
  '6xl': '72rem',
  '7xl': '80rem',
};

export const generateColumnsTranslation: TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray
): TranslationEntry | null => {
  const value = matchResult[1];
  let css = "";
  let description = "";
  if (value.match(/^\d+$/)) {
    css = `columns: ${value};`;
    description = `カラム数を${value}に設定します。`;
  } else if (value.match(/^(\d+)\/(\d+)$/)) {
    css = `columns: ${value.replace("/", " / ")};`;
    description = `カラム幅を${value.replace("/", " / ")}に設定します。`;
  } else if (columnsKeywordWidthMap[value]) {
    css = `columns: ${columnsKeywordWidthMap[value]};`;
    description = `カラム幅を${columnsKeywordWidthMap[value]}に設定します。`;
  } else {
    return null;
  }
  return { css, description };
}; 