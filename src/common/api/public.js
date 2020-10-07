import Fetch from '../js/fetch'

// 加载七牛token
export function getQiniuToken () {
  return Fetch({ url: '/auth/v1/common/get_qiniu_token' })
}
