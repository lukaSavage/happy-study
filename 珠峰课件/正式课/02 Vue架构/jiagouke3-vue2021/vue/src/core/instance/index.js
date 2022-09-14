import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options) // 代码的初始化
}



initMixin(Vue) //  Vue.prototype._init
stateMixin(Vue) // $set $delete $watch
eventsMixin(Vue) // $on $emit $once $off
lifecycleMixin(Vue) // Vue.prototype._update  Vue.prototype.$forceUpdate  Vue.prototype.$destroy
renderMixin(Vue) // Vue.prototype._render $nextTick

export default Vue
