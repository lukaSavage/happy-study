/* @flow */

import { toArray } from '../util/index'


// const plugin = (Vue,a,b,c) =>{

// }
// Vue.use(plugin,a,b,c)

const plugin = {
  install(Vue,a,b,c){

  }
}
// Vue.use(plugin,a,b,c)
export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    // 函数或者对象
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) { // 不会进行插件的重复安装
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args) // 如果这个插件上有install方法就会调用这个instal方法
    } else if (typeof plugin === 'function') { // 如果直接就是函数 就直接让这个函数执行
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
