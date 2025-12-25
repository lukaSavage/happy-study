# Webpack 自定义插件演示

这个项目演示了如何编写自定义的 Webpack 插件，包含从基础到高级的多种插件实现。

## 项目结构

```
webpack-plugins-demo/
├── src/
│   └── index.js                    # 示例源代码
├── clean-output-plugin.js          # 清理输出目录插件
├── file-header-plugin.js           # 文件头部注释插件
├── build-info-plugin.js           # 构建信息插件
├── analyze-bundle-plugin.js       # 包分析插件（高级）
├── webpack.config.js              # 基础 Webpack 配置
├── webpack-demo.config.js         # 完整 Webpack 配置
├── package.json                  # 项目配置
├── PLUGIN_DEVELOPMENT_GUIDE.md  # 插件开发完整指南
└── README.md                    # 说明文档
```

## 自定义插件说明

### 1. CleanOutputPlugin - 清理输出目录

**功能**：在构建前清空输出目录，可选择排除特定文件。

**用法**：
```javascript
new CleanOutputPlugin({
  outputPath: 'dist',        // 要清理的目录路径
  exclude: ['README.md'],    // 排除的文件/目录
  verbose: true             // 是否打印详细信息
})
```

**核心原理**：
- 监听 `compiler.hooks.beforeCompile` 钩子
- 在编译开始前执行文件系统操作
- 递归删除目录和文件

### 2. FileHeaderPlugin - 文件头部注释

**功能**：为指定类型的输出文件添加头部注释。

**用法**：
```javascript
new FileHeaderPlugin({
  header: '/** Custom Header */', // 头部注释内容
  files: ['.js', '.mjs'],        // 要处理的文件类型
  encoding: 'utf8'               // 文件编码
})
```

**核心原理**：
- 监听 `compiler.hooks.emit` 钩子
- 在资源输出前修改文件内容
- 为匹配的文件添加自定义头部

### 3. BuildInfoPlugin - 构建信息

**功能**：生成包含构建信息的 JSON 文件。

**用法**：
```javascript
new BuildInfoPlugin({
  filename: 'build-info.json',     // 输出文件名
  includeGitInfo: true,             // 包含 Git 信息
  includePackageInfo: true,         // 包含 package.json 信息
  info: {                          // 自定义信息
    environment: 'production',
    description: 'My awesome project'
  }
})
```

**核心原理**：
- 监听 `compiler.hooks.emit` 钩子
- 收集构建环境信息
- 生成 JSON 格式的构建报告

### 4. AnalyzeBundlePlugin - 包分析（高级）

**功能**：分析打包后的文件大小、依赖关系，生成可视化报告。

**用法**：
```javascript
new AnalyzeBundlePlugin({
  outputDir: 'bundle-analysis',    // 输出目录
  includeModules: true,            // 包含模块分析
  includeAssets: true,            // 包含资源分析
  threshold: 1024                 // 最小分析阈值（bytes）
})
```

**核心原理**：
- 监听多个钩子收集构建数据
- 生成 HTML 可视化报告
- 提供详细的模块和资源分析
- 支持饼图等数据可视化

## 插件开发核心概念

### 1. 插件结构

```javascript
class MyPlugin {
  constructor(options = {}) {
    this.options = options
  }

  apply(compiler) {
    // 插件逻辑
  }
}

module.exports = MyPlugin
```

### 2. 常用 Webpack 钩子

| 钩子名称 | 触发时机 | 用途 |
|---------|---------|------|
| `beforeCompile` | 编译开始前 | 环境准备、文件清理 |
| `compile` | 编译开始 | 修改编译参数 |
| `emit` | 资源输出前 | 修改输出资源 |
| `afterEmit` | 资源输出后 | 后处理操作 |
| `done` | 编译完成 | 构建统计、通知 |

### 3. 钩子类型

- **同步钩子**：`tap()`
- **异步钩子**：`tapAsync()`
- **异步 Promise 钩子**：`tapPromise()`

### 4. 访问编译对象

```javascript
apply(compiler) {
  compiler.hooks.emit.tapAsync('MyPlugin', (compilation, callback) => {
    // compilation 对象包含：
    // - compilation.assets: 输出资源
    // - compilation.errors: 编译错误
    // - compilation.warnings: 编译警告
    
    callback()
  })
}
```

## 运行演示

### 1. 安装依赖
```bash
cd webpack-plugins-demo
npm install
```

### 2. 开发模式构建
```bash
npm run dev
```
输出包含基础插件的功能。

### 3. 生产模式构建（推荐）
```bash
npm run build
```
这将启用所有插件功能：
- CleanOutputPlugin：清理输出目录
- FileHeaderPlugin：添加文件头部注释
- BuildInfoPlugin：生成构建信息
- AnalyzeBundlePlugin：生成分析报告

### 4. 查看输出
```bash
ls -la dist/
# 查看：
# - bundle.js (带头部注释）
# - build-info.json (构建信息）
# - analysis/bundle-stats.json (分析数据）
# - analysis/bundle-report.html (可视化报告）
```

### 5. 开发服务器（如果安装了 webpack-dev-server）
```bash
npm run serve
```

## 扩展练习

尝试实现以下插件：

1. **FileSizeAnalyzerPlugin** - 分析文件大小并生成报告
2. **ZipPlugin** - 将输出文件打包成 ZIP
3. **ProgressBarPlugin** - 显示构建进度条
4. **AssetsOptimizerPlugin** - 优化静态资源

## 参考资源

- [Webpack Plugin API 官方文档](https://webpack.js.org/api/plugins/)
- [Webpack Compiler Hooks](https://webpack.js.org/api/compiler-hooks/)
- [Webpack Compilation API](https://webpack.js.org/api/compilation/)