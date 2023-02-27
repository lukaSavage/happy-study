# vue常见面试题汇总

## 1、vue3中的模板编译优化

1. `patchFlags`优化

   Diff算法无法避免新旧虚拟DOM中无用的比较操作，通过patchFlags来标记动态内容，可以实现快速diff算法。

2. 。。。

## 2.Vue中使用了那些设计模式？

|     模式     |     举例      |
| :----------: | :-----------: |
|   单例模式   | vuex中的store |
|   工厂模式   | createElement |
| 发布订阅模式 |  响应式系统   |
|  观察者模式  |    watcher    |
|   代理模式   |     proxy     |
|  装饰器模式  | vue装饰器写法 |

