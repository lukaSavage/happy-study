(function(w){
    /* 1.transformCSS库 */
    /**
     * transformCss可以读取和修改transform的css属性
     * @param {*} node 需要变化的元素
     * @param {String} type 变化的类型
     * @param {Number} value 可选参数，不传则读取,传了则修改
     */
    function transformCss(node,type,...value){
        //如果该元素本身没有此type属性或者第一次设置时,则创建一个对象用来保存属性
        if(node.transformData===undefined){
            node.transformData={};
        }

        //当传递三个或四个参数时↓
        if(arguments.length>=3){      
            //把用户传进来的参数放到transformData对象当中
            node.transformData[type]=value;
            //考虑到用户会传多个数值不好操作，故设置一个变量暂时保存
            var dataStr='';
            //遍历所有数据,给不同的数据加上单位
            for(var i in node.transformData){      //i是该对象的属性
                switch(i){
                    case 'translate':
                        dataStr+= i + '('+node.transformData[i][0]+'px,'+node.transformData[i][1]+'px) ';
                        break;
                    case 'translateX':
                    case 'translateY':
                        dataStr+= i + '('+node.transformData[i][0]+'px) ';   //dataStr格式：translateX(20px);注意最后一个空格一定要加
                        break;
                    case 'scale':
                        if(value.length>1){
                            dataStr+= i + '('+node.transformData[i][0]+','+node.transformData[i][1]+') ';                          
                        }else{
                            dataStr += i+'('+node.transformData[i][0]+') ';
                        }
                        break;
                    case 'scaleX':
                    case 'scaleY':
                        dataStr += i+'('+node.transformData[i][0]+') ';
                        break;
                    case 'rotate':
                    case 'skew':
                    case 'skewX':
                    case 'skewY':
                        dataStr += i+'('+node.transformData[i][0]+'deg) ';
                        break;
                }
            }
            //再把编辑好的字符串给transform
            node.style.transform=dataStr;
        }else if(arguments.length===2){
            //用一个变量接收读取的数据
            var result=node.transformData[type];
            //给不同type设置默认值
            if(type==='scale' || type==='scaleX' || type==='scaleY'){
                result=1;
            }else{
                result=0;
            }
            //最后直接返回result即可
            return result;
        }
    }






    //把封装好的函数全部暴露出去
    w.transformCss=transformCss;
})(window);