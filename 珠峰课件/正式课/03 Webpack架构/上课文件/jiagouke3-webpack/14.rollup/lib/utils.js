
const walk = require('./ast/walk');
function has(obj,propertyName){
  return Object.prototype.hasOwnProperty.call(obj,propertyName);
}
function keys(obj){
  return Object.keys(obj);
}

function replaceIdentifiers(statement,source,replacements){
  walk(statement,null,{
    enter(node){
      if(node.type === 'Identifier'){
        if(node.name && replacements[node.name]){
          source.overwrite(node.start,node.end,replacements[node.name]);
        }
      }
    }
  });
}
//方法的目标是把  const age  = 10    =>  const age$1 = 10;

//replacements['age']='age$1'


exports.has = has;
exports.keys = keys;
exports.replaceIdentifiers = replaceIdentifiers;
/// Object.hasOwnProperty(obj,propertyName);