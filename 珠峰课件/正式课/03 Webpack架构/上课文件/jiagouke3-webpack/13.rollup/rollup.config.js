import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import {terser} from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
//@rollup开头的是官方名 rollup-plugin是社区版
export default {
    input:'src/main.ts',
    output:{
        file:'dist/bundle.cjs.js',//输出的文件路径和文件名
        format:'es',// 输出的格式
        name:'libName',///当format是iife的时候，必须提供，将会成为全局变量
        globals:{
            lodash:'_',//告诉rollup去全局变量_上取lodash
            jquery:'jQuery'//告诉rollup去全局变量$上取jquery
        }
    },
    external:['lodash','jquery'],
    plugins:[
        babel({
            exclude:"node_modules/**"
        }),
        resolve(),
        commonjs(),
        typescript(),
        terser(),
        postcss(),
        serve({
            port:9090,
            open:true,
            contentBase:'./dist'
        })
    ],
}
/**
 * amd 异步模块定义 require.js使用的模块规范 asynchronous module definition 基本废弃
 * es es module import export
 * iife (Immediately Invoked Function Expression) 立刻执行的函数表达式
 * umd universal module definition  通用模块定义
 * cjs  node.js采用的模块化标标准  require module.exports
 * system
 */