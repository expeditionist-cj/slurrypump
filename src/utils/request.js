
import axios from 'axios'
// 创建axios实例
const proUrl = '/api'
const devUrl = '/'
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? proUrl : devUrl,
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    post: {
      // 默认传递的参数是json格式，可通过传参修改
      'Content-Type': 'application/json;charset=utf-8'
    },
    // 跨域请求时是否需要使用凭证
    withCredentials: true,
    // 请求 5s 超时
    timeout: 5000
  },
  // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
  validateStatus: function() {
    return true
  },
  // 在向服务器发送请求前，序列化请求数据
  // transformRequest: [function (data) {
  //   return data
  // }],
  // 在传递给 then/catch 前，修改响应数据
  transformResponse: [function (data) {
    if (typeof data === 'string' && data.startsWith('{')) {
      data = JSON.parse(data)
    }
    return data
  }]
})

// 请求拦截器
service.interceptors.request.use((config) => {
  // console.log(config, 111)
  const isToken = (config.headers || {}).isToken === false
  const token = JSON.parse(window.sessionStorage.getItem('session')).user['access_token']
  if (token && !isToken) {
    config.headers['Authorization'] = 'Bearer ' + token// token
  }
  // 为请求头对象，添加 Token 验证的 Authorization 字段
  // config.headers.Authorization = window.sessionStorage.getItem('sca-access_token')
  return config
}, (error) => {
  // 错误抛到业务代码
  error.data = {}
  error.data.msg = '服务器异常,请联系管理员！'
  return Promise.resolve(error)
})
// 根据不同的状态码，生成不同的提示信息
const showStatus = (status) => {
  let message = ''
  switch (status) {
    case 400:
      message = '请求错误(400)'
      break
    case 401:
      message = '未授权，请重新登录(401)'
      break
    case 403:
      message = '拒绝访问(403)'
      break
    case 404:
      message = '请求出错(404)'
      break
    case 408:
      message = '请求超时(408)'
      break
    case 500:
      message = '服务器错误(500)'
      break
    case 501:
      message = '服务未实现(501)'
      break
    case 502:
      message = '网络错误(502)'
      break
    case 503:
      message = '服务不可用(503)'
      break
    case 504:
      message = '网络超时(504)'
      break
    case 505:
      message = 'HTTP版本不受支持(505)'
      break
    default:
      message = `连接出错(${status})!`
  }
  return `${message}，请检查网络或联系管理员！`
}
// 响应拦截器
service.interceptors.response.use((response) => {
  const status = response.status
  let msg = ''
  if (status < 200 || status >= 300) {
    msg = showStatus(status)
    if (response.data.code === 1) {
      msg = response.data.msg
    }
    return Promise.reject(new Error(msg))
  }
  return response
}, (error) => {
  error.data = {}
  error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
  return Promise.reject(new Error(error))
})
export default service
