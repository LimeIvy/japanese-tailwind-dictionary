import { TranslationEntry, TranslationGenerator } from "../types";
import { tailwindColors } from "../data/colors";

const colorProperties: Record<string, { cssProperty: string, descriptionName: string }> = {
  bg: { cssProperty: "background-color", descriptionName: "背景色" },
  text: { cssProperty: "color", descriptionName: "テキスト色" },
  border: { cssProperty: "border-color", descriptionName: "ボーダー色" },
  divide: { cssProperty: "border-color", descriptionName: "分割線の色" },
  outline: { cssProperty: "outline-color", descriptionName: "アウトライン色" },
  ring: { cssProperty: "ring-color", descriptionName: "リング色" },
  "ring-offset": { cssProperty: "ring-offset-color", descriptionName: "リングオフセット色" },
  accent: { cssProperty: "accent-color", descriptionName: "アクセント色" },
  caret: { cssProperty: "caret-color", descriptionName: "キャレット色" },
  fill: { cssProperty: "fill", descriptionName: "フィル色" },
  stroke: { cssProperty: "stroke", descriptionName: "ストローク色" },
  placeholder: { cssProperty: "color", descriptionName: "プレースホルダー色" },
  from: { cssProperty: "--tw-gradient-from", descriptionName: "グラデーション開始色" },
  via: { cssProperty: "--tw-gradient-stops", descriptionName: "グラデーション中間色" },
  to: { cssProperty: "--tw-gradient-to", descriptionName: "グラデーション終了色" },
};

export const generateColorTranslation: TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray
): TranslationEntry | null => {
  const propertyKey = matchResult[1];
  const colorName = matchResult[2];
  const shade = matchResult[3];

  const propertyInfo = colorProperties[propertyKey];
  const colorValue = tailwindColors[colorName]?.[shade];

  if (!propertyInfo || !colorValue) {
    return null;
  }

  const css = `${propertyInfo.cssProperty}: ${colorValue};`;
  const description = `${propertyInfo.descriptionName}を「${colorName} (${shade})」に設定します。`;

  return { css, description };
}; 