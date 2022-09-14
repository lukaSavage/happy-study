

/**
 * webpack里如何加载一个图片
 * 1.生成一个文件名 [hash:8].[ext]=> sfsdfdsf.jpg
 * 2.向输出目录，比如说dist目录写入一个文件 sfsdfdsf.jpg
 * 3.返回一段模块化的JS脚本，JS脚本会导出这个新的路径文件名
 */
const {getOptions, interpolateName}  = require('loader-utils');
function loader(content){
  //this loaderContext上下文
  let options = getOptions(this)||{};
  let url = interpolateName(this,options.filename||"[hash:8].[ext]",{content});
  //向输出目录里写入一个文件
  this.emitFile(url,content);
  return `module.exports = ${JSON.stringify(url)}`;
}
//raw原生的
/**
 * 在默认情况下loader得到的内容是一个字符串
 * loader.raw = true 的话说明告诉 webpack不要把源文件内容给我转成字符串，保留buffer就可以了
 */
//true 得到的是Buffer false得到的字符串
loader.raw = true;
module.exports = loader;