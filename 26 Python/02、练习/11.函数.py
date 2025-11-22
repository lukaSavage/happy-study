# def greet(name):
#     """向指定的人打招呼"""
#     print(f"Hello, {name}!")

# # 查看文档字符串
# print(greet.__doc__)  # 向指定的人打招呼


# def fn(n):
#     a = 1
#     while a<=n:
#         a+=1
#         print(f'I Love You {a}')
#     print(f'the end {a}')

# fn(3)


# def student_info(name, age, city='beijing'):
#     print(f"姓名: {name}, 年龄: {age}, 城市: {city}")

# # 使用关键字参数，参数顺序可以不按定义顺序
# student_info(age=20, name='Lucy')
# # 输出：姓名: Lucy, 年龄: 20, 城市: Beijing


# def greet(*aa):
#     print(f"Hello, {aa}!")


# # 查看文档字符串
# print(greet('张三', 18))  # 向指定的人打招呼

# 传统方式
squares = []
for x in range(5):
    squares.append(x**2)
print(squares)  # [0, 1, 4, 9, 16]

# 列表推导式
squares = [x**2 for x in range(5)]
print(squares)  # [0, 1, 4, 9, 16]
