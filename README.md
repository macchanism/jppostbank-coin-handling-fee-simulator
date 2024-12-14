# jpbank-coin-handling-fee-simulator

[![pages-build-deployment](https://github.com/matchaism/jpbank-coin-handling-fee-simulator/actions/workflows/pages/pages-build-deployment/badge.svg?branch=gh-pages)](https://github.com/matchaism/jpbank-coin-handling-fee-simulator/actions/workflows/pages/pages-build-deployment)

所持している硬貨をゆうちょATMに預け入れる時に、差し引かれる硬貨預払料金の割合を最小化するためのツール

## Usage

Webブラウザで [JapanPostBank CoinHandlingFee Simulator](http://jp-bank-coin-handling-fee-sim.matchaism.net) にアクセス

1. 硬貨の所持枚数を入力
2. `Run to simulate`で計算を実行
3. 計算結果 (硬貨預払料金の割合を最小化する投入枚数の組み合わせ) を表示

計算は端末のWebブラウザ上で実行されるので、過負荷などに注意

## Development

### Setup

```bash
git clone <this_repository>
cd <this_repository>
npm init -y # npmプロジェクトの初期化
npm install @types/node typescript gh-pages --save-dev # node，TypeScriptとgh-pagesをインストール
npm install jquery @types/jquery --save # jQueryとjQueryの型定義ファイルをインストール
npx tsc --init # TypeScriptの設定ファイルを生成
# package.json, tsconfig.jsonを編集
npm install -g http-server  # or npm install -g serve
```

### Test

```bash
npm run build # ビルド
http-server build # サーバ起動
```

## Requirement

- PC，スマートフォン，タブレットなど
- Webブラウザ
  - Chrome, Firefox, Safariなど
  - HTML5に対応していること
  - JavaScript: ON

## Dependency

- [jQuery](https://jquery.com/) (ver. 3.7.1)
- [Bootstrap](https://getbootstrap.com/) (ver. 5.3.0)

## License

MIT License
