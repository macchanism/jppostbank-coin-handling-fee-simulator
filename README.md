# jpbank-coin-handling-fee-simulator

所持している硬貨をゆうちょATMに預け入れる時に、差し引かれる硬貨預払料金の割合を最小化するためのツール

## Usage
Webブラウザで [JapanPostBank CoinHandlingFee Simulator](http://jp-bank-coin-handling-fee-sim.matchaism.net) にアクセス
1. 硬貨の所持枚数を入力
2. `Run to simulate`で計算を実行
3. 計算結果(硬貨預払料金の割合を最小化する投入枚数の組み合わせ)が出力される

計算は端末のWebブラウザ上で実行されるので、過負荷などに注意

**負荷対策のため，計算をAPIサーバに任せてHTTPリクエストでやり取りするようにした．(悪用厳禁)**

APIサーバは予告なく止めることがある．API ver.が使えないときは従来のレガシー ver.を利用すること．

**これまで公開ページはHTTPSでアクセスできたが，APIサーバとの通信はHTTPSに対応していないため，HTTPで公開ページにアクセスする必要がある．**

## Requirement
  - PC，スマートフォン，タブレットなど
  - Webブラウザ
    - Chrome, Firefox, Safariなど
    - HTML5に対応していること
    - JavaScript: ON (optional)

## Dependency
  - [jQuery](https://jquery.com/)
    - version 3.6.0
    - [CDN](https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js)
  - [Bootstrap](https://getbootstrap.com/)
    - version 4.6.1
    - [CDN](https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css)

## Deploy
`js/api.js`の編集(59行目): APIリクエストの送信先の設定
```javascript
const url = 'http://<IP addr.>:<Port num.>/api';
```

APIサーバの起動
```bash
cd server
docker compose up -d --build
```

## License
MIT License
