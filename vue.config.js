const settings = require('./src/config/config');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'index.html',
  filenameHashing: true,
  lintOnSave: true,
  runtimeCompiler: true,
  transpileDependencies: [],
  productionSourceMap: false,
  integrity: false,
  // configureWebpack: {
  //   name: settings.name
  // },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = settings.title;
      return args;
    });
  },
  devServer: {
    port: settings.port,
    open: true,
    hot: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // 登陆
      '/auth': {
        target: settings.proxyUrl,
        ws: true,
        pathRewrite: {
          '^/auth': '/auth'
        }
      },
      // 模型
      '/model': {
        target: settings.proxyUrl,
        ws: true,
        pathRewrite: {
          '^/model': '/model'
        }
      },
      // 后台
      '/admin': {
        target: settings.proxyUrl,
        ws: true,
        pathRewrite: {
          '^/admin': '/admin'
        }
      },
      // 数据标准化配置管理
      '/data': {
        target: settings.proxyUrl,
        ws: true,
        pathRewrite: {
          '^/data': '/data'
        }
      }
    }
  }
};
