# # 字符串的创建方式
# str1 = '单引号字符串'
# str2 = "双引号字符串"
# str3 = '''三引号可以
# 创建多行
# 字符串'''
# str4 = """同样支持
# 多行文本"""

# print(str1)
# print(str2)
# print(str3)
# print(str4)
# print(f"类型: {type(str1)}")  # <class 'str'>


# 2.字符串的转义字符
# 转义字符用于在字符串中表示一些特殊的字符，比如换行、制表符、引号等。常见的转义字符有：

# \n ：表示换行符
# \t ：表示制表符（Tab）
# \\ ：表示反斜杠自身
# \' ：表示单引号
# \" ：表示双引号
# \uXXXX ：表示Unicode字符
# 在字符串中，如果需要让反斜杠不作为转义符使用，可以在字符串前加 r，表示原始字符串（raw string），这样所有的反斜杠都不会被转义。

# 示例：

# print("转义字符演示:")
# print("换行: Hello\\nWorld")  # Hello\nWorld
# print("实际换行: Hello\nWorld")  # 实际换行效果
# print("制表符: Name:\\tAlice")  # Name:    Alice
# print("实际制表符: Name:\tAlice")  # Name:    Alice
# print("反斜杠: 路径: C:\\\\Users")  # 路径: C:\\Users
# print('单引号: I\'m Python')  # I'm Python
# print("双引号: He said: \"Hello\"")  # He said: "Hello"

# # 原始字符串 (取消转义)
# raw_str = r"原始字符串: \n\t不会转义"
# print(raw_str)  # 原始字符串: \n\t不会转义


# 2.1.切片操作
# 切片（slice）可以用来获取字符串中的一部分，语法为 str[start:end:step]，其中：

# start：起始索引（包含该位置，默认为0）
# end：结束索引（不包含该位置，默认为字符串长度）
# step：步长（默认为1，可以为负数实现反向切片）
# 切片不会改变原字符串，而是返回新的字符串片段。

# text = "Hello Python Programming"
# text2 = '0123456789'

# # print(f'{text[-1:]}')

# print("切片操作:")
# # print(f"原始字符串: '{text}'")
# # print(f"text[0:5]: '{text[0:5]}'")  # Hello
# # print(f"text[6:12]: '{text[6:12]}'")  # Python
# # print(f"text[:5]: '{text[:5]}'")  # Hello (从开始到索引5)
# # print(f"text[13:]: '{text[13:]}'")  # Programming (从索引13到结束)
# # print(f"text[-11:]: '{text[-11:]}'")  # Programming (从倒数第11个到结束)

# # # 步长切片
# # print(f"text[::2]: '{text[::2]}'")  # HloPto rgamn (步长为2)
# # print(f"text[1::2]: '{text[1::2]}'")  # el yhnPormig (从索引1开始，步长为2)
# # print(f"text[::-1]: '{text[::-1]}'")  # gnimmargorP nohtyP olleH (反转)

# # # 复杂的切片
# # print(f"text[0:10:2]: '{text[0:10:2]}'")  # HloPt (0到10，步长2)
# print(f'步长测试`：{text2[::3]}')
# print(f'步长测试2：{text2[:2]}')


# 3.字符串操作方法
# 字符串常用操作方法包括大小写转换、查找、替换、分割、连接、去除空白、内容判断等。
# 这些方法不会改变原字符串，而是返回新字符串或结果。

# 查找和替换

# 分割与连接

# split(sep)：按分隔符切割为列表
# rsplit(sep)：从右侧切割
# join(iterable)：用指定分隔符连接序列
# 去除空白
# strip()：去除两端空白
# lstrip()：去除左侧空白
# rstrip()：去除右侧空白
# 内容判断
# isdigit()：是否全为数字
# isalpha()：是否全为字母
# isalnum()：是否全为字母或数字
# isupper()/islower()：是否全为大写/小写
# startswith()/endswith()：是否以指定子串开头/结尾

# 3.1.大小写转换
# upper()：全部转为大写
# lower()：全部转为小写
# capitalize()：首字母大写，其余小写
# title()：每个单词首字母大写
# swapcase()：大小写互换

# text = "hello World of Python"

# print("大小写转换:")
# print(f"原始: '{text}'")                      # hello World of Python
# print(f"大写: '{text.upper()}'")              # HELLO WORLD OF PYTHON
# print(f"小写: '{text.lower()}'")              # hello world of python
# print(f"首字母大写: '{text.capitalize()}'")   # Hello world of python
# print(f"每个单词首字母大写: '{text.title()}'") # Hello World Of Python
# print(f"大小写交换: '{text.swapcase()}'")     # HELLO wORLD OF pYTHON

# # 检查大小写
# print(f"是否全大写: {text.isupper()}")     # False
# print(f"是否全小写: {text.islower()}")     # False
# print(f"HELLO是否全大写: {'HELLO'.isupper()}") # True


# 3.2.查找和替换
# find(sub)：查找子串，返回索引，找不到返回-1
# rfind(sub)：从右侧查找
# index(sub)：查找子串，找不到抛异常
# count(sub)：统计子串出现次数
# replace(old, new, count)：替换子串

# text = "Hello World, Welcome to Python World"

# print("查找和替换:")
# print(f"原始: '{text}'")                               # Hello World, Welcome to Python World
# print(f"查找'World'位置: {text.find('World')}")        # 6
# print(f"查找'Python'位置: {text.find('Python')}")      # 24
# print(f"查找不存在的: {text.find('Java')}")            # -1
# print(f"从右边查找: {text.rfind('World')}")            # 31

# print(f"索引查找: {text.index('World')}")              # 6
# # print(text.index('Java'))  # 会抛出ValueError

# print(f"出现次数: {text.count('World')}")              # 2
# print(f"出现次数: {text.count('o')}")                  # 6

# # 替换操作
# print(f"替换: '{text.replace('World', 'Earth')}'")    # Hello Earth, Welcome to Python Earth
# print(f"替换一次: '{text.replace('World', 'Earth', 1)}'") # Hello Earth, Welcome to Python World

# 3.3.字符串检查
# isalpha()：是否全为字母
# isdigit()：是否全为数字
# isalnum()：是否全为字母或数字
# isspace()：是否全为空白字符（如空格、制表符等）
# istitle()：是否为标题格式（每个单词首字母大写）
# isupper()：是否全为大写字母
# islower()：是否全为小写字母
# startswith(): 是否以指定子串开头
# endswith(): 是否以指定子串结尾

# 3.4.去除空格和填充
# 去除空白字符和字符串填充方法用于格式化字符串内容。

# strip()：去除字符串两端的空白字符（包括空格、制表符、换行等）
# lstrip()：去除左侧空白
# rstrip()：去除右侧空白-
# strip([chars]) 也可以去除指定字符（如'*'、'0'等）-
# center(width, fillchar)：内容居中，两侧用fillchar填充
# ljust(width, fillchar)：内容左对齐，右侧用fillchar填充
# rjust(width, fillchar)：内容右对齐，左侧用fillchar填充
# zfill(width)：左侧用0填充，常用于数字字符串

# # 定义一个包含前后空格的字符串
# text = "   Hello World   "

# # 输出提示信息“去除空格:”
# print("去除空格:")

# # 输出原始字符串，使用竖线标记边界
# print(f"原始: |{text}|")

# # 去除字符串两端的空格并输出
# print(f"去两端空格: |{text.strip()}|")

# # 去除字符串左端的空格并输出
# print(f"去左端空格: |{text.lstrip()}|")

# # 去除字符串右端的空格并输出
# print(f"去右端空格: |{text.rstrip()}|")

# # 定义一个包含特定字符（*）的字符串
# text2 = "***Hello World***"

# # 去除字符串两端的*字符并输出
# print(f"去特定字符: |{text2.strip('*')}|")

# # 定义一个字符串用于演示填充
# text3 = "Hello"

# # 输出提示信息“字符串填充:”
# print(f"\n字符串填充:")

# # 将字符串居中填充到20个字符宽度并输出
# print(f"居中: |{text3.center(20)}|")

# # 将字符串左对齐填充到20个字符宽度并输出
# print(f"左对齐: |{text3.ljust(20)}|")

# # 将字符串右对齐填充到20个字符宽度并输出
# print(f"右对齐: |{text3.rjust(20)}|")

# # 使用0在左侧填充字符串到10个字符宽度并输出
# print(f"零填充: |{text3.zfill(10)}|")  # 00000Hello


# 4.字符串格式化
# 字符串格式化是将变量或表达式的值以特定格式嵌入到字符串中的方法。Python常用的字符串格式化方式有三种：

# f-string（格式化字符串字面量，Python 3.6+ 推荐）
# format() 方法
# % 操作符（旧式格式化）
# 这三种方式都可以实现字符串的插值和格式控制，推荐优先使用f-string，其次是format()，%方式主要用于兼容老代码。

# 4.1.f-string
# 语法：在字符串前加f，花括号{}中放变量或表达式。
# 例：f"姓名: {name}, 年龄: {age}"
# 优点：简洁、支持表达式、易读。

# name = "Alice"
# age = 25
# salary = 5000.50

# print("f-string格式化:")
# print(f"姓名: {name}, 年龄: {age}")
# print(f"薪资: ${salary:.2f}")
# print(f"明年年龄: {age + 1}")
# print(f"名字大写: {name.upper()}")

# # 表达式和函数调用
# items = ['apple', 'banana', 'orange']
# print(f"物品数量: {len(items)}")
# print(f"第二个物品: {items[1]}")

# # 格式化对齐
# number = 42
# print(f"右对齐: |{number:>10}|")
# print(f"左对齐: |{number:<10}|")
# print(f"居中对齐: |{number:^10}|")
# print(f"零填充: |{number:010}|")

# format() 方法
# name = "Bob"
# age = 30

# print("format() 方法:")
# print("{} is {} years old".format(name, age))
# print("{0} is {1} years old. Hello {0}!".format(name, age))
# print("{name} is {age} years old".format(name=name, age=age))

# # 数字格式化
# pi = 3.14159
# print("PI = {:.2f}".format(pi))
# print("二进制: {:b}".format(10))
# print("十六进制: {:x}".format(255))


# 4.3.% 操作符
# 语法：字符串中用%占位符，后面用%传入元组或字典。
# 例："%s is %d years old" % (name, age)
# 占位符有%s（字符串）、%d（整数）、%f（浮点数）等。

# % 操作符 (传统方法)
# name = "Charlie"
# age = 35

# print("% 格式化:")
# print("%s is %d years old" % (name, age))
# print("PI = %.3f" % 3.14159)

# 5.字符串编码
# 字符串编码是指将字符串（字符序列）转换为字节序列的过程，常见编码有UTF-8、GBK等。
# 解码则是将字节序列还原为字符串。
# 在Python中，str.encode()方法用于编码，bytes.decode()方法用于解码。
# 常见编码方式：

# UTF-8：通用、支持所有字符，推荐使用。
# GBK：中文Windows常用，兼容简体中文。
# ASCII：仅支持英文和部分符号。

# text = "Hello 世界 🐍"

# print(f"原始字符串: {text}")

# # 编码为字节
# utf8_bytes = text.encode('utf-8')
# gbk_bytes = text.encode('gbk', errors='ignore')

# print(f"UTF-8字节: {utf8_bytes}")
# print(f"GBK字节: {gbk_bytes}")

# # 解码回字符串
# decoded_utf8 = utf8_bytes.decode('utf-8')
# decoded_gbk = gbk_bytes.decode('gbk')

# print(f"UTF-8解码: {decoded_utf8}")
# print(f"GBK解码: {decoded_gbk}")

# # 字符和编码点
# for char in "ABC世界":
#     print(f"字符 '{char}' -> Unicode码点: {ord(char):04X}")


# 6.字符串不可变性
# 字符串在Python中是不可变对象（immutable），这意味着一旦创建，字符串的内容就不能被直接修改。所有对字符串的操作（如拼接、替换、大小写转换等）都会返回一个新的字符串对象，原有字符串保持不变。

# 这种不可变性带来如下特点和好处：

# 安全性：字符串作为键（key）用于字典等哈希结构时，内容不会被意外更改，保证哈希值稳定。
# 多线程安全：多个线程可以安全地共享字符串对象，无需担心内容被修改。
# 高效缓存：Python可以对相同内容的字符串进行内部缓存和重用，提升性能。
# 注意：虽然不能直接修改字符串的某个字符，但可以通过切片、拼接等方式生成新的字符串。

# original = "Hello"
# print(f"原始字符串: {original}, id: {id(original)}")

# # 看起来是修改，实际上是创建了新字符串
# modified = original + " World"
# print(f"修改后: {modified}, id: {id(modified)}")
# print(f"原始字符串未改变: {original}")

# # 尝试直接修改会报错
# try:
#     original[0] = 'h'  # TypeError
# except TypeError as e:
#     print(f"错误: {e}")

# # 可以通过重新赋值来"改变"
# original = "New Value"
# print(f"重新赋值后: {original}, id: {id(original)}")


text = "Hello Python"

# print("索引操作:")
# print(f"字符串: '{text}'")
# print(f"长度: {len(text)}")
# print(f"正索引 - text[0]: '{text[0]}'")     # H
# print(f"正索引 - text[6]: '{text[6]}'")     # P
# print(f"负索引 - text[-1]: '{text[-1]}'")   # n
# print(f"负索引 - text[-6]: '{text[-6]}'")   # P

# text = "Hello Python Programming"
text2 = '0123456789'
# print("切片操作:")
# print(f"原始字符串: '{text}'")
# print(f"text[0:5]: '{text[0:5]}'")  # Hello
# print(f"text[6:12]: '{text[6:12]}'")  # Python
# print(f"text[:5]: '{text[:5]}'")  # Hello (从开始到索引5)
# print(f"text[13:]: '{text[13:]}'")  # Programming (从索引13到结束)
# print(f"text[-11:]: '{text[-11:]}'")  # Programming (从倒数第11个到结束)

# # 步长切片
# print(f"text[::2]: '{text[::2]}'")  # HloPto rgamn (步长为2)
# print(f"text[1::2]: '{text[1::2]}'")  # el yhnPormig (从索引1开始，步长为2)
# print(f"text[::-1]: '{text[::-1]}'")  # gnimmargorP nohtyP olleH (反转)

# 复杂的切片
# print(f"text[0:10:2]: '{text2[0:10:4]}'")  # HloPt (0到10，步长2)

text = "hello World of python"

# print("大小写转换:")
# print(f"原始: '{text}'")                      # hello World of Python
# print(f"大写: '{text.upper()}'")              # HELLO WORLD OF PYTHON
# print(f"小写: '{text.lower()}'")              # hello world of python
# print(f"首字母大写: '{text.capitalize()}'")   # Hello world of python
# print(f"每个单词首字母大写: '{text.title()}'") # Hello World Of Python
# print(f"大小写交换: '{text.swapcase()}'")     # HELLO wORLD OF pYTHON

# # 检查大小写
# print(f"是否全大写: {text.isupper()}")     # False
# print(f"是否全小写: {text.islower()}")     # False
# print(f"HELLO是否全大写: {'HELLO'.isupper()}") # True


print(text.rsplit(' '))
