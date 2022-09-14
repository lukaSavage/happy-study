
const ajax = function (){
    if("IE"){
        ajax = function(){
            return 'ActiveObject';
        }
    }else if("CHROME"){
        ajax = function (){
            return XMLHttpRequest;
        }
    }
}
ajax();
ajax();
ajax();
ajax();
