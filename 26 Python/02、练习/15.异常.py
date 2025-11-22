try:
    x = int(input("请输入一个整数: "))
    y = 10 / x
    print("结果:", y)
except ValueError:
    print("输入的不是有效整数！")
except ZeroDivisionError:
    print("不能除以零！")