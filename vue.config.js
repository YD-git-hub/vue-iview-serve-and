
// const CompressionPlugin = require("compression-webpack-plugin")
module.exports = {
  publicPath: './',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'xxxx管理后台',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
  },
  devServer: {
    port: 81,
    proxy: { //配置跨域
      '/api': {
        target: 'xxx',
        changOrigin: true, //允许跨域
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    },
    open:true
  },
  //去掉map文件
  productionSourceMap: false,
  //去掉log打印数据
  configureWebpack: (config)=>{
    if(process.env.NODE_ENV === 'production'){
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  // js、css压缩
  // chainWebpack: config => {
  //   if (process.env.NODE_ENV === 'production') {
  //     config.plugin('compressionPlugin')
  //     .use(new CompressionPlugin({
  //       test:/\.js$|\.html$|.\css/, // 匹配文件名
  //       threshold: 10240, // 对超过10k的数据压缩
  //       deleteOriginalAssets: false // 不删除源文件
  //     }))
  //   }
  // },
};