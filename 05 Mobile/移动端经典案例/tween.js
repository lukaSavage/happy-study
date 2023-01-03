(function(w){
/* 参数说明：
    t: current time：当前时间；
    b: beginning value：初始值，元素的初始位置；
    c: change in value：变化量，元素的结束位置与初始位置距离差
    d: duration：持续时间,整个过渡持续时间
    s：Elastic和Back 的可选参数。回弹系数,s值越大.回弹效果越远。
    ​
    返回值：
    元素每一次运动到的位置 
*/
    w.tweenTo=function(obj,target,duration,type){
        var tween={
            linear:function(t,b,c,d){ return c*t/d + b; },
            cutEaseOut: function(t,b,c,d){return c*((t=t/d-1)*t*t + 1) + b; },
            backEaseOut: function(t,b,c,d,s){
                if (s == undefined) s = 1.70158;
                return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b; 
            },
        }
        //定义tween函数参数
        var t=0;
        var b=transformCss(obj,'translateY');
        var c=target-b;
        var d=duration;

        //开启定时
        obj.timer=setInterval(function(){
            t+=10;
            var translateY=tween[type](t,b,c,d);
            transformCss(obj,'translateY',translateY);
            if(t>=d){
                clearInterval(obj.timer);
            }
        },10);
    }
})(window);