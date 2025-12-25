/**
 * 自定义 Plugin：为打包文件添加头部注释
 * 功能：在每个输出的 JS 文件顶部添加自定义注释
 */

class FileHeaderPlugin {
  constructor(options = {}) {
    this.options = {
      header: options.header || '',
      files: options.files || ['.js', '.mjs'], // 要处理的文件类型
      encoding: options.encoding || 'utf8',
      ...options
    }

    // 验证 header 参数
    if (typeof this.options.header !== 'string') {
      throw new Error('FileHeaderPlugin: header 必须是字符串')
    }
  }

  apply(compiler) {
    // 在 emit 阶段处理即将输出的文件
    compiler.hooks.emit.tapAsync('FileHeaderPlugin', (compilation, callback) => {
      const { header, files, encoding } = this.options
      
      // 遍历所有输出资源
      Object.keys(compilation.assets).forEach(filename => {
        // 检查文件扩展名是否匹配
        const shouldProcess = files.some(ext => filename.endsWith(ext))
        
        if (shouldProcess) {
          const source = compilation.assets[filename].source()
          
          // 检查是否已经有相同的头部
          if (!source.startsWith(header)) {
            // 添加头部注释
            const newSource = header + '\n' + source
            compilation.assets[filename] = {
              source: () => newSource,
              size: () => newSource.length
            }
            
            console.log(`📝 FileHeaderPlugin: 为 ${filename} 添加头部注释`)
          }
        }
      })
      
      callback()
    })
  }
}

module.exports = FileHeaderPlugin