/**
 * webpack里如何加载一个图片
 * 1.生成一个文件名 [hash:8].[ext]=> sfsdfdsf.jpg
 * 2.向输出目录，比如说dist目录写入一个文件 sfsdfdsf.jpg
 * 3.返回一段模块化的JS脚本，JS脚本会导出这个新的路径文件名
 */
const { getOptions, interpolateName } = require("loader-utils");
const mime = require("mime");
function loader(content) {
  let options = getOptions(this) || {};
  let { limit, fallback = "file-loader" } = options;
  if (limit) {
    limit = parseInt(limit, 10);
  }
  //xxx.jpg  image/jpg  xxx.png image/png
  const mimeType = mime.getType(this.resourcePath);
  if (!limit || content.length < limit) {
    let base64Str = `data:${mimeType};base64,${content.toString("base64")}`;
    return `module.exports = ${JSON.stringify(base64Str)}`;
  } else {
    //require是node加载模块的方法，跟webpack没有关系。
    let fileLoader = require(fallback);//肯定 是第三方的
    return fileLoader.call(this, content);
  }
}

loader.raw = true;
module.exports = loader;
