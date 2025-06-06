export interface TranslationEntry {
  css: string;
  description: string;
}

export interface FontSizeDetail {
  fontSize: string;
  fontSizePx: string;
  lineHeight: string;
}

export type TranslationGenerator = (
  className: string,
  matchResult: RegExpMatchArray,
  dataItem?: any
) => TranslationEntry | null;

export interface DynamicGeneratorConfig {
  regex: RegExp;
  generator: TranslationGenerator;
  dataKeys?: string[];
  dataMap?: Record<string, any>;
  classNamePrefix?: string;
  classNameSuffix?: string;
} 