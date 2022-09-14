
const Jszip = require('jszip');
const path = require('path');
class ArchivePlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.emit.tapPromise('ArchivePlugin',(compilation)=>{
            let jszip = new Jszip();
            //assets对象 key文件名 值文件的内容，它里面存放着所有将要输出到目录目录里的文件
            let assets = compilation.assets;
            for(let filename in assets){
                const source = assets[filename].source();
                jszip.file(filename,source);
            }
            return jszip.generateAsync({type:'nodebuffer'}).then(content=>{
                let filename = this.options.filename.replace('[timestamp]',Date.now()+'');
                assets[filename]={
                    source(){
                        return content;
                    }
                }
            });
        });
    }
}
module.exports = ArchivePlugin;