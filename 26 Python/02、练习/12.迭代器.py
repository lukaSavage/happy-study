# names = ['Alice', 'Bob', 'Charlie']
# ages = [25, 30, 35]
# cities = ['北京', '上海', '广州']

# for name, age, city in zip(names, ages, cities):
#     print(f"{name}, {age}岁, 来自{city}")

from datetime import datetime, date, time, timedelta

now = datetime.now()

print("年:", now.year)
print("月:", now.month)
print("日:", now.day)
print("时:", now.hour)
print("分:", now.minute)
print("星期:", now.weekday())