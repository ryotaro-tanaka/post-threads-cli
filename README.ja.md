# Threads Post CLI

このプロジェクトは、コマンドラインから Threads API を使用して投稿を行うためのシンプルな CLI ツールです。`.env` ファイルに設定されたトークンを使用して、メッセージを Threads に公開します。

## 使い方

以下のコマンドを実行することで、Threads に投稿できます。

```bash
npm run threads "投稿したいメッセージ"
```

## セットアップ

1.  `.sample.env` をコピーして `.env` ファイルを作成します。
2.  Meta for Developers で取得した長期アクセストークンを `THREADS_LONG_LIVED_TOKEN` に設定します。

```env
THREADS_LONG_LIVED_TOKEN=your_long_lived_token
```

## 1. 長期アクセストークン（LONG_LIVED_TOKEN）の取得方法

Meta for Developers の管理画面から取得します。

1.  Meta for Developers で既存の Threads アプリを開きます。
2.  左メニューの「公開」をクリックし、「Threads API にアクセス」を選択します。
3.  ユースケースの設定画面から「ユーザートークン生成ツール」までスクロールします。
4.  対象の Threads アカウント（テスター登録済み）の「アクセストークンを生成」をクリックします。
5.  生成されたトークンをコピーし、`.env` の `THREADS_LONG_LIVED_TOKEN` に設定します。

## 内部の仕組み

`npm run threads` を実行すると、内部で以下の 3 ステップの API 実行が行われます。

1.  **ユーザー ID の取得**: `LONG_LIVED_TOKEN` を使用して、投稿先アカウントのユーザー ID を取得します。
2.  **投稿コンテナの作成**: 投稿したいテキストを指定して、メディアコンテナ（投稿の準備状態）を作成します。
3.  **投稿の公開**: 作成されたコンテナ ID を指定して、実際に Threads へ公開します。

---

## 手動での実行（デバッグ用）

API の動作を個別に確認したい場合は、以下の `curl` コマンドを使用してください。

### 1. ユーザー ID の確認
```bash
curl -s "https://graph.threads.net/v1.0/me?fields=id,username&access_token=YOUR_LONG_LIVED_TOKEN"
```

### 2. 投稿コンテナの作成
```bash
curl -X POST "https://graph.threads.net/v1.0/THREADS_USER_ID/threads" \
  -F media_type=TEXT \
  -F text='test post from curl' \
  -F access_token=YOUR_LONG_LIVED_TOKEN
```

### 3. 投稿の公開
```bash
curl -X POST "https://graph.threads.net/v1.0/THREADS_USER_ID/threads_publish" \
  -F creation_id=CREATION_ID \
  -F access_token=YOUR_LONG_LIVED_TOKEN
```
