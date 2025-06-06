import { TranslationEntry, TranslationGenerator } from "../types";

export const generateSpacingTranslation: TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray
): TranslationEntry | null => {
  const type = matchResult[1]; // p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml
  const negative = type.startsWith("m") && matchResult[2] === "-" ? "-" : "";
  const value = matchResult[3];
  let css = "";
  let description = "";
  let cssValue = value;
  // 値の変換
  if (value === "auto") cssValue = "auto";
  else if (value === "px") cssValue = "1px";
  else if (value.match(/^\d+\/\d+$/)) {
    // 分数
    const [num, denom] = value.split("/").map(Number);
    cssValue = (num / denom) * 100 + "%";
  } else if (value.match(/^\d+(\.\d+)?$/)) {
    // rem値
    cssValue = `${value}rem`;
  }
  // typeごとにCSSを生成
  switch (type) {
    case "p":
      css = `padding: ${cssValue};`;
      description = `全体のパディングを${value}に設定します。`;
      break;
    case "px":
      css = `padding-left: ${cssValue};\npadding-right: ${cssValue};`;
      description = `左右のパディングを${value}に設定します。`;
      break;
    case "py":
      css = `padding-top: ${cssValue};\npadding-bottom: ${cssValue};`;
      description = `上下のパディングを${value}に設定します。`;
      break;
    case "pt":
      css = `padding-top: ${cssValue};`;
      description = `上のパディングを${value}に設定します。`;
      break;
    case "pr":
      css = `padding-right: ${cssValue};`;
      description = `右のパディングを${value}に設定します。`;
      break;
    case "pb":
      css = `padding-bottom: ${cssValue};`;
      description = `下のパディングを${value}に設定します。`;
      break;
    case "pl":
      css = `padding-left: ${cssValue};`;
      description = `左のパディングを${value}に設定します。`;
      break;
    case "m":
      css = `margin: ${negative}${cssValue};`;
      description = `全体のマージンを${negative}${value}に設定します。`;
      break;
    case "mx":
      css = `margin-left: ${negative}${cssValue};\nmargin-right: ${negative}${cssValue};`;
      description = `左右のマージンを${negative}${value}に設定します。`;
      break;
    case "my":
      css = `margin-top: ${negative}${cssValue};\nmargin-bottom: ${negative}${cssValue};`;
      description = `上下のマージンを${negative}${value}に設定します。`;
      break;
    case "mt":
      css = `margin-top: ${negative}${cssValue};`;
      description = `上のマージンを${negative}${value}に設定します。`;
      break;
    case "mr":
      css = `margin-right: ${negative}${cssValue};`;
      description = `右のマージンを${negative}${value}に設定します。`;
      break;
    case "mb":
      css = `margin-bottom: ${negative}${cssValue};`;
      description = `下のマージンを${negative}${value}に設定します。`;
      break;
    case "ml":
      css = `margin-left: ${negative}${cssValue};`;
      description = `左のマージンを${negative}${value}に設定します。`;
      break;
    default:
      return null;
  }
  return { css, description };
}; 