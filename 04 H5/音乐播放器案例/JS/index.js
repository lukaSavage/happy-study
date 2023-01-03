(function(){
    //第一个按钮
    var video=document.querySelector('#video');
    var btn1=document.querySelector('#btn1');
    btn1.addEventListener('click',btn1Event);
    document.addEventListener('keyup',function(e){
        if(e.keyCode===32){
            btn1Event();
        }
        console.log(e.keyCode);
    });
    function btn1Event(){
        if(video.paused){
            video.play();
            btn1.classList.add('active');
        }else{
            video.pause();
            btn1.classList.remove('active');
        }
    }
    //第二个按钮
    var btn2=document.querySelector('#btn2');
    var bigPinkMask=document.querySelector('.control-slide .pinkMask');
    var bigGray=document.querySelector('.control-slide .gray');
    var bigWhiteBar=document.querySelector('.control-slide .whiteBar');
    btn2.onclick=function(){
        video.pause();
        btn1.classList.remove('active');
        video.currentTime=0;
    }
    //实时监听滑块的位置
    video.addEventListener('timeupdate',function(){
        //计算比例
        var rate=video.currentTime/video.duration;
        // console.log(bigGray);
        var maskMax=bigGray.clientWidth-bigWhiteBar.offsetWidth;
        //让pinkMask也跟着移动
        bigWhiteBar.style.left=bigPinkMask.style.width=rate*maskMax+'px';
        //实时监听进度
        times_one.innerHTML=timeFormated(video.currentTime);
    })
    //元数据加载完毕触发
    var times_one=document.querySelector('.times :first-child');
    var times_two=document.querySelector('.times :last-child');
    video.addEventListener('loadedmetadata',function(){
        times_two.innerHTML=timeFormated(video.duration);
    })
    //播放结束触发
    video.addEventListener('ended',function(){
        video.pause();
        this.classList.remove('active');
        currentTime=0;
    })

/* ---------------------------------- */
    //实现拖动滚动条
    slideFn(bigWhiteBar,bigGray,bigPinkMask,function(rate){
        video.currentTime=rate*video.duration;
    });
    //点击视频进度条
    var controlSlide=bigGray.parentNode;
    controlSlide.onclick=function(e){
        var x=e.clientX-controlSlide.offsetLeft;
        if(x>bigGray.clientWidth-bigWhiteBar.offsetWidth){
            x=bigGray.clientWidth-bigWhiteBar.offsetWidth;
        }
        bigWhiteBar.style.left = x + 'px';
        bigPinkMask.style.width= x + 'px';
        //计算比例
        var rate=x/(bigGray.clientWidth-bigWhiteBar.offsetWidth); 
        video.currentTime=rate*video.duration;
    }

/* ---------------------------------- */
    //点击音量
    var volume=document.querySelector('.volume-muted');
    volume.onclick=function(){
        video.muted=!video.muted;
        this.classList.toggle('active');
    }
    //滑动音量条
    var smallGray=document.querySelector('.volume .gray');
    var smallPinkMask=document.querySelector('.volume .pinkMask');
    var smallWhiteBar=document.querySelector('.volume .whiteBar');
    var smallControlSlide=smallGray.parentNode;
    slideFn(smallWhiteBar,smallGray,smallPinkMask,function(rate){
        video.volume=rate;
    });
    smallControlSlide.onclick=function(e){
        var x=e.clientX-smallControlSlide.offsetLeft;
        if(x>smallGray.clientWidth-smallWhiteBar.offsetWidth){
            x=smallGray.clientWidth-smallWhiteBar.offsetWidth;
        }
        smallWhiteBar.style.left = x + 'px';
        smallPinkMask.style.width= x + 'px';
        //计算比例
        var rate=x/(smallGray.clientWidth-smallWhiteBar.offsetWidth); 
        console.log(rate);
        video.volume=rate;
    }
/* ---------------------------------- */




    //封装函数
    function slideFn(bigWhiteBar,bigGray,bigPinkMask,callback){
        //实现拖动滚动条
        bigWhiteBar.onmousedown=function(e){
            var Ox=e.clientX;
            var x=Ox-e.offsetX-bigGray.parentNode.offsetLeft;
            document.onmousemove=function(e){
                var moveX=e.clientX-Ox;
                var res=moveX+x;
                if(res<0){
                    res=0;
                }else if(res>bigGray.clientWidth-bigWhiteBar.offsetWidth){
                    res=bigGray.clientWidth-bigWhiteBar.offsetWidth;
                }
                bigWhiteBar.style.left = res + 'px';
                bigPinkMask.style.width= res + 'px';
                    //计算比例
                var rate=res/(bigGray.clientWidth-bigWhiteBar.offsetWidth);           
                //让pinkMask也跟着移动
                callback(rate);
                // video.volume=rate;
                e.preventDefault();
            }
        }
        document.onmouseup=function(){
            document.onmousemove=null;
        }
    }
    //总时间秒数的换算
    function timeFormated(seconds){
        var h=Math.floor(seconds/3600);
        var m=Math.floor(seconds%3600/60);
        var s=Math.floor(seconds%3600%60);
        h=h<10? '0'+h:h;
        m=m<10? '0'+m:m;
        s=s<10? '0'+s:s;
        var timeStr=h+':'+m+':'+s;
        return timeStr;
    }
})();