(function(w){
    /**
     * 实现屏幕滚动
     * @param wrapper   包裹元素
     * @param content   内容元素（负责位置变化）
     * @param scrollBar 滚动条元素；可选；如果不指定，就没有滚动条
     * @param callback 对象，对象四个方法（回调函数） start move end complete
     */
    function touchScroll(wrapper, content, scrollBar, callback){
        var intervalId = null;  //定义定时器标记

        //计算滚动条的高度
        if (scrollBar) {
            var scale1 = wrapper.clientHeight / content.offsetHeight; //比例
            if(scale1===1){
                scrollBar.style.height=0;
            }else{
                scrollBar.style.height = wrapper.clientHeight * scale1 + 'px';
            }           
        }

        //开启3d加速
        transformCss(content, 'translateZ', 0);

        //触摸开始
        wrapper.addEventListener('touchstart', function(event){
            //获取触点对象
            var touch = event.targetTouches[0];
            // 获取触点的起始位置
            this.startY = touch.clientY;
            // 获取 content 的起始位置
            this.eleY = transformCss(content, 'translateY');
            // 初始化 触点滑动距离
            this.dstY = 0;
            //初始时间
            this.startTime = Date.now();

            //滚动条显示
            if (scrollBar) {
                scrollBar.style.opacity = 1;
            }

            //取消定时
            clearInterval(intervalId);

            //调用回调函数
            if (callback && typeof(callback['start']) === 'function') {
                callback['start']();
            }
        });

        //触摸移动
        wrapper.addEventListener('touchmove', function(event){
            //获取触点对象
            var touch = event.targetTouches[0];
            //获取触点的结束位置
            var endY = touch.clientY;
            //计算触点的滑动距离
            this.dstY = endY - this.startY;

            // 根据滑动距离 计算 content 的位置
            var translateY = this.eleY + this.dstY;

            //判断临界值，开启橡皮筋效果
            if (translateY >= 0) { //上边界
                //计算比例
                var scale = 1 - translateY / (wrapper.clientHeight * 1.9);
                //重新计算translateY
                translateY *= scale;
            } else if (translateY <= (wrapper.clientHeight - content.offsetHeight)) {
                //计算content距离视口底部距离
                var bottomY =  wrapper.clientHeight - (content.offsetHeight + translateY);
                // 计算比例
                var scale = 1 - bottomY / (wrapper.clientHeight * 1.9);
                // 重新计算 bottomY
                bottomY *= scale;
                // 重新计算 translateY
                translateY = (wrapper.clientHeight - bottomY) - content.offsetHeight
            }

            // 设置 content 的位置
            transformCss(content, 'translateY', translateY);

            // 调整滚动条位置
            if (scrollBar) {
                setScrllBarOffset(translateY);
            }

            //调用回调函数
            if (callback && typeof(callback['move']) === 'function') {
                callback['move']();
            }
        });

        //触摸结束
        wrapper.addEventListener('touchend', function(event){
            //结束时间，计算时间差
            var dstTime = Date.now() - this.startTime;
            //计算加速距离
            var speed = this.dstY / dstTime * 200;

            // 计算此时元素的位置 并且加上 加速距离
            var translateY = transformCss(content, 'translateY');
            translateY += speed;

            //设置过渡类型
            var type = 'cubicEaseOut';  //一直在减速

            //判断到达临界点，开启回弹
            if (translateY >= 0) {
                translateY = 0;
                type = 'backEaseOut';
            } else if (translateY <= wrapper.clientHeight - content.offsetHeight) {
                translateY = wrapper.clientHeight - content.offsetHeight;
                type = 'backEaseOut';
                if (callback && typeof(callback['enddown']) === 'function') {
                    callback['enddown']();
                }
            }

            //重新设置 content 位置 调用过渡函数
            moveTo(content, translateY, 500, type);

            //调用回调函数
            if (callback && typeof(callback['end']) === 'function') {
                callback['end']();
            }
        });


        /**
         * 过渡函数
         * @param node  要发生变换的元素
         * @param target    目标值
         * @param duration      过渡持续时间
         * @param type  过渡类型 linear、cubicEaseOut、backEaseOut
         */
        function moveTo(node, target, duration, type = 'linear') {

            //定义Tween算法的函数
            var tween = {
                //匀速
                linear: function(t,b,c,d){ return c*t/d + b; },
                //减速
                cubicEaseOut: function(t,b,c,d){
                    return c*((t=t/d-1)*t*t + 1) + b;
                },
                //回弹
                backEaseOut: function(t,b,c,d,s){
                    if (s == undefined) s = 1.70158;
                    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
                },
            };

            // 定义Tween函数的参数
            var t = 0;  //当前时间
            var b = transformCss(node, 'translateY');  //起始值
            var c = target - b;  //变化量
            var d = duration;

            //避免多次定时，清除之前的定时（不论之前有没有定时）
            clearInterval(intervalId);
            //开启定时
            intervalId = setInterval(function(){
                //t变换
                t += 10;
                //利用Tween函数获取当前的值
                var translateY = tween[type](t,b,c,d);
                // 设置content 的位置
                transformCss(node, 'translateY', translateY);

                //调整滚动条的位置
                if (scrollBar) {
                    setScrllBarOffset(translateY);
                }

                //判断过渡完毕
                if (t >= d) {
                    //定时结束 过渡结束
                    clearInterval(intervalId);
                    //滚动条隐藏
                    if (scrollBar) {
                        scrollBar.style.opacity = 0;
                    }
                    // 调用回调函数
                    if (callback && typeof(callback['complete']) === 'function') {
                        callback['complete']();
                    }
                }
            }, 10);
        }


        /**
         * 设置滚动条的位置
         * @param contentTranslateY 内容此时的位置
         */
        function setScrllBarOffset(contentTranslateY) {
            // 计算比例  content当前位置 / 最大位置
            var scale2 = -contentTranslateY / (content.offsetHeight - wrapper.clientHeight);
            // 计算滚动条位置
            transformCss(scrollBar, 'translateY', (wrapper.clientHeight - scrollBar.offsetHeight) * scale2);
        }
    }


    //把方法暴露
    w.touchScroll = touchScroll;


})(window);