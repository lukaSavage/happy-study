/* @flow */

import { isRegExp, remove } from 'shared/util'
import { getFirstComponentChild } from 'core/vdom/helpers/index'

type CacheEntry = {
  name: ?string;
  tag: ?string;
  componentInstance: Component;
};

type CacheEntryMap = { [key: string]: ?CacheEntry };

function getComponentName (opts: ?VNodeComponentOptions): ?string {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern: string | RegExp | Array<string>, name: string): boolean {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance: any, filter: Function) {
  const { cache, keys, _vnode } = keepAliveInstance
  for (const key in cache) {
    const entry: ?CacheEntry = cache[key]
    if (entry) {
      const name: ?string = entry.name
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}

function pruneCacheEntry (
  cache: CacheEntryMap,
  key: string,
  keys: Array<string>,
  current?: VNode
) {
  const entry: ?CacheEntry = cache[key]
  if (entry && (!current || entry.tag !== current.tag)) {
    entry.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}
const patternTypes: Array<Function> = [String, RegExp, Array]

export default {
  name: 'keep-alive',
  abstract: true, // 说明是一个抽象组件 不会被记录在$parent $children中

  props: {
    include: patternTypes, // 白名单
    exclude: patternTypes, // 黑名单   动态操作黑白名单可以切换缓存 v-if 来切换
    max: [String, Number] // 最大的缓存个数
  },

  methods: {
    cacheVNode() {
      const { cache, keys, vnodeToCache, keyToCache } = this
      if (vnodeToCache) {
        const { tag, componentInstance, componentOptions } = vnodeToCache
        cache[keyToCache] = { // 缓存的就是实例
          name: getComponentName(componentOptions),
          tag,
          componentInstance, 
        }
        keys.push(keyToCache) // [1]
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
        this.vnodeToCache = null
      }
    }
  },

  created () {
    this.cache = Object.create(null) // 记录缓存的列表
    this.keys = [] // 记录所有要缓存组件的名字
  },

  destroyed () {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  mounted () { // mounted要等待页面渲染完毕后调用
    this.cacheVNode()
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  updated () {
    this.cacheVNode()
  },

  render () {
    const slot = this.$slots.default // 拿到默认插槽
    const vnode: VNode = getFirstComponentChild(slot) // 获取第一个组件的虚拟节点 keep-alive只能缓存一个
    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
    if (componentOptions) { // Ctor,props,children,slos,name
      // check pattern
      const name: ?string = getComponentName(componentOptions) // componentOptions.name
      const { include, exclude } = this
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode // 看是否需要缓存 或者 看是否不需要缓存 直接返回
      }

      const { cache, keys } = this // {} []
      const key: ?string = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key // 计算一个缓存的key值
      if (cache[key]) { // 有缓存的情况 cache[key] = vnode  vnode.componentInstance
        // 路由 a->b  b-> c  c->a
        vnode.componentInstance = cache[key].componentInstance
        // make current key freshest
        remove(keys, key)
        keys.push(key)
      } else {
        // delay setting the cache until update
        this.vnodeToCache = vnode
        this.keyToCache = key // 记录需要缓存的key 和 哪个节点要缓存
      }

      vnode.data.keepAlive = true // 为了后续在组件创造的过程中 init方法 判断是不是keep-alive,如果有就不再次 new Ctor
    }
    return vnode || (slot && slot[0]) // 返回虚拟节点

    // a b页面都缓存了
    // a->b 页面他是如何更新的

    // <keep-alive><router-view></router-view></keep-alive>
  }
}
