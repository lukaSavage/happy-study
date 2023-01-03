(function(){
    /* 1.预备工作：准备好数据,并阻止默认行为 */
    var ul=document.querySelector('#ul');
    var app=document.querySelector('#app');
    var tip=document.querySelector('.tip');
    var scale=document.querySelector('#scale');
    var header=document.querySelector('.header');
    var span=document.querySelector('.header span');
    var bigImg=document.querySelector('.view img');
    var scrollBar=document.querySelector('.scroll-bar');
    var imgData=[];
    for(var i=0;i<30;i++){
        var imgSrc="./img/"+(i%18+1)+".jpg";
        imgData.push(imgSrc);
    }
    app.addEventListener('touchstart',function(e){
        e.preventDefault();
    })
    /* 2.为ul添加数据 */
    var start=0;
    var length=12;
    var iscomplate=false;
    createEle();
/* ----------------------------------------- */
    var ismove=false;
    touchScroll(app,swiper,scrollBar,{
        start(){
            ismove=false;
        },
        move(){
            lazyLoad();
            if(transformCss(ul,'translateY')<=(app.clientHeight-ul.offsetTop)){
                tip.style.opacity=1;
            }
            ismove=true;
        },
        enddown(){
            if(iscomplate){
                tip.innerHTML='大兄弟,没有了'
                return;
            }
            tip.style.opacity=0;
            //加载数据
            createEle();
            //取消回弹效果
            clearInterval(app.timer);
            //重新计算滚动条的高度
            var scale1 = app.clientHeight / ul.offsetHeight;
            scrollBar.style.height = app.clientHeight * scale1 + 'px';
        }
    });
/* -------------------------------------------- */
    // 创建一个元素像素
    function createEle(){
        var end=start+length;
        for(var i=start;i<end;i++){ 
            //当到达100的会后直接返回
            if(i>imgData.length-1){
                iscomplate=true;
                break;
            }   
            var li=document.createElement('li');           
            li.dataset.src=imgData[i];
            ul.appendChild(li);
        }
        start=end;
        lazyLoad();
        console.log(start,end);
    };
    //懒加载
    function lazyLoad(){
        var lis=document.querySelectorAll('#ul li');
        var screen_h=document.documentElement.clientHeight;
        lis.forEach(function(item){
            //如果加载了，直接返回
            if(item.isLoad){
                return;
            }
            if(item.getBoundingClientRect().top<=screen_h){
                var img=new Image();
                img.src=item.dataset.src;           
                
                //图片加载成功事件
                img.addEventListener('load',function(){
                    this.style.opacity=1;
                })
                //如果图片加载失败
                img.addEventListener('error', function(){
                    img.src = 'img/noimage.png';
                 });
                 item.appendChild(img);
                //标记已经加载的元素
                item.isLoad=true;
            }
        });
        
        
    }

/* -------------------------------------------- */
    //为span添加关闭事件
    span.addEventListener('touchend',function(){
        transformCss(scale,'scale',0);
    });
    //为每个li监听触摸放大事件(委托)
    ul.addEventListener('touchend',function(e){
        if(ismove){
            return;
        }
        if(e.target.nodeName=='IMG'){
            //点击放大的位置
            var x=e.target.getBoundingClientRect().left+e.target.offsetWidth/2;
            var y=e.target.getBoundingClientRect().top+e.target.offsetHeight/2;
            scale.style.transformOrigin=x+'px '+y+'px';
            //改变路径
            bigImg.src=e.target.src;
            //放大图片
            transformCss(scale,'scale',1);
            
        }
    })
/* ------------------------------------------------- */
    //给大图监听手势事件
    gesture(bigImg);

})();