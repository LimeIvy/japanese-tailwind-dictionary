import { TranslationEntry, TranslationGenerator } from "../types";

export const generateInsetTranslation: TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray
): TranslationEntry | null => {
  const direction = matchResult[1]; // inset, inset-x, inset-y, top, right, bottom, left
  const negative = matchResult[2] === "-" ? "-" : "";
  const value = matchResult[3];
  let css = "";
  let description = "";
  // 値の変換（rem, %, auto, full, 1/2, ...）
  let cssValue = value;
  if (value === "full") cssValue = "100%";
  else if (value === "auto") cssValue = "auto";
  else if (value.match(/^\d+\/\d+$/)) {
    // 分数
    const [num, denom] = value.split("/").map(Number);
    cssValue = (num / denom) * 100 + "%";
  } else if (value.match(/^\d+(\.\d+)?$/)) {
    // rem値（例: 0, 0.5, 1, 1.5, ...）
    cssValue = `${value}rem`;
  }
  // directionごとにCSSを生成
  switch (direction) {
    case "inset":
      css = `top: ${negative}${cssValue};\nright: ${negative}${cssValue};\nbottom: ${negative}${cssValue};\nleft: ${negative}${cssValue};`;
      description = `上下左右の位置を${negative}${value}に設定します。`;
      break;
    case "inset-x":
      css = `right: ${negative}${cssValue};\nleft: ${negative}${cssValue};`;
      description = `左右の位置を${negative}${value}に設定します。`;
      break;
    case "inset-y":
      css = `top: ${negative}${cssValue};\nbottom: ${negative}${cssValue};`;
      description = `上下の位置を${negative}${value}に設定します。`;
      break;
    case "top":
    case "right":
    case "bottom":
    case "left":
      css = `${direction}: ${negative}${cssValue};`;
      description = `${direction}の位置を${negative}${value}に設定します。`;
      break;
    default:
      return null;
  }
  return { css, description };
}; 