let page1Chunk= {
    name:'page1',
    modules:['A','B']
}

let page2Chunk = {
    name:'page2',
    module:['D','E']
}

let  cacheGroups= {
    vendor: {
      test: /lodash/,
    },
    default: {
      minChunks: 2,
    },
    e:{
        test(module){
            return module.resource === 'e';
        }
    }
};
let vendorChunk = {
    name:`vendor~page1`,
    modules:['lodash']
}
let defaultChunk = {
    name:`default~page1~page2`,
    modules:['C']
}
//page1页面的初始化的时候 会加载三个文件 vendor~page1.js default~page1~page2.js page1.js
//师这个组的跟 split 拆分区别在哪。更细了么？￼ split就 按缓存组的配置来拆分
