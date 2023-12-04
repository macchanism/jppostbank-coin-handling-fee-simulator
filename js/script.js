// ATM硬貨預払い手数料のシミュレーション

// 入力された硬貨の数量に基づいて総額を計算します。もし硬貨の数量が負の値であれば、エラーとして-1を返します。
function sum(a, b, c, d, e, f) {
  if (a < 0 || b < 0 || c < 0 || d < 0 || e < 0 || f < 0) {
    return -1;
  }
  return a + 5 * b + 10 * c + 50 * d + 100 * e + 500 * f;
}

// 入力された硬貨の数量に基づいて、硬貨預払料金を計算します。合計硬貨の数量によって異なる手数料が適用されます。計算結果が-1の場合、エラーとして返します。
function commission(a, b, c, d, e, f) {
  let totalCoins = a + b + c + d + e + f;
  let ret = -1;

  if (totalCoins >= 1 && totalCoins <= 25) {
    ret = 110;
  } else if (totalCoins <= 50) {
    ret = 220;
  } else if (totalCoins <= 100) {
    ret = 330;
  }
  return ret;
}

// 入力された硬貨の数量に基づいて、ATM硬貨預払料金の割合を計算します。もし計算結果が負の値であれば、エラーとして-1を返します。
function per(a, b, c, d, e, f, totalCost, totalCommission) {
  if (totalCost <= 0 || totalCommission < 0) {
    return -1;
  }
  return (100.0 * totalCommission) / totalCost;
}

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

// ページに計算のステータスを表示します。異なるモードに応じて「正常」、「計算中」、「終了」、「エラー」、「待機中」のいずれかのステータスを表示します。
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

// フォームから入力された硬貨の数量に基づいて、最適な組み合わせを見つけ、結果を表示します。結果が正常でない場合、エラーステータスを表示します。
function main() {
  const getInputValue = (id) => parseInt(document.getElementById(id).value);
  
  let a = getInputValue('1yen');
  let b = getInputValue('5yen');
  let c = getInputValue('10yen');
  let d = getInputValue('50yen');
  let e = getInputValue('100yen');
  let f = getInputValue('500yen');

  let minPer = 105.0;
  let arr = Array(9).fill(-1);

  status(1);

  for (let ai = Math.min(a, 100); ai >= 0; ai--) {
    for (let bi = Math.min(b, 100 - ai); bi >= 0; bi--) {
      for (let ci = Math.min(c, Math.max(0, 100 - ai - bi)); ci >= 0; ci--) {
        for (let di = Math.min(d, Math.max(0, 100 - ai - bi - ci)); di >= 0; di--) {
          for (let ei = Math.min(e, Math.max(0, 100 - ai - bi - ci - di)); ei >= 0; ei--) {
            for (let fi = Math.min(f, Math.max(0, 100 - ai - bi - ci - di - ei)); fi >= 0; fi--) {
              let totalSum = sum(ai, bi, ci, di, ei, fi);
              let totalCommission = commission(ai, bi, ci, di, ei, fi);
              let currentPer = per(ai, bi, ci, di, ei, fi, totalSum, totalCommission);
              
              if (currentPer < 0.0) continue;
              
              if (currentPer < minPer) {
                minPer = currentPer;
                arr = [ai, bi, ci, di, ei, fi, totalSum, totalCommission, currentPer];
              }
            }
          }
        }
      }
    }
  }

  if (minPer > 100.0 || minPer < 0.0) {
    status(-1);
    return -1;
  }

  result(arr);
  status(2);
  return 0;
}
