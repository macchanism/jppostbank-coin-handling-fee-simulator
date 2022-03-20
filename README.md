# jpbank-coin-handling-fee-simulator

所持している硬貨をゆうちょATMに預け入れる時に、差し引かれる硬貨預払料金の割合を最小化するためのツール

## Usage
Webブラウザで [JapanPostBank CoinHandlingFee Simulator](https://jp-bank-coin-handling-fee-sim.matchaism.net) にアクセス
1. 硬貨の所持枚数を入力
2. `Run to simulate`で計算を実行
3. 計算結果(硬貨預払料金の割合を最小化する投入枚数の組み合わせ)が出力される

計算は端末のWebブラウザ上で実行されるので、過負荷などに注意

## Requirement
  - PC, スマートフォン
  - Webブラウザ
    - Chrome, Firefox, Safari
    - HTML5に対応していること
    - JavaScript: ON (required)

## Dependency
  - [jQuery](https://jquery.com/)
    - version 3.6.0
    - [CDN](https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js)
  - [Bootstrap](https://getbootstrap.com/)
    - version 4.6.1
    - [CDN](https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css)

## License
MIT License
