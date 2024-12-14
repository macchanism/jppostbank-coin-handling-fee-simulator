"use strict";
// ATM硬貨預払い手数料のシミュレーション
const coinValues = [1, 5, 10, 50, 100, 500];
// 各硬貨の手数料を計算する関数
function calculateFee(combination) {
    const totalCoins = combination.reduce((acc, val) => acc + val, 0);
    if (1 <= totalCoins && totalCoins <= 25) {
        return 110;
    }
    else if (26 <= totalCoins && totalCoins <= 50) {
        return 220;
    }
    else if (51 <= totalCoins && totalCoins <= 100) {
        return 330;
    }
    else {
        throw new Error("Invalid total coins");
    }
}
// 組み合わせを生成するヘルパー関数
function generateCombinationsHelper(query, index, current, result) {
    if (index === query.length) {
        result.push([...current]);
        return;
    }
    for (let i = 0; i <= query[index]; i++) {
        current[index] = i;
        generateCombinationsHelper(query, index + 1, current, result);
    }
}
// 組み合わせを生成する関数
function generateCombinations(query) {
    const result = [];
    generateCombinationsHelper(query, 0, new Array(query.length).fill(0), result);
    return result;
}
// 最適な硬貨の組み合わせを見つける関数
function findOptimalCombination(query) {
    let bestCombination = null;
    let minFeeRatio = Infinity;
    let maxTotalCoins = 0;
    const combinations = generateCombinations(query);
    for (const combination of combinations) {
        const totalCoins = combination.reduce((acc, val) => acc + val, 0);
        try {
            const fee = calculateFee(combination);
            const totalValue = combination.reduce((acc, val, index) => acc + val * coinValues[index], 0);
            const feeRatio = fee / totalValue;
            if (feeRatio < minFeeRatio ||
                (feeRatio === minFeeRatio && maxTotalCoins < totalCoins && totalCoins <= 100)) {
                minFeeRatio = feeRatio;
                bestCombination = combination;
                maxTotalCoins = totalCoins;
            }
        }
        catch (error) {
            continue;
        }
    }
    return [bestCombination, minFeeRatio];
}
// シミュレーションの結果をHTMLページに表示
function result(resultArray) {
    const idArray = [
        'result-1', 'result-5', 'result-10', 'result-50', 'result-100', 'result-500', 'result-input', 'result-deposit', 'result-per'
    ];
    for (let i = 0; i < 8; i++) {
        document.getElementById(idArray[i]).innerHTML = String(resultArray[i]);
    }
    document.getElementById(idArray[8]).innerHTML = String(resultArray[8].toFixed(5));
}
// エラーが発生した場合の処理
function resultError() {
    const idArray = [
        'result-1', 'result-5', 'result-10', 'result-50', 'result-100', 'result-500', 'result-input', 'result-deposit', 'result-per'
    ];
    for (let i = 0; i < 9; i++) {
        document.getElementById(idArray[i]).innerHTML = '-';
    }
}
// ページに計算のステータスを表示
function displayStatusOnWebPage(mode) {
    let nowLog = '';
    const element = document.getElementById('log');
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
    element.innerHTML = `<p>${nowLog}</p>`;
}
// 入力に基づいて最適な組み合わせを計算
function simulate() {
    const getInputValue = (id) => parseInt(document.getElementById(id).value);
    const a = getInputValue('1yen');
    const b = getInputValue('5yen');
    const c = getInputValue('10yen');
    const d = getInputValue('50yen');
    const e = getInputValue('100yen');
    const f = getInputValue('500yen');
    try {
        displayStatusOnWebPage(1);
        const [bestCombination, minFeeRatio] = findOptimalCombination([a, b, c, d, e, f]);
        if (!bestCombination || minFeeRatio > 100.0 || minFeeRatio < 0.0) {
            displayStatusOnWebPage(-1);
            return -1;
        }
        const optimalFee = calculateFee(bestCombination);
        const optimalTotalValue = bestCombination.reduce((acc, val, index) => acc + val * coinValues[index], 0);
        result([...bestCombination, optimalTotalValue, optimalFee, minFeeRatio * 100.0]);
        displayStatusOnWebPage(2);
        return 0;
    }
    catch (error) {
        console.error("Error:", error.message);
        displayStatusOnWebPage(-1);
        return -1;
    }
}
