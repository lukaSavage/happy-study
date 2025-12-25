/**
 * 自定义 Plugin：构建信息插件
 * 功能：在输出目录生成构建信息文件，包含构建时间、版本等信息
 */

class BuildInfoPlugin {
  constructor(options = {}) {
    this.options = {
      filename: options.filename || 'build-info.json',
      info: options.info || {},
      includeGitInfo: options.includeGitInfo !== false,
      includePackageInfo: options.includePackageInfo !== false,
      ...options
    }
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('BuildInfoPlugin', (compilation, callback) => {
      const fs = require('fs')
      const path = require('path')
      
      // 基础构建信息
      const buildInfo = {
        buildTime: new Date().toISOString(),
        webpackVersion: require('webpack').version,
        nodeVersion: process.version,
        platform: process.platform,
        ...this.options.info
      }

      // 添加 Git 信息
      if (this.options.includeGitInfo) {
        try {
          const { execSync } = require('child_process')
          
          // 获取 Git 信息
          const gitCommit = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim()
          const gitBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim()
          const gitMessage = execSync('git log -1 --pretty=%B', { encoding: 'utf8' }).trim()
          
          buildInfo.git = {
            commit: gitCommit,
            branch: gitBranch,
            message: gitMessage
          }
        } catch (error) {
          buildInfo.git = { error: 'Git information not available' }
        }
      }

      // 添加 package.json 信息
      if (this.options.includePackageInfo) {
        try {
          const packagePath = path.resolve(process.cwd(), 'package.json')
          const packageInfo = JSON.parse(fs.readFileSync(packagePath, 'utf8'))
          
          buildInfo.package = {
            name: packageInfo.name,
            version: packageInfo.version,
            description: packageInfo.description
          }
        } catch (error) {
          buildInfo.package = { error: 'Package information not available' }
        }
      }

      // 添加构建统计信息
      buildInfo.assets = Object.keys(compilation.assets).map(filename => ({
        name: filename,
        size: compilation.assets[filename].size()
      }))

      // 添加编译错误和警告
      buildInfo.compilation = {
        errors: compilation.errors.length,
        warnings: compilation.warnings.length
      }

      // 将构建信息写入文件
      const buildInfoContent = JSON.stringify(buildInfo, null, 2)
      compilation.assets[this.options.filename] = {
        source: () => buildInfoContent,
        size: () => buildInfoContent.length
      }

      console.log(`📊 BuildInfoPlugin: 生成构建信息文件 ${this.options.filename}`)
      callback()
    })
  }
}

module.exports = BuildInfoPlugin