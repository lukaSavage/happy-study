(function(){
    /* 1.初始化 */
    var carousel=document.querySelector('#carousel');
    var ul=document.querySelector('.ul');
    var lis0=document.querySelectorAll('.ul li');
    var li_width=carousel.clientWidth;
    var ol=document.querySelector('.ol');
    var lis1=ul.children;
    var index=0;
    //给ul额外克隆一组li
    ul.innerHTML+=ul.innerHTML;
    //初始化ul的宽度
    ul.style.width=lis1.length*carousel.offsetWidth + 'px';
    //初始化ul的位置
    ul.style.transform='translateX('+ (-lis1.length/2)*li_width+'px)';
        //保留当前位置
        var currentPosition=(-lis1.length/2)*li_width;
    //给ol动态添加li元素
    for(var i=0;i<lis0.length;i++){
        var newLi=document.createElement('li');
        ol.appendChild(newLi);
    }
    ol.firstChild.className='active';
    var lis2=document.querySelectorAll('.ol li');

/* --------------------------------------------------------- */
    /* 开始监听事件 */
    carousel.addEventListener('touchstart',function(e){
        // ul.style.transition='none';
        this.startX=e.targetTouches[0].clientX;
        this.currentPosition=currentPosition;
    })
    carousel.addEventListener('touchmove',function(e){
        var endX=e.targetTouches[0].clientX;
        this.distanceX=endX-this.startX;
        var currentPosition=this.currentPosition+this.distanceX;
        ul.style.transform='translateX('+ (currentPosition) +'px)';
        
    })
    // carousel.addEventListener('touchend',function(e){
    //     if(Math.abs(this.distanceX)>(li_width/3)){    //进行翻页
    //         if(this.distanceX>0){
    //             //上一张
    //             index--;
    //         }else{
    //             index++;
    //         }
    //         ul.style.transition="all 0.5s ease";
    //         ul.style.transform='translateX('+ (currentPosition+(-index*li_width)) +'px)';
    //         currentPosition=currentPosition-index*li_width;
    //     }else if(Math.abs(this.distanceX)>0){          //不进行翻页
    //         ul.style.transition="all 0.5s ease";
    //         ul.style.transform='translateX('+ (currentPosition) +'px)';
    //     }
    //     index=0;
    // })




})();