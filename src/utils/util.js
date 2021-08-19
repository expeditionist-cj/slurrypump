/**
 *加密处理
 */
export const encryption = (params) => {
  let { key } = params
  const {
    data,
    type,
    param
  } = params
  const result = JSON.parse(JSON.stringify(data))
  if (type === 'Base64') {
    param.forEach(ele => {
      result[ele] = btoa(result[ele])
    })
  } else {
    param.forEach(ele => {
      var data = result[ele]
      // eslint-disable-next-line
      key = CryptoJS.enc.Latin1.parse(key)
      var iv = key
      // 加密
      // eslint-disable-next-line
      var encrypted = CryptoJS.AES.encrypt(
        data,
        key, {
          iv: iv,
          // eslint-disable-next-line
          mode: CryptoJS.mode.CBC,
          // eslint-disable-next-line
          padding: CryptoJS.pad.ZeroPadding
        })
      result[ele] = encrypted.toString()
    })
  }
  return result
}
// 防抖，首次立即执行
export function debounce(fn, delay = 1000) {
  let timer = null;
  let count = 0;
  const self = this
  return function () {
    const args = [...arguments] // 取出参数
    clearTimeout(timer) // 先清除定时器
    if (!count) { // 第一次点击的时候
      count++
      fn.apply(self, args)
      timer = setTimeout(() => {
        count = 0;
      }, delay)
    } else {
      count++
      timer = setTimeout(() => {
        fn.apply(self, args)
        count = 0;
      }, delay)
    }
  }
}
