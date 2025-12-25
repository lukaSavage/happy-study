# Webpack 插件开发完整指南

## 目录

1. [插件基础概念](#插件基础概念)
2. [核心 API](#核心-api)
3. [常用钩子详解](#常用钩子详解)
4. [插件开发模式](#插件开发模式)
5. [实战示例](#实战示例)
6. [最佳实践](#最佳实践)
7. [调试技巧](#调试技巧)

## 插件基础概念

### 什么是 Webpack 插件？

Webpack 插件是一个具有 `apply` 方法的 JavaScript 对象，它可以通过 Webpack 的钩子系统在构建过程的不同阶段执行自定义逻辑。

### 插件的基本结构

```javascript
class MyPlugin {
  constructor(options = {}) {
    // 1. 初始化插件配置
    this.options = options
  }

  apply(compiler) {
    // 2. 注册钩子监听器
    compiler.hooks.someHook.tap('MyPlugin', (params) => {
      // 3. 执行插件逻辑
    })
  }
}

module.exports = MyPlugin
```

## 核心 API

### Compiler 对象

`Compiler` 是 Webpack 的核心引擎，包含了构建的所有配置信息。

```javascript
compiler.options    // Webpack 配置
compiler.context     // 项目根目录
compiler.hooks       // 钩子系统
compiler.outputPath  // 输出路径
```

### Compilation 对象

`Compilation` 表示一次构建任务，包含了当前构建的所有模块和资源。

```javascript
compilation.assets           // 输出资源
compilation.modules         // 所有模块
compilation.chunks          // 代码块
compilation.errors          // 错误信息
compilation.warnings        // 警告信息
```

## 常用钩子详解

### 1. beforeRun

```javascript
compiler.hooks.beforeRun.tapAsync('Plugin', (compiler, callback) => {
  console.log('Webpack 开始运行')
  callback()
})
```

### 2. beforeCompile

```javascript
compiler.hooks.beforeCompile.tapAsync('Plugin', (params, callback) => {
  // 在编译开始前执行，可以修改编译参数
  callback()
})
```

### 3. compile

```javascript
compiler.hooks.compile.tap('Plugin', (compilationParams) => {
  // 编译开始
})
```

### 4. emit

```javascript
compiler.hooks.emit.tapAsync('Plugin', (compilation, callback) => {
  // 资源即将输出到文件系统
  // 可以在这里修改或添加输出资源
  compilation.assets['new-file.txt'] = {
    source: () => 'Hello World',
    size: () => 11
  }
  callback()
})
```

### 5. afterEmit

```javascript
compiler.hooks.afterEmit.tapAsync('Plugin', (compilation, callback) => {
  // 资源已输出到文件系统
  callback()
})
```

### 6. done

```javascript
compiler.hooks.done.tap('Plugin', (stats) => {
  // 编译完成
  console.log('构建完成:', stats.toJson())
})
```

## 插件开发模式

### 1. 同步插件

```javascript
class SyncPlugin {
  apply(compiler) {
    compiler.hooks.someHook.tap('SyncPlugin', (param) => {
      // 同步执行
      console.log(param)
    })
  }
}
```

### 2. 异步插件

```javascript
class AsyncPlugin {
  apply(compiler) {
    compiler.hooks.someHook.tapAsync('AsyncPlugin', (param, callback) => {
      // 异步执行
      setTimeout(() => {
        console.log(param)
        callback()
      }, 1000)
    })
  }
}
```

### 3. Promise 插件

```javascript
class PromisePlugin {
  apply(compiler) {
    compiler.hooks.someHook.tapPromise('PromisePlugin', (param) => {
      // 返回 Promise
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log(param)
          resolve()
        }, 1000)
      })
    })
  }
}
```

## 实战示例

### 示例 1: 文件复制插件

```javascript
class CopyFilePlugin {
  constructor(options) {
    this.from = options.from
    this.to = options.to
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('CopyFilePlugin', (compilation, callback) => {
      const fs = require('fs')
      const path = require('path')
      
      if (fs.existsSync(this.from)) {
        const content = fs.readFileSync(this.from)
        compilation.assets[this.to] = {
          source: () => content,
          size: () => content.length
        }
      }
      
      callback()
    })
  }
}
```

### 示例 2: 环境变量注入插件

```javascript
class EnvInjectorPlugin {
  constructor(envVars = {}) {
    this.envVars = envVars
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('EnvInjectorPlugin', (compilation) => {
      compilation.hooks.optimizeModules.tap('EnvInjectorPlugin', (modules) => {
        modules.forEach(module => {
          if (module.resource && module.resource.endsWith('.js')) {
            const source = module._source.source()
            let modifiedSource = source
            
            // 替换环境变量占位符
            Object.keys(this.envVars).forEach(key => {
              const placeholder = new RegExp(`process\\.env\\.${key}`, 'g')
              modifiedSource = modifiedSource.replace(placeholder, JSON.stringify(this.envVars[key]))
            })
            
            module._source = {
              source: () => modifiedSource,
              size: () => modifiedSource.length
            }
          }
        })
      })
    })
  }
}
```

### 示例 3: 构建时间统计插件

```javascript
class BuildTimePlugin {
  constructor() {
    this.startTime = null
  }

  apply(compiler) {
    compiler.hooks.beforeCompile.tap('BuildTimePlugin', () => {
      this.startTime = Date.now()
      console.log('⏱️ 构建开始...')
    })

    compiler.hooks.done.tap('BuildTimePlugin', (stats) => {
      const buildTime = Date.now() - this.startTime
      console.log(`✅ 构建完成，耗时: ${buildTime}ms`)
      
      // 保存构建时间到文件
      const fs = require('fs')
      const timeInfo = {
        buildTime,
        timestamp: new Date().toISOString(),
        stats: stats.toJson()
      }
      
      fs.writeFileSync('build-time.json', JSON.stringify(timeInfo, null, 2))
    })
  }
}
```

## 最佳实践

### 1. 错误处理

```javascript
class SafePlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('SafePlugin', (compilation, callback) => {
      try {
        // 插件逻辑
        this.doSomething()
        callback()
      } catch (error) {
        compilation.errors.push(error)
        callback()
      }
    })
  }
}
```

### 2. 配置验证

```javascript
class ValidatedPlugin {
  constructor(options = {}) {
    if (!options.requiredOption) {
      throw new Error('ValidatedPlugin: missing requiredOption')
    }
    
    this.options = {
      optionalOption: options.optionalOption || 'default',
      ...options
    }
  }
}
```

### 3. 缓存优化

```javascript
class CachedPlugin {
  constructor(options = {}) {
    this.cache = new Map()
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('CachedPlugin', (compilation) => {
      // 检查缓存
      const cacheKey = this.getCacheKey()
      if (this.cache.has(cacheKey)) {
        compilation.assets = this.cache.get(cacheKey)
        return
      }

      // 执行插件逻辑
      this.processAssets(compilation)
      
      // 缓存结果
      this.cache.set(cacheKey, compilation.assets)
    })
  }
}
```

### 4. 插件标识

```javascript
class IdentifiedPlugin {
  constructor(options = {}) {
    this.pluginName = 'IdentifiedPlugin'
    this.options = options
  }

  apply(compiler) {
    const hookName = 'someHook'
    compiler.hooks[hookName].tapAsync(this.pluginName, (params, callback) => {
      // 使用 this.pluginName 作为插件标识
      this.executeLogic(params, callback)
    })
  }
}
```

## 调试技巧

### 1. 使用调试输出

```javascript
class DebugPlugin {
  apply(compiler) {
    const debug = this.options.debug || false
    
    compiler.hooks.emit.tapAsync('DebugPlugin', (compilation, callback) => {
      if (debug) {
        console.log('Debug: compilation.assets', Object.keys(compilation.assets))
      }
      callback()
    })
  }
}
```

### 2. 监听所有钩子

```javascript
class DebugAllHooksPlugin {
  constructor() {
    this.hookNames = []
  }

  apply(compiler) {
    // 获取所有钩子名称
    Object.keys(compiler.hooks).forEach(hookName => {
      if (typeof compiler.hooks[hookName].tap === 'function') {
        this.hookNames.push(hookName)
        
        compiler.hooks[hookName].tap(`DebugAllHooksPlugin-${hookName}`, (...args) => {
          console.log(`🔗 Hook: ${hookName}`, args.length > 0 ? args : '')
        })
      }
    })
  }
}
```

### 3. 性能监控

```javascript
class PerformancePlugin {
  apply(compiler) {
    const timers = new Map()

    compiler.hooks.compilation.tap('PerformancePlugin', () => {
      const start = Date.now()
      timers.set('compilation', start)
    })

    compiler.hooks.emit.tapAsync('PerformancePlugin', (compilation, callback) => {
      const start = timers.get('compilation')
      const duration = Date.now() - start
      
      console.log(`📊 编译耗时: ${duration}ms`)
      console.log(`📊 模块数量: ${compilation.modules.length}`)
      console.log(`📊 资源数量: ${Object.keys(compilation.assets).length}`)
      
      callback()
    })
  }
}
```

## 发布插件

### 1. 创建 npm 包

```json
{
  "name": "my-webpack-plugin",
  "version": "1.0.0",
  "description": "My awesome Webpack plugin",
  "main": "index.js",
  "keywords": ["webpack", "plugin"],
  "peerDependencies": {
    "webpack": "^5.0.0"
  }
}
```

### 2. 插件入口文件

```javascript
// index.js
const MyPlugin = require('./lib/MyPlugin')

module.exports = MyPlugin
```

### 3. 发布到 npm

```bash
npm publish
```

## 参考资源

- [Webpack Plugin API](https://webpack.js.org/api/plugins/)
- [Compiler Hooks API](https://webpack.js.org/api/compiler-hooks/)
- [Compilation API](https://webpack.js.org/api/compilation/)
- [Awesome Webpack](https://github.com/webpack-contrib/awesome-webpack)
- [Webpack 源码](https://github.com/webpack/webpack)