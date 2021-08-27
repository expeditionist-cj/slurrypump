'use strict'// 引入scp2
var client = require('scp2');
console.log('开始自动上传!')
client.scp('./dist/', // 默认打包的路径
  {
    'host': '172.16.0.89',
    'port': '22',
    'username': 'root',
    'password': 'zhst@123',
    'path': '/usr/slurrypump'
  }
  , err => {
    if (!err) { console.log('项目发布完毕!') } else { console.log('err', err) }
  })
