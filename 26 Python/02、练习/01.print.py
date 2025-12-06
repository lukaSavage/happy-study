# 1、最基本的打印 print(*objects, sep=' ', end='\n', file=sys.stdout)
print("Hello World")           # Hello World
# print(100)                     # 100
# print(3.14)                    # 3.14
# print(True)                    # True

# 2、打印多个值
# name = "Alice"
# age = 25
# print("姓名:", name, "年龄:", age)  # 姓名: Alice 年龄: 25

# # 可以混合不同类型
# print("数字:", 42, "布尔:", True, "浮点:", 3.14)
# # 数字: 42 布尔: True 浮点: 3.14

# # 3.1.sep - 分隔符
# # 使用逗号分隔
# print("A", "B", "C", sep=",")  # A,B,C

# # 使用连字符分隔
# print("年", "月", "日", sep="-")  # 年-月-日

# # 使用其他字符
# print("1", "2", "3", sep="*")  # 1*2*3

# # 无分隔符（直接拼接）
# print("Hello", "World", sep="")  # HelloWorld

# # 使用多个字符作为分隔符
# print("Python", "Java", "C++", sep=" | ")  # Python | Java | C++

# 3.2.end - 结束符

# # 默认换行
# print("第一行")
# print("第二行")
# # 输出:
# # 第一行
# # 第二行

# # 不换行，用空格连接
# print("Hello", end=" ")
# print("World", end="!")
# print()  # 手动换行
# # Hello World!

# # 连续输出
# print("加载中", end="")
# print("...", end="")
# print("完成")
# # 加载中...完成


# # 3.3.组合使用 sep 和 end

# # 组合使用
# print("苹果", "香蕉", "橙子", sep=", ", end=" 都是水果\n")
# # 苹果, 香蕉, 橙子 都是水果

# # 构建多行格式
# print("姓名", "年龄", "城市", sep=" | ", end="\n---\n")
# print("张三", "25", "北京", sep=" | ")
# # 姓名 | 年龄 | 城市
# # ---
# # 张三 | 25 | 北京

# # 输出到文件
# with open("output.txt", "w", encoding="utf-8") as f:
#     print("这是写入文件的内容", file=f)
#     print("第二行内容", file=f)

# # 输出到标准错误
# import sys

# print("这是一个错误信息", file=sys.stderr)

# # 输出到多个目标
# with open("log.txt", "w") as log_file:
#     message = "重要信息"
#     print(message)  # 输出到屏幕
#     print(message, file=log_file)  # 输出到文件


# 4.格式化输出
# 4.1.f-string（推荐）
# f-string 是 Python 3.6+ 推荐的字符串格式化方式，语法简洁、可读性强。在字符串前加上 f，并用花括号 {} 包含变量或表达式。
name = "Bob"
age = 30
score = 95.567

# 基本用法
# print(f"姓名: {name}, 年龄: {age}")

# # 表达式计算
# print(f"明年年龄: {age + 1}")
# print(f"分数翻倍: {score * 2}")

# # 数字格式化
# print(f"分数: {score:.1f}")      # 保留1位小数: 95.6
# print(f"分数: {score:.2f}")      # 保留2位小数: 95.57

# # 对齐和填充
# print(f"{name:>10}")            # 右对齐，宽度10:        Bob
# print(f"{name:<10}")            # 左对齐，宽度10: Bob
# print(f"{name:^10}")            # 居中对齐: Bob

# # 进制转换
# num = 255
# print(f"十进制: {num}, 十六进制: {num:x}, 二进制: {num:b}")
# 十进制: 255, 十六进制: ff, 二进制: 11111111

# 4.3.% 格式化（传统）
# % 格式化是 Python 早期的字符串格式化方式，目前仍然可用但不推荐。

# name = "Bob"
# age = 30
# score = 95.5

# # 基本用法
# print("姓名: %s, 年龄: %d, 分数: %.2f" % (name, age, score))

# 占位符说明
# %s - 字符串
# %d - 整数
# %f - 浮点数
# %.2f - 保留2位小数的浮点数
# %x - 十六进制整数


# print("姓名", "年龄", "城市", sep=" | ", end="\n---\n")
# print("张三", "25", "北京", sep=" | ")


# name = "Bob"
# age = 30
# score = 95.5

# # 按顺序填充
# print("姓名: {}, 年龄: {}".format(name, age))

# # 指定索引
# print("{1}的年龄是{0}".format(age, name))  # Bob的年龄是30

# # 使用关键字参数
# print("姓名: {n}, 年龄: {a}".format(n=name, a=age))

# # 数字格式化
# print("分数: {:.2f}".format(score))  # 保留2位小数

# # 对齐和填充
# print("{:<10} {:>10}".format(name, age))  # 左对齐和右对齐
