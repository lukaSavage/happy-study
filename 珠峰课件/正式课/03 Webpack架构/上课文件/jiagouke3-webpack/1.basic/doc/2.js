/**
 * loader是有分类 pre post normal
 * 对一个JS文件，会有三个loader进行处理
 */
let rules = [
    {test: /\.js$/,use:'loader1'},
    {test: /\.js$/,use:'loader2',enforce:'post'},//后执行
    {test: /\.js$/,use:'loader3',enforce:'pre'},//先执行
]
//pre loader3 => normal loader1 => post loader2
//厚脸挣钱
//post(后置) inline(行内也被称为内联) normal(正常) pre(前置)
//有些特别容易混淆而且无意义的关联内容
//李渊建立唐朝公元618 李渊见糖留一把

