// ATM硬貨預払い手数料のシミュレーション

// シミュレーションの結果をHTMLページに表示します。特定のHTML要素に計算結果を表示します。小数点以下5桁まで表示されるように設定されています。
function result(resultArray) {
  // 結果を表示するHTML要素のID
  let idArray = [
    'result-1', 'result-5', 'result-10', 'result-50', 'result-100', 'result-500', 'result-input', 'result-deposit', 'result-per'
  ];

  // 結果をHTMLに表示
  for (let i = 0; i < 8; i++) {
    document.getElementById(idArray[i]).innerHTML = String(resultArray[i]);
  }

  // 小数点以下5桁まで表示
  document.getElementById(idArray[8]).innerHTML = String(resultArray[8].toFixed(5));
}

// エラーが発生した場合に呼び出され、計算結果の表示をすべて'-'に設定します。
function resultError() {
  // エラー時に表示をクリア
  let idArray = [
    'result-1', 'result-5', 'result-10', 'result-50', 'result-100', 'result-500', 'result-input', 'result-deposit', 'result-per'
  ];

  for (let i = 0; i < 9; i++) {
    document.getElementById(idArray[i]).innerHTML = '-';
  }
}

// ページに計算のステータスを表示します。異なるモードに応じて「正常」、「計算中」、「終了」、「エラー」、「待機中」のいずれかのステータスを表示します。
function displayStatusOnWebPage(mode) {
  // ステータスを表示するHTML要素
  let nowLog = '';
  let element = document.getElementById('log');

  // モードに応じてステータスを設定
  switch (mode) {
    case 0:
      nowLog = '正常';
      break;
    case 1:
      nowLog = '計算中...';
      break;
    case 2:
      nowLog = '終了';
      break;
    case -1:
      nowLog = 'エラー';
      resultError();
      break;
    default:
      nowLog = '待機中';
      break;
  }

  // ステータスをHTMLに表示
  element.innerHTML = '<p>' + nowLog + '</p>';
}

// フォームから入力された硬貨の数量に基づいて、APIを使用して最適な組み合わせを見つけ、結果を表示します。結果が正常でない場合、エラーステータスを表示します。
async function main() {
  const url = 'http://<IP addr.>:<Port num.>/api';

  // フォームから入力された硬貨の数量を取得
  const getInputValue = (id) => parseInt(document.getElementById(id).value);
  const coinValues = {
    '1': getInputValue('1yen'),
    '5': getInputValue('5yen'),
    '10': getInputValue('10yen'),
    '50': getInputValue('50yen'),
    '100': getInputValue('100yen'),
    '500': getInputValue('500yen')
  };

  try {
    // 計算中のステータスを表示
    displayStatusOnWebPage(1);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(coinValues)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseArray = await response.json();

    // エラーステータスを表示
    if (responseArray.some(v => v < 0)) {
      displayStatusOnWebPage(-1);
      return -1;
    }

    // 結果をHTMLに表示
    result(responseArray);
    // 正常終了のステータスを表示
    displayStatusOnWebPage(2);
    return 0;

  } catch (error) {
    // エラーメッセージをコンソールに出力
    console.error("Error:", error.message);
    // エラーステータスを表示
    displayStatusOnWebPage(-1);
    return -1;
  }
}