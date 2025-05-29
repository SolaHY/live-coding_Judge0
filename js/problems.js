/**
 * プログラミング問題のテンプレートと設定
 * - 問題の説明
 * - テストケース
 * - 各言語用のテンプレートコード
 */
const problemTemplates = {
    // 問題1: 2数の合計計算
    sum: {
        title: '1. 数字の合計',
        description: `2つの整数を入力として受け取り、その合計を出力するプログラムを作成してください。

入力:
2つの整数 a, b (0 ≤ a, b ≤ 100)

出力:
2つの整数の合計

入力例:
5 3

出力例:
8

ヒント:
- PHP: fgets(STDIN)で1行の入力を受け取れます
- PHP: explode()で文字列を分割できます
- PHP: intval()で文字列を整数に変換できます`,
        // テストケース定義
        testCases: [
            { input: '5 3', expected: '8' },
            { input: '10 20', expected: '30' },
            { input: '0 0', expected: '0' }
        ],
        // 各言語のテンプレートコード
        templates: {
            // Java (OpenJDK 13.0.1)
            '62': `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();
        // ここにコードを書いてください
    }
}`,
            // Python (3.8.1)
            '71': `# 入力を受け取る
a, b = map(int, input().split())
# ここにコードを書いてください
`,
            // JavaScript (Node.js 12.14.0)
            '63': `// 入力を受け取る
const input = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

input.on('line', (line) => {
    const [a, b] = line.split(' ').map(Number);
    // ここにコードを書いてください
});`,
            // C++ (GCC 9.2.0)
            '75': `#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    // ここにコードを書いてください
    return 0;
}`,
            // PHP (7.4.1)
            '68': `<?php
// 入力を受け取る
$line = trim(fgets(STDIN));
list($a, $b) = explode(' ', $line);
$a = intval($a);
$b = intval($b);
// ここにコードを書いてください

?>`
        }
    },

    // 問題2: FizzBuzz実装
    fizzbuzz: {
        title: '2. FizzBuzz',
        description: `1から指定された数までのFizzBuzzを出力するプログラムを作成してください。
3の倍数のときは"Fizz"、5の倍数のときは"Buzz"、3と5の倍数のときは"FizzBuzz"を出力してください。
それ以外の場合は数字をそのまま出力してください。

入力:
正の整数 N (1 ≤ N ≤ 100)

出力:
1からNまでのFizzBuzz

入力例:
15

出力例:
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz`,
        // テストケース定義
        testCases: [
            { input: '15', expected: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz' },
            { input: '5', expected: '1\n2\nFizz\n4\nBuzz' }
        ],
        // 各言語のテンプレートコード
        templates: {
            // Java
            '62': `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        // ここにコードを書いてください
    }
}`,
            // Python
            '71': `# 入力を受け取る
N = int(input())
# ここにコードを書いてください
`,
            // JavaScript
            '63': `// 入力を受け取る
const input = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

input.on('line', (line) => {
    const N = parseInt(line);
    // ここにコードを書いてください
});`,
            // C++
            '75': `#include <iostream>
using namespace std;

int main() {
    int N;
    cin >> N;
    // ここにコードを書いてください
    return 0;
}`,
            // PHP
            '68': `<?php
// 入力を受け取る
$N = intval(trim(fgets(STDIN)));
// ここにコードを書いてください

?>`
        }
    },

    // 問題3: PHPフォーム処理
    php_form: {
        title: '3. PHPフォーム処理',
        description: `HTMLフォームからのPOSTデータを処理するPHPスクリプトを作成してください。

要件:
1. 名前(name)とメールアドレス(email)を受け取ります
2. 両方の値が空でないことを確認します
3. メールアドレスの形式が正しいことを確認します
4. 正しい場合は "Welcome, [名前]!" と出力します
5. エラーがある場合は "Error: [エラーメッセージ]" と出力します

入力例:
name=John&email=john@example.com

出力例:
Welcome, John!

ヒント:
- $_POSTでフォームデータを受け取ります
- filter_var()でメールアドレスを検証できます
- empty()で空チェックができます`,
        // テストケース定義
        testCases: [
            { input: 'name=John&email=john@example.com', expected: 'Welcome, John!' },
            { input: 'name=&email=test@test.com', expected: 'Error: Name is required' },
            { input: 'name=Alice&email=invalid-email', expected: 'Error: Invalid email format' }
        ],
        // PHPのみのテンプレート（フォーム処理はPHP専用問題）
        templates: {
            '68': `<?php
// POSTデータをシミュレート
parse_str(trim(fgets(STDIN)), $_POST);

// ここにコードを書いてください
// 1. $_POST['name'] と $_POST['email'] を取得
// 2. バリデーションを実装
// 3. 結果を出力

?>`
        }
    }
};

/**
 * Judge0 APIの言語IDとMonaco Editorの言語マッピング
 * - 62: Java (OpenJDK 13.0.1)
 * - 71: Python (3.8.1)
 * - 63: JavaScript (Node.js 12.14.0)
 * - 75: C++ (GCC 9.2.0)
 * - 68: PHP (7.4.1)
 */
const languageMap = {
    '62': 'java',
    '71': 'python',
    '63': 'javascript',
    '75': 'cpp',
    '68': 'php'
}; 