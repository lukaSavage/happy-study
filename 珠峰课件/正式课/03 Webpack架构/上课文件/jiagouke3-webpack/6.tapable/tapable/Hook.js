
class Hook{
  constructor(args){
    if(!Array.isArray(args))
        args = [];
    this.args = args;//把参数的数组存放在钩子内部
    this.taps = [];//存放事件函数配置对象的数组
    this.call = CALL_DELEGATE;//初始化call方法
    this.callAsync = CALL_ASYNC_DELEGATE;
    this.promise = PROMISE_DELEGATE;
    this.interceptors = [];//拦截器的数组，里面放着不同的拦截器对象
  }
  tap(options,fn){
    this._tap('sync',options,fn);
  }
  tapAsync(options,fn){
    this._tap('async',options,fn);
  }
  tapPromise(options,fn){
    this._tap('promise',options,fn);
  }
  _tap(type,options,fn){
    if(typeof options === 'string'){
      options = {name:options};
    }
    let tapInfo = {...options,type,fn};//type=sync fn事件函数 name名称
    tapInfo = this._runRegisterInterceptors(tapInfo);
    this._insert(tapInfo);
  }
  _runRegisterInterceptors(tapInfo){
    for(const interceptor of this.interceptors){
      if(interceptor.register){//如果它身上有注册拦截器的话
        let newTapInfo = interceptor.register(tapInfo);
        if(newTapInfo)//如果注册拦截器返回了新的tapInfo,就用新的替换老的
           tapInfo=newTapInfo;
      }
    }
    return tapInfo;
  }
  intercept(interceptor){
    this.interceptors.push(interceptor);
  }
  _resetCompilation(){
    this.call = CALL_DELEGATE;
    this.callAsync = CALL_ASYNC_DELEGATE;
  }
  _insert(tapInfo){
    this._resetCompilation();
    let  before=new Set();
    if(typeof tapInfo.before === 'string'){
      before = new Set([tapInfo.before]);
    }else if(Array.isArray(tapInfo.before)){
      before = new Set(tapInfo.before);
    }
    //在插入的时候要按stage的顺序插入
    let stage = 0;//默认的stage是0
    if(typeof tapInfo.stage === 'number'){
      stage = tapInfo.stage;//2
    }
    let i = this.taps.length;//总的长度3
    while(i>0){
      i--;
      const x = this.taps[i];//stage 5
      this.taps[i+1]=x;
      const xStage = x.stage || 0;//5
      if(before){
        if(before.has(x.name)){
          before.delete(x.name);
          continue;
        }
        if(before.size > 0)
          continue;
      }
      if(xStage>stage){
        continue;
      }
      i++;
      break;
    }
    this.taps[i]= tapInfo;//直接存入了对应的位置
  }
  compile(options){
    throw new Error('抽象:应该被子类重写');
  }
  _createCall(type){
    return this.compile({
        taps:this.taps,
        args:this.args,
        interceptors:this.interceptors,//把拦截器也传过去，用来拼函数体
        type
    });
  }
}
const CALL_DELEGATE = function(...args){
    this.call = this._createCall('sync');//调用它的时候 ，它会动态创建call函数，重写this.call属性
    return this.call(...args);//执行新创建的call方法，
}
const CALL_ASYNC_DELEGATE = function(...args){
  this.callAsync = this._createCall('async');//调用它的时候 ，它会动态创建call函数，重写this.call属性
  return this.callAsync(...args);//执行新创建的call方法，
}
const PROMISE_DELEGATE = function(...args){
  this.promise = this._createCall('promise');//调用它的时候 ，它会动态创建call函数，重写this.call属性
  return this.promise(...args);//执行新创建的call方法，
}
module.exports = Hook;