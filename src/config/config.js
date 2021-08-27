module.exports = {
  title: '浆液循环泵', // vue.config.js
  proxyUrl: 'http://172.16.0.241:12580', // vue.config.js
  port: process.env.port || process.env.npm_config_port || 8080, // vue.config.js
  socketUrl: 'ws://172.16.0.241:12581'
}
