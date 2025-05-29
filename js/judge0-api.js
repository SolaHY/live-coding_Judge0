/**
 * Judge0 APIとの通信を管理するクラス
 * - コードの提出と実行
 * - 実行結果の取得
 * - 非同期処理の制御
 */
class Judge0API {
    constructor() {
        // APIのエンドポイントとアクセスキーの設定
        this.API_URL = 'https://judge0-ce.p.rapidapi.com';
        this.API_KEY = '8020835d8dmshd324f2a06113a0cp13b4aajsna23a7dbf2907';
    }

    /**
     * コードを提出して実行をリクエスト
     * @param {string} sourceCode 実行するソースコード
     * @param {string} languageId 言語ID
     * @param {string} input 標準入力
     * @param {string} expectedOutput 期待される出力
     * @returns {Promise<Object>} 提出結果（トークンを含む）
     */
    async submitCode(sourceCode, languageId, input, expectedOutput) {
        const response = await fetch(`${this.API_URL}/submissions?base64_encoded=false&wait=false`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                'X-RapidAPI-Key': this.API_KEY
            },
            body: JSON.stringify({
                source_code: sourceCode,
                language_id: languageId,
                stdin: input,
                expected_output: expectedOutput,
                cpu_time_limit: 2,        // CPU実行時間制限（秒）
                memory_limit: 128000      // メモリ制限（KB）
            })
        });

        if (!response.ok) {
            throw new Error(`提出エラー (${response.status})`);
        }

        return await response.json();
    }

    /**
     * 提出された実行結果を取得
     * @param {string} token 実行トークン
     * @returns {Promise<Object>} 実行結果
     */
    async getSubmissionResult(token) {
        const response = await fetch(`${this.API_URL}/submissions/${token}?base64_encoded=false`, {
            headers: {
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                'X-RapidAPI-Key': this.API_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`結果取得エラー (${response.status})`);
        }

        return await response.json();
    }

    /**
     * 実行結果が完了するまで待機
     * @param {string} token 実行トークン
     * @returns {Promise<Object>} 最終的な実行結果
     * 
     * ステータスID:
     * 1: In Queue
     * 2: Processing
     * 3: Accepted
     * 4: Wrong Answer
     * 5: Time Limit Exceeded
     * 6: Compilation Error
     * 7: Runtime Error (SIGSEGV)
     * 8: Runtime Error (SIGXFSZ)
     * 9: Runtime Error (SIGFPE)
     * 10: Runtime Error (SIGABRT)
     * 11: Runtime Error (NZEC)
     * 12: Runtime Error (Other)
     * 13: Internal Error
     * 14: Exec Format Error
     */
    async waitForResult(token) {
        let result;
        do {
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1秒待機
            result = await this.getSubmissionResult(token);
        } while (result.status && result.status.id <= 2); // 実行完了まで待機
        return result;
    }
}

// Judge0 APIのグローバルインスタンスを作成
const judge0API = new Judge0API(); 