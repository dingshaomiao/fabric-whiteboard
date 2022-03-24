import axios from 'axios'

window.axiosCancel = [] // 全局定义一个存放取消请求的标识
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // api的base_url
  timeout: 10 * 60 * 1000 // request timeout 50000
})
// http request 拦截器
service.interceptors.request.use(
  config => {
    // 查询储存在本地的token值
    // 这边可根据自己的需求设置headers，我司采用basic基本认证
    config.headers['Content-Type'] = 'application/json;application/octet-stream;charset=utf-8'
    config.headers['Accept-Language'] = localStorage.getItem('user-language') || 'zh-CN'

    config.headers.token = ''
    // config.headers.token = localStorage.token
    config.headers.UserAgent = 'WINDOWS_WEB'
    config.headers.nonce = localStorage.nonce
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// http response 拦截器
service.interceptors.response.use(res => {
  return res.data
}, err => {
  if (err?.response) {
    switch (err?.response?.status) {
      case 400:
        err.message = '错误请求'
        break
      case 401:
        break
      case 403:
        err.message = '拒绝访问'
        break
      case 404:
        err.message = '请求错误,未找到该资源'
        break
      case 405:
        err.message = '请求方法未允许'
        break
      case 408:
        err.message = '请求超时'
        break
      case 500:
        break
      case 501:
        err.message = '网络未实现'
        break
      case 502:
        err.message = '网络错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网络超时'
        break
      case 505:
        err.message = 'http版本不支持该请求'
        break
      default:
        err.message = '其他错误信息'
    }
    return Promise.reject(err.response)
  }
})
export default service
