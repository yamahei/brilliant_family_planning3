BFP: Brilliant Family Planning3
===============================

![](./public/favicon.ico.png)

これは何
---------
- 家庭の収支を入力、未来の銀行残高を予測して、未来に備えるためのツール
- Webアプリだが、データはブラウザのIndexedDBに保存される（API通信なしのSPA）
- 過去何度か開発して、毎回頓挫しているので、今度こそ完成させる

使い方
------

### 開発環境のセットアップ

[Deno](https://deno.com/)がインストールされている環境で、以下のコマンドを実行してください。

```sh
# 依存関係のインストール
$ deno install
#$ deno install --reload # update all dependencies

# ローカル開発サーバーの起動
$ deno run dev
#$ deno upgrade && deno run dev

# テストの実行
$ deno test
```

アーキテクチャ
--------------

- [Deno](https://deno.com/)
- [Vue 3](https://ja.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://ja.vite.dev/)

参考サイト
-----------

- [Vue3で作ったWebサイトを Vite PWA でPWA化する方法 2024年版](https://future-architect.github.io/articles/20241127a/)
- [「絵文字」の利用で気をつけた方が良いこと、安全な使い方について](https://note.com/ajalaca_ui/n/ne6a18feb4ca5)