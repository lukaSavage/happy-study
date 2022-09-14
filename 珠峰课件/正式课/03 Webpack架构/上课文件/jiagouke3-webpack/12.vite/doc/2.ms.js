let MagicString = require('magic-string');
let {parse} = require('es-module-lexer');
let code = `import {createApp} from 'vue';`;

(async function(){
    let imports = await parse(code);
    console.log(imports);
    const {n,s,e} = imports[0][0];
    //[ { n: 'vue', s: 25, e: 28} ]
    var magicString = new MagicString(code);
    let id = `@modules/${n}`;
    console.log(magicString.overwrite(s,e,id).toString());
})();


//let start = `import {createApp} from 'vue';`.indexOf('vue');
//console.log(start);
//vue => @modules/vue
//magicString.overwrite();
