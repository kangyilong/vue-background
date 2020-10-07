import Axios from 'axios'
import { showMessage, loginOut } from './util'

export default function Fetch ({ url = '', param = {}, method = 'POST' }) {
  const lang = param.lang || 'zh_CN'
  delete param.lang
  const token = localStorage.getItem('token')
  return Axios({
    method,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: token || '',
      'Accept-language': lang
    },
    url: '/api' + url,
    data: JSON.stringify(param)
  })
}

// 添加响应拦截器
const myInterceptor = Axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const res = response.data
  const { data, code, errorCode, errorMsg, errorInfo } = res
  if (+code === 300 && errorCode !== '300003') {
    showMessage({
      msg: '登录超时，请重新登录',
      type: 'warning',
      closable: true,
      onClose: () => {
        loginOut()
      }
    })
    return { code }
  }
  if (+code !== 200) {
    const msg = errorInfo || errorMsg || '操作失败'
    showMessage({
      msg: msg,
      type: 'error'
    })
    return { code, msg }
  }
  return data
}, function (error) {
  // 对响应错误做点什么
  showMessage({
    type: 'error',
    msg: JSON.stringify(error)
  })
  return Promise.reject(error)
})

Axios.interceptors.request.eject(myInterceptor)
