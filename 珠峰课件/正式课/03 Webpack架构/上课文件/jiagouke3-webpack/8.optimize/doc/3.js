/**
 * reuseExistingChunk 重新使用已经 存在的代码块  

If the current chunk contains modules already split out from the main bundle,
如果当前的代码块已经 包含了已经 从主bundle中出去的模块的话
 it will be reused instead of a new one being generated. 
 它将被重用，而非生成一个新的 
 This can affect the resulting file name of the chunk.
这会影响 代码块的名称
 */
let modules = ['A','B','C'];
let cacheGroups = {
    chunk1:{
        name:chunk1,
        test:['A','B','C']
    },
    chunk2:{
        name:chunk2,
        test:['B','C']
    }
}
//进行代码块的分割
//minChunks进行分割

二种选择，一种可以复用现有的代码块
一种是不复用 
区别是否不复用以前的包含相应模块的代码块，而是生成新的代码块