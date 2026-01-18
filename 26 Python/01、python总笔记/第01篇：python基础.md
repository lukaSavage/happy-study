# 一、Python的数据类型

## 1.1整数方法汇总

```python
# 整数转换
int(10)

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

```

## 1.2字符串方法汇总

### 1.2.1 切片

```
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
```

### 1.2.2大小写转换

1. upper()：全部转为大写
2. lower()：全部转为小写
3. capitalize()：首字母大写，其余小写
4. title()：每个单词首字母大写
5. swapcase()：大小写互换

### 1.2.3查找和替换

1. find(sub)：查找子串，返回索引，找不到返回-1
2. rfind(sub)：从右侧查找
3. index(sub)：查找子串，找不到抛异常
4. count(sub)：统计子串出现次数
5. replace(old, new, count)：替换子串(替换所有)，找不到抛异常

### 1.2.3 字符串检查方法（xx.xx写在字符串后面的）

1. isalpha()：是否全为字母
2. isdigit()：是否全为数字
3. isalnum()：是否全为字母或数字
4. isspace()：是否全为空白字符（如空格、制表符等）
5. istitle()：是否为标题格式（每个单词首字母大写）
6. isupper()：是否全为大写字母
7. islower()：是否全为小写字母
8. startswith(): 是否以指定子串开头
9. endswith(): 是否以指定子串结尾

### 1.2.4 去除空格和填充

1. strip()：去除字符串两端的空白字符（包括空格、制表符、换行等）
2. lstrip()：去除左侧空白
3. rstrip()：去除右侧空白-
4. strip([chars]) 也可以去除指定字符（如'*'、'0'等）-
5. center(width, fillchar)：内容居中，两侧用fillchar填充
6. ljust(width, fillchar)：内容左对齐，右侧用fillchar填充
7. rjust(width, fillchar)：内容右对齐，左侧用fillchar填充
8. zfill(width)：左侧用0填充，常用于数字字符串

### 1.2.5 分割和连接

1. split(sep)：按分隔符切割为列表
2. rsplit(sep)：从右侧切割
3. splitlines(keepends=False) 按行分割字符串，返回每一行组成的列表，`keepends`为 `True`时保留换行符。
4. join(iterable)：用指定分隔符连接序列

## 1.3 列表方法汇总

### 1.3.1 添加元素

1. append(x)：在列表末尾添加一个元素 `x`。
2. insert(index, x)：在指定位置 `index` 前面插入元素 `x`，原有及后续元素后移。
3. extend(iterable)：将另一个可迭代对象（如列表、元组等）的元素逐个添加到列表末尾。

### 1.3.2 删除元素

1. **remove(x) 方法**
   * 用于删除列表中第一个值为 x 的元素（如果没有这样的元素会抛出 ValueError）。
   * 只会删除找到的第一个匹配项。
   * 语法：`list.remove(x)`
2. **pop([index]) 方法**
   * 用于删除并返回给定索引处的元素。如果没有指定索引，默认删除并返回最后一个元素。
   * 如果索引越界会抛出 IndexError。
   * 语法：`list.pop()` 或 `list.pop(index)`
3. **del 语句**
   * del 可以根据索引删除列表的指定元素，也可以一次性删除多个元素（切片）。
   * 语法：`del list[index]` 或 `del list[start:end]`
4. **clear() 方法**
   * 清空整个列表，变成空列表 []。
   * 语法：`list.clear()`

> **提示** ：
>
> * `remove()` 和 `pop()`/`del` 必须有元素才能删除，否则会报错。
> * 使用 `del` 删除变量本身（如 `del mylist`）会导致变量名不可用。

### 1.3.3 查询

* `index(x, [start, [end]])`：在指定范围内查找第一个值等于 x 的元素，返回其索引。start 和 end 为可选参数，用于指定搜索范围。如果找不到则抛出 ValueError。
* `count(x)`：统计元素 `x` 在列表中出现的次数。
* `len(list)`：获取长度
* `in`：统计元素 `x` 在列表中出现的次数。

  ```python
  # 检查元素是否存在
  fruits = ["apple", "banana"]
  print("apple" in fruits)  # True
  print("orange" in fruits) # False
  ```

### 1.3.4 其他方法

* `sort(key=None, reverse=False)`：对列表元素进行排序（原地排序，改变原列表）。
* `reverse()`：反转列表（原地操作）。
* `copy.deepcopy(list)`：列表的浅拷贝
* `list.copy()`：返回列表的浅拷贝。
  ```python
  # 深拷贝解决方案
  import copy
  original = [[1, 2], [3, 4]]
  deep_copy = copy.deepcopy(original)
  ```

## 1.4 元祖方法汇总

### 1.4.1 查询

* `count(x)`：统计元素 `x` 在元组中出现的次数。
* `index(x[, start[, end]])`：查找元素 `x` 第一次出现的索引，允许指定起止范围。

## 1.5 集合方法汇总

### 1.4.1 添加

* `sets.add(x)`：添加单个元素。如果元素已存在，不做任何操作。
* `sets.update()`：可以一次性添加多个元素（可迭代对象），如列表、元组、集合等。

### 1.4.2 删除

* `remove(elem)`：删除指定元素，如果元素不存在会抛出 `KeyError` 错误。
* `discard(elem)`：删除指定元素，如果元素不存在什么都不做（更安全，推荐）。
* `pop()`：随机删除并返回一个元素，因为集合是无序的，不确定删除哪个元素；如果集合为空，会抛出 `KeyError`。
* `clear()`：清空集合中的所有元素。

## 1.5 字典方法汇总

### 1.5.1 创建

* `dict(x)`：统计元素 `x` 在元组中出现的次数。

  ```python
  # 从键值对序列创建
  dict1 = dict([("name", "Bob"), ("age", 25), ("city", "Shanghai")])
  print(dict1) # {'name': 'Bob', 'age': 25, 'city': 'Shanghai'}

  # 使用关键字参数（键必须是有效的变量名）
  dict2 = dict(name="Charlie", age=35, city="Guangzhou")
  print(dict2) # {'name': 'Charlie', 'age': 35, 'city': 'Guangzhou'}

  # 从包含双元素子序列的可迭代对象创建
  dict3 = dict([["a", 1], ["b", 2]])
  print(dict3) # {'a': 1, 'b': 2}

  # 使用 fromkeys() 创建字典：所有键的值默认相同
  keys = ["math", "english", "science"]
  default_score = 60
  score_dict = dict.fromkeys(keys, default_score)
  print(score_dict)  # {'math': 60, 'english': 60, 'science': 60}

  # 如果不指定默认值，默认是 None
  empty_dict = dict.fromkeys(keys)
  print(empty_dict)  # {'math': None, 'english': None, 'science': None}
  ```

### 1.5.2 查询

* `obj['a']`：通过键名直接访问
* `obj.get('a')`：更安全的方式(不会报错)，键不存在时返回 `None` 或指定的默认值。
* `obj.setdefault('a', 'china')`：设置默认值

### 1.5.2 更新/修改

* `obj.update()`：通过键名直接访问
  ```python
  person = {"name": "Alice", "age": 30}

  # 使用另一个字典更新
  person.update({"age": 31, "city": "Beijing"})
  print(person) # {'name': 'Alice', 'age': 31, 'city': 'Beijing'}

  # 使用键值对序列更新
  person.update([("job", "Engineer"), ("country", "China")])
  print(person) # 添加了 job 和 country

  # 使用关键字参数更新
  person.update(salary=50000, department="IT")
  print(person) # 添加了 salary 和 department
  ```

### 1.5.3 删除

* `del` 语句：根据键删除对应的键值对。如果键不存在会报错。
* `pop(key[, default])` 方法：删除指定键并返回对应的值。如果键不存在且没有设置 default，会报错。
* `popitem()` 方法：删除并返回最后插入的键值对（Python 3.7+）。如果字典为空会报错。
* `clear()` 方法：移除字典中的所有元素，变成一个空字典。
* `del dict`：删除整个字典对象，变量名不再可用。
