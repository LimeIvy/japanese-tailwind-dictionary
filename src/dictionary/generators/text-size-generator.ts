import { FontSizeDetail, TranslationEntry, TranslationGenerator } from "../types";

export const fontSizeData: Record<string, FontSizeDetail> = {
  xs: { fontSize: "0.75rem", fontSizePx: "12px", lineHeight: "1rem" },
  sm: { fontSize: "0.875rem", fontSizePx: "14px", lineHeight: "1.25rem" },
  base: { fontSize: "1rem", fontSizePx: "16px", lineHeight: "1.5rem" },
  lg: { fontSize: "1.125rem", fontSizePx: "18px", lineHeight: "1.75rem" },
  xl: { fontSize: "1.25rem", fontSizePx: "20px", lineHeight: "1.75rem" },
  "2xl": { fontSize: "1.5rem", fontSizePx: "24px", lineHeight: "2rem" },
  "3xl": { fontSize: "1.875rem", fontSizePx: "30px", lineHeight: "2.25rem" },
  "4xl": { fontSize: "2.25rem", fontSizePx: "36px", lineHeight: "2.5rem" },
  "5xl": { fontSize: "3rem", fontSizePx: "48px", lineHeight: "1" },
  "6xl": { fontSize: "3.75rem", fontSizePx: "60px", lineHeight: "1" },
  "7xl": { fontSize: "4.5rem", fontSizePx: "72px", lineHeight: "1" },
  "8xl": { fontSize: "6rem", fontSizePx: "96px", lineHeight: "1" },
  "9xl": { fontSize: "8rem", fontSizePx: "128px", lineHeight: "1" },
};

export const generateTextSizeTranslation: TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray,
  dataItem?: FontSizeDetail
): TranslationEntry | null => {
  const sizeInfo = dataItem || fontSizeData[matchResult[1]];
  if (!sizeInfo) {
    console.warn(
      `[generateTextSizeTranslation] No size data found for key: ${matchResult[1]}`
    );
    return null;
  }
  const fontSizeVar = `var(--${className})`;
  const lineHeightVar = `var(--${className}--line-height)`;
  const fontSizeValueComment = `${sizeInfo.fontSize} /* ${sizeInfo.fontSizePx} */`;
  let lineHeightValueComment = sizeInfo.lineHeight;
  const fsVal = parseFloat(sizeInfo.fontSize);
  const lhVal = parseFloat(sizeInfo.lineHeight);
  if (!isNaN(fsVal) && fsVal !== 0 && !isNaN(lhVal)) {
    if (sizeInfo.lineHeight.match(/^\d+(\.\d+)?$/)) {
      lineHeightValueComment = sizeInfo.lineHeight;
    } else if (
      sizeInfo.lineHeight.endsWith("rem") ||
      sizeInfo.lineHeight.endsWith("em")
    ) {
      const ratio = lhVal / fsVal;
      lineHeightValueComment = `calc(${sizeInfo.lineHeight} / ${
        sizeInfo.fontSize
      }) \u2248 ${ratio.toFixed(4)}`;
    }
  }
  const cssOutput = `.${className} {
  font-size: ${fontSizeVar} /* ${fontSizeValueComment} */;
  line-height: var(--tw-leading, ${lineHeightVar} /* ${lineHeightValueComment} */);
}`;
  const description = `テキストサイズを ${matchResult[1].toUpperCase()} (${sizeInfo.fontSize} / ${sizeInfo.fontSizePx}) に設定し、行送りを調整します。`;
  return { css: cssOutput, description };
}; 