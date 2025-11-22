# 测试添加
a = [1, 2, 3, 4]
a.append(5)
a.extend([6, 7])
a.insert(0, "hehe")


print(a)  # [1, 2, 3, 4, 5]
del a[1:3]
print(a)  # [1, 2, 3, 4, 5]


numbers = (1, 2, 3, 4, 5)
a, *rest = numbers
print(a, rest)  # [1, 2, 3, 4, 5]
