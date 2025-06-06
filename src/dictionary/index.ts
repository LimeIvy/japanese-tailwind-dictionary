export * from "./types";
export * from "./static-dictionary";
export * from "./generators/text-size-generator";
export * from "./generators/columns-generator";
export * from "./generators/inset-generator";
export * from "./generators/z-index-generator";
export * from "./generators/size-generator";
export * from "./generators/spacing-generator";
export * from "./generators/color-generator";
export * from "./generators/font-family-generator";
export * from "./generators/font-weight-generator";
export * from "./generators/font-style-generator";
export * from "./generators/letter-spacing-generator";
export * from "./generators/line-height-generator";
export * from "./generators/text-decoration-generator";
export * from "./generators/text-transform-generator";
export * from "./generators/transform-generator";
export * from "./generators/gap-generator";
export { generateBorderWidthTranslation } from "./generators/border-width-generator";
export { generateBorderRadiusTranslation } from "./generators/border-radius-generator";
export { generateOpacityTranslation } from "./generators/opacity-generator";
export { generateFlexTranslation } from "./generators/flex-generator";
export { generateGridTranslation } from "./generators/grid-generator";
export { generateOrderTranslation } from "./generators/order-generator";
export { generateAspectTranslation } from "./generators/aspect-generator";

import { generateTextSizeTranslation, fontSizeData } from "./generators/text-size-generator";
import { generateColumnsTranslation } from "./generators/columns-generator";
import { generateInsetTranslation } from "./generators/inset-generator";
import { generateZIndexTranslation } from "./generators/z-index-generator";
import { generateSizeTranslation } from "./generators/size-generator";
import { generateSpacingTranslation } from "./generators/spacing-generator";
import { generateColorTranslation } from "./generators/color-generator";
import { generateFontFamilyTranslation } from "./generators/font-family-generator";
import { generateFontWeightTranslation } from "./generators/font-weight-generator";
import { generateFontStyleTranslation } from "./generators/font-style-generator";
import { generateLetterSpacingTranslation } from "./generators/letter-spacing-generator";
import { generateLineHeightTranslation } from "./generators/line-height-generator";
import { generateTextDecorationTranslation } from "./generators/text-decoration-generator";
import { generateTextTransformTranslation } from "./generators/text-transform-generator";
import { generateScaleTranslation, generateRotateTranslation, generateTranslateTranslation, generateSkewTranslation } from "./generators/transform-generator";
import { generateGapTranslation } from "./generators/gap-generator";
import { generateBorderWidthTranslation } from "./generators/border-width-generator";
import { generateBorderRadiusTranslation } from "./generators/border-radius-generator";
import { generateOpacityTranslation } from "./generators/opacity-generator";
import { generateFlexTranslation } from "./generators/flex-generator";
import { generateGridTranslation } from "./generators/grid-generator";
import { generateOrderTranslation } from "./generators/order-generator";
import { generateAspectTranslation } from "./generators/aspect-generator";
import { DynamicGeneratorConfig } from "./types";

export const dynamicTranslationGenerators: DynamicGeneratorConfig[] = [
  {
    regex: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/,
    generator: generateTextSizeTranslation,
    dataKeys: Object.keys(fontSizeData),
    dataMap: fontSizeData,
    classNamePrefix: "text-",
  },
  {
    regex: /^columns-((?:\d+)|(?:\d+\/\d+)|(?:3xs|2xs|xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl))$/,
    generator: generateColumnsTranslation,
    classNamePrefix: "columns-",
  },
  {
    regex:
      /^(inset|inset-x|inset-y|top|right|bottom|left)(-)?([\d.]+|full|auto|\d+\/\d+)$/,
    generator: generateInsetTranslation,
    classNamePrefix: "",
  },
  {
    regex: /^z-(\d+|auto)$/,
    generator: generateZIndexTranslation,
    classNamePrefix: "z-",
  },
  {
    regex:
      /^(w|h|min-w|max-w|min-h|max-h)-(\d+\/\d+|full|screen|min|max|fit|auto|px|\d+(?:\.\d+)?)$/,
    generator: generateSizeTranslation,
    classNamePrefix: "",
  },
  {
    regex:
      /^(p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml)(-)?(auto|px|\d+\/\d+|\d+(?:\.\d+)?)$/,
    generator: generateSpacingTranslation,
    classNamePrefix: "",
  },
  {
    regex: /^(bg|text|border|divide|outline|ring|ring-offset|accent|caret|fill|stroke|placeholder|from|via|to)-(\w+)-(\d{2,3})$/,
    generator: generateColorTranslation,
    classNamePrefix: "",
  },
  // フォントファミリー
  {
    regex: /^(font-sans|font-serif|font-mono)$/,
    generator: generateFontFamilyTranslation,
    classNamePrefix: "",
  },
  // フォントウェイト
  {
    regex: /^(font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black|[1-9]00))$/,
    generator: generateFontWeightTranslation,
    classNamePrefix: "",
  },
  // フォントスタイル
  {
    regex: /^(italic|not-italic)$/,
    generator: generateFontStyleTranslation,
    classNamePrefix: "",
  },
  // 文字間
  {
    regex: /^(tracking-(tighter|tight|normal|wide|wider|widest))$/,
    generator: generateLetterSpacingTranslation,
    classNamePrefix: "",
  },
  // 行間
  {
    regex: /^(leading-(none|tight|snug|normal|relaxed|loose|[3-9]|10))$/,
    generator: generateLineHeightTranslation,
    classNamePrefix: "",
  },
  // テキスト装飾
  {
    regex: /^(underline|line-through|no-underline)$/,
    generator: generateTextDecorationTranslation,
    classNamePrefix: "",
  },
  // テキスト変換
  {
    regex: /^(uppercase|lowercase|capitalize|normal-case)$/,
    generator: generateTextTransformTranslation,
    classNamePrefix: "",
  },
  // transform系
  {
    regex: /^(scale|scale-x|scale-y)-(0|50|75|90|95|100|105|110|125|150|200)$/,
    generator: generateScaleTranslation,
    classNamePrefix: "",
  },
  {
    regex: /^rotate-(-?\d{1,3})$/,
    generator: generateRotateTranslation,
    classNamePrefix: "",
  },
  {
    regex: /^translate-(x|y)-(-?\d+|px|full|1\/2)$/,
    generator: generateTranslateTranslation,
    classNamePrefix: "",
  },
  {
    regex: /^skew-(x|y)-(-?\d{1,3})$/,
    generator: generateSkewTranslation,
    classNamePrefix: "",
  },
  // gap系
  {
    regex: /^(gap|gap-x|gap-y)-(0|px|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)$/,
    generator: generateGapTranslation,
    classNamePrefix: "",
  },
  // border-width
  {
    regex: /^(border)(?:-(0|2|4|8))?$|^border-([trbl])(?:-(0|2|4|8))?$/,
    generator: generateBorderWidthTranslation,
    classNamePrefix: "border",
  },
  // border-radius
  {
    regex: /^rounded(?:-(none|sm|md|lg|xl|2xl|3xl|full))?$|^rounded-([trbl]|tl|tr|br|bl)(?:-(none|sm|md|lg|xl|2xl|3xl|full))?$/,
    generator: generateBorderRadiusTranslation,
    classNamePrefix: "rounded",
  },
  // opacity
  {
    regex: /^opacity-(0|5|10|20|25|30|40|50|60|70|75|80|90|95|100)$/,
    generator: generateOpacityTranslation,
    classNamePrefix: "opacity-",
  },
  // flex
  {
    regex: /^(flex-(1|auto|initial|none)|grow(-0)?|shrink(-0)?|basis-(0|px|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96))$/,
    generator: generateFlexTranslation,
    classNamePrefix: "",
  },
  // grid
  {
    regex: /^grid-cols-(\d{1,2})$|^grid-rows-(\d)$|^col-span-(\d{1,2})$|^row-span-(\d)$|^gap-(0|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)$|^gap-x-(0|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)$|^gap-y-(0|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)$/,
    generator: generateGridTranslation,
    classNamePrefix: "",
  },
  // order
  {
    regex: /^order-(\d{1,2})$|^order-(first|last|none)$/,
    generator: generateOrderTranslation,
    classNamePrefix: "order-",
  },
  // aspect
  {
    regex: /^aspect-(auto|square|video)$/,
    generator: generateAspectTranslation,
    classNamePrefix: "aspect-",
  },
  // 他の動的ジェネレータ設定を追加する場合はここに記述
]; 