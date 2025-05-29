/**
 * Monaco Editorの初期化と制御を管理するクラス
 * - エディタの設定と初期化
 * - 言語切り替え
 * - 問題テンプレートの管理
 */
class CodeEditor {
    constructor() {
        this.editor = null;
        this.initializeMonaco();
    }

    /**
     * Monaco Editorの初期化
     * - CDNからエディタをロード
     * - 基本設定の適用
     * - イベントリスナーの設定
     */
    initializeMonaco() {
        // Monaco Editorの設定とロード
        require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs' } });
        require(['vs/editor/editor.main'], () => {
            // エディタインスタンスの作成
            this.editor = monaco.editor.create(document.getElementById('editor'), {
                value: '// ここにコードを入力してください',
                language: 'java',           // デフォルト言語
                theme: 'vs-dark',           // ダークテーマ
                automaticLayout: true       // 自動レイアウト調整
            });
            this.setupEventListeners();
        });
    }

    /**
     * イベントリスナーの設定
     * - 問題選択の変更監視
     * - プログラミング言語の変更監視
     */
    setupEventListeners() {
        // 問題が変更されたときのハンドラ
        document.getElementById('problemSelect').addEventListener('change', (e) => {
            this.updateProblemContent(e.target.value);
        });

        // 言語が変更されたときのハンドラ
        document.getElementById('languageSelect').addEventListener('change', (e) => {
            this.updateEditorLanguage(e.target.value);
        });
    }

    /**
     * 問題内容の更新
     * - 問題タイトルと説明の更新
     * - 対応する言語のテンプレートコードを設定
     * @param {string} problemId 選択された問題のID
     */
    updateProblemContent(problemId) {
        const problem = problemTemplates[problemId];
        document.getElementById('problemTitle').textContent = problem.title;
        document.getElementById('problemDescription').innerHTML = problem.description.replace(/\n/g, '<br>');
        this.updateEditorLanguage(document.getElementById('languageSelect').value);
    }

    /**
     * エディタの言語設定を更新
     * - シンタックスハイライトの更新
     * - 言語に対応したテンプレートコードの設定
     * @param {string} languageId 選択された言語のID
     */
    updateEditorLanguage(languageId) {
        const problemId = document.getElementById('problemSelect').value;
        const problem = problemTemplates[problemId];
        const template = problem.templates[languageId];
        
        // エディタの言語モードを更新
        monaco.editor.setModelLanguage(this.editor.getModel(), languageMap[languageId]);
        // テンプレートコードを設定
        this.editor.setValue(template || '// ここにコードを入力してください');
    }

    /**
     * エディタの現在の内容を取得
     * @returns {string} エディタ内のコード
     */
    getValue() {
        return this.editor.getValue();
    }
}

// エディタのグローバルインスタンスを作成
const codeEditor = new CodeEditor(); 