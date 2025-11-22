fruits = {"apple", "banana"}

# # add() - 添加单个元素
# fruits.add("orange")
# print(fruits) # {'banana', 'orange', 'apple'}

# fruits.add("apple")  # 添加已存在的元素，不会有任何效果
# print(fruits) # {'banana', 'orange', 'apple'} (不变)

# update() - 添加多个元素（从可迭代对象）
fruits.update(["grape", "mango"])
print(fruits) # {'banana', 'orange', 'apple', 'mango', 'grape'}

# fruits.update(("pineapple", "kiwi"))
# print(fruits) # 添加了更多水果