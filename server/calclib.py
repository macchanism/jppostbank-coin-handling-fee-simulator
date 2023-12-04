def sum_cost(coin_counts:list):
    coin_values = [1, 5, 10, 50, 100, 500]
    return sum(coin_values[idx] * coin_counts[idx] for idx in range(6))

def commission(coin_counts:list):
    total_coins = sum(coin_counts)
    if total_coins < 1:
        return -1
    elif total_coins <= 25:
        return 110
    elif total_coins <= 50:
        return 220
    elif total_coins <= 100:
        return 330
    return -1

def per(coin_counts:list):
    total_cost = sum_cost(coin_counts)
    total_commission = commission(coin_counts)

    if total_cost <= 0 or total_commission < 0:
        return -1
    return 100.0 * total_commission / total_cost

def calculate(src_dict:dict):
    min_per = 105.0
    ret_dict = {"1": -1, "5": -1, "10": -1, "50": -1, "100": -1, "500": -1, "input": -1, "deposit": -1, "per": -1}
    ret_list = [-1] * 6

    for idx0 in range(src_dict["1"], -1, -1):
        for idx1 in range(src_dict["5"], -1, -1):
            for idx2 in range(src_dict["10"], -1, -1):
                for idx3 in range(src_dict["50"], -1, -1):
                    for idx4 in range(src_dict["100"], -1, -1):
                        for idx5 in range(src_dict["500"], -1, -1):
                            current_per = per([idx0, idx1, idx2, idx3, idx4, idx5])
                            if current_per < 0.0:
                                continue
                            if current_per < min_per:
                                min_per = current_per
                                ret_list = [idx0, idx1, idx2, idx3, idx4, idx5]

    if min_per < 0.0 or 100.0 < min_per:
        return ret_dict
    
    ret_list = ret_list + [sum_cost(ret_list), commission(ret_list), per(ret_list)]
    for idx, key in enumerate(ret_dict.keys()):
        ret_dict[key] = ret_list[idx]
    return ret_dict