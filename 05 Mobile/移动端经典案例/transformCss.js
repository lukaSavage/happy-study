(function(w){
    function transformCss(obj,param,value){
        //如果obj这个对象没有设置param,则给对象添加一个属性transformData，用来保存param类型的属性
        if(obj.transformData===undefined){
            obj.transformData = {};   
        }
        //用户传三个参数，则修改
        if(arguments.length===3){
            //把接收来的参数传入obj.transformData这个对象中
            obj.transformData[param] = value;
            //接下来要获取这个对象中所有的属性和值，所以我们用一个空字符串来拼接
            var dataStr='';
            //遍历obj.transformData对象
            for(var i in obj.transformData){
                //以下用来判断单位
                switch (i) {
                    case 'translate':
                    case 'translateX':
                    case 'translateY':
                        //这里的i相当于param，如translateX(100px) scale(.5);
                        dataStr += i+'('+obj.transformData[i]+'px) ';
                        break;
                    case 'scale':
                    case 'scaleX':
                    case 'scaleY':
                        dataStr += i+'('+obj.transformData[i]+') ';
                        break;
                    case 'rotate':
                    case 'skew':
                    case 'skewX':
                    case 'skewY':
                        dataStr += i+'('+obj.transformData[i]+'deg) ';
                        break;
                }
                //再设置样式
                obj.style.transform=dataStr;
            }
        }else if(arguments.length===2){   //用户传两个参数，则添加
            var result=obj.transformData[param];
            if(result===undefined){
                if(param==='scale' || param==='scaleX' || param==='scaleY'){
                    result=1;
                }else{
                    result=0;
                }
            }
            return result;
        }
    }
    //最后暴露
    w.transformCss=transformCss;
})(window);