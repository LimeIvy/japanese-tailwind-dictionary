import { TranslationEntry, TranslationGenerator } from "../types";

const scaleMap: Record<string, string> = {
  '0': '0',
  '50': '0.5',
  '75': '0.75',
  '90': '0.9',
  '95': '0.95',
  '100': '1',
  '105': '1.05',
  '110': '1.1',
  '125': '1.25',
  '150': '1.5',
  '200': '2',
};

export const generateScaleTranslation: TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray
): TranslationEntry | null => {
  const type = matchResult[1]; // scale, scale-x, scale-y
  const value = matchResult[2];
  const scale = scaleMap[value];
  if (!scale) return null;
  let css = '';
  let description = '';
  if (type === 'scale') {
    css = `transform: scale(${scale});`;
    description = `要素全体を${scale}倍に拡大・縮小します。`;
  } else if (type === 'scale-x') {
    css = `transform: scaleX(${scale});`;
    description = `要素を水平方向に${scale}倍に拡大・縮小します。`;
  } else if (type === 'scale-y') {
    css = `transform: scaleY(${scale});`;
    description = `要素を垂直方向に${scale}倍に拡大・縮小します。`;
  }
  return { css, description };
};

export const generateRotateTranslation: TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray
): TranslationEntry | null => {
  const deg = matchResult[1];
  const css = `transform: rotate(${deg}deg);`;
  const description = `要素を${deg}度回転します。`;
  return { css, description };
};

export const generateTranslateTranslation: TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray
): TranslationEntry | null => {
  const axis = matchResult[1]; // x or y
  const value = matchResult[2];
  let cssValue = value;
  if (value === 'full') cssValue = '100%';
  else if (value === '1\/2') cssValue = '50%';
  else if (value.match(/^\d+$/)) cssValue = `${Number(value) * 0.25}rem`;
  else if (value.match(/^-(\d+)$/)) cssValue = `-${parseInt(value.slice(1)) * 0.25}rem`;
  else if (value === 'px') cssValue = '1px';
  const css = `transform: translate${axis.toUpperCase()}(${cssValue});`;
  const description = `要素を${axis === 'x' ? '水平方向' : '垂直方向'}に${value}移動します。`;
  return { css, description };
};

export const generateSkewTranslation: TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray
): TranslationEntry | null => {
  const axis = matchResult[1]; // x or y
  const deg = matchResult[2];
  const css = `transform: skew${axis.toUpperCase()}(${deg}deg);`;
  const description = `要素を${axis === 'x' ? '水平方向' : '垂直方向'}に${deg}度傾斜させます。`;
  return { css, description };
}; 