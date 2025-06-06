import { TranslationEntry, TranslationGenerator } from "../types";

export const generateSizeTranslation: TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray
): TranslationEntry | null => {
  const prop = matchResult[1]; // w, h, min-w, max-w, min-h, max-h
  const value = matchResult[2];
  let css = "";
  let description = "";
  let cssValue = value;
  // 値の変換
  if (value === "full") cssValue = "100%";
  else if (value === "screen")
    cssValue = prop.startsWith("w") ? "100vw" : "100vh";
  else if (value === "min") cssValue = "min-content";
  else if (value === "max") cssValue = "max-content";
  else if (value === "fit") cssValue = "fit-content";
  else if (value === "auto") cssValue = "auto";
  else if (value === "px") cssValue = "1px";
  else if (value.match(/^\d+\/\d+$/)) {
    // 分数
    const [num, denom] = value.split("/").map(Number);
    cssValue = (num / denom) * 100 + "%";
  } else if (value.match(/^\d+(\.\d+)?$/)) {
    // rem値
    cssValue = `${value}rem`;
  }
  // プロパティごとにCSSを生成
  let cssProp = "";
  switch (prop) {
    case "w":
      cssProp = "width";
      break;
    case "h":
      cssProp = "height";
      break;
    case "min-w":
      cssProp = "min-width";
      break;
    case "max-w":
      cssProp = "max-width";
      break;
    case "min-h":
      cssProp = "min-height";
      break;
    case "max-h":
      cssProp = "max-height";
      break;
    default:
      return null;
  }
  css = `${cssProp}: ${cssValue};`;
  description = `${cssProp.replace("-", " ")}を${value}に設定します。`;
  return { css, description };
}; 