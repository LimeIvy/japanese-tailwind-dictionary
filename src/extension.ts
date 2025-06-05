import * as vscode from 'vscode';
import { TranslationEntry, tailwindClassTranslations, dynamicTranslationGenerators } from './dictionary';

// --- 既存のコマンドID ---
const SHOW_CLASSES_COMMAND = 'read-tailwind.showClasses';
// --- 新しいコマンドID ---
const REVERSE_SEARCH_CLASSES_COMMAND = 'read-tailwind.reverseSearchClasses'; // 逆引き検索用

// --- 逆引き検索ハンドラ ---
async function reverseSearchClassesHandler() {
  const allSearchableItems: Array<{ className: string; css: string; description: string }> = [];

  // 1. 静的翻訳を検索対象に追加
  for (const className in tailwindClassTranslations) {
    if (Object.prototype.hasOwnProperty.call(tailwindClassTranslations, className)) {
      const entry = tailwindClassTranslations[className];
      allSearchableItems.push({ className, ...entry });
    }
  }

  // 2. 動的翻訳を検索対象に追加 (ジェネレータから全インスタンスを生成)
  for (const generatorConfig of dynamicTranslationGenerators) {
    if (generatorConfig.dataKeys && generatorConfig.classNamePrefix !== undefined) {
      for (const key of generatorConfig.dataKeys) {
        const className = `${generatorConfig.classNamePrefix}${key}${generatorConfig.classNameSuffix || ''}`;
        const match = className.match(generatorConfig.regex);
        if (match) {
          const entry = generatorConfig.generator(className, match);
          if (entry) {
            allSearchableItems.push({ className, ...entry });
          }
        }
      }
    }
  }

  // 3. ユーザーに検索語を入力させる
  const searchTerm = await vscode.window.showInputBox({
    placeHolder: 'クラス名、CSS、日本語説明の一部を入力 (例: "中央揃え", "p-4", "width: 100%")',
    prompt: 'Tailwind CSS 逆引き検索',
    ignoreFocusOut: true,
  });

  if (!searchTerm || searchTerm.trim() === '') {
    // vscode.window.showInformationMessage('検索語が入力されませんでした。');
    return;
  }

  const lowerSearchTerm = searchTerm.toLowerCase().trim();

  // 4. 検索語に一致するアイテムをフィルタリング
  const matchedItems = allSearchableItems.filter(item => {
    return item.className.toLowerCase().includes(lowerSearchTerm) ||
           item.css.toLowerCase().includes(lowerSearchTerm) ||
           item.description.toLowerCase().includes(lowerSearchTerm);
  });

  // 5. 結果をQuick Pickで表示
  if (matchedItems.length === 0) {
    vscode.window.showInformationMessage(`「${searchTerm}」に一致する情報は見つかりませんでした。`);
  } else {
    const quickPickItems = matchedItems.map(item => ({
      label: `🛠️ ${item.className}`, // クラス名
      description: `🎨 ${item.css.split('\n')[1]?.trim() || item.css.split('\n')[0]}...`, // CSS (1行目か2行目を抜粋)
      detail: `📖 ${item.description}` // 日本語説明
    }));

    vscode.window.showQuickPick(quickPickItems, {
      placeHolder: `「${searchTerm}」の検索結果 (${matchedItems.length}件) - 詳細を確認できます`,
      matchOnDescription: true, // QuickPickのdescriptionでも絞り込み
      matchOnDetail: true       // QuickPickのdetailでも絞り込み
    });
    // .then(selected => {
    //   if (selected) {
    //     vscode.window.showInformationMessage(`選択: ${selected.label}`);
    //   }
    // });
  }
}


export function activate(context: vscode.ExtensionContext) {
  // --- 既存のコマンド ---
  const showClassesCommand = vscode.commands.registerCommand(SHOW_CLASSES_COMMAND, (classText: string, line: number) => {
    const classList = classText.split(/\s+/).filter(c => c);
    if (classList.length === 0) {
      vscode.window.showInformationMessage(`この行（${line + 1}行目）にクラスは見つかりませんでした。`);
    } else {
      const quickPickItems: vscode.QuickPickItem[] = classList.map(className => {
        let entry: TranslationEntry | null = tailwindClassTranslations[className];
        if (!entry) {
          for (const dynamicGen of dynamicTranslationGenerators) {
            const match = className.match(dynamicGen.regex);
            if (match) {
              entry = dynamicGen.generator(className, match);
              if (entry) break;
            }
          }
        }
        if (entry) {
          return {
            label: className,
            detail: entry.description
          };
        } else {
          return {
            label: className,
            description: 'CSSプロパティや日本語訳が見つかりません。',
          };
        }
      });
      vscode.window.showQuickPick(quickPickItems, {
        placeHolder: `${line + 1}行目のクラス一覧 (日本語訳付き)`,
        canPickMany: false,
      });
    }
  });

  // --- 新しい逆引き検索コマンドの登録 ---
  const reverseSearchCommandDisposable = vscode.commands.registerCommand(REVERSE_SEARCH_CLASSES_COMMAND, reverseSearchClassesHandler);

  const codeLensProvider = new TailwindClassLensProvider();
  const selector: vscode.DocumentSelector = [
    { language: 'javascript', scheme: 'file' }, { language: 'javascriptreact', scheme: 'file' },
    { language: 'typescriptreact', scheme: 'file' }, { language: 'html', scheme: 'file' },
    { language: 'vue', scheme: 'file' }, { language: 'svelte', scheme: 'file' },
  ];
  context.subscriptions.push(
    showClassesCommand,
    reverseSearchCommandDisposable, // 新しいコマンドを登録
    vscode.languages.registerCodeLensProvider(selector, codeLensProvider)
  );
}

// CodeLensProvider クラスの定義 (変更なし)
class TailwindClassLensProvider implements vscode.CodeLensProvider {
  onDidChangeCodeLenses?: vscode.Event<void>;
  provideCodeLenses(document: vscode.TextDocument): vscode.CodeLens[] {
    const lenses: vscode.CodeLens[] = [];
    const regex = /(className|class)\s*=\s*"([^"]*)"/g;
    for (let line = 0; line < document.lineCount; line++) {
      const lineText = document.lineAt(line).text;
      let match: RegExpExecArray | null;
      regex.lastIndex = 0;
      while ((match = regex.exec(lineText)) !== null) {
        const fullMatch = match[0];
        const classString = match[2];
        if (classString.trim().length > 0) {
            const start = lineText.indexOf(fullMatch);
            const classCount = classString.split(/\s+/).filter(c => c).length;
            const range = new vscode.Range(line, start, line, start + fullMatch.length);
            lenses.push(new vscode.CodeLens(range, {
                title: `Tailwind: ${classCount}クラス (詳細表示)`,
                tooltip: 'クリックしてクラスの詳細と日本語訳を表示します',
                command: SHOW_CLASSES_COMMAND,
                arguments: [classString, line],
            }));
        }
      }
    }
    return lenses;
  }
}