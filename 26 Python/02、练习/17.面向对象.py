"""
Descripttion:
Author: lukasavage
Date: 2026-02-02 22:09:33
LastEditors: lukasavage
LastEditTime: 2026-02-02 22:09:48
"""


class 类名:
    def __init__(self, 属性1, 属性2):
        self.属性1 = 属性1
        self.属性2 = 属性2

        print('自动调用了。。。')

    def 方法名(self):
        # 方法体
        pass


# 创建对象（实例化）
对象名 = 类名('张三', '参数2')
print(对象名.属性1)  # 输出：张三
print(对象名.属性2)  # 输出：参数2