import * as vscode from 'vscode';

// クラス一覧を表示するコマンドID
const SHOW_CLASSES_COMMAND = 'read-tailwind.showClasses';

export function activate(context: vscode.ExtensionContext) {
  // コマンド登録：クラス一覧を表示
  const showClassesCommand = vscode.commands.registerCommand(SHOW_CLASSES_COMMAND, (classText: string, line: number) => {
    const classList = classText.split(/\s+/).filter(c => c);
    if (classList.length === 0) {
      vscode.window.showInformationMessage(`この行（${line + 1}行目）にクラスは見つかりませんでした。`);
    } else {
      vscode.window.showQuickPick(classList, {
        placeHolder: `${line + 1}行目のクラス一覧`,
        canPickMany: false,
      });
    }
  });

  // CodeLensプロバイダーを登録
  const codeLensProvider = new TailwindClassLensProvider();
  const selector: vscode.DocumentSelector = [
    { language: 'javascript', scheme: 'file' },
    { language: 'javascriptreact', scheme: 'file' },
    { language: 'typescriptreact', scheme: 'file' },
    { language: 'html', scheme: 'file' },
  ];
  context.subscriptions.push(
    showClassesCommand,
    vscode.languages.registerCodeLensProvider(selector, codeLensProvider)
  );
}

// CodeLensProvider クラスの定義
class TailwindClassLensProvider implements vscode.CodeLensProvider {
  // トリガーを明示（必要に応じて）
  onDidChangeCodeLenses?: vscode.Event<void>;

  provideCodeLenses(document: vscode.TextDocument): vscode.CodeLens[] {
    const lenses: vscode.CodeLens[] = [];
    const regex = /(className|class)\s*=\s*"([^"]*)"/g;

    for (let line = 0; line < document.lineCount; line++) {
      const lineText = document.lineAt(line).text;
      let match: RegExpExecArray | null;

      regex.lastIndex = 0; // reset regex state
      while ((match = regex.exec(lineText)) !== null) {
        const fullMatch = match[0];
        const classString = match[2]; // "..." の中身
        const start = lineText.indexOf(fullMatch);

        // CodeLensをその行に追加
        const range = new vscode.Range(line, start, line, start + fullMatch.length);
        lenses.push(new vscode.CodeLens(range, {
          title: `Tailwindクラス (${classString.split(/\s+/).length}) を表示`,
          tooltip: 'このクラスリストを表示します',
          command: SHOW_CLASSES_COMMAND,
          arguments: [classString, line],
        }));
      }
    }

    return lenses;
  }
}
