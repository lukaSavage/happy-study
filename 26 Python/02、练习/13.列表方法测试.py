"""
Descripttion:
Author: lukasavage
Date: 2025-11-08 11:18:18
LastEditors: lukasavage
LastEditTime: 2026-02-01 21:53:14
"""

# 测试添加
a = [1, 2, 3, 4]
b = a.copy()
print(a + b)
a.append(5)
a.extend([6, 7])
a.insert(0, "hehe")
print(a)


# print(a)  # [1, 2, 3, 4, 5]
# del a[1:3]
# print(a)  # [1, 2, 3, 4, 5]


# numbers = (1, 2, 3, 4, 5)
# a, *rest = numbers
# print(a, rest)  # [1, 2, 3, 4, 5]


# a = [1, 2, 3, 4, 5]

# a.reverse()

# print(a)  # [5, 4, 3, 2, 1]

mySet = {1, 2, 3, 4, 5, 1}
print(mySet)