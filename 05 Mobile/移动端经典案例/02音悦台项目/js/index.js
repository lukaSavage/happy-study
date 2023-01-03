//rem适配
(function(){
    var design=1080;
    var rootFontSize=design/12;
    var device=document.documentElement.clientWidth;
    var scale=device/design;
    document.documentElement.style.fontSize=scale*rootFontSize+'px';
})();
//阻止所有默认行为
(function(){
    //阻止默认行为
    var app = document.querySelector('#app');
    app.addEventListener('touchstart', function(event){
        event.preventDefault();
    });

    //给所有的超链接，监听touchend， 可以跳转
    var aNodes = document.querySelectorAll('a[href]');
    aNodes.forEach(function (aNode) {
        aNode.addEventListener('touchend', function () {
           location.href = this.href;
        });
    });
})();

/* 第一部分：头部交互 */
(function(){
    var bigSearch=document.querySelector('.bigSearch');
    bigSearch.addEventListener('touchstart',function(){
        this.focus();
    });
    document.addEventListener('touchstart',function(e){
        if(event.target!==bigSearch){
            bigSearch.blur();
        }
    });
    //点击频道按钮
    var menu=document.querySelector('.menu');
    var header_ul=document.querySelector('.header-ul');
    menu.addEventListener('touchstart',function(){
        this.classList.toggle('active');
        header_ul.classList.toggle('active');

    });
})();
/* 第二部分：滑动区域 */
(function(){
    var nav=document.querySelector('.nav');
    var ul=document.querySelector('.nav-ul');
    var lis=document.querySelectorAll('.nav-ul li');
    //自定义一个变量判断滑动的同时是否点击了
    var isMove=false;
    ul.addEventListener('touchstart',function(e){
        ul.style.transition='none';
        this.startX=e.targetTouches[0].clientX;
        this.eleX=transformCss(ul,'translateX');
        /* -------------------- */
        this.startTime=Date.now();
        this.disX=0;
        isMove=false;
    });
    ul.addEventListener('touchmove',function(e){
        var endX=e.targetTouches[0].clientX;
        this.disX=endX-this.startX;
        var translateX=this.eleX+this.disX;
        //判断位置
        if(translateX>0){
            //计算比例，让导航有橡皮筋效果
            var scale=1-translateX/(nav.clientWidth*2);
            translateX=translateX*scale;
        }else if(translateX<(nav.clientWidth-ul.clientWidth)){
            var rightX=nav.clientWidth-(ul.clientWidth+translateX);
            var scale=1-rightX/(nav.clientWidth*2);
            rightX=rightX*scale;
            translateX=(nav.clientWidth-rightX)-ul.clientWidth;
        }
        transformCss(ul,'translateX',translateX);
        isMove=true;
    })
    //滑动结束后做加速回弹
    ul.addEventListener('touchend',function(){
        var endTime=Date.now();
        var disTime=endTime-this.startTime;
        //计算回弹的距离
        var speed=this.disX/disTime*200;
        //读取此时的translateX
        var translateX=transformCss(ul,'translateX');
        translateX+=speed; 
        //定义过渡类型
        var bezier=' cubic-bezier(0.08, 1.44, 0.6, 1.46)';             
        if(translateX>0){
            translateX=0;
        }else if(translateX<(nav.clientWidth-ul.clientWidth)){
            translateX=nav.clientWidth-ul.clientWidth;
        }
        ul.style.transition='transform .5s'+bezier;
        transformCss(ul,'translateX',translateX);        
    });
    //为每个li监听触摸事件
    lis.forEach(function(item){
        item.addEventListener('touchend',function(e){
            if(isMove){
                return;
            }
            lis.forEach(function(item){
                item.classList.remove('active');
            })
            this.classList.add('active');
        })
    });
})();
/* 第三部分：轮播图部分 */
(function(){
    swiper({
        el:document.querySelector('#mySwiper'),
        // pagination:document.querySelector('#mySwiper .icons'),
        isAutoPlay:true,
        duration: 3000
    })
})();
/* 第四部分：触摸滑动 */
(function(){
    var app=document.querySelector('#app');
    var main=document.querySelector('#main');
    var videoNav=document.querySelector('.video-nav');
    touchScroll(app,main,null);
})();