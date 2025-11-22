# # 基本整型定义
# positive = 42
# negative = -15
# zero = 0

# print(f"positive: {positive}, 类型: {type(positive)}")  # <class 'int'>
# print(f"negative: {negative}, 类型: {type(negative)}")  # <class 'int'>
# print(f"zero: {zero}, 类型: {type(zero)}")              # <class 'int'>
# print(f'{type('hehe')}')

# 2.不同进制的整型表示
# Python支持多种进制表示整数：

# 十进制 (默认)
# decimal = 10
# print(f"十进制 10: {decimal}")

# # 二进制 (以 0b 或 0B 开头)
# binary = 0b1010  # 二进制 1010 = 十进制 10
# print(f"二进制 0b1010: {binary}")

# # 八进制 (以 0o 或 0O 开头)
# octal = 0o12  # 八进制 12 = 十进制 10
# print(f"八进制 0o12: {octal}")

# # 十六进制 (以 0x 或 0X 开头)
# hexadecimal = 0xA  # 十六进制 A = 十进制 10
# print(f"十六进制 0xA: {hexadecimal}")

# # 使用下划线提高可读性 (Python 3.6+)
# large_number = 1_000_000
# print(f"大数字: {large_number}")

# credit_card = 1234_5678_9012_3456
# print(f"信用卡号: {credit_card}")

# bytes_value = 0b1100_1010_1111_0101
# print(f"字节值: {bytes_value}")

# 3.整型转换函数
# 其他类型转整型
# print("类型转换:")
# print(f"int(3.14) = {int(3.14)}")          # 浮点数转整型 (截断小数)
# print(f"int(-2.99) = {int(-2.99)}")        # -2
# print(f"int('100') = {int('100')}")        # 字符串转整型
# print(f"int('1010', 2) = {int('1010', 2)}") # 二进制字符串转十进制
# print(f"int('FF', 16) = {int('FF', 16)}")  # 十六进制字符串转十进制
# print(f"int(True) = {int(True)}")          # 布尔值转整型 (True=1)
# print(f"int(False) = {int(False)}")        # 布尔值转整型 (False=0)

# # 进制转换函数
# number = 10
# print(f"\n数字 {number} 的不同进制表示:")
# print(f"二进制: {bin(number)}")      # 0b1010
# print(f"八进制: {oct(number)}")      # 0o12
# print(f"十六进制: {hex(number)}")    # 0xa
# print(int(False))

# 4.整型运算
# 4.1.基本算术运算

# a, b = 10, 3

# print("基本算术运算:")
# print(f"{a} + {b} = {a + b}")      # 加法: 13
# print(f"{a} - {b} = {a - b}")      # 减法: 7
# print(f"{a} * {b} = {a * b}")      # 乘法: 30
# print(f"{a} / {b} = {a / b}")      # 除法: 3.333... (返回浮点数)
# print(f"{a} // {b} = {a // b}")    # 整除: 3
# print(f"{a} % {b} = {a % b}")      # 取余: 1
# print(f"{a} ** {b} = {a ** b}")    # 幂运算: 1000
# print(f"-{a} = {-a}")              # 取负: -10
# print(f"+{a} = {+a}")              # 取正: 10

# 4.3.比较运算
# a, b = 10, 5

# print("比较运算:")
# print(f"{a} == {b}: {a == b}")    # 等于: False
# print(f"{a} != {b}: {a != b}")    # 不等于: True
# print(f"{a} > {b}: {a > b}")      # 大于: True
# print(f"{a} < {b}: {a < b}")      # 小于: False
# print(f"{a} >= {b}: {a >= b}")    # 大于等于: True
# print(f"{a} <= {b}: {a <= b}")    # 小于等于: False

# # 链式比较
# c = 7
# print(f"\n链式比较:")
# print(f"{b} < {c} < {a}: {b < c < a}")  # True
# print(f"{a} > {c} > {b}: {a > c > b}")  # True


# 6.内置数学函数

# ①、int(x)：将x转换为整型。
# 内置数学函数math
# ①、abs(x)：返回x的绝对值。
# ②、max(x1, x2, ...)：返回一组数中的最大值。
# ③、min(x1, x2, ...)：返回一组数中的最小值。
# ④、sum(iterable)：返回可迭代对象中所有元素的和。
# ⑤、pow(x, y)：返回x的y次幂。
# ⑥、round(x, n)：将x四舍五入到n位小数。
# ⑦、math.ceil(x)：返回大于等于x的最小整数。
# ⑧、math.floor(x)：返回小于等于x的最大整数。
# 示例代码如下：
# for num in numbers:
#     print(f"abs({num}) = {abs(num)}")          # 绝对值

# print(f"\n最大值: {max(1, 5, 2, 8, 3)}")      # 8
# print(f"最小值: {min(1, 5, 2, 8, 3)}")        # 1
# print(f"求和: {sum([1, 2, 3, 4, 5])}")        # 15

# # 更多数学函数
# print(f"\n高级数学函数:")
# print(f"2的3次方: {pow(2, 3)}")               # 8
# print(f"四舍五入: {round(3.14159, 2)}")       # 3.14
# print(f"向上取整: {math.ceil(3.14)}")         # 4
# print(f"向下取整: {math.floor(3.14)}")         # 3
