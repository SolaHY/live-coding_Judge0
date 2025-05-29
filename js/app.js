/**
 * メインアプリケーションクラス
 * - コードの実行と結果の表示を管理
 * - テストケースの実行とフィードバック生成
 * - エラーハンドリング
 */
class App {
    constructor() {
        this.setupEventListeners();
    }

    /**
     * イベントリスナーの設定
     * - 実行ボタンのクリックイベントを監視
     */
    setupEventListeners() {
        document.getElementById('runButton').addEventListener('click', () => this.runCode());
    }

    /**
     * コードの実行とテストケースの処理
     * - エディタからコードを取得
     * - 選択された問題のテストケースを実行
     * - Judge0 APIを使用してコードを実行
     * - 結果の表示を管理
     */
    async runCode() {
        const output = document.getElementById('output');
        const problemId = document.getElementById('problemSelect').value;
        const problem = problemTemplates[problemId];
        output.textContent = '実行中...';
        
        const sourceCode = codeEditor.getValue();
        const languageId = document.getElementById('languageSelect').value;

        try {
            let allTestsPassed = true;
            let results = [];

            // 各テストケースを実行
            for (const testCase of problem.testCases) {
                // Judge0 APIにコードを提出
                const submitData = await judge0API.submitCode(
                    sourceCode,
                    languageId,
                    testCase.input,
                    testCase.expected
                );

                // 実行結果を待機して取得
                const result = await judge0API.waitForResult(submitData.token);

                // テスト結果をフォーマット
                const testResult = {
                    input: testCase.input,
                    expected: testCase.expected,
                    actual: result.stdout ? result.stdout.trim() : '',
                    status: result.status,
                    compile_output: result.compile_output,
                    stderr: result.stderr
                };

                // ステータスコード3は成功を示す
                if (result.status.id !== 3) {
                    allTestsPassed = false;
                }

                results.push(testResult);
            }

            // 結果の表示を更新
            this.displayResults(results, allTestsPassed);

        } catch (error) {
            console.error('エラー詳細:', error);
            output.textContent = 'エラーが発生しました: ' + error.message;
        }
    }

    /**
     * テスト結果の表示
     * - 各テストケースの結果を整形
     * - 成功/失敗の判定
     * - エラーメッセージの表示
     * @param {Array} results テスト結果の配列
     * @param {boolean} allTestsPassed 全テストの成功フラグ
     */
    displayResults(results, allTestsPassed) {
        const output = document.getElementById('output');
        let outputText = '=== テスト結果 ===\n\n';
        
        results.forEach((result, index) => {
            outputText += `テストケース ${index + 1}:\n`;
            outputText += `入力: ${result.input}\n`;
            outputText += `期待される出力: ${result.expected}\n`;
            outputText += `実際の出力: ${result.actual}\n`;
            
            // コンパイルエラーがある場合は表示
            if (result.compile_output) {
                outputText += `コンパイルエラー: ${result.compile_output}\n`;
            }
            // 実行時エラーがある場合は表示
            if (result.stderr) {
                outputText += `エラー: ${result.stderr}\n`;
            }
            
            const status = result.status.id === 3 ? '成功' : '失敗';
            outputText += `結果: ${status}\n\n`;
        });

        outputText += allTestsPassed ? '全てのテストに成功しました！' : '一部のテストに失敗しました。';
        output.textContent = outputText;
    }
}

// DOMの読み込み完了時にアプリケーションを初期化
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
}); 