import * as vscode from "vscode";
import { tailwindClassTranslations } from "./dictionary/static-dictionary";
import { dynamicTranslationGenerators } from "./dictionary/index";
import { TranslationEntry } from "./dictionary/types";
import { statePrefixMap } from "./dictionary/state-prefix-map";
import { responsivePrefixMap } from "./dictionary/responsive-prefix-map";

const SHOW_CLASSES_COMMAND = "read-tailwind.showClasses";
const SEARCH_CLASSES_COMMAND = "read-tailwind.searchClasses";

function splitResponsivePrefix(className: string): {
  responsivePrefix: string;
  rest: string;
} {
  for (const prefix in responsivePrefixMap) {
    if (className.startsWith(prefix)) {
      return { responsivePrefix: prefix, rest: className.slice(prefix.length) };
    }
  }
  return { responsivePrefix: "", rest: className };
}

function decorateDescription(className: string, description: string): string {
  // レスポンシブ対応
  const { responsivePrefix, rest } = splitResponsivePrefix(className);
  let desc = description;
  // 状態バリアント対応（複数対応）
  let stateDesc = "";
  let stateRest = rest;
  let found = true;
  while (found) {
    found = false;
    for (const prefix in statePrefixMap) {
      if (stateRest.startsWith(prefix)) {
        stateDesc += statePrefixMap[prefix];
        stateRest = stateRest.slice(prefix.length);
        found = true;
        break;
      }
    }
  }
  desc = stateDesc + desc;
  if (responsivePrefix) {
    desc = responsivePrefixMap[responsivePrefix] + desc;
  }
  return desc;
}

function extractClassNamesFromExpression(expr: string): string[] {
  const stringLiterals = [...expr.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  return stringLiterals;
}

function stripAllStatePrefixes(className: string): string {
  let rest = className;
  let found = true;
  while (found) {
    found = false;
    for (const prefix in statePrefixMap) {
      if (rest.startsWith(prefix)) {
        rest = rest.slice(prefix.length);
        found = true;
        break;
      }
    }
  }
  return rest;
}

// --- 逆引き検索ハンドラ ---
async function searchClassesHandler() {
  const allSearchableItems: Array<{
    className: string;
    css: string;
    description: string;
  }> = [];

  // 1. 静的翻訳を検索対象に追加
  for (const className in tailwindClassTranslations) {
    if (
      Object.prototype.hasOwnProperty.call(tailwindClassTranslations, className)
    ) {
      const entry = tailwindClassTranslations[className];
      allSearchableItems.push({
        className,
        css: entry.css,
        description: decorateDescription(className, entry.description),
      });
    }
  }

  // 2. 動的翻訳を検索対象に追加 (ジェネレータから全インスタンスを生成)
  for (const generatorConfig of dynamicTranslationGenerators) {
    if (
      generatorConfig.dataKeys &&
      generatorConfig.classNamePrefix !== undefined
    ) {
      for (const key of generatorConfig.dataKeys) {
        const className = `${generatorConfig.classNamePrefix}${key}${
          generatorConfig.classNameSuffix || ""
        }`;
        const match = className.match(generatorConfig.regex);
        if (match) {
          const entry = generatorConfig.generator(className, match);
          if (entry) {
            allSearchableItems.push({
              className,
              css: entry.css,
              description: decorateDescription(className, entry.description),
            });
          }
        }
      }
    }
  }

  // 3. ユーザーに検索語を入力させる
  const searchTerm = await vscode.window.showInputBox({
    placeHolder:
      'クラス名、CSS、日本語説明の一部を入力 (例: "gradient", "width: 100%", "中央" )',
    prompt: "Tailwind CSS 検索",
    ignoreFocusOut: true,
  });

  if (!searchTerm || searchTerm.trim() === "") {
    // vscode.window.showInformationMessage('検索語が入力されませんでした。');
    return;
  }

  const lowerSearchTerm = searchTerm.toLowerCase().trim();

  // 4. 検索語に一致するアイテムをフィルタリング
  const matchedItems = allSearchableItems.filter((item) => {
    return (
      item.className.toLowerCase().includes(lowerSearchTerm) ||
      item.css.toLowerCase().includes(lowerSearchTerm) ||
      item.description.toLowerCase().includes(lowerSearchTerm)
    );
  });

  // 5. 結果をQuick Pickで表示
  if (matchedItems.length === 0) {
    vscode.window.showInformationMessage(
      `「${searchTerm}」に一致する情報は見つかりませんでした。`
    );
  } else {
    const quickPickItems = matchedItems.map((item) => ({
      label: `🛠️ ${item.className}`, // クラス名
      description: `🎨 ${
        item.css.split("\n")[1]?.trim() || item.css.split("\n")[0]
      }...`, // CSS (1行目か2行目を抜粋)
      detail: `📖 ${item.description}`, // 日本語説明
    }));

    vscode.window
      .showQuickPick(quickPickItems, {
        placeHolder: `「${searchTerm}」の検索結果 (${matchedItems.length}件) - 詳細を確認できます`,
        matchOnDescription: true, // QuickPickのdescriptionでも絞り込み
        matchOnDetail: true, // QuickPickのdetailでも絞り込み
      })
      .then((selected) => {
        if (selected) {
          vscode.env.clipboard.writeText(selected.label.replace(/^🛠️\s*/, ""));
          vscode.window.showInformationMessage(
            `「${selected.label.replace(
              /^🛠️\s*/,
              ""
            )}」をクリップボードにコピーしました。`
          );
        }
      });
  }
}

// Tailwindクラス数自動取得の設定
function isAutoCountEnabled(): boolean {
  return vscode.workspace
    .getConfiguration("readTailwind")
    .get("autoCountClasses", true);
}

export function activate(context: vscode.ExtensionContext) {
  //クラス詳細表示コマンド
  const showClassesCommand = vscode.commands.registerCommand(
    SHOW_CLASSES_COMMAND,
    (classText: string, line: number) => {
      const classList = classText.split(/\s+/).filter((c) => c);
      if (classList.length === 0) {
        vscode.window.showInformationMessage(
          `この行（${line + 1}行目）にクラスは見つかりませんでした。`
        );
      } else {
        const quickPickItems: vscode.QuickPickItem[] = classList.map(
          (className) => {
            const { responsivePrefix, rest } = splitResponsivePrefix(className);
            // バリアントをすべて除去したコアクラス名
            const coreClass = stripAllStatePrefixes(rest);
            let entry: TranslationEntry | null =
              tailwindClassTranslations[coreClass];
            if (!entry) {
              for (const dynamicGen of dynamicTranslationGenerators) {
                const match = coreClass.match(dynamicGen.regex);
                if (match) {
                  entry = dynamicGen.generator(coreClass, match);
                  break;
                }
              }
            }
            if (entry) {
              return {
                label: `🛠️ ${className}`,
                description: `🎨 ${
                  entry.css.split("\n")[1]?.trim() || entry.css.split("\n")[0]
                }...`,
                detail: `📖 ${decorateDescription(
                  className,
                  entry.description
                )}`,
              };
            } else {
              return {
                label: `🛠️ ${className}`,
                description: "🎨 未対応または不明なクラスです",
                detail: "📖 未対応または不明なクラスです",
              };
            }
          }
        );
        vscode.window.showQuickPick(quickPickItems, {
          placeHolder: `クラス一覧（${classList.length}件） - 詳細を確認できます`,
          matchOnDescription: true,
          matchOnDetail: true,
        });
      }
    }
  );

  //検索コマンド
  const searchCommandDisposable = vscode.commands.registerCommand(
    SEARCH_CLASSES_COMMAND,
    searchClassesHandler
  );

  const codeLensProvider = new TailwindClassLensProvider();
  const selector: vscode.DocumentSelector = [
    { language: "javascript", scheme: "file" },
    { language: "javascriptreact", scheme: "file" },
    { language: "typescriptreact", scheme: "file" },
    { language: "html", scheme: "file" },
    { language: "vue", scheme: "file" },
    { language: "svelte", scheme: "file" },
  ];
  context.subscriptions.push(
    showClassesCommand,
    searchCommandDisposable,
    vscode.languages.registerCodeLensProvider(selector, codeLensProvider)
  );

  // クラス数自動取得（設定でONのときのみ）
  if (isAutoCountEnabled()) {
    // ここにクラス数自動取得の処理を記述
    // 例: vscode.window.showInformationMessage(`Tailwindクラス数: ${Object.keys(tailwindClassTranslations).length}`);
  }
}

// CodeLensProvider クラスの定義
class TailwindClassLensProvider implements vscode.CodeLensProvider {
  onDidChangeCodeLenses?: vscode.Event<void>;
  provideCodeLenses(document: vscode.TextDocument): vscode.CodeLens[] {
    const lenses: vscode.CodeLens[] = [];
    // ダブルクォート or 波括弧内の式も検出
    const regex = /(className|class)\s*=\s*(?:"([^"]*)"|{([^}]*)})/g;
    for (let line = 0; line < document.lineCount; line++) {
      const lineText = document.lineAt(line).text;
      let match: RegExpExecArray | null;
      regex.lastIndex = 0;
      while ((match = regex.exec(lineText)) !== null) {
        const fullMatch = match[0];
        // ダブルクォート or 波括弧内
        const classString = match[2] || match[3] || "";
        let classNames: string[] = [];
        if (match[2]) {
          // ダブルクォート
          classNames = classString.split(/\s+/).filter((c) => c);
        } else if (match[3]) {
          // 波括弧内の式
          classNames = extractClassNamesFromExpression(classString);
        }
        if (classNames.length > 0) {
          const start = lineText.indexOf(fullMatch);
          const classCount = classNames.length;
          const range = new vscode.Range(
            line,
            start,
            line,
            start + fullMatch.length
          );
          lenses.push(
            new vscode.CodeLens(range, {
              title: `Tailwind: ${classCount}クラス (詳細表示)`,
              tooltip: "クリックしてクラスの詳細と日本語訳を表示します",
              command: SHOW_CLASSES_COMMAND,
              arguments: [classNames.join(" "), line],
            })
          );
        }
      }
    }
    return lenses;
  }
}
