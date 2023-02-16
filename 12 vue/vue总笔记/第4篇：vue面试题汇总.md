# vue常见面试题汇总

## 1、vue3中的模板编译优化

1. `patchFlags`优化

   Diff算法无法避免新旧虚拟DOM中无用的比较操作，通过patchFlags来标记动态内容，可以实现快速diff算法。

2. 