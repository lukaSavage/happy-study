(function (w) {
    /**
     * 设置或者获取元素的transform属性值
     * @param node  要设置的元素
     * @param param  变换属性： translate\scale\rotate....
     * @param value  变换属性的值 （可选） 如果指定了，设置；没有指定，获取；
     */
    function transformCss(node, param, value) {
        //如果第一次设置元素
        if (node.transformData === undefined) {
            //给元素添加一个属性，用来保存元素的transform设置
            node.transformData = {};
        }

        if (arguments.length === 3) {
            //设置 transform 属性
            //把transform属性添加到 tansformData里面
            node.transformData[param] = value;
            //设置transform值的字符串
            var transformStr = '';
            //遍历 transformData
            for (var i in node.transformData) {
                switch (i) {
                    case 'translate':
                    case 'translateX':
                    case 'translateY':
                    case 'translateZ':
                        transformStr += i+'('+node.transformData[i]+'px) ';
                        break;
                    case 'scale':
                    case 'scaleX':
                    case 'scaleY':
                        transformStr += i+'('+node.transformData[i]+') ';
                        break;
                    case 'rotate':
                    case 'skew':
                    case 'skewX':
                    case 'skewY':
                        transformStr += i+'('+node.transformData[i]+'deg) ';
                        break;
                }
                //设置css样式
                node.style.transform = transformStr;
            }

        } else if (arguments.length === 2) {
            //获取transform属性值
            //根据参数从trnasformData获取
            var result = node.transformData[param];
            //如果transformData没有，取默认值
            if (result === undefined) {
                if (param === 'scale' || param === 'scaleX' || param === 'scaleY') {
                    result = 1;
                } else {
                    result = 0;
                }
            }
            //把结果返回
            return result;
        }
    }

    //暴露
    w.transformCss = transformCss;

})(window);