//开机动画
(function(){
    var mask_top=document.querySelector('.mask_top');
    var mask_bottom=document.querySelector('.mask_bottom');
    var mask_line=document.querySelector('.mask_line');
    var imgList=[
        'bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg',
        'bg5.jpg','about1.jpg','about2.jpg','about3.jpg',
        'about4.jpg','worksimg1.jpg','worksimg2.jpg',
        'worksimg3.jpg','worksimg4.jpg','team.png','greenLine.png'
    ]
    var loaded=0;
    imgList.forEach(function(item){
        var img=document.createElement('img');
        img.src='images/'+item;
        img.onload=function(){
            loaded++;
            //计算比例
            var ratio=loaded/imgList.length;
            mask_line.style.width=ratio*100+'%';
        }
        mask_line.addEventListener('transitionend',function(){
            if(loaded==imgList.length){
                mask_top.style.height=0;
                mask_bottom.style.height=0;
                //删除进度条
                mask_line.remove();
            }
        })
        mask_top.addEventListener('transitionend',function(){
            this.parentNode.remove();
            
        })
    })
})();


//导航部分
(function(){
    //1.获取相应的元素
    var header=document.getElementById('header');
    var lis=header.querySelectorAll('li');
    var mark=document.querySelector('.mark');
    var section=document.querySelectorAll('section');
    var container=document.querySelector('#container');
    var ul=document.querySelector('.ul');
    var aside_nav_lis=document.querySelectorAll('#aside_nav li');
    var lisIndex=0;
    var prevIndex=0;
    var section_H=window.innerHeight-header.offsetHeight;
    /* 定义出入场动画 */
    var animateData=[
        //第一屏不做处理
        {
            in:function(){},
            out:function(){}
        },
        //第二屏
        {
            in:function(){
                var plane1=document.querySelector('.plane1');
                var plane2=document.querySelector('.plane2');
                var plane3=document.querySelector('.plane3');
                plane1.style.transform='translate(0,0)';
                plane2.style.transform='translate(0,0)';
                plane3.style.transform='translate(0,0)';
            },
            out:function(){
                var plane1=document.querySelector('.plane1');
                var plane2=document.querySelector('.plane2');
                var plane3=document.querySelector('.plane3');
                plane1.style.transform='translate(-200px,-200px)';
                plane2.style.transform='translate(-200px,200px)';
                plane3.style.transform='translate(200px,-200px)';
            }
        },
        //第三屏
        {
            in:function(){
                var pencel1=document.querySelector('.pencel1');
                var pencel2=document.querySelector('.pencel2');
                var pencel3=document.querySelector('.pencel3');
                pencel1.style.transform='translateY(0)';
                pencel2.style.transform='translateY(0)';
                pencel3.style.transform='translate(0)';
            },
            out:function(){
                var pencel1=document.querySelector('.pencel1');
                var pencel2=document.querySelector('.pencel2');
                var pencel3=document.querySelector('.pencel3');
                pencel1.style.transform='translateY(-200px)';
                pencel2.style.transform='translateY(200px)';
                pencel3.style.transform='translate(200px,200px)';
            }
        },
        //第四屏
        {
            in:function(){
                var rotate1=document.querySelector('.div4_img_top');
                var rotate2=document.querySelector('.div4_img_bottom');
                rotate1.style.transform='rotate(0)';
                rotate2.style.transform='rotate(0)';
            },
            out:function(){
                var rotate1=document.querySelector('.div4_img_top');
                var rotate2=document.querySelector('.div4_img_bottom');
                rotate1.style.transform='rotate(45deg)';
                rotate2.style.transform='rotate(-45deg)';
                
            }
        },
        //第五屏
        {
            in:function(){
                var div5_title=document.querySelector('.div5_title');
                var div5_text=document.querySelector('.div5_text');
                div5_title.style.transform='translateX(0)';
                div5_text.style.transform='translateX(0)';
            },
            out:function(){
                var div5_title=document.querySelector('.div5_title');
                var div5_text=document.querySelector('.div5_text');
                div5_title.style.transform='translateX(-200px)';
                div5_text.style.transform='translateX(200px)';
            }
        },
        
    ];

    //2.初始化
    /* ①初始化每个section的高度 */
    section.forEach(function(item,index){
        item.style.height=section_H+'px';
    })
    /* ②初始化container的高度 */
    container.style.height=section_H+'px';
    /* ②初始化mark的最初位置 */
    mark_animation(lisIndex);
    /* ③页面视口变化初始化 */
    window.addEventListener('resize',function(){
        //重置高度
        section_H=window.innerHeight-header.offsetHeight;
        //重置container的高度
        container.style.height=section_H+'px';
        section.forEach(function(item,index){
            item.style.height=section_H+'px';
        })
    })
    /* 初始化所有离场动画 */
    animateData.forEach(function(item){
        item.out();
    })

    /* 3.鼠标点击事件 */
    /* 3.1点击导航部分 */
    lis.forEach(function(item,index){
        item.onclick=function(){
            lis.forEach(function(item){
                item.classList.remove('active');
            })
            this.classList.add('active');
            mark_animation(index);
            ul.style.top=-section_H*index+'px';
            lisIndex=index;
        }
    })  
    /* 3.2点击侧边导航部分 */
    aside_nav_lis.forEach(function(item,index){
        item.onclick=function(){
            aside_nav_lis.forEach(function(item){
                item.classList.remove('active');
            })
            this.classList.add('active');
            mark_animation(index);
            ul.style.top=-section_H*index+'px';
            lisIndex=index;
            //做飞机离场
            animateData[prevIndex].out();
            //做飞机进场动画
            animateData[lisIndex].in();
            //记录当前索引给上一次
            prevIndex=lisIndex;
            console.log(prevIndex,lisIndex);
        }
    })


    /* 4.鼠标滚轮事件 */
    var timer=null;
    document.addEventListener('mousewheel',roll);
    document.addEventListener('DOMMouseScroll',roll);
    function roll(e){
        clearTimeout(timer);
        timer=setTimeout(function(){
            if(e.wheelDelta){    //兼容chrom,IE
                if(e.wheelDelta>0){  //<0,下滚                
                    lisIndex--;
                    if(lisIndex<0){
                        lisIndex=0;   
                    }
                }else{
                    lisIndex++;    //>0,上滚
                    if(lisIndex>lis.length-1){
                        lisIndex=lis.length-1;
                    }
                }
            }            
            if(e.detail){          //兼容firefox
                if(e.detail>0){          
                    lisIndex++;
                    if(lisIndex>=lis.length-1){
                        lisIndex=lis.length-1;
                    }
                }else{
                    lisIndex--;
                    if(lisIndex<0){
                        lisIndex=0;   
                    }
                }
            }
            /* 做事件处理 */
            lis.forEach(function(item){
                item.classList.remove('active');
            })
            aside_nav_lis.forEach(function(item){
                item.classList.remove('active');
            })
            lis[lisIndex].classList.add('active');
            aside_nav_lis[lisIndex].classList.add('active');
            mark_animation(lisIndex);
            ul.style.top=-section_H*lisIndex+'px';
            //上一个页面离场动画
            animateData[prevIndex].out();
            //设置当前页面进场动画
            animateData[lisIndex].in();
            //将lisIndex赋值给prevIndex
            prevIndex=lisIndex;
            console.log(prevIndex,lisIndex);
        },500);
    }
    /* 6.打包函数部分 */
    function mark_animation(index){
        mark.style.left=lis[index].offsetLeft+(lis[index].offsetWidth/2-mark.offsetWidth/2)+'px';
    }
})();


//第一屏轮播图部分
(function(){
    var carousel=document.querySelector('.div1_carousel');
    var lis1=carousel.querySelectorAll('ul>li');
    var lis2=carousel.querySelectorAll('ol>li');
    var currentIndex=0;     //当前索引
    var prevIndex=0;         //上一个索引
    var isanimated=false;   //节流阀，判断是否正在执行动画
    var timer=null;
    lis2.forEach(function(item,index){ 
        item.onclick=function(){
            if(isanimated){       //防止在轮播的时候点击
                return;
            }
            currentIndex=index;             //修改全局的索引
            setPlay(false);        
        }
    })
    //自动播放
    timer=setInterval(intervalId,3000);
    carousel.onmouseenter=function(){
        clearInterval(timer);
    }
    carousel.onmouseleave=function(){
        timer=setInterval(intervalId,3000);
    }
    //定时器的函数
    function intervalId(){
        currentIndex++;
        if(currentIndex>lis1.length-1){
            currentIndex=0;
        }
        setPlay(true);
    }
    //轮播核心及方向的判断
    function setPlay(isAutoPlay){
        if(isanimated){
            return;        //如果正在执行，直接跳出
        }
        isanimated=true;    //正在执行动画           
        setTimeout(function(){
            isanimated=false;
        },2000)
        lis1.forEach(function(item,index){
            item.className='';
            lis2[index].className='';
        }) 
        lis2[currentIndex].className="active";
        if(currentIndex>prevIndex || isAutoPlay){              
            lis1[currentIndex].className='active right_show';
            lis1[prevIndex].className='left_hide';                             
        }else if(currentIndex<prevIndex){
            lis1[currentIndex].className='active left_show';
            lis1[prevIndex].className='right_hide';
        }
        prevIndex=currentIndex; 
    }

})();
//音乐导航部分
(function(){
    var music=document.querySelector('.music');
    music.addEventListener('click',function(){
        if(music.children[0].paused){
            music.children[0].play();
            music.classList.add('active');
        }else{
            music.children[0].pause();
            music.classList.remove('active');
        }
    })
})();
//第五屏气泡部分
(function(){
    var lis=document.querySelectorAll('.div5_people li');
    var createCav=createCav();
    lis.forEach(function(item){
        item.onmouseenter=function(){
            console.log(1);
            this.appendChild(createCav);
        }
        item.onmouseleave=function(){
            this.removeChild(createCav);
        }
    })


    
    function createCav(){
        var canvas=document.createElement('canvas');
        canvas.width=236;
        canvas.height=448;
        var ctx=canvas.getContext('2d');
    
        var temp=[];
        //创建数据
        setInterval(function(){
            var obj={};
            obj.x=Math.random()*canvas.width;
            obj.y=canvas.height;
            obj.radius=Math.random()*8;
            obj.r=Math.floor(Math.random()*256);
            obj.g=Math.floor(Math.random()*256);
            obj.b=Math.floor(Math.random()*256);
            obj.circle=0;   //定义每次圆心y的坐标量
            obj.scale=Math.random()*8+8;   //定义每个小球来回摆动
            temp.push(obj);
        },40);
        //开始绘图
        setInterval(function(){      
            ctx.clearRect(0,0,canvas.width,canvas.height);
            temp.forEach(function(item,index){  
                item.circle+=0.5;
                item.x=item.x+(Math.sin(item.circle))*item.scale;
                item.y-=item.circle; 
                if(item.y<=0){
                    temp.splice(index,1);                
                    return;
                }     
                ctx.beginPath();           
                ctx.fillStyle='rgb('+item.r+','+item.g+','+item.b+')';
                ctx.arc(item.x,item.y,item.radius,0,Math.PI*2);           
                ctx.fill();   
                      
            })
            
        },50)
        return canvas;   //记住要返回创建的canvas
    }





})();