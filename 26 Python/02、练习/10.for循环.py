person = {"name": "Alice", "age": 30, "city": "Beijing"}

# 遍历所有键（默认方式）
for key in person:
    print(f"Key: {key}")

# 遍历所有值
for value in person.values():
    print(f"Value: {value}")

# 遍历所有键值对
for key, value in person.items():
    print(f"{key}: {value}")
