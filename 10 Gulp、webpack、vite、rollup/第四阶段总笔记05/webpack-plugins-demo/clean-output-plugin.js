/**
 * 自定义 Plugin：清理输出目录
 * 功能：在构建前清空输出目录
 */

class CleanOutputPlugin {
  constructor(options = {}) {
    this.options = {
      outputPath: options.outputPath || 'dist',
      exclude: options.exclude || [], // 排除的文件/目录
      verbose: options.verbose || false, // 是否打印详细信息
      ...options
    }
  }

  // apply 方法是 webpack plugin 的入口点
  apply(compiler) {
    // 在编译开始前执行清理操作
    compiler.hooks.beforeCompile.tapAsync('CleanOutputPlugin', (params, callback) => {
      const fs = require('fs')
      const path = require('path')
      
      if (this.options.verbose) {
        console.log('🧹 CleanOutputPlugin: 开始清理输出目录')
      }

      const outputPath = path.resolve(this.options.outputPath)
      
      // 检查目录是否存在
      if (fs.existsSync(outputPath)) {
        const files = fs.readdirSync(outputPath)
        
        files.forEach(file => {
          const filePath = path.join(outputPath, file)
          const stat = fs.statSync(filePath)
          
          // 检查是否在排除列表中
          const shouldExclude = this.options.exclude.some(exclude => {
            const excludePath = path.resolve(exclude)
            return filePath === excludePath || filePath.startsWith(excludePath)
          })
          
          if (!shouldExclude) {
            if (stat.isDirectory()) {
              // 递归删除目录
              this.removeDirectory(filePath)
            } else {
              // 删除文件
              fs.unlinkSync(filePath)
              if (this.options.verbose) {
                console.log(`📄 删除文件: ${filePath}`)
              }
            }
          }
        })
        
        if (this.options.verbose) {
          console.log('✅ CleanOutputPlugin: 清理完成')
        }
      }
      
      callback()
    })
  }

  // 递归删除目录
  removeDirectory(dirPath) {
    const fs = require('fs')
    const path = require('path')
    
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath)
      
      files.forEach(file => {
        const filePath = path.join(dirPath, file)
        const stat = fs.statSync(filePath)
        
        if (stat.isDirectory()) {
          this.removeDirectory(filePath)
        } else {
          fs.unlinkSync(filePath)
          if (this.options.verbose) {
            console.log(`📄 删除文件: ${filePath}`)
          }
        }
      })
      
      fs.rmdirSync(dirPath)
      if (this.options.verbose) {
        console.log(`📁 删除目录: ${dirPath}`)
      }
    }
  }
}

module.exports = CleanOutputPlugin