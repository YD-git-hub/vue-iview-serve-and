// const CompressionPlugin = require("compression-webpack-plugin")
//环境变量
const isProd = process.env.NODE_ENV === 'production'
//CDN配置所需依赖
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  'view-design': 'iview',
  axios: 'axios'
}

// CDN外链，会插入到index.html中
const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: []
  },
  // 生产环境
  build: {
    css: ['https://cdn.jsdelivr.net/npm/view-design@4.5.0/dist/styles/iview.css'],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.2.0/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js',
      'https://cdn.jsdelivr.net/npm/view-design@4.5.0/dist/iview.min.js'
    ]
  }
}

module.exports = {
  publicPath: './',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'xxx管理后台',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      cdn: isProd ? cdn.build : cdn.dev
    },
  },
  devServer: {
    port: 81,
    proxy: { //配置跨域
      '/api': {
        target: 'http://192.168.188.31',
        // target: 'xxxx',
        changOrigin: true, //允许跨域
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    },
    open: true
  },
  //去掉map文件
  productionSourceMap: false,
  //去掉log打印数据
  configureWebpack: (config) => {
    if (isProd) {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.externals = externals
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
