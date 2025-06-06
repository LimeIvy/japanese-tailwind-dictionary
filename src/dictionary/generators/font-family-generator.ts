import { TranslationEntry, TranslationGenerator } from "../types";

const fontFamilyMap: Record<string, { css: string; description: string }> = {
  'font-sans': {
    css: 'font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";',
    description: 'サンセリフ体（ゴシック体）フォントを適用します。',
  },
  'font-serif': {
    css: 'font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;',
    description: 'セリフ体（明朝体）フォントを適用します。',
  },
  'font-mono': {
    css: 'font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
    description: '等幅フォントを適用します。',
  },
};

export const generateFontFamilyTranslation: TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray
): TranslationEntry | null => {
  return fontFamilyMap[className] || null;
}; 