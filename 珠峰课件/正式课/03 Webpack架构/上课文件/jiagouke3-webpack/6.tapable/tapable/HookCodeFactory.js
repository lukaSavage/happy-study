
class HookCodeFactory{
    setup(hookInstance,options){
        //把事件函数的数组赋给hook实例的_x属性
        hookInstance._x = options.taps.map(item=>item.fn);
    }
    init(options){
        this.options = options;
    }
    deinit(){
        this.options = null;
    }
    args(options={}){
        let {before,after} = options;
        let allArgs = this.options.args;
        if(before) allArgs = [before,...allArgs];
        if(after) allArgs = [...allArgs,after];
        if(allArgs.length>0)
            return allArgs.join(', ');// name,age
        return '';    
    }
    header(){
        let code = '';
        code += `var _x = this._x;\n`;
        let interceptors = this.options.interceptors;
        if(interceptors.length>0){
            code += `var _taps = this.taps;\n`;
            code += `var _interceptors = this.interceptors;\n`;
            for(let i=0;i<interceptors.length;i++){
                if(interceptors[i].call)
                    code += `_interceptors[${i}].call(${this.args()});\n`;
            }
        }
        return code;
    }
    content(){
        throw new Error('抽象方法:此方法需要子类重写');
    }
    create(options){
        this.init(options);//{args,taps,type}
        let fn;
        switch(options.type){
            case 'sync':
                fn = new Function(
                    this.args(),
                    this.header()+this.content()
                )
                break;
            case 'async':
                fn = new Function(
                    this.args({
                        after:'_callback'
                    }),
                    this.header()+this.content({onDone:()=>`_callback()\n`})
                )    
                break;
            case 'promise':
                let tapsContent = this.content({onDone:()=>`_resolve();\n`});
                let content = `
                return new Promise((function (_resolve, _reject) {
                    ${tapsContent}
                }));
                `;
                fn = new Function(
                    this.args(),
                    this.header()+content
                ) 
                break; 
            default:
                break;    
        }
        this.deinit();
        return fn;
    }
    callTapSeries(){
        let taps = this.options.taps;
        if(taps.length === 0){
            return '';
        }
        let code = '';
        for(let i=0;i<taps.length;i++){
            code += this.callTap(i);
        }
        return code;
    }
    callTapParallel({onDone}){
        let taps = this.options.taps; 
        let code = `var _counter = ${taps.length};`;
        code+=`
          var _done = function () {
            ${onDone()}
          };
        `;
        for(let i=0;i<taps.length;i++){
            code += this.callTap(i);
        }
        return code;
    }
    callTap(tapIndex){
        let code = '';
        let interceptors = this.options.interceptors;
        if(interceptors.length>0){
            code += `var _tap${tapIndex} = _taps[${tapIndex}];\n`;
            for(let i=0;i<interceptors.length;i++){
                if(interceptors[i].tap)
                    code += `_interceptors[${i}].tap(_tap${tapIndex});\n`;
            }
        }
        code += `var _fn${tapIndex} = _x[${tapIndex}];\n`;
        let tapInfo = this.options.taps[tapIndex];
        switch(tapInfo.type){
            case 'sync':
                code += `_fn${tapIndex}(${this.args()});\n`;
                break;
            case 'async':
                code += `
                _fn${tapIndex}(${this.args({after:`function () {
                    if (--_counter === 0) _done();
                  }`})});\n`;
                break;  
            case 'promise':
                code += `
                var _promise${tapIndex} = _fn${tapIndex}(${this.args()});
                _promise${tapIndex}.then((function () {
                    if (--_counter === 0) _done();
                }));\n
                `;
            default:
                break;    
        }
        return code;
    }
}
module.exports = HookCodeFactory;