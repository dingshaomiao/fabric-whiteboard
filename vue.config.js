const TimeStamp = new Date().getTime()
module.exports = {
  productionSourceMap: process.env.NODE_ENV === 'production',
  publicPath: '/',
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      // 设置代理
      '/v1': {
        target: 'https://systecdev.umeet.cn/', // uat环境
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          '^/v1': ''
        }
      }
    },
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html'
    }
  },
  // 第三方插件配置
  pluginOptions: {
  },
  configureWebpack: {
    plugins: [
    ],
    output: { // 输出重构
      filename: `[name].${TimeStamp}.js`,
      chunkFilename: `[name].${TimeStamp}.js`
    },
    devtool: 'source-map'
  }
}
