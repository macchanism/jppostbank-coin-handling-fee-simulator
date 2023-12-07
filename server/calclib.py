from itertools import product

def calculate_fee(combination):
    # 合計硬貨枚数を計算
    total_coins = sum(combination)

    # 手数料の計算
    if 1 <= total_coins <= 25:
        return 110
    elif 26 <= total_coins <= 50:
        return 220
    elif 51 <= total_coins <= 100:
        return 330
    else:
        #return float('inf')  # 100枚を超える場合は無限大とする
        raise ValueError("Invalid total coins")  # 100枚を超える場合はエラーを発生させる

def find_optimal_combination(query):
    coin_values = [1, 5, 10, 50, 100, 500]
    best_combination = None
    min_fee_ratio = float('inf')
    max_total_coins = 0

    # 各硬貨の組み合わせを試す
    for combination in product(*[range(q+1) for q in query]):
        total_coins = sum(combination)
        try:
            fee = calculate_fee(combination)
        except ValueError:
            continue  # 無効な合計硬貨数の場合はスキップ

        total_value = sum(c * v for c, v in zip(combination, coin_values))
        fee_ratio = fee / total_value

        # 手数料の割合が最小の場合または手数料の割合が同じで合計枚数が最大の場合を更新
        if fee_ratio < min_fee_ratio or (fee_ratio == min_fee_ratio and max_total_coins < total_coins <= 100):
            min_fee_ratio = fee_ratio
            best_combination = combination
            max_total_coins = total_coins

    return best_combination, min_fee_ratio

def calculate(src:dict):
  try:
    query = [src["1"], src["5"], src["10"], src["50"], src["100"], src["500"]]
    result = {"1": -1, "5": -1, "10": -1, "50": -1, "100": -1, "500": -1, "input": -1, "deposit": -1, "per": -1}

    # 最適な硬貨の組み合わせと手数料の割合を求める
    best_combination, min_fee_ratio = find_optimal_combination(query)

    # 最適な組み合わせでの手数料と合計金額を計算
    optimal_fee = calculate_fee(best_combination)
    optimal_total_value = sum(c * v for c, v in zip(best_combination, [1, 5, 10, 50, 100, 500]))

    for idx, key in enumerate(["1", "5", "10", "50", "100", "500"]):
      result[key] = best_combination[idx]

    result["input"] = optimal_total_value
    result["deposit"] = optimal_fee
    result["per"] = min_fee_ratio * 100.0

    return result

  except ValueError:
    return result


'''
try:
  # 最適な硬貨の組み合わせと手数料の割合を求める
  best_combination, min_fee_ratio = find_optimal_combination([30,20,10,20,10,20])

  # 結果を出力
  print("Optimal Coin Combination:", best_combination)
  print("Minimum Fee Ratio:", min_fee_ratio)

  # 最適な組み合わせでの手数料と合計金額を計算
  optimal_fee = calculate_fee(best_combination)
  optimal_total_value = sum(c * v for c, v in zip(best_combination, [1, 5, 10, 50, 100, 500]))

  # 最適な組み合わせでの手数料と合計金額も出力
  print("Optimal Fee for the Combination:", optimal_fee)
  print("Optimal Total Value for the Combination:", optimal_total_value)

except ValueError as e:
  print(f"Error: {e}")
'''