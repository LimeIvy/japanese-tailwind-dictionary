import { TranslationEntry, TranslationGenerator } from "../types";

export const generateZIndexTranslation: TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray
): TranslationEntry | null => {
  const value = matchResult[1];
  let css = "";
  let description = "";
  if (value === "auto") {
    css = "z-index: auto;";
    description = "z-indexを自動に設定します。";
  } else if (value.match(/^\d+$/)) {
    css = `z-index: ${value};`;
    description = `z-indexを${value}に設定します。`;
  } else {
    return null;
  }
  return { css, description };
}; 