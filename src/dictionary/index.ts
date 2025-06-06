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

import {
  generateTextSizeTranslation,
  fontSizeData,
} from "./generators/text-size-generator";
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
import {
  generateScaleTranslation,
  generateRotateTranslation,
  generateTranslateTranslation,
  generateSkewTranslation,
} from "./generators/transform-generator";
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
    regex: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)\/(\d+)$/,
    generator: (className, matchResult) => {
      const sizeKey = matchResult[1];
      const lineKey = matchResult[2];
      const fontSizeData =
        require("./generators/text-size-generator").fontSizeData;
      const sizeInfo = fontSizeData[sizeKey];
      const lineHeightMap = {
        "3": ".75rem",
        "4": "1rem",
        "5": "1.25rem",
        "6": "1.5rem",
        "7": "1.75rem",
        "8": "2rem",
        "9": "2.25rem",
        "10": "2.5rem",
      };
      const fontSize = sizeInfo?.fontSize || "";
      const fontSizePx = sizeInfo?.fontSizePx || "";
      const lineHeight =
        lineHeightMap[lineKey as keyof typeof lineHeightMap] || "";
      if (!fontSize || !lineHeight) return null;
      return {
        css: `font-size: ${fontSize}; /* ${fontSizePx} */\nline-height: ${lineHeight};`,
        description: `テキストサイズを${sizeKey} (${fontSize}/${fontSizePx})、行送りを${lineHeight}に設定します。`,
      };
    },
    classNamePrefix: "text-",
  },
  {
    regex:
      /^columns-((?:\d+)|(?:\d+\/\d+)|(?:3xs|2xs|xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl))$/,
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
    regex:
      /^(bg|text|border|divide|outline|ring|ring-offset|accent|caret|fill|stroke|placeholder|from|via|to)-(\w+)-(\d{2,3})$/,
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
    regex:
      /^(font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black|[1-9]00))$/,
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
    regex:
      /^(gap|gap-x|gap-y)-(0|px|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)$/,
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
    regex:
      /^rounded(?:-(none|sm|md|lg|xl|2xl|3xl|full))?$|^rounded-([trbl]|tl|tr|br|bl)(?:-(none|sm|md|lg|xl|2xl|3xl|full))?$/,
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
    regex:
      /^(flex-(1|auto|initial|none)|grow(-0)?|shrink(-0)?|basis-(0|px|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96))$/,
    generator: generateFlexTranslation,
    classNamePrefix: "",
  },
  // grid
  {
    regex:
      /^grid-cols-(\d{1,2})$|^grid-rows-(\d)$|^col-span-(\d{1,2})$|^row-span-(\d)$|^gap-(0|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)$|^gap-x-(0|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)$|^gap-y-(0|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)$/,
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
  {
    regex: /^text-\[#([0-9a-fA-F]{6,8})\]$/,
    generator: (className, matchResult) => {
      const hex = matchResult[1];
      return {
        css: `color: #${hex};`,
        description: `テキスト色を #${hex} に設定します。`,
      };
    },
    classNamePrefix: "text-",
  },
  // underline-offset-{数値} 動的対応
  {
    regex: /^underline-offset-(auto|from-font|\d+)$/,
    generator: (className, matchResult) => {
      const value = matchResult[1];
      let css = "";
      let description = "";
      if (value === "auto") {
        css = "text-underline-offset: auto;";
        description = "下線のオフセットを自動にします。";
      } else if (value === "from-font") {
        css = "text-underline-offset: from-font;";
        description = "下線のオフセットをフォントから取得します。";
      } else {
        css = `text-underline-offset: ${value}px;`;
        description = `下線のオフセットを${value}pxにします。`;
      }
      return { css, description };
    },
    classNamePrefix: "underline-offset-",
  },
  // space-x, space-y, -space-x, -space-y 動的対応
  {
    regex: /^(-)?space-(x|y)-([\d.]+|px)$/, // 例: space-x-2, -space-y-4
    generator: (className, matchResult) => {
      const minus = matchResult[1] ? "-" : "";
      const axis = matchResult[2];
      const value = matchResult[3];
      let css = "";
      let description = "";
      if (axis === "x") {
        css = `margin-left: ${minus}${
          value === "px" ? "1px" : value + (value.includes(".") ? "rem" : "rem")
        };`;
        description = `子要素の水平方向の間隔を${minus}${
          value === "px" ? "1px" : value + "rem"
        }にします。`;
      } else {
        css = `margin-top: ${minus}${
          value === "px" ? "1px" : value + (value.includes(".") ? "rem" : "rem")
        };`;
        description = `子要素の垂直方向の間隔を${minus}${
          value === "px" ? "1px" : value + "rem"
        }にします。`;
      }
      return { css, description };
    },
    classNamePrefix: "space-",
  },
  // place-content, place-items, place-self 動的対応
  {
    regex:
      /^place-(content|items|self)-(start|end|center|between|around|evenly|stretch|auto)$/, // 例: place-content-center
    generator: (className, matchResult) => {
      const type = matchResult[1];
      const value = matchResult[2];
      let css = "";
      let description = "";
      if (type === "content") {
        css = `place-content: ${value};`;
        description = `グリッドやフレックスのコンテント配置を${value}にします。`;
      } else if (type === "items") {
        css = `place-items: ${value};`;
        description = `グリッドやフレックスのアイテム配置を${value}にします。`;
      } else {
        css = `place-self: ${value};`;
        description = `グリッドやフレックスの自身の配置を${value}にします。`;
      }
      return { css, description };
    },
    classNamePrefix: "place-",
  },
  // justify-items, justify-self 動的対応
  {
    regex: /^justify-items-(start|end|center|stretch)$/, // 例: justify-items-center
    generator: (className, matchResult) => {
      const value = matchResult[1];
      return {
        css: `justify-items: ${value};`,
        description: `グリッドやフレックスのアイテムの水平方向配置を${value}にします。`,
      };
    },
    classNamePrefix: "justify-items-",
  },
  {
    regex: /^justify-self-(auto|start|end|center|stretch)$/, // 例: justify-self-end
    generator: (className, matchResult) => {
      const value = matchResult[1];
      return {
        css: `justify-self: ${value};`,
        description: `グリッドやフレックスの自身の水平方向配置を${value}にします。`,
      };
    },
    classNamePrefix: "justify-self-",
  },
  // mask-〇 動的対応
  {
    regex:
      /^mask(?:-(none|squircle|circle|hex|star|decagon|pentagon|diamond|heart|parallelogram(?:-\d+)?))?$/,
    generator: (className, matchResult) => {
      const value = matchResult[1] || "";
      let css = "";
      let description = "";
      switch (value) {
        case "":
          css = "mask: var(--tw-mask);";
          description = "マスク（クリップパス）を適用します。";
          break;
        case "none":
          css = "mask: none;";
          description = "マスク（クリップパス）を解除します。";
          break;
        default:
          css = `mask: var(--tw-mask-${value});`;
          description = `「${value}」型のマスク（クリップパス）を適用します。`;
          break;
      }
      return { css, description };
    },
    classNamePrefix: "mask",
  },
  // mask-clip 動的対応
  {
    regex: /^mask-clip-(border|padding|content|text)$/, // 例: mask-clip-border
    generator: (className, matchResult) => {
      const value = matchResult[1];
      return {
        css: `mask-clip: ${value};`,
        description: `マスクのクリップ範囲を${value}にします。`,
      };
    },
    classNamePrefix: "mask-clip-",
  },
  // mask-composite 動的対応
  {
    regex: /^mask-composite-(add|subtract|intersect|exclude)$/, // 例: mask-composite-add
    generator: (className, matchResult) => {
      const value = matchResult[1];
      return {
        css: `mask-composite: ${value};`,
        description: `マスクの合成方法を${value}にします。`,
      };
    },
    classNamePrefix: "mask-composite-",
  },
  // mask-image 動的対応
  {
    regex: /^mask-image-(none|url\(.+\))$/, // 例: mask-image-none, mask-image-url(...)
    generator: (className, matchResult) => {
      const value = matchResult[1];
      return {
        css: `mask-image: ${value};`,
        description: `マスク画像を${value}にします。`,
      };
    },
    classNamePrefix: "mask-image-",
  },
  // mask-mode 動的対応
  {
    regex: /^mask-mode-(match-source|luminance|alpha)$/, // 例: mask-mode-luminance
    generator: (className, matchResult) => {
      const value = matchResult[1];
      return {
        css: `mask-mode: ${value};`,
        description: `マスクモードを${value}にします。`,
      };
    },
    classNamePrefix: "mask-mode-",
  },
  // mask-origin 動的対応
  {
    regex: /^mask-origin-(border|padding|content)$/, // 例: mask-origin-border
    generator: (className, matchResult) => {
      const value = matchResult[1];
      return {
        css: `mask-origin: ${value}-box;`,
        description: `マスクの原点を${value}-boxにします。`,
      };
    },
    classNamePrefix: "mask-origin-",
  },
  // mask-position 動的対応
  {
    regex: /^mask-position-(.+)$/, // 例: mask-position-center, mask-position-10px_20px
    generator: (className, matchResult) => {
      const value = matchResult[1].replace(/_/g, " ");
      return {
        css: `mask-position: ${value};`,
        description: `マスクの位置を${value}にします。`,
      };
    },
    classNamePrefix: "mask-position-",
  },
  // mask-repeat 動的対応
  {
    regex: /^mask-repeat-(no-repeat|repeat|repeat-x|repeat-y|space|round)$/, // 例: mask-repeat-no-repeat
    generator: (className, matchResult) => {
      const value = matchResult[1];
      return {
        css: `mask-repeat: ${value};`,
        description: `マスクの繰り返し方法を${value}にします。`,
      };
    },
    classNamePrefix: "mask-repeat-",
  },
  // mask-size 動的対応
  {
    regex: /^mask-size-(auto|cover|contain|\d+(px|rem|%)?)$/, // 例: mask-size-cover, mask-size-100px
    generator: (className, matchResult) => {
      const value = matchResult[1];
      return {
        css: `mask-size: ${value};`,
        description: `マスクのサイズを${value}にします。`,
      };
    },
    classNamePrefix: "mask-size-",
  },
  // mask-type 動的対応
  {
    regex: /^mask-type-(luminance|alpha)$/, // 例: mask-type-luminance
    generator: (className, matchResult) => {
      const value = matchResult[1];
      return {
        css: `mask-type: ${value};`,
        description: `マスクタイプを${value}にします。`,
      };
    },
    classNamePrefix: "mask-type-",
  },
  // fill 動的対応
  {
    regex: /^fill-(none|current|inherit|#[0-9a-fA-F]{3,8}|[a-zA-Z0-9\-]+)$/,
    generator: (className, matchResult) => {
      const value = matchResult[1];
      let css = "";
      let description = "";
      if (value === "none" || value === "current" || value === "inherit") {
        css = `fill: ${value};`;
        description = `SVGの塗りつぶし色を${value}にします。`;
      } else if (value.startsWith("#")) {
        css = `fill: ${value};`;
        description = `SVGの塗りつぶし色を${value}にします。`;
      } else {
        css = `fill: var(--tw-fill-${value});`;
        description = `SVGの塗りつぶし色を${value}にします。`;
      }
      return { css, description };
    },
    classNamePrefix: "fill-",
  },
  // stroke 動的対応
  {
    regex: /^stroke-(none|current|inherit|#[0-9a-fA-F]{3,8}|[a-zA-Z0-9\-]+)$/,
    generator: (className, matchResult) => {
      const value = matchResult[1];
      let css = "";
      let description = "";
      if (value === "none" || value === "current" || value === "inherit") {
        css = `stroke: ${value};`;
        description = `SVGの線の色を${value}にします。`;
      } else if (value.startsWith("#")) {
        css = `stroke: ${value};`;
        description = `SVGの線の色を${value}にします。`;
      } else {
        css = `stroke: var(--tw-stroke-${value});`;
        description = `SVGの線の色を${value}にします。`;
      }
      return { css, description };
    },
    classNamePrefix: "stroke-",
  },
  // stroke-width 動的対応
  {
    regex: /^stroke-(0|1|2)$/,
    generator: (className, matchResult) => {
      const value = matchResult[1];
      return {
        css: `stroke-width: ${value};`,
        description: `SVGの線の太さを${value}にします。`,
      };
    },
    classNamePrefix: "stroke-",
  },
  // clear-* 動的対応
  {
    regex: /^clear-(left|right|both|start|end|none)$/,
    generator: (className, matchResult) => {
      const value = matchResult[1];
      let css = "";
      let description = "";
      switch (value) {
        case "left":
          css = "clear: left;";
          description =
            "左に浮かせた（float: left;）要素の直後で改行し、その下にこの要素を配置します。";
          break;
        case "right":
          css = "clear: right;";
          description =
            "右に浮かせた（float: right;）要素の直後で改行し、その下にこの要素を配置します。";
          break;
        case "both":
          css = "clear: both;";
          description =
            "左右どちらかに浮かせた要素の直後で改行し、その下にこの要素を配置します。";
          break;
        case "start":
          css = "clear: inline-start;";
          description =
            "インライン開始側（左→右書字なら左）のフロート要素の直後で改行し、その下にこの要素を配置します。";
          break;
        case "end":
          css = "clear: inline-end;";
          description =
            "インライン終了側（左→右書字なら右）のフロート要素の直後で改行し、その下にこの要素を配置します。";
          break;
        case "none":
          css = "clear: none;";
          description =
            "フロート解除を行わず、通常のレイアウトのままにします。";
          break;
      }
      return { css, description };
    },
    classNamePrefix: "clear-",
  },
  // 他の動的ジェネレータ設定を追加する場合はここに記述
];
