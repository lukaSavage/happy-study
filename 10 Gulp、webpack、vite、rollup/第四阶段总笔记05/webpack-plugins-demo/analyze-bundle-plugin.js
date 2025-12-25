/**
 * 自定义 Plugin：包分析插件
 * 功能：分析打包后的文件大小、依赖关系，生成可视化报告
 */

const fs = require('fs')
const path = require('path')

class AnalyzeBundlePlugin {
  constructor(options = {}) {
    this.options = {
      outputDir: options.outputDir || 'bundle-analysis',
      jsonFile: options.jsonFile || 'bundle-stats.json',
      htmlFile: options.htmlFile || 'bundle-report.html',
      includeModules: options.includeModules !== false,
      includeAssets: options.includeAssets !== false,
      threshold: options.threshold || 1024, // 1KB 以上的文件才分析
      ...options
    }
  }

  apply(compiler) {
    // 监听编译完成钩子
    compiler.hooks.thisCompilation.tap('AnalyzeBundlePlugin', (compilation) => {
      // 监听模块构建完成钩子
      compilation.hooks.optimizeModules.tap('AnalyzeBundlePlugin', (modules) => {
        this.modules = modules
      })
    })

    // 监听输出钩子
    compiler.hooks.emit.tapAsync('AnalyzeBundlePlugin', (compilation, callback) => {
      const stats = this.generateStats(compilation)
      
      // 生成 JSON 报告
      const jsonContent = JSON.stringify(stats, null, 2)
      compilation.assets[`${this.options.outputDir}/${this.options.jsonFile}`] = {
        source: () => jsonContent,
        size: () => jsonContent.length
      }

      // 生成 HTML 报告
      const htmlContent = this.generateHtmlReport(stats)
      compilation.assets[`${this.options.outputDir}/${this.options.htmlFile}`] = {
        source: () => htmlContent,
        size: () => htmlContent.length
      }

      console.log(`📊 AnalyzeBundlePlugin: 生成分析报告`)
      console.log(`   - JSON: ${this.options.jsonFile}`)
      console.log(`   - HTML: ${this.options.htmlFile}`)
      console.log(`   - 总文件数: ${stats.assets.length}`)
      console.log(`   - 总大小: ${(stats.totalSize / 1024).toFixed(2)} KB`)

      callback()
    })
  }

  generateStats(compilation) {
    const assets = []
    let totalSize = 0
    const modules = []

    // 分析资源文件
    if (this.options.includeAssets) {
      Object.keys(compilation.assets).forEach(filename => {
        const asset = compilation.assets[filename]
        const size = asset.size()
        
        if (size >= this.options.threshold) {
          assets.push({
            name: filename,
            size: size,
            sizeKB: (size / 1024).toFixed(2),
            sizeMB: (size / 1024 / 1024).toFixed(2)
          })
          totalSize += size
        }
      })
    }

    // 分析模块信息
    if (this.options.includeModules && this.modules) {
      this.modules.forEach(module => {
        if (module.resource) {
          modules.push({
            name: path.relative(process.cwd(), module.resource),
            size: module.size() || 0,
            reasons: module.reasons ? module.reasons.length : 0,
            built: module.built
          })
        }
      })
    }

    return {
      timestamp: new Date().toISOString(),
      totalSize,
      totalSizeKB: (totalSize / 1024).toFixed(2),
      totalSizeMB: (totalSize / 1024 / 1024).toFixed(2),
      assets: assets.sort((a, b) => b.size - a.size), // 按大小排序
      modules: modules,
      compilation: {
        errors: compilation.errors.length,
        warnings: compilation.warnings.length,
        hash: compilation.hash
      }
    }
  }

  generateHtmlReport(stats) {
    return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Webpack Bundle Analysis Report</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 2.5em;
        }
        .header p {
            margin: 10px 0 0 0;
            opacity: 0.9;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            padding: 30px;
        }
        .stat-card {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #007bff;
        }
        .stat-value {
            font-size: 2em;
            font-weight: bold;
            color: #007bff;
        }
        .stat-label {
            color: #6c757d;
            margin-top: 5px;
        }
        .section {
            padding: 0 30px 30px;
        }
        .section h2 {
            border-bottom: 2px solid #e9ecef;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .asset-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        .asset-table th,
        .asset-table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #dee2e6;
        }
        .asset-table th {
            background-color: #f8f9fa;
            font-weight: 600;
        }
        .asset-table tr:hover {
            background-color: #f8f9fa;
        }
        .size-badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.85em;
            font-weight: 600;
        }
        .size-large { background-color: #dc3545; color: white; }
        .size-medium { background-color: #ffc107; color: #212529; }
        .size-small { background-color: #28a745; color: white; }
        .chart-container {
            margin-top: 20px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 Bundle Analysis Report</h1>
            <p>构建时间: ${stats.timestamp}</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value">${stats.totalSizeKB}</div>
                <div class="stat-label">总大小 (KB)</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.assets.length}</div>
                <div class="stat-label">资源文件数</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.compilation.errors}</div>
                <div class="stat-label">编译错误</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${stats.compilation.warnings}</div>
                <div class="stat-label">编译警告</div>
            </div>
        </div>

        <div class="section">
            <h2>📦 资源文件分析</h2>
            <table class="asset-table">
                <thead>
                    <tr>
                        <th>文件名</th>
                        <th>大小</th>
                        <th>占比</th>
                    </tr>
                </thead>
                <tbody>
                    ${stats.assets.map(asset => {
                        const percentage = ((asset.size / stats.totalSize) * 100).toFixed(1)
                        const sizeClass = asset.size > 100000 ? 'size-large' : 
                                        asset.size > 10000 ? 'size-medium' : 'size-small'
                        return `
                        <tr>
                            <td>${asset.name}</td>
                            <td>
                                <span class="size-badge ${sizeClass}">
                                    ${asset.sizeKB} KB
                                </span>
                            </td>
                            <td>${percentage}%</td>
                        </tr>
                        `
                    }).join('')}
                </tbody>
            </table>
        </div>

        <div class="section">
            <h2>📈 大小分布图</h2>
            <div class="chart-container">
                <canvas id="sizeChart" width="400" height="200"></canvas>
            </div>
        </div>

        ${this.options.includeModules ? `
        <div class="section">
            <h2>🔧 模块分析</h2>
            <table class="asset-table">
                <thead>
                    <tr>
                        <th>模块</th>
                        <th>大小</th>
                        <th>被引用次数</th>
                    </tr>
                </thead>
                <tbody>
                    ${stats.modules.slice(0, 20).map(module => `
                    <tr>
                        <td>${module.name}</td>
                        <td>${module.size ? (module.size / 1024).toFixed(2) + ' KB' : 'N/A'}</td>
                        <td>${module.reasons}</td>
                    </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        ` : ''}
    </div>

    <script>
        // 简单的饼图绘制
        const canvas = document.getElementById('sizeChart');
        const ctx = canvas.getContext('2d');
        const data = ${JSON.stringify(stats.assets.slice(0, 5))};
        const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
        
        // 绘制饼图
        let currentAngle = 0;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 80;
        
        data.forEach((item, index) => {
            const sliceAngle = (item.size / ${stats.totalSize}) * 2 * Math.PI;
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.lineTo(centerX, centerY);
            ctx.fillStyle = colors[index % colors.length];
            ctx.fill();
            
            // 绘制标签
            const labelAngle = currentAngle + sliceAngle / 2;
            const labelX = centerX + Math.cos(labelAngle) * (radius + 20);
            const labelY = centerY + Math.sin(labelAngle) * (radius + 20);
            
            ctx.fillStyle = '#333';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(item.name, labelX, labelY);
            
            currentAngle += sliceAngle;
        });
    </script>
</body>
</html>
    `
  }
}

module.exports = AnalyzeBundlePlugin