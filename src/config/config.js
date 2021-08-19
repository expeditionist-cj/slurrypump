module.exports = {
  title: '浆液循环泵', // vue.config.js
  proxyUrl: 'http://172.16.0.89:9999', // vue.config.js
  port: process.env.port || process.env.npm_config_port || 8080, // vue.config.js
  userExcelTemp: 'http://192.168.59.8:8050/images', // account.vue
  socketUrl: 'ws://172.16.0.89:9999'
}
