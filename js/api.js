// ATM硬貨預払い手数料のシミュレーション

// script.jsからの変更点:
// - main関数でAPIに対して非同期リクエスト(fetch)を送信し、その結果を処理
// - エラーハンドリングが改善され、HTTPエラーが発生した場合やAPIから返されたデータがエラーを示す場合にエラーメッセージがコンソールに表示

// シミュレーションの結果をHTMLページに表示します。特定のHTML要素に計算結果を表示します。小数点以下5桁まで表示されるように設定されています。
function result(A) {
  let idArray = [
    'result-1', 'result-5', 'result-10', 'result-50', 'result-100', 'result-500', 'result-input', 'result-deposit', 'result-per'
 ];

	for (let i = 0; i < 8; i++) {
		document.getElementById(idArray[i]).innerHTML = String(A[i]);
	}

	document.getElementById(idArray[8]).innerHTML = String(A[8].toFixed(5));
}

// エラーが発生した場合に呼び出され、計算結果の表示をすべて'-'に設定します。
function resultError() {
	let idArray = [
		'result-1', 'result-5', 'result-10', 'result-50', 'result-100', 'result-500', 'result-input', 'result-deposit', 'result-per'
	];

	for (let i = 0; i < 9; i++) {
		document.getElementById(idArray[i]).innerHTML = '-';
	}
}

// ページに計算のステータスを表示します。異なるモードに応じて、「正常」、「計算中」、「終了」、「エラー」、「待機中」のいずれかのステータスを表示します。
function status(mode) {
	let nowLog = '';
	let element = document.getElementById('log');

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
	element.innerHTML = '<p>' + nowLog + '</p>';
}

// フォームから入力された硬貨の数量に基づいて、APIを使用して最適な組み合わせを見つけ、結果を表示します。結果が正常でない場合、エラーステータスを表示します。
async function main() {
  const url = '160.251.12.126:5000/api';
  //const url = 'http://localhost:5000/api';
  const coinValues = {
    '1': parseInt(document.getElementById('1yen').value),
    '5': parseInt(document.getElementById('5yen').value),
    '10': parseInt(document.getElementById('10yen').value),
    '50': parseInt(document.getElementById('50yen').value),
    '100': parseInt(document.getElementById('100yen').value),
    '500': parseInt(document.getElementById('500yen').value)
  };

  try {
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

    const arr = await response.json();

    if (arr[0] < 0) {
      status(-1);
      return -1;
    }

    result(arr);
    status(2);
    return 0;
  } catch (error) {
    console.error('Error during fetch operation:', error);
    status(-1);
    return -1;
  }
}