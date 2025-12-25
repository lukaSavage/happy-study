const path = require('path')
const CleanOutputPlugin = require('./clean-output-plugin')
const FileHeaderPlugin = require('./file-header-plugin')
const BuildInfoPlugin = require('./build-info-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: false // 不使用 webpack 内置的清理，使用自定义插件
  },
  plugins: [
    // 1. 自定义清理插件
    new CleanOutputPlugin({
      outputPath: 'dist',
      exclude: [], // 不排除任何文件
      verbose: true // 打印详细信息
    }),

    // 2. 自定义文件头部插件
    new FileHeaderPlugin({
      header: `/**
 * Build with ❤️ using custom Webpack plugins
 * Generated at: ${new Date().toLocaleString()}
 * Author: Your Name
 */
`,
      files: ['.js', '.mjs']
    }),

    // 3. 自定义构建信息插件
    new BuildInfoPlugin({
      filename: 'build-info.json',
      includeGitInfo: true,
      includePackageInfo: true,
      info: {
        environment: 'development',
        description: '演示自定义 Webpack 插件'
      }
    })
  ],
  devtool: 'source-map'
}