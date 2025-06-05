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
  fontSize: string; // 例: "1.875rem"
  fontSizePx: string; // 例: "30px"
  lineHeight: string; // 例: "2.25rem" または "1.2" (単位なしの場合)
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
    description: "要素をコンテナの交差軸方向の中央に配置します。",
  },
  "w-full": {
    css: "width: 100%;",
    description: "幅を100%に設定します。",
  },
  flex: {
    css: "display: flex;",
    description: "フレックスコンテナを作成します。",
  },
  "aspect-auto": {
    css: "aspect-ratio: auto;",
    description: "要素のアスペクト比を自動に設定します。",
  },
  "aspect-square": {
    css: "aspect-ratio: 1 / 1;",
    description: "要素のアスペクト比を1:1（正方形）に設定します。",
  },
  "aspect-video": {
    css: "aspect-ratio: 16 / 9;",
    description: "要素のアスペクト比を16:9（ビデオ比率）に設定します。",
  },
  block: {
    css: "display: block;",
    description: "要素をブロック要素として表示します。",
  },
  "inline-block": {
    css: "display: inline-block;",
    description: "要素をインラインブロック要素として表示します。",
  },
  inline: {
    css: "display: inline;",
    description: "要素をインライン要素として表示します。",
  },
  hidden: {
    css: "display: none;",
    description: "要素を非表示にします。",
  },
  "float-right": {
    css: "float: right;",
    description: "要素を右にフロートさせます。",
  },
  "float-left": {
    css: "float: left;",
    description: "要素を左にフロートさせます。",
  },
  "float-none": {
    css: "float: none;",
    description: "要素のフロートを解除します。",
  },
  "clear-left": {
    css: "clear: left;",
    description: "左側のフロートを解除します。",
  },
  "clear-right": {
    css: "clear: right;",
    description: "右側のフロートを解除します。",
  },
  "clear-both": {
    css: "clear: both;",
    description: "両側のフロートを解除します。",
  },
  "clear-none": {
    css: "clear: none;",
    description: "フロート解除を行いません。",
  },
  "object-contain": {
    css: "object-fit: contain;",
    description: "画像や動画を要素内に収めて表示します。",
  },
  "object-cover": {
    css: "object-fit: cover;",
    description: "画像や動画を要素全体にカバーするように表示します。",
  },
  "object-fill": {
    css: "object-fit: fill;",
    description: "画像や動画を要素のサイズに合わせて引き伸ばします。",
  },
  "object-none": {
    css: "object-fit: none;",
    description: "画像や動画のサイズを変更せずに表示します。",
  },
  "object-scale-down": {
    css: "object-fit: scale-down;",
    description: "containまたはnoneのいずれか小さい方で表示します。",
  },
  "overflow-auto": {
    css: "overflow: auto;",
    description: "必要に応じてスクロールバーを表示します。",
  },
  "overflow-hidden": {
    css: "overflow: hidden;",
    description: "オーバーフローした内容を非表示にします。",
  },
  "overflow-visible": {
    css: "overflow: visible;",
    description: "オーバーフローした内容を表示します。",
  },
  "overflow-scroll": {
    css: "overflow: scroll;",
    description: "常にスクロールバーを表示します。",
  },
  fixed: {
    css: "position: fixed;",
    description: "要素をビューポートに固定します。",
  },
  absolute: {
    css: "position: absolute;",
    description: "要素を絶対位置に配置します。",
  },
  relative: {
    css: "position: relative;",
    description: "要素を相対位置に配置します。",
  },
  sticky: {
    css: "position: sticky;",
    description: "要素をスクロールに応じて固定します。",
  },
  "inline-table": {
    css: "display: inline-table;",
    description: "要素をインラインテーブルとして表示します。",
  },
  "table-caption": {
    css: "display: table-caption;",
    description: "要素をテーブルキャプションとして表示します。",
  },
  "table-cell": {
    css: "display: table-cell;",
    description: "要素をテーブルセルとして表示します。",
  },
  "table-column": {
    css: "display: table-column;",
    description: "要素をテーブルカラムとして表示します。",
  },
  "table-column-group": {
    css: "display: table-column-group;",
    description: "要素をテーブルカラムグループとして表示します。",
  },
  "table-footer-group": {
    css: "display: table-footer-group;",
    description: "要素をテーブルフッターグループとして表示します。",
  },
  "table-header-group": {
    css: "display: table-header-group;",
    description: "要素をテーブルヘッダーグループとして表示します。",
  },
  "table-row-group": {
    css: "display: table-row-group;",
    description: "要素をテーブル行グループとして表示します。",
  },
  "table-row": {
    css: "display: table-row;",
    description: "要素をテーブル行として表示します。",
  },
  "flow-root": {
    css: "display: flow-root;",
    description:
      "要素を新しいブロックフォーマッティングコンテキストとして表示します。",
  },
  grid: {
    css: "display: grid;",
    description: "要素をグリッドコンテナとして表示します。",
  },
  "inline-grid": {
    css: "display: inline-grid;",
    description: "要素をインライングリッドコンテナとして表示します。",
  },
  contents: {
    css: "display: contents;",
    description: "要素自体を表示せず、子要素のみを表示します。",
  },
  "list-item": {
    css: "display: list-item;",
    description: "要素をリストアイテムとして表示します。",
  },
  isolate: {
    css: "isolation: isolate;",
    description: "要素を独立したスタッキングコンテキストにします。",
  },
  "isolate-auto": {
    css: "isolation: auto;",
    description: "isolationプロパティをautoにします。",
  },
  "isolation-isolate": {
    css: "isolation: isolate;",
    description: "isolationプロパティをisolateにします。",
  },
  "will-change-auto": {
    css: "will-change: auto;",
    description: "will-changeプロパティをautoにします。",
  },
  "will-change-scroll": {
    css: "will-change: scroll-position;",
    description: "will-changeプロパティをscroll-positionにします。",
  },
  "will-change-contents": {
    css: "will-change: contents;",
    description: "will-changeプロパティをcontentsにします。",
  },
  "will-change-transform": {
    css: "will-change: transform;",
    description: "will-changeプロパティをtransformにします。",
  },
  "appearance-none": {
    css: "appearance: none;",
    description: "デフォルトのブラウザスタイルを無効にします。",
  },
  "outline-none": {
    css: "outline: none;",
    description: "アウトラインを非表示にします。",
  },
  outline: {
    css: "outline: 2px solid #000;",
    description: "2pxの黒いアウトラインを表示します。",
  },
  "outline-white": {
    css: "outline: 2px solid #fff;",
    description: "2pxの白いアウトラインを表示します。",
  },
  "outline-black": {
    css: "outline: 2px solid #000;",
    description: "2pxの黒いアウトラインを表示します。",
  },
  "box-decoration-slice": {
    css: "box-decoration-break: slice;",
    description: "ボックス装飾をスライスします。",
  },
  "box-decoration-clone": {
    css: "box-decoration-break: clone;",
    description: "ボックス装飾をクローンします。",
  },
  "break-normal": {
    css: "overflow-wrap: normal; word-break: normal;",
    description: "通常の改行動作にします。",
  },
  "break-words": {
    css: "overflow-wrap: break-word;",
    description: "単語の途中で改行します。",
  },
  "break-all": {
    css: "word-break: break-all;",
    description: "すべての文字で改行します。",
  },
  "whitespace-normal": {
    css: "white-space: normal;",
    description: "通常の空白処理にします。",
  },
  "whitespace-nowrap": {
    css: "white-space: nowrap;",
    description: "折り返しを無効にします。",
  },
  "whitespace-pre": {
    css: "white-space: pre;",
    description: "空白と改行をそのまま表示します。",
  },
  "whitespace-pre-line": {
    css: "white-space: pre-line;",
    description: "空白は詰め、改行はそのまま表示します。",
  },
  "whitespace-pre-wrap": {
    css: "white-space: pre-wrap;",
    description: "空白と改行をそのまま表示し、折り返しも有効にします。",
  },
  "scroll-auto": {
    css: "scroll-behavior: auto;",
    description: "スクロール動作を自動にします。",
  },
  "scroll-smooth": {
    css: "scroll-behavior: smooth;",
    description: "スムーズスクロールを有効にします。",
  },
  "snap-none": {
    css: "scroll-snap-type: none;",
    description: "スナップスクロールを無効にします。",
  },
  "snap-x": {
    css: "scroll-snap-type: x mandatory;",
    description: "水平方向のスナップスクロールを有効にします。",
  },
  "snap-y": {
    css: "scroll-snap-type: y mandatory;",
    description: "垂直方向のスナップスクロールを有効にします。",
  },
  "snap-both": {
    css: "scroll-snap-type: both mandatory;",
    description: "両方向のスナップスクロールを有効にします。",
  },
  "snap-mandatory": {
    css: "scroll-snap-type: mandatory;",
    description: "スナップスクロールを必須にします。",
  },
  "snap-proximity": {
    css: "scroll-snap-type: proximity;",
    description: "スナップスクロールを近接時のみ有効にします。",
  },
  "touch-auto": {
    css: "touch-action: auto;",
    description: "タッチ操作を自動にします。",
  },
  "touch-none": {
    css: "touch-action: none;",
    description: "タッチ操作を無効にします。",
  },
  "touch-pan-x": {
    css: "touch-action: pan-x;",
    description: "水平方向のパン操作のみ許可します。",
  },
  "touch-pan-y": {
    css: "touch-action: pan-y;",
    description: "垂直方向のパン操作のみ許可します。",
  },
  "select-none": {
    css: "user-select: none;",
    description: "テキスト選択を無効にします。",
  },
  "select-text": {
    css: "user-select: text;",
    description: "テキスト選択を有効にします。",
  },
  "select-all": {
    css: "user-select: all;",
    description: "要素全体を選択します。",
  },
  "select-auto": {
    css: "user-select: auto;",
    description: "テキスト選択を自動にします。",
  },
  "accent-auto": {
    css: "accent-color: auto;",
    description: "アクセントカラーを自動にします。",
  },
  "accent-inherit": {
    css: "accent-color: inherit;",
    description: "アクセントカラーを継承します。",
  },
  "accent-current": {
    css: "accent-color: currentColor;",
    description: "アクセントカラーをcurrentColorにします。",
  },
  "accent-transparent": {
    css: "accent-color: transparent;",
    description: "アクセントカラーを透明にします。",
  },
  "accent-black": {
    css: "accent-color: #000;",
    description: "アクセントカラーを黒にします。",
  },
  "accent-white": {
    css: "accent-color: #fff;",
    description: "アクセントカラーを白にします。",
  },
  "caret-transparent": {
    css: "caret-color: transparent;",
    description: "キャレット（カーソル）の色を透明にします。",
  },
  "caret-current": {
    css: "caret-color: currentColor;",
    description: "キャレット（カーソル）の色をcurrentColorにします。",
  },
  "caret-black": {
    css: "caret-color: #000;",
    description: "キャレット（カーソル）の色を黒にします。",
  },
  "caret-white": {
    css: "caret-color: #fff;",
    description: "キャレット（カーソル）の色を白にします。",
  },
  "placeholder-transparent": {
    css: "color: transparent;",
    description: "プレースホルダーの色を透明にします。",
  },
  "placeholder-current": {
    css: "color: currentColor;",
    description: "プレースホルダーの色をcurrentColorにします。",
  },
  "placeholder-black": {
    css: "color: #000;",
    description: "プレースホルダーの色を黒にします。",
  },
  "placeholder-white": {
    css: "color: #fff;",
    description: "プレースホルダーの色を白にします。",
  },
  "object-bottom": {
    css: "object-position: bottom;",
    description: "画像や動画の表示位置を下に揃えます。",
  },
  "object-center": {
    css: "object-position: center;",
    description: "画像や動画の表示位置を中央に揃えます。",
  },
  "object-left": {
    css: "object-position: left;",
    description: "画像や動画の表示位置を左に揃えます。",
  },
  "object-left-bottom": {
    css: "object-position: left bottom;",
    description: "画像や動画の表示位置を左下に揃えます。",
  },
  "object-left-top": {
    css: "object-position: left top;",
    description: "画像や動画の表示位置を左上に揃えます。",
  },
  "object-right": {
    css: "object-position: right;",
    description: "画像や動画の表示位置を右に揃えます。",
  },
  "object-right-bottom": {
    css: "object-position: right bottom;",
    description: "画像や動画の表示位置を右下に揃えます。",
  },
  "object-right-top": {
    css: "object-position: right top;",
    description: "画像や動画の表示位置を右上に揃えます。",
  },
  "object-top": {
    css: "object-position: top;",
    description: "画像や動画の表示位置を上に揃えます。",
  },
  "overflow-x-auto": {
    css: "overflow-x: auto;",
    description: "横方向のオーバーフロー時にスクロールバーを自動表示します。",
  },
  "overflow-y-auto": {
    css: "overflow-y: auto;",
    description: "縦方向のオーバーフロー時にスクロールバーを自動表示します。",
  },
  "overflow-x-hidden": {
    css: "overflow-x: hidden;",
    description: "横方向のオーバーフローを非表示にします。",
  },
  "overflow-y-hidden": {
    css: "overflow-y: hidden;",
    description: "縦方向のオーバーフローを非表示にします。",
  },
  "overflow-x-visible": {
    css: "overflow-x: visible;",
    description: "横方向のオーバーフローを表示します。",
  },
  "overflow-y-visible": {
    css: "overflow-y: visible;",
    description: "縦方向のオーバーフローを表示します。",
  },
  "overflow-x-scroll": {
    css: "overflow-x: scroll;",
    description: "横方向に常にスクロールバーを表示します。",
  },
  "overflow-y-scroll": {
    css: "overflow-y: scroll;",
    description: "縦方向に常にスクロールバーを表示します。",
  },
  "overscroll-auto": {
    css: "overscroll-behavior: auto;",
    description: "オーバースクロール時の挙動を自動にします。",
  },
  "overscroll-y-auto": {
    css: "overscroll-behavior-y: auto;",
    description: "縦方向のオーバースクロール時の挙動を自動にします。",
  },
  "overscroll-x-auto": {
    css: "overscroll-behavior-x: auto;",
    description: "横方向のオーバースクロール時の挙動を自動にします。",
  },
  "overscroll-contain": {
    css: "overscroll-behavior: contain;",
    description: "オーバースクロール時にスクロールを親要素に伝播しません。",
  },
  "overscroll-y-contain": {
    css: "overscroll-behavior-y: contain;",
    description:
      "縦方向のオーバースクロール時にスクロールを親要素に伝播しません。",
  },
  "overscroll-x-contain": {
    css: "overscroll-behavior-x: contain;",
    description:
      "横方向のオーバースクロール時にスクロールを親要素に伝播しません。",
  },
  "overscroll-none": {
    css: "overscroll-behavior: none;",
    description: "オーバースクロール時の伝播を完全に無効化します。",
  },
  "overscroll-y-none": {
    css: "overscroll-behavior-y: none;",
    description: "縦方向のオーバースクロール時の伝播を完全に無効化します。",
  },
  "overscroll-x-none": {
    css: "overscroll-behavior-x: none;",
    description: "横方向のオーバースクロール時の伝播を完全に無効化します。",
  },
  "columns-auto": {
    css: "columns: auto;",
    description: "カラム数を自動で決定します。",
  },
  "columns-3xs": {
    css: "columns: 16rem;",
    description: "カラム幅を16remに設定します。",
  },
  "columns-2xs": {
    css: "columns: 18rem;",
    description: "カラム幅を18remに設定します。",
  },
  "columns-xs": {
    css: "columns: 20rem;",
    description: "カラム幅を20remに設定します。",
  },
  "columns-sm": {
    css: "columns: 24rem;",
    description: "カラム幅を24remに設定します。",
  },
  "columns-md": {
    css: "columns: 28rem;",
    description: "カラム幅を28remに設定します。",
  },
  "columns-lg": {
    css: "columns: 32rem;",
    description: "カラム幅を32remに設定します。",
  },
  "columns-xl": {
    css: "columns: 36rem;",
    description: "カラム幅を36remに設定します。",
  },
  "columns-2xl": {
    css: "columns: 42rem;",
    description: "カラム幅を42remに設定します。",
  },
  "columns-3xl": {
    css: "columns: 48rem;",
    description: "カラム幅を48remに設定します。",
  },
  "columns-4xl": {
    css: "columns: 56rem;",
    description: "カラム幅を56remに設定します。",
  },
  "columns-5xl": {
    css: "columns: 64rem;",
    description: "カラム幅を64remに設定します。",
  },
  "columns-6xl": {
    css: "columns: 72rem;",
    description: "カラム幅を72remに設定します。",
  },
  "columns-7xl": {
    css: "columns: 80rem;",
    description: "カラム幅を80remに設定します。",
  },
  "break-after-auto": {
    css: "break-after: auto;",
    description: "自動で改ページやカラム分割を行います。",
  },
  "break-after-avoid": {
    css: "break-after: avoid;",
    description: "改ページやカラム分割を避けます。",
  },
  "break-after-all": {
    css: "break-after: all;",
    description: "すべての場所で改ページやカラム分割を行います。",
  },
  "break-after-avoid-page": {
    css: "break-after: avoid-page;",
    description: "ページ分割を避けます。",
  },
  "break-after-page": {
    css: "break-after: page;",
    description: "ページ分割を行います。",
  },
  "break-after-left": {
    css: "break-after: left;",
    description: "左ページで改ページします。",
  },
  "break-after-right": {
    css: "break-after: right;",
    description: "右ページで改ページします。",
  },
  "break-after-column": {
    css: "break-after: column;",
    description: "カラム分割を行います。",
  },
  "break-before-auto": {
    css: "break-before: auto;",
    description: "自動で改ページやカラム分割を行います。",
  },
  "break-before-avoid": {
    css: "break-before: avoid;",
    description: "改ページやカラム分割を避けます。",
  },
  "break-before-all": {
    css: "break-before: all;",
    description: "すべての場所で改ページやカラム分割を行います。",
  },
  "break-before-avoid-page": {
    css: "break-before: avoid-page;",
    description: "ページ分割を避けます。",
  },
  "break-before-page": {
    css: "break-before: page;",
    description: "ページ分割を行います。",
  },
  "break-before-left": {
    css: "break-before: left;",
    description: "左ページで改ページします。",
  },
  "break-before-right": {
    css: "break-before: right;",
    description: "右ページで改ページします。",
  },
  "break-before-column": {
    css: "break-before: column;",
    description: "カラム分割を行います。",
  },
  "break-inside-auto": {
    css: "break-inside: auto;",
    description: "自動で分割を行います。",
  },
  "break-inside-avoid": {
    css: "break-inside: avoid;",
    description: "分割を避けます。",
  },
  "break-inside-avoid-page": {
    css: "break-inside: avoid-page;",
    description: "ページ分割を避けます。",
  },
  "break-inside-column": {
    css: "break-inside: column;",
    description: "カラム分割を避けます。",
  },
  "decoration-slice": {
    css: "box-decoration-break: slice;",
    description: "ボックス装飾をスライスします。",
  },
  "decoration-clone": {
    css: "box-decoration-break: clone;",
    description: "ボックス装飾をクローンします。",
  },
  "box-border": {
    css: "box-sizing: border-box;",
    description: "ボックスサイズをborder-boxに設定します。",
  },
  "box-content": {
    css: "box-sizing: content-box;",
    description: "ボックスサイズをcontent-boxに設定します。",
  },
  "bg-cover": {
    css: "background-size: cover;",
    description: "背景画像を要素全体にカバーするように表示します。",
  },
  "bg-contain": {
    css: "background-size: contain;",
    description: "背景画像を要素内に収めて表示します。",
  },
  "bg-none": {
    css: "background: none;",
    description: "背景を表示しません。",
  },
  "bg-fixed": {
    css: "background-attachment: fixed;",
    description: "背景画像をビューポートに固定します。",
  },
  "bg-local": {
    css: "background-attachment: local;",
    description: "背景画像を要素のスクロールに合わせて移動します。",
  },
  "bg-scroll": {
    css: "background-attachment: scroll;",
    description: "背景画像を通常のスクロールに設定します。",
  },
  "bg-clip-border": {
    css: "background-clip: border-box;",
    description: "背景をボーダーまで表示します。",
  },
  "bg-clip-padding": {
    css: "background-clip: padding-box;",
    description: "背景をパディングまで表示します。",
  },
  "bg-clip-content": {
    css: "background-clip: content-box;",
    description: "背景をコンテンツまで表示します。",
  },
  "bg-clip-text": {
    css: "background-clip: text;",
    description: "背景をテキストでクリップします。",
  },
  "bg-center": {
    css: "background-position: center;",
    description: "背景画像を中央に配置します。",
  },
  "bg-top": {
    css: "background-position: top;",
    description: "背景画像を上に配置します。",
  },
  "bg-bottom": {
    css: "background-position: bottom;",
    description: "背景画像を下に配置します。",
  },
  "bg-left": {
    css: "background-position: left;",
    description: "背景画像を左に配置します。",
  },
  "bg-right": {
    css: "background-position: right;",
    description: "背景画像を右に配置します。",
  },
  "bg-repeat": {
    css: "background-repeat: repeat;",
    description: "背景画像を繰り返して表示します。",
  },
  "bg-no-repeat": {
    css: "background-repeat: no-repeat;",
    description: "背景画像を繰り返しません。",
  },
  "bg-repeat-x": {
    css: "background-repeat: repeat-x;",
    description: "背景画像を水平方向に繰り返します。",
  },
  "bg-repeat-y": {
    css: "background-repeat: repeat-y;",
    description: "背景画像を垂直方向に繰り返します。",
  },
  "bg-repeat-round": {
    css: "background-repeat: round;",
    description: "背景画像をちょうど収まるように繰り返します。",
  },
  "bg-repeat-space": {
    css: "background-repeat: space;",
    description: "背景画像の間にスペースを空けて繰り返します。",
  },
  "bg-auto": {
    css: "background-size: auto;",
    description: "背景画像のサイズを自動にします。",
  },
  "bg-origin-border": {
    css: "background-origin: border-box;",
    description: "背景画像の基準をボーダーにします。",
  },
  "bg-origin-padding": {
    css: "background-origin: padding-box;",
    description: "背景画像の基準をパディングにします。",
  },
  "bg-origin-content": {
    css: "background-origin: content-box;",
    description: "背景画像の基準をコンテンツにします。",
  },
  "bg-blend-normal": {
    css: "background-blend-mode: normal;",
    description: "背景のブレンドモードをnormalにします。",
  },
  "bg-blend-multiply": {
    css: "background-blend-mode: multiply;",
    description: "背景のブレンドモードをmultiplyにします。",
  },
  "bg-blend-screen": {
    css: "background-blend-mode: screen;",
    description: "背景のブレンドモードをscreenにします。",
  },
  "bg-blend-overlay": {
    css: "background-blend-mode: overlay;",
    description: "背景のブレンドモードをoverlayにします。",
  },
  "bg-blend-darken": {
    css: "background-blend-mode: darken;",
    description: "背景のブレンドモードをdarkenにします。",
  },
  "bg-blend-lighten": {
    css: "background-blend-mode: lighten;",
    description: "背景のブレンドモードをlightenにします。",
  },
  "bg-blend-color-dodge": {
    css: "background-blend-mode: color-dodge;",
    description: "背景のブレンドモードをcolor-dodgeにします。",
  },
  "bg-blend-color-burn": {
    css: "background-blend-mode: color-burn;",
    description: "背景のブレンドモードをcolor-burnにします。",
  },
  "bg-blend-hard-light": {
    css: "background-blend-mode: hard-light;",
    description: "背景のブレンドモードをhard-lightにします。",
  },
  "bg-blend-soft-light": {
    css: "background-blend-mode: soft-light;",
    description: "背景のブレンドモードをsoft-lightにします。",
  },
  "bg-blend-difference": {
    css: "background-blend-mode: difference;",
    description: "背景のブレンドモードをdifferenceにします。",
  },
  "bg-blend-exclusion": {
    css: "background-blend-mode: exclusion;",
    description: "背景のブレンドモードをexclusionにします。",
  },
  "bg-blend-hue": {
    css: "background-blend-mode: hue;",
    description: "背景のブレンドモードをhueにします。",
  },
  "bg-blend-saturation": {
    css: "background-blend-mode: saturation;",
    description: "背景のブレンドモードをsaturationにします。",
  },
  "bg-blend-color": {
    css: "background-blend-mode: color;",
    description: "背景のブレンドモードをcolorにします。",
  },
  "bg-blend-luminosity": {
    css: "background-blend-mode: luminosity;",
    description: "背景のブレンドモードをluminosityにします。",
  },
  "text-left": {
    css: "text-align: left;",
    description: "テキストを左揃えにします。",
  },
  "text-center": {
    css: "text-align: center;",
    description: "テキストを中央揃えにします。",
  },
  "text-right": {
    css: "text-align: right;",
    description: "テキストを右揃えにします。",
  },
  "text-justify": {
    css: "text-align: justify;",
    description: "テキストを両端揃えにします。",
  },
  "text-ellipsis": {
    css: "text-overflow: ellipsis;",
    description: "テキストがはみ出した場合に省略記号（...）を表示します。",
  },
  "text-clip": {
    css: "text-overflow: clip;",
    description: "テキストがはみ出した部分を切り捨てます。",
  },
  "text-nowrap": {
    css: "white-space: nowrap;",
    description: "テキストの折り返しを無効にします。",
  },
  "list-none": {
    css: "list-style-type: none;",
    description: "リストマーカーを表示しません。",
  },
  "list-disc": {
    css: "list-style-type: disc;",
    description: "リストマーカーを黒丸にします。",
  },
  "list-decimal": {
    css: "list-style-type: decimal;",
    description: "リストマーカーを数字にします。",
  },
  "list-inside": {
    css: "list-style-position: inside;",
    description: "リストマーカーをテキスト内側に表示します。",
  },
  "list-outside": {
    css: "list-style-position: outside;",
    description: "リストマーカーをテキスト外側に表示します。",
  },
  "align-baseline": {
    css: "vertical-align: baseline;",
    description: "要素をベースラインに揃えます。",
  },
  "align-top": {
    css: "vertical-align: top;",
    description: "要素を上端に揃えます。",
  },
  "align-middle": {
    css: "vertical-align: middle;",
    description: "要素を中央に揃えます。",
  },
  "align-bottom": {
    css: "vertical-align: bottom;",
    description: "要素を下端に揃えます。",
  },
  "align-text-top": {
    css: "vertical-align: text-top;",
    description: "要素をテキストの上端に揃えます。",
  },
  "align-text-bottom": {
    css: "vertical-align: text-bottom;",
    description: "要素をテキストの下端に揃えます。",
  },
  "justify-start": {
    css: "justify-content: flex-start;",
    description: "子要素を左（開始位置）に揃えます。",
  },
  "justify-end": {
    css: "justify-content: flex-end;",
    description: "子要素を右（終了位置）に揃えます。",
  },
  "justify-center": {
    css: "justify-content: center;",
    description: "子要素を中央に揃えます。",
  },
  "justify-between": {
    css: "justify-content: space-between;",
    description: "子要素の間に均等なスペースを配置します。",
  },
  "justify-around": {
    css: "justify-content: space-around;",
    description: "子要素の周囲に均等なスペースを配置します。",
  },
  "justify-evenly": {
    css: "justify-content: space-evenly;",
    description: "子要素の間隔を均等に配置します。",
  },
  "items-start": {
    css: "align-items: flex-start;",
    description: "子要素を上（開始位置）に揃えます。",
  },
  "items-end": {
    css: "align-items: flex-end;",
    description: "子要素を下（終了位置）に揃えます。",
  },
  "items-baseline": {
    css: "align-items: baseline;",
    description: "子要素をベースラインに揃えます。",
  },
  "items-stretch": {
    css: "align-items: stretch;",
    description: "子要素を伸ばして揃えます。",
  },
  "content-center": {
    css: "align-content: center;",
    description: "複数行の子要素を中央に揃えます。",
  },
  "content-start": {
    css: "align-content: flex-start;",
    description: "複数行の子要素を上（開始位置）に揃えます。",
  },
  "content-end": {
    css: "align-content: flex-end;",
    description: "複数行の子要素を下（終了位置）に揃えます。",
  },
  "content-between": {
    css: "align-content: space-between;",
    description: "複数行の子要素の間に均等なスペースを配置します。",
  },
  "content-around": {
    css: "align-content: space-around;",
    description: "複数行の子要素の周囲に均等なスペースを配置します。",
  },
  "content-evenly": {
    css: "align-content: space-evenly;",
    description: "複数行の子要素の間隔を均等に配置します。",
  },
  "self-auto": {
    css: "align-self: auto;",
    description: "自身の配置を自動にします。",
  },
  "self-start": {
    css: "align-self: flex-start;",
    description: "自身を上（開始位置）に揃えます。",
  },
  "self-end": {
    css: "align-self: flex-end;",
    description: "自身を下（終了位置）に揃えます。",
  },
  "self-center": {
    css: "align-self: center;",
    description: "自身を中央に揃えます。",
  },
  "self-stretch": {
    css: "align-self: stretch;",
    description: "自身を伸ばして揃えます。",
  },
  "flex-row": {
    css: "flex-direction: row;",
    description: "子要素を横並び（左→右）に配置します。",
  },
  "flex-row-reverse": {
    css: "flex-direction: row-reverse;",
    description: "子要素を横並び（右→左）に配置します。",
  },
  "flex-col": {
    css: "flex-direction: column;",
    description: "子要素を縦並び（上→下）に配置します。",
  },
  "flex-col-reverse": {
    css: "flex-direction: column-reverse;",
    description: "子要素を縦並び（下→上）に配置します。",
  },
  "flex-wrap": {
    css: "flex-wrap: wrap;",
    description: "子要素を折り返します。",
  },
  "flex-wrap-reverse": {
    css: "flex-wrap: wrap-reverse;",
    description: "子要素を逆方向に折り返します。",
  },
  "flex-nowrap": {
    css: "flex-wrap: nowrap;",
    description: "子要素を折り返しません。",
  },
  "gap-0": {
    css: "gap: 0;",
    description: "グリッドやフレックスの間隔を0にします。",
  },
  "gap-1": {
    css: "gap: 0.25rem;",
    description: "グリッドやフレックスの間隔を0.25remにします。",
  },
  "gap-2": {
    css: "gap: 0.5rem;",
    description: "グリッドやフレックスの間隔を0.5remにします。",
  },
  "gap-4": {
    css: "gap: 1rem;",
    description: "グリッドやフレックスの間隔を1remにします。",
  },
  "gap-8": {
    css: "gap: 2rem;",
    description: "グリッドやフレックスの間隔を2remにします。",
  },
  "order-first": {
    css: "order: -9999;",
    description: "要素を最初に表示します。",
  },
  "order-last": {
    css: "order: 9999;",
    description: "要素を最後に表示します。",
  },
  "order-none": {
    css: "order: 0;",
    description: "要素の順序をデフォルトにします。",
  },
  "order-1": {
    css: "order: 1;",
    description: "要素の順序を1にします。",
  },
  "order-2": {
    css: "order: 2;",
    description: "要素の順序を2にします。",
  },
  "order-3": {
    css: "order: 3;",
    description: "要素の順序を3にします。",
  },
  "order-4": {
    css: "order: 4;",
    description: "要素の順序を4にします。",
  },
  "order-5": {
    css: "order: 5;",
    description: "要素の順序を5にします。",
  },
  "order-6": {
    css: "order: 6;",
    description: "要素の順序を6にします。",
  },
  "order-7": {
    css: "order: 7;",
    description: "要素の順序を7にします。",
  },
  "order-8": {
    css: "order: 8;",
    description: "要素の順序を8にします。",
  },
  "order-9": {
    css: "order: 9;",
    description: "要素の順序を9にします。",
  },
  "order-10": {
    css: "order: 10;",
    description: "要素の順序を10にします。",
  },
  "order-11": {
    css: "order: 11;",
    description: "要素の順序を11にします。",
  },
  "order-12": {
    css: "order: 12;",
    description: "要素の順序を12にします。",
  },
  truncate: {
    css: "overflow: hidden;\ntext-overflow: ellipsis;\nwhite-space: nowrap;",
    description:
      "テキストがはみ出した場合に省略記号（...）を表示し、折り返しません。",
  },
  "sr-only": {
    css: "position: absolute;\nwidth: 1px;\nheight: 1px;\npadding: 0;\nmargin: -1px;\noverflow: hidden;\nclip: rect(0, 0, 0, 0);\nwhite-space: nowrap;\nborder-width: 0;",
    description:
      "画面には表示せず、スクリーンリーダーのみが読み取れるようにします。",
  },
  "not-sr-only": {
    css: "position: static;\nwidth: auto;\nheight: auto;\npadding: 0;\nmargin: 0;\noverflow: visible;\nclip: auto;\nwhite-space: normal;",
    description: "通常の表示に戻します。",
  },
  visible: {
    css: "visibility: visible;",
    description: "要素を表示します。",
  },
  invisible: {
    css: "visibility: hidden;",
    description: "要素を非表示にします。",
  },
  "pointer-events-none": {
    css: "pointer-events: none;",
    description: "要素へのポインターイベントを無効にします。",
  },
  "pointer-events-auto": {
    css: "pointer-events: auto;",
    description: "要素へのポインターイベントを自動にします。",
  },
  "cursor-pointer": {
    css: "cursor: pointer;",
    description: "ポインター（手のひら）カーソルを表示します。",
  },
  "cursor-default": {
    css: "cursor: default;",
    description: "デフォルトのカーソルを表示します。",
  },
  "cursor-wait": {
    css: "cursor: wait;",
    description: "待機中カーソルを表示します。",
  },
  "cursor-text": {
    css: "cursor: text;",
    description: "テキスト入力用カーソルを表示します。",
  },
  "cursor-move": {
    css: "cursor: move;",
    description: "移動用カーソルを表示します。",
  },
  "cursor-not-allowed": {
    css: "cursor: not-allowed;",
    description: "操作不可カーソルを表示します。",
  },
  resize: {
    css: "resize: both;",
    description: "要素のリサイズを有効にします。",
  },
  "resize-none": {
    css: "resize: none;",
    description: "要素のリサイズを無効にします。",
  },
  "resize-x": {
    css: "resize: horizontal;",
    description: "要素の水平方向リサイズを有効にします。",
  },
  "resize-y": {
    css: "resize: vertical;",
    description: "要素の垂直方向リサイズを有効にします。",
  },
  shadow: {
    css: "box-shadow: 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06);",
    description: "標準のシャドウを適用します。",
  },
  "shadow-md": {
    css: "box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);",
    description: "中程度のシャドウを適用します。",
  },
  "shadow-lg": {
    css: "box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);",
    description: "大きなシャドウを適用します。",
  },
  "shadow-xl": {
    css: "box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);",
    description: "特大のシャドウを適用します。",
  },
  "shadow-2xl": {
    css: "box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);",
    description: "2XLのシャドウを適用します。",
  },
  "shadow-inner": {
    css: "box-shadow: inset 0 2px 4px 0 rgba(0,0,0,0.06);",
    description: "内側にシャドウを適用します。",
  },
  "shadow-none": {
    css: "box-shadow: none;",
    description: "シャドウを無効にします。",
  },
  "opacity-0": {
    css: "opacity: 0;",
    description: "透明度を0（完全に透明）にします。",
  },
  "opacity-25": {
    css: "opacity: 0.25;",
    description: "透明度を25%にします。",
  },
  "opacity-50": {
    css: "opacity: 0.5;",
    description: "透明度を50%にします。",
  },
  "opacity-75": {
    css: "opacity: 0.75;",
    description: "透明度を75%にします。",
  },
  "opacity-100": {
    css: "opacity: 1;",
    description: "透明度を100%（不透明）にします。",
  },
  transition: {
    css: "transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;",
    description: "主要なプロパティにトランジションを適用します。",
  },
  "transition-none": {
    css: "transition-property: none;",
    description: "トランジションを無効にします。",
  },
  "transition-all": {
    css: "transition-property: all;",
    description: "すべてのプロパティにトランジションを適用します。",
  },
  "transition-colors": {
    css: "transition-property: background-color, border-color, color, fill, stroke;",
    description: "色に関するプロパティにトランジションを適用します。",
  },
  "transition-opacity": {
    css: "transition-property: opacity;",
    description: "透明度にトランジションを適用します。",
  },
  "transition-shadow": {
    css: "transition-property: box-shadow;",
    description: "シャドウにトランジションを適用します。",
  },
  "transition-transform": {
    css: "transition-property: transform;",
    description: "変形プロパティにトランジションを適用します。",
  },
  "duration-75": {
    css: "transition-duration: 75ms;",
    description: "トランジションの時間を75msにします。",
  },
  "duration-100": {
    css: "transition-duration: 100ms;",
    description: "トランジションの時間を100msにします。",
  },
  "duration-150": {
    css: "transition-duration: 150ms;",
    description: "トランジションの時間を150msにします。",
  },
  "duration-200": {
    css: "transition-duration: 200ms;",
    description: "トランジションの時間を200msにします。",
  },
  "duration-300": {
    css: "transition-duration: 300ms;",
    description: "トランジションの時間を300msにします。",
  },
  "duration-500": {
    css: "transition-duration: 500ms;",
    description: "トランジションの時間を500msにします。",
  },
  "duration-700": {
    css: "transition-duration: 700ms;",
    description: "トランジションの時間を700msにします。",
  },
  "duration-1000": {
    css: "transition-duration: 1000ms;",
    description: "トランジションの時間を1000msにします。",
  },
  "ease-linear": {
    css: "transition-timing-function: linear;",
    description: "トランジションのイージングをlinearにします。",
  },
  "ease-in": {
    css: "transition-timing-function: cubic-bezier(0.4, 0, 1, 1);",
    description: "トランジションのイージングをease-inにします。",
  },
  "ease-out": {
    css: "transition-timing-function: cubic-bezier(0, 0, 0.2, 1);",
    description: "トランジションのイージングをease-outにします。",
  },
  "ease-in-out": {
    css: "transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);",
    description: "トランジションのイージングをease-in-outにします。",
  },
  "delay-75": {
    css: "transition-delay: 75ms;",
    description: "トランジションの遅延を75msにします。",
  },
  "delay-100": {
    css: "transition-delay: 100ms;",
    description: "トランジションの遅延を100msにします。",
  },
  "delay-150": {
    css: "transition-delay: 150ms;",
    description: "トランジションの遅延を150msにします。",
  },
  "delay-200": {
    css: "transition-delay: 200ms;",
    description: "トランジションの遅延を200msにします。",
  },
  "delay-300": {
    css: "transition-delay: 300ms;",
    description: "トランジションの遅延を300msにします。",
  },
  "delay-500": {
    css: "transition-delay: 500ms;",
    description: "トランジションの遅延を500msにします。",
  },
  "delay-700": {
    css: "transition-delay: 700ms;",
    description: "トランジションの遅延を700msにします。",
  },
  "delay-1000": {
    css: "transition-delay: 1000ms;",
    description: "トランジションの遅延を1000msにします。",
  },
  "border-solid": {
    css: "border-style: solid;",
    description: "ボーダーを実線にします。",
  },
  "border-dashed": {
    css: "border-style: dashed;",
    description: "ボーダーを破線にします。",
  },
  "border-dotted": {
    css: "border-style: dotted;",
    description: "ボーダーを点線にします。",
  },
  "border-double": {
    css: "border-style: double;",
    description: "ボーダーを二重線にします。",
  },
  "border-none": {
    css: "border-style: none;",
    description: "ボーダーを非表示にします。",
  },
  border: {
    css: "border-width: 1px;",
    description: "ボーダー幅を1pxにします。",
  },
  "border-0": {
    css: "border-width: 0;",
    description: "ボーダー幅を0にします。",
  },
  "border-2": {
    css: "border-width: 2px;",
    description: "ボーダー幅を2pxにします。",
  },
  "border-4": {
    css: "border-width: 4px;",
    description: "ボーダー幅を4pxにします。",
  },
  "border-8": {
    css: "border-width: 8px;",
    description: "ボーダー幅を8pxにします。",
  },
  "border-t": {
    css: "border-top-width: 1px;",
    description: "上ボーダー幅を1pxにします。",
  },
  "border-r": {
    css: "border-right-width: 1px;",
    description: "右ボーダー幅を1pxにします。",
  },
  "border-b": {
    css: "border-bottom-width: 1px;",
    description: "下ボーダー幅を1pxにします。",
  },
  "border-l": {
    css: "border-left-width: 1px;",
    description: "左ボーダー幅を1pxにします。",
  },
  "border-t-0": {
    css: "border-top-width: 0;",
    description: "上ボーダー幅を0にします。",
  },
  "border-r-0": {
    css: "border-right-width: 0;",
    description: "右ボーダー幅を0にします。",
  },
  "border-b-0": {
    css: "border-bottom-width: 0;",
    description: "下ボーダー幅を0にします。",
  },
  "border-l-0": {
    css: "border-left-width: 0;",
    description: "左ボーダー幅を0にします。",
  },
  "border-transparent": {
    css: "border-color: transparent;",
    description: "ボーダー色を透明にします。",
  },
  "border-current": {
    css: "border-color: currentColor;",
    description: "ボーダー色をcurrentColorにします。",
  },
  "border-black": {
    css: "border-color: #000;",
    description: "ボーダー色を黒にします。",
  },
  "border-white": {
    css: "border-color: #fff;",
    description: "ボーダー色を白にします。",
  },
  rounded: {
    css: "border-radius: 0.25rem;",
    description: "角丸を0.25remにします。",
  },
  "rounded-none": {
    css: "border-radius: 0;",
    description: "角丸をなくします。",
  },
  "rounded-sm": {
    css: "border-radius: 0.125rem;",
    description: "角丸を0.125remにします。",
  },
  "rounded-md": {
    css: "border-radius: 0.375rem;",
    description: "角丸を0.375remにします。",
  },
  "rounded-lg": {
    css: "border-radius: 0.5rem;",
    description: "角丸を0.5remにします。",
  },
  "rounded-xl": {
    css: "border-radius: 0.75rem;",
    description: "角丸を0.75remにします。",
  },
  "rounded-2xl": {
    css: "border-radius: 1rem;",
    description: "角丸を1remにします。",
  },
  "rounded-3xl": {
    css: "border-radius: 1.5rem;",
    description: "角丸を1.5remにします。",
  },
  "rounded-full": {
    css: "border-radius: 9999px;",
    description: "角丸を最大（円形）にします。",
  },
  ring: {
    css: "box-shadow: 0 0 0 3px rgba(59,130,246,0.5);",
    description: "デフォルトのリング（アウトライン）を適用します。",
  },
  "ring-0": {
    css: "box-shadow: 0 0 0 0px rgba(59,130,246,0.5);",
    description: "リングの幅を0にします。",
  },
  "ring-1": {
    css: "box-shadow: 0 0 0 1px rgba(59,130,246,0.5);",
    description: "リングの幅を1pxにします。",
  },
  "ring-2": {
    css: "box-shadow: 0 0 0 2px rgba(59,130,246,0.5);",
    description: "リングの幅を2pxにします。",
  },
  "ring-4": {
    css: "box-shadow: 0 0 0 4px rgba(59,130,246,0.5);",
    description: "リングの幅を4pxにします。",
  },
  "ring-8": {
    css: "box-shadow: 0 0 0 8px rgba(59,130,246,0.5);",
    description: "リングの幅を8pxにします。",
  },
  "ring-inset": {
    css: "box-shadow: inset 0 0 0 3px rgba(59,130,246,0.5);",
    description: "リングを内側に適用します。",
  },
  "divide-x": {
    css: "border-right-width: 1px; border-left-width: 1px;",
    description: "左右の要素間に区切り線を表示します。",
  },
  "divide-y": {
    css: "border-top-width: 1px; border-bottom-width: 1px;",
    description: "上下の要素間に区切り線を表示します。",
  },
  "divide-x-0": {
    css: "border-right-width: 0; border-left-width: 0;",
    description: "左右の区切り線を非表示にします。",
  },
  "divide-y-0": {
    css: "border-top-width: 0; border-bottom-width: 0;",
    description: "上下の区切り線を非表示にします。",
  },
  "divide-x-2": {
    css: "border-right-width: 2px; border-left-width: 2px;",
    description: "左右の区切り線の幅を2pxにします。",
  },
  "divide-y-2": {
    css: "border-top-width: 2px; border-bottom-width: 2px;",
    description: "上下の区切り線の幅を2pxにします。",
  },
  "divide-x-4": {
    css: "border-right-width: 4px; border-left-width: 4px;",
    description: "左右の区切り線の幅を4pxにします。",
  },
  "divide-y-4": {
    css: "border-top-width: 4px; border-bottom-width: 4px;",
    description: "上下の区切り線の幅を4pxにします。",
  },
  "divide-x-8": {
    css: "border-right-width: 8px; border-left-width: 8px;",
    description: "左右の区切り線の幅を8pxにします。",
  },
  "divide-y-8": {
    css: "border-top-width: 8px; border-bottom-width: 8px;",
    description: "上下の区切り線の幅を8pxにします。",
  },
  "divide-transparent": {
    css: "border-color: transparent;",
    description: "区切り線の色を透明にします。",
  },
  "divide-current": {
    css: "border-color: currentColor;",
    description: "区切り線の色をcurrentColorにします。",
  },
  "divide-black": {
    css: "border-color: #000;",
    description: "区切り線の色を黒にします。",
  },
  "divide-white": {
    css: "border-color: #fff;",
    description: "区切り線の色を白にします。",
  },
  "bg-gradient-to-t": {
    css: "background-image: linear-gradient(to top, var(--tw-gradient-stops));",
    description: "上方向へのグラデーション背景を適用します。",
  },
  "bg-gradient-to-tr": {
    css: "background-image: linear-gradient(to top right, var(--tw-gradient-stops));",
    description: "右上方向へのグラデーション背景を適用します。",
  },
  "bg-gradient-to-r": {
    css: "background-image: linear-gradient(to right, var(--tw-gradient-stops));",
    description: "右方向へのグラデーション背景を適用します。",
  },
  "bg-gradient-to-br": {
    css: "background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));",
    description: "右下方向へのグラデーション背景を適用します。",
  },
  "bg-gradient-to-b": {
    css: "background-image: linear-gradient(to bottom, var(--tw-gradient-stops));",
    description: "下方向へのグラデーション背景を適用します。",
  },
  "bg-gradient-to-bl": {
    css: "background-image: linear-gradient(to bottom left, var(--tw-gradient-stops));",
    description: "左下方向へのグラデーション背景を適用します。",
  },
  "bg-gradient-to-l": {
    css: "background-image: linear-gradient(to left, var(--tw-gradient-stops));",
    description: "左方向へのグラデーション背景を適用します。",
  },
  "bg-gradient-to-tl": {
    css: "background-image: linear-gradient(to top left, var(--tw-gradient-stops));",
    description: "左上方向へのグラデーション背景を適用します。",
  },
  filter: {
    css: "filter: var(--tw-filter);",
    description: "フィルター効果を適用します。",
  },
  "filter-none": {
    css: "filter: none;",
    description: "フィルター効果を無効にします。",
  },
  blur: {
    css: "filter: blur(8px);",
    description: "8pxのぼかし効果を適用します。",
  },
  "blur-sm": {
    css: "filter: blur(4px);",
    description: "4pxのぼかし効果を適用します。",
  },
  "blur-md": {
    css: "filter: blur(12px);",
    description: "12pxのぼかし効果を適用します。",
  },
  "blur-lg": {
    css: "filter: blur(16px);",
    description: "16pxのぼかし効果を適用します。",
  },
  "blur-xl": {
    css: "filter: blur(24px);",
    description: "24pxのぼかし効果を適用します。",
  },
  grayscale: {
    css: "filter: grayscale(100%);",
    description: "グレースケール効果を適用します。",
  },
  "grayscale-0": {
    css: "filter: grayscale(0%);",
    description: "グレースケール効果を無効にします。",
  },
  sepia: {
    css: "filter: sepia(100%);",
    description: "セピア効果を適用します。",
  },
  "sepia-0": {
    css: "filter: sepia(0%);",
    description: "セピア効果を無効にします。",
  },
  invert: {
    css: "filter: invert(100%);",
    description: "色を反転します。",
  },
  "invert-0": {
    css: "filter: invert(0%);",
    description: "色の反転を無効にします。",
  },
  "brightness-0": {
    css: "filter: brightness(0);",
    description: "明るさを0%にします。",
  },
  "brightness-50": {
    css: "filter: brightness(0.5);",
    description: "明るさを50%にします。",
  },
  "brightness-75": {
    css: "filter: brightness(0.75);",
    description: "明るさを75%にします。",
  },
  "brightness-90": {
    css: "filter: brightness(0.9);",
    description: "明るさを90%にします。",
  },
  "brightness-95": {
    css: "filter: brightness(0.95);",
    description: "明るさを95%にします。",
  },
  "brightness-100": {
    css: "filter: brightness(1);",
    description: "明るさを100%にします。",
  },
  "brightness-105": {
    css: "filter: brightness(1.05);",
    description: "明るさを105%にします。",
  },
  "brightness-110": {
    css: "filter: brightness(1.1);",
    description: "明るさを110%にします。",
  },
  "brightness-125": {
    css: "filter: brightness(1.25);",
    description: "明るさを125%にします。",
  },
  "brightness-150": {
    css: "filter: brightness(1.5);",
    description: "明るさを150%にします。",
  },
  "brightness-200": {
    css: "filter: brightness(2);",
    description: "明るさを200%にします。",
  },
  "contrast-0": {
    css: "filter: contrast(0);",
    description: "コントラストを0%にします。",
  },
  "contrast-50": {
    css: "filter: contrast(0.5);",
    description: "コントラストを50%にします。",
  },
  "contrast-75": {
    css: "filter: contrast(0.75);",
    description: "コントラストを75%にします。",
  },
  "contrast-100": {
    css: "filter: contrast(1);",
    description: "コントラストを100%にします。",
  },
  "contrast-125": {
    css: "filter: contrast(1.25);",
    description: "コントラストを125%にします。",
  },
  "contrast-150": {
    css: "filter: contrast(1.5);",
    description: "コントラストを150%にします。",
  },
  "contrast-200": {
    css: "filter: contrast(2);",
    description: "コントラストを200%にします。",
  },
  "saturate-0": {
    css: "filter: saturate(0);",
    description: "彩度を0%にします。",
  },
  "saturate-50": {
    css: "filter: saturate(0.5);",
    description: "彩度を50%にします。",
  },
  "saturate-100": {
    css: "filter: saturate(1);",
    description: "彩度を100%にします。",
  },
  "saturate-150": {
    css: "filter: saturate(1.5);",
    description: "彩度を150%にします。",
  },
  "saturate-200": {
    css: "filter: saturate(2);",
    description: "彩度を200%にします。",
  },
  "hue-rotate-0": {
    css: "filter: hue-rotate(0deg);",
    description: "色相を0度回転します。",
  },
  "hue-rotate-15": {
    css: "filter: hue-rotate(15deg);",
    description: "色相を15度回転します。",
  },
  "hue-rotate-30": {
    css: "filter: hue-rotate(30deg);",
    description: "色相を30度回転します。",
  },
  "hue-rotate-60": {
    css: "filter: hue-rotate(60deg);",
    description: "色相を60度回転します。",
  },
  "hue-rotate-90": {
    css: "filter: hue-rotate(90deg);",
    description: "色相を90度回転します。",
  },
  "hue-rotate-180": {
    css: "filter: hue-rotate(180deg);",
    description: "色相を180度回転します。",
  },
  "drop-shadow": {
    css: "filter: drop-shadow(0 1px 1px rgba(0,0,0,0.05));",
    description: "標準のドロップシャドウを適用します。",
  },
  "drop-shadow-sm": {
    css: "filter: drop-shadow(0 1px 2px rgba(0,0,0,0.05));",
    description: "小さなドロップシャドウを適用します。",
  },
  "drop-shadow-md": {
    css: "filter: drop-shadow(0 4px 3px rgba(0,0,0,0.07)), drop-shadow(0 2px 2px rgba(0,0,0,0.06));",
    description: "中程度のドロップシャドウを適用します。",
  },
  "drop-shadow-lg": {
    css: "filter: drop-shadow(0 10px 8px rgba(0,0,0,0.04)), drop-shadow(0 4px 3px rgba(0,0,0,0.1));",
    description: "大きなドロップシャドウを適用します。",
  },
  "drop-shadow-xl": {
    css: "filter: drop-shadow(0 20px 13px rgba(0,0,0,0.03)), drop-shadow(0 8px 5px rgba(0,0,0,0.08));",
    description: "特大のドロップシャドウを適用します。",
  },
  "drop-shadow-2xl": {
    css: "filter: drop-shadow(0 25px 25px rgba(0,0,0,0.15));",
    description: "2XLのドロップシャドウを適用します。",
  },
  "drop-shadow-none": {
    css: "filter: none;",
    description: "ドロップシャドウを無効にします。",
  },
  "mix-blend-normal": {
    css: "mix-blend-mode: normal;",
    description: "ブレンドモードをnormalにします。",
  },
  "mix-blend-multiply": {
    css: "mix-blend-mode: multiply;",
    description: "ブレンドモードをmultiplyにします。",
  },
  "mix-blend-screen": {
    css: "mix-blend-mode: screen;",
    description: "ブレンドモードをscreenにします。",
  },
  "mix-blend-overlay": {
    css: "mix-blend-mode: overlay;",
    description: "ブレンドモードをoverlayにします。",
  },
  "mix-blend-darken": {
    css: "mix-blend-mode: darken;",
    description: "ブレンドモードをdarkenにします。",
  },
  "mix-blend-lighten": {
    css: "mix-blend-mode: lighten;",
    description: "ブレンドモードをlightenにします。",
  },
  "mix-blend-color-dodge": {
    css: "mix-blend-mode: color-dodge;",
    description: "ブレンドモードをcolor-dodgeにします。",
  },
  "mix-blend-color-burn": {
    css: "mix-blend-mode: color-burn;",
    description: "ブレンドモードをcolor-burnにします。",
  },
  "mix-blend-hard-light": {
    css: "mix-blend-mode: hard-light;",
    description: "ブレンドモードをhard-lightにします。",
  },
  "mix-blend-soft-light": {
    css: "mix-blend-mode: soft-light;",
    description: "ブレンドモードをsoft-lightにします。",
  },
  "mix-blend-difference": {
    css: "mix-blend-mode: difference;",
    description: "ブレンドモードをdifferenceにします。",
  },
  "mix-blend-exclusion": {
    css: "mix-blend-mode: exclusion;",
    description: "ブレンドモードをexclusionにします。",
  },
  "mix-blend-hue": {
    css: "mix-blend-mode: hue;",
    description: "ブレンドモードをhueにします。",
  },
  "mix-blend-saturation": {
    css: "mix-blend-mode: saturation;",
    description: "ブレンドモードをsaturationにします。",
  },
  "mix-blend-color": {
    css: "mix-blend-mode: color;",
    description: "ブレンドモードをcolorにします。",
  },
  "mix-blend-luminosity": {
    css: "mix-blend-mode: luminosity;",
    description: "ブレンドモードをluminosityにします。",
  },
  "outline-0": {
    css: "outline-width: 0px;",
    description: "アウトラインの幅を0pxにします。",
  },
  "outline-1": {
    css: "outline-width: 1px;",
    description: "アウトラインの幅を1pxにします。",
  },
  "outline-2": {
    css: "outline-width: 2px;",
    description: "アウトラインの幅を2pxにします。",
  },
  "outline-4": {
    css: "outline-width: 4px;",
    description: "アウトラインの幅を4pxにします。",
  },
  "outline-8": {
    css: "outline-width: 8px;",
    description: "アウトラインの幅を8pxにします。",
  },
  "outline-dashed": {
    css: "outline-style: dashed;",
    description: "アウトラインのスタイルを点線（dashed）にします。",
  },
  "outline-dotted": {
    css: "outline-style: dotted;",
    description: "アウトラインのスタイルを点線（dotted）にします。",
  },
  "outline-double": {
    css: "outline-style: double;",
    description: "アウトラインのスタイルを二重線（double）にします。",
  },
  "outline-solid": {
    css: "outline-style: solid;",
    description: "アウトラインのスタイルを実線（solid）にします。",
  },
  "outline-offset-0": {
    css: "outline-offset: 0px;",
    description: "アウトラインのオフセットを0pxにします。",
  },
  "outline-offset-1": {
    css: "outline-offset: 1px;",
    description: "アウトラインのオフセットを1pxにします。",
  },
  "outline-offset-2": {
    css: "outline-offset: 2px;",
    description: "アウトラインのオフセットを2pxにします。",
  },
  "outline-offset-4": {
    css: "outline-offset: 4px;",
    description: "アウトラインのオフセットを4pxにします。",
  },
  "outline-offset-8": {
    css: "outline-offset: 8px;",
    description: "アウトラインのオフセットを8pxにします。",
  },
};

/**
 * フォントサイズに関する情報マッピング。
 * text-(size) のような動的クラスの翻訳生成に使用します。
 * キー: サイズ識別子 (例: "xs", "2xl")
 * 値: FontSizeDetailオブジェクト
 */
export const fontSizeData: Record<string, FontSizeDetail> = {
  xs: { fontSize: "0.75rem", fontSizePx: "12px", lineHeight: "1rem" },
  sm: { fontSize: "0.875rem", fontSizePx: "14px", lineHeight: "1.25rem" },
  base: { fontSize: "1rem", fontSizePx: "16px", lineHeight: "1.5rem" },
  lg: { fontSize: "1.125rem", fontSizePx: "18px", lineHeight: "1.75rem" },
  xl: { fontSize: "1.25rem", fontSizePx: "20px", lineHeight: "1.75rem" },
  "2xl": { fontSize: "1.5rem", fontSizePx: "24px", lineHeight: "2rem" },
  "3xl": { fontSize: "1.875rem", fontSizePx: "30px", lineHeight: "2.25rem" },
  "4xl": { fontSize: "2.25rem", fontSizePx: "36px", lineHeight: "2.5rem" },
  "5xl": { fontSize: "3rem", fontSizePx: "48px", lineHeight: "1" },
  "6xl": { fontSize: "3.75rem", fontSizePx: "60px", lineHeight: "1" },
  "7xl": { fontSize: "4.5rem", fontSizePx: "72px", lineHeight: "1" },
  "8xl": { fontSize: "6rem", fontSizePx: "96px", lineHeight: "1" },
  "9xl": { fontSize: "8rem", fontSizePx: "128px", lineHeight: "1" },
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
    console.warn(
      `[generateTextSizeTranslation] No size data found for key: ${matchResult[1]}`
    );
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
    } else if (
      sizeInfo.lineHeight.endsWith("rem") ||
      sizeInfo.lineHeight.endsWith("em")
    ) {
      const ratio = lhVal / fsVal;
      lineHeightValueComment = `calc(${sizeInfo.lineHeight} / ${
        sizeInfo.fontSize
      }) \u2248 ${ratio.toFixed(4)}`;
    }
  }
  const cssOutput = `.${className} {
  font-size: ${fontSizeVar} /* ${fontSizeValueComment} */;
  line-height: var(--tw-leading, ${lineHeightVar} /* ${lineHeightValueComment} */);
}`;
  const description = `テキストサイズを ${matchResult[1].toUpperCase()} (${
    sizeInfo.fontSize
  } / ${sizeInfo.fontSizePx}) に設定し、行送りを調整します。`;
  return { css: cssOutput, description };
};

/**
 * columns-(数値)やcolumns-(分数)の動的クラス用ジェネレータ
 */
const generateColumnsTranslation: TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray
): TranslationEntry | null => {
  const value = matchResult[1];
  let css = "";
  let description = "";
  if (value.match(/^\d+$/)) {
    css = `columns: ${value};`;
    description = `カラム数を${value}に設定します。`;
  } else if (value.match(/^(\d+)\/(\d+)$/)) {
    css = `columns: ${value.replace("/", " / ")};`;
    description = `カラム幅を${value.replace("/", " / ")}に設定します。`;
  } else {
    return null;
  }
  return { css, description };
};

/**
 * inset/top/right/bottom/left系の動的クラス用ジェネレータ
 */
const generateInsetTranslation: TranslationGenerator = (
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
  else if (value.match(/^(\d+)\/(\d+)$/)) {
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

/**
 * z-(数値)やz-autoの動的クラス用ジェネレータ
 */
const generateZIndexTranslation: TranslationGenerator = (
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

/**
 * w-*, h-*, min-w-*, max-w-*, min-h-*, max-h-* の動的クラス用ジェネレータ
 */
const generateSizeTranslation: TranslationGenerator = (
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
  else if (value.match(/^(\d+)\/(\d+)$/)) {
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

/**
 * p-*, px-*, py-*, pt-*, pr-*, pb-*, pl-*, m-*, mx-*, my-*, mt-*, mr-*, mb-*, ml-* の動的クラス用ジェネレータ
 */
const generateSpacingTranslation: TranslationGenerator = (
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
  else if (value.match(/^(\d+)\/(\d+)$/)) {
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
    classNamePrefix: "text-",
  },
  {
    regex: /^columns-((?:\d+)|(?:\d+\/\d+))$/,
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
  // 他の動的ジェネレータ設定を追加する場合はここに記述
];
