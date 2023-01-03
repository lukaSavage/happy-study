(function(){
    /**
     * 封装多指事件的
     * @param {*} obj 要监听的元素
     */
    function gesture(obj){
        obj.addEventListener('touchstart',function(e){
            if(e.touches.length>=2){
                obj.isTouched=true;
                //计算出初始两个要缩放点的距离
                this.startDis=getDis(e.touches[0],e.touches[1]); 
                //计算出两个要旋转点的距离 
                this.startDeg=getDeg(e.touches[0],e.touches[1]);  
                /* ------------------------------------------------------------- */    
                //记录开始手势的时候，此时元素的缩放比例
                this.startScale = transformCss(obj, 'scale');
                //计算开始手势的时候，此时元素的初始旋转角度
                this.startRotate = transformCss(obj, 'rotate');
                
                
            }
        })
        obj.addEventListener('touchmove',function(e){
            if(e.touches.length>=2){
                //计算出结束时两个点的位置
                var endDis=getDis(e.touches[0],e.touches[1]);
                //计算出结束时两个点的角度
                var endDeg=getDeg(e.touches[0],e.touches[1]);
                //两个位置的比值就是缩放比
                this.scale=endDis/this.startDis;
                //两个触点夹角的变化
                this.rotation=endDeg-this.startDeg;
                /* --------------------------------------------------------------- */
                //实现缩放
                transformCss(obj, 'scale', obj.startScale * obj.scale);
                //实现旋转
                transformCss(obj, 'rotate', obj.startRotate + obj.rotation);

            }
        })
        obj.addEventListener('touchend',function(e){
            if(obj.isTouched && e.touches<2){
                obj.isTouched=false;
            }
        })
        
        /**
         * 用于求两个触摸点的距离
         * @param {*} touch1 第一个触摸点
         * @param {*} touch2 第二个触摸点
         */
        function getDis(touch1,touch2){
            var x=touch2.clientX-touch1.clientX;
            var y=touch2.clientY-touch1.clientY;
            var res=Math.sqrt(x^2,y^2);
            return res;
        }

        /**
         * 用于求出两个状态变化的角度
         * @param {*} touch1 
         * @param {*} touch2 
         */
        function getDeg(touch1,touch2){
            var x=touch2.clientX-touch1.clientX;
            var y=touch2.clientY-touch1.clientY;
            var arc=Math.atan2(y,x);    //math算出的都是弧度制
            var deg=arc/Math.PI*180;
            return deg;
        }
    }
})();