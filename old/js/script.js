// ATM硬貨預払い手数料のシミュレーション

const coinValues = [1, 5, 10, 50, 100, 500];

// 各硬貨の手数料を計算する関数
function calculateFee(combination) {
  // 合計硬貨枚数を計算
  const totalCoins = combination.reduce((acc, val) => acc + val, 0);

  // 手数料の計算
  if (1 <= totalCoins && totalCoins <= 25) {
    return 110;
  } else if (26 <= totalCoins && totalCoins <= 50) {
    return 220;
  } else if (51 <= totalCoins && totalCoins <= 100) {
    return 330;
  } else {
    throw new Error("Invalid total coins"); // 100枚を超える場合はエラーを発生させる
  }
}

// 組み合わせを生成するヘルパー関数
function generateCombinationsHelper(query, index, current, result) {
  if (index === query.length) {
    result.push([...current]);
    return;
  }

  // 各硬貨の組み合わせを再帰的に生成
  for (let i = 0; i <= query[index]; i++) {
    current[index] = i;
    generateCombinationsHelper(query, index + 1, current, result);
  }
}

// 組み合わせを生成する関数
function generateCombinations(query) {
  const result = [];
  generateCombinationsHelper(query, 0, [], result);
  return result;
}

// 最適な硬貨の組み合わせを見つける関数
function findOptimalCombination(query) {
  let bestCombination = null;
  let minFeeRatio = Infinity;
  let maxTotalCoins = 0;

  // 各硬貨の組み合わせを試す
  const combinations = generateCombinations(query);
  for (const combination of combinations) {
    const totalCoins = combination.reduce((acc, val) => acc + val, 0);

    try {
      const fee = calculateFee(combination);

      const totalValue = combination.reduce((acc, val, index) => acc + val * coinValues[index], 0);
      const feeRatio = fee / totalValue;

      // 手数料の割合が最小の場合または手数料の割合が同じで合計枚数が最大の場合を更新
      if (feeRatio < minFeeRatio || (feeRatio === minFeeRatio && maxTotalCoins < totalCoins && totalCoins <= 100)) {
        minFeeRatio = feeRatio;
        bestCombination = combination;
        maxTotalCoins = totalCoins;
      }
    } catch (error) {
      // エラーが発生した場合はスキップ
      continue;
    }
  }

  return [bestCombination, minFeeRatio];
}

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

// フォームから入力された硬貨の数量に基づいて、最適な組み合わせを見つけ、結果を表示します。結果が正常でない場合、エラーステータスを表示します。
function main() {
  // フォームから入力された硬貨の数量を取得
  const getInputValue = (id) => parseInt(document.getElementById(id).value);
  let a = getInputValue('1yen');
  let b = getInputValue('5yen');
  let c = getInputValue('10yen');
  let d = getInputValue('50yen');
  let e = getInputValue('100yen');
  let f = getInputValue('500yen');

  try {
    // 計算中のステータスを表示
    displayStatusOnWebPage(1);

    // 最適な硬貨の組み合わせと手数料の割合を求める
    const [bestCombination, minFeeRatio] = findOptimalCombination([a, b, c, d, e, f]);

    //console.log("Optimal Coin Combination:", bestCombination);
    //console.log("Minimum Fee Ratio:", minFeeRatio);

    // 最適な組み合わせでの手数料と合計金額を計算
    const optimalFee = calculateFee(bestCombination);
    const optimalTotalValue = bestCombination.reduce((acc, val, index) => acc + val * coinValues[index], 0);

    //console.log("Optimal Fee for the Combination:", optimalFee);
    //console.log("Optimal Total Value for the Combination:", optimalTotalValue);

    // エラーレートが100%以上または0未満の場合、エラーステータスを表示
    if (minFeeRatio > 100.0 || minFeeRatio < 0.0) {
      displayStatusOnWebPage(-1);
      return -1;
    }

    // 結果をHTMLに表示
    result(bestCombination.concat([optimalTotalValue], [optimalFee], [minFeeRatio * 100.0]));
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
