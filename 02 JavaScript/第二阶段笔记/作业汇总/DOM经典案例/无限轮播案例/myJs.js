//1.获取属性的便捷函数
	function $(id){
		return typeof id === "string" ? document.getElementById(id) : null ;
	}
//2.动画函数的封装
         var timer =null;
    function linear (obj,step,target) {
		//1.清理定时器
		clearInterval(obj.timer);
		//2.判断正负步
		if(obj.offsetLeft < target){
			step=step;
		}else if(obj.offsetLeft > target){
			step=-step;
		}else{
			step=0;
		}
		//3.设置定时器
		obj.timer = setInterval(function(){
			//3.1控制核心动画函数
		obj.style.left = obj.offsetLeft + step +"px";
			//3.2判断细节
			if(Math.abs(target-obj.offsetLeft)<Math.abs(step)){
				clearInterval(obj.timer);
				obj.style.left = target + "px" ;
			}
		},20)
		
	}

//3.缓动函数的封装
    function ease (obj,target) {
		//1.清除定时器
		clearInterval(obj.timer);
		//2.设置定时器
		obj.timer = setInterval(function(){
			//2.1设置步长
			var step = (target-obj.offsetLeft) *0.2;
			//2.2取整并控制核心函数
			step = target > obj.offsetLeft ? Math.ceil(step) :Math.floor(step);
			obj.style.left = obj.offsetLeft + step + "px" ;
			//2.3判断细节
			if(obj.offsetLeft == target){
				clearInterval(obj.timer);
			}
			
			
		},20)
	}

//4.封装scroll兼容函数
function scroll(){
	if(pageXOffset!==null){     
		return{
			left:window.pageXOffset,
			top:window.pageYOffset,
		}
	}else if(document.compatMode === "CSS1Compat"){   //判断是否为严格模式
		return{
			top:document.documentElement.scrollTop,
		    left:document.documentElement.scrollLeft,
		}
	}	
		return{
			top:document.body.scrollTop,
			left:document.body.scrollLeft,
		}
}

//5.封装client兼容函数
function client() {
    if(window.innerWidth){ // ie9+ 最新的浏览器
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }else if(document.compatMode === "CSS1Compat"){ // W3C
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }

    return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
    }
}
//6.封装获取css样式的兼容函数(注意：attr需要用引号，obj不需要)
function getStyleAttr(obj, attr) {
    if(obj.currentStyle){ // IE8- 和 opera
        return obj.currentStyle[attr];
    }else {
        return window.getComputedStyle(obj, null)[attr];   //IE9+
    }
}
//7.封装阻止事件冒泡函数
 /*
 if(event && event.stopPropagation){
                event.stopPropagation();
            }else {
                window.event.cancelBubble = true;     //这里是IE兼容
            }

*/
//8.缓动动画升级---单值
    function buffer(obj,attr,target) {
		//1.清除定时器
		clearInterval(obj.timer);
		//2.设置定时器
		obj.timer = setInterval(function(){
			// 2.0 获取初始值
            var begin = parseInt(getStyleAttr(obj, attr));
			//2.1设置步长
			var step = (target-begin) *0.2;
			//2.2取整并控制核心函数
			step = target > begin ? Math.ceil(step) :Math.floor(step);
			obj.style[attr] = begin + step + "px" ;
			//2.3判断细节
			if(begin == target){
				clearInterval(obj.timer);
			}
			
			
		},20)
    }
//9.ajax函数的封装
function ajax_all(option){
	var xhr=new XMLHttpRequest();
	    if(option.type=="get"&&option.data){
			option.url+="?";
			option.url+=option.data;
			option.data=null;
		}
	xhr.open(option.type,option.url);
	    if(option.type=="post"&&option.data){
			xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		}
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4 && xhr.status==200){
			var type=xhr.getResponseHeader("Content-Type");
			if(type.indexOf("xml")!=-1){
				option.success(xhr.responseXML);	
			}else if(type.indexOf("json")!=-1){
				option.success(JSON.parse(xhr.responseText));
			}else{
				option.success(xhr.responseText);
				
			}
		}
	}
	xhr.send(option.data);
}







