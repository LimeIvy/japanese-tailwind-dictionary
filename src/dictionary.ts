/**
 * 単一の翻訳エントリを表す型。
 * CSSスニペットとその日本語説明を持ちます。
 */
export interface TranslationEntry {
  css: string;
  description: string;
}

/**
 * フォントサイズに関する詳細情報。
 * fontSizeDataの各エントリで使用されます。
 */
export interface FontSizeDetail {
  fontSize: string;    // 例: "1.875rem"
  fontSizePx: string;  // 例: "30px"
  lineHeight: string;  // 例: "2.25rem" または "1.2" (単位なしの場合)
}

/**
 * CSSクラス名に基づいて動的に翻訳エントリを生成する関数の型。
 * @param className マッチしたCSSクラス名。
 * @param matchResult クラス名が正規表現にマッチした結果。
 * @param dataItem (任意) マッチしたキーに対応するデータアイテム（例: FontSizeDetailオブジェクト）。
 * @returns 生成されたTranslationEntry、または該当なしの場合はnull。
 */
export type TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray,
  dataItem?: any
) => TranslationEntry | null;

/**
 * 動的翻訳ジェネレータの設定オブジェクトの型。
 */
export interface DynamicGeneratorConfig {
  /** 処理対象のクラス名にマッチする正規表現。 */
  regex: RegExp;
  /** 翻訳エントリを生成する関数。 */
  generator: TranslationGenerator;
  /**
   * (逆引き検索用) このジェネレータが処理するデータキーの配列。
   * 例: Object.keys(fontSizeData)
   */
  dataKeys?: string[];
  /**
   * (逆引き検索及びジェネレータ用) このジェネレータが使用するデータマップ。
   * 例: fontSizeData
   */
  dataMap?: Record<string, any>;
  /**
   * (逆引き検索用) dataKeysからクラス名を再構築するための接頭辞。
   * 例: "text-"
   */
  classNamePrefix?: string;
  /**
   * (逆引き検索用) dataKeysからクラス名を再構築するための接尾辞 (任意)。
   */
  classNameSuffix?: string;
}

/**
 * 静的なTailwind CSSクラス名とその翻訳情報の辞書。
 * キー: CSSクラス名 (例: "items-center")
 * 値: TranslationEntryオブジェクト
 */
export const tailwindClassTranslations: Record<string, TranslationEntry> = {
  "items-center": {
    css: "align-items: center;",
    description: "要素をコンテナの交差軸方向の中央に配置します。"
  },
  "w-full": {
    css: "width: 100%;",
    description: "幅を100%に設定します。"
  },
  "flex": {
    css: "display: flex;",
    description: "フレックスコンテナを作成します。"
  },
  // ... 他に必要な静的定義を追加
};

/**
 * フォントサイズに関する情報マッピング。
 * text-(size) のような動的クラスの翻訳生成に使用します。
 * キー: サイズ識別子 (例: "xs", "2xl")
 * 値: FontSizeDetailオブジェクト
 */
export const fontSizeData: Record<string, FontSizeDetail> = {
  'xs':   { fontSize: '0.75rem',  fontSizePx: '12px', lineHeight: '1rem' },
  'sm':   { fontSize: '0.875rem', fontSizePx: '14px', lineHeight: '1.25rem' },
  'base': { fontSize: '1rem',     fontSizePx: '16px', lineHeight: '1.5rem' },
  'lg':   { fontSize: '1.125rem', fontSizePx: '18px', lineHeight: '1.75rem' },
  'xl':   { fontSize: '1.25rem',  fontSizePx: '20px', lineHeight: '1.75rem' },
  '2xl':  { fontSize: '1.5rem',   fontSizePx: '24px', lineHeight: '2rem' },
  '3xl':  { fontSize: '1.875rem', fontSizePx: '30px', lineHeight: '2.25rem' },
  '4xl':  { fontSize: '2.25rem',  fontSizePx: '36px', lineHeight: '2.5rem' },
  '5xl':  { fontSize: '3rem',     fontSizePx: '48px', lineHeight: '1' },
  '6xl':  { fontSize: '3.75rem',  fontSizePx: '60px', lineHeight: '1' },
  '7xl':  { fontSize: '4.5rem',   fontSizePx: '72px', lineHeight: '1' },
  '8xl':  { fontSize: '6rem',     fontSizePx: '96px', lineHeight: '1' },
  '9xl':  { fontSize: '8rem',     fontSizePx: '128px', lineHeight: '1' },
};

/**
 * text-(size) クラスのための翻訳ジェネレータ関数。
 */
const generateTextSizeTranslation: TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray,
  dataItem?: FontSizeDetail
): TranslationEntry | null => {
  const sizeInfo = dataItem || fontSizeData[matchResult[1]];
  if (!sizeInfo) {
    console.warn(`[generateTextSizeTranslation] No size data found for key: ${matchResult[1]}`);
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
    } else if (sizeInfo.lineHeight.endsWith('rem') || sizeInfo.lineHeight.endsWith('em')) {
      const ratio = lhVal / fsVal;
      lineHeightValueComment = `calc(${sizeInfo.lineHeight} / ${sizeInfo.fontSize}) \u2248 ${ratio.toFixed(4)}`;
    }
  }
  const cssOutput =
`.${className} {
  font-size: ${fontSizeVar} /* ${fontSizeValueComment} */;
  line-height: var(--tw-leading, ${lineHeightVar} /* ${lineHeightValueComment} */);
}`;
  const description = `テキストサイズを ${matchResult[1].toUpperCase()} (${sizeInfo.fontSize} / ${sizeInfo.fontSizePx}) に設定し、行送りを調整します。`;
  return { css: cssOutput, description };
};

/**
 * 動的翻訳ジェネレータの設定リスト。
 * 拡張機能は、このリストを基にクラス名を処理します。
 */
export const dynamicTranslationGenerators: DynamicGeneratorConfig[] = [
  {
    regex: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/,
    generator: generateTextSizeTranslation,
    dataKeys: Object.keys(fontSizeData),
    dataMap: fontSizeData,
    classNamePrefix: 'text-',
  },
  // 他の動的ジェネレータ設定を追加する場合はここに記述
]; 