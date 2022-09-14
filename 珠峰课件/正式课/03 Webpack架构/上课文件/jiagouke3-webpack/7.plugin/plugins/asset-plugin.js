

class AssetPlugin{
    constructor(options){
        this.options = options;
    }
    apply(compiler){
        //监听compilation事件
        //https://webpack.docschina.org/api/compiler-hooks/#compilation
        compiler.hooks.compilation.tap('AssetPlugin',(compilation)=>{
            //https://webpack.docschina.org/api/compilation-hooks/#chunkasset
            //一个 chunk 中的一个 asset 被添加到 compilation 时调用
            //一个代码块会生成一个文件(asset) 文件肯定有文件名 filename
            compilation.hooks.chunkAsset.tap('AssetPlugin',(chunk,filename)=>{
                //
                console.log(chunk.name||chunk.id,filename);
            });
        });
    }
}
module.exports = AssetPlugin;