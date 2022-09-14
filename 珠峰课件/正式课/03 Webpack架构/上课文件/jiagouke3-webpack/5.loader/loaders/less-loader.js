let less = require('less');
function loader(source){//less
   let cssStr;
   //render看着像异步，其实是同步的
   less.render(source,{filename:this.resource},(err,output)=>{
     cssStr = output.css
     //this.callback(null,output.css);
   });
   console.log('cssStr',cssStr);
   return `module.exports = ${JSON.stringify(cssStr)}`;

}
module.exports = loader;