import Fetch from '../js/fetch'

// 登录
export function toLogin ({ loginName, loginPwd }) {
  return Fetch({
    url: '/auth/v1/user/login/sys',
    param: { loginName, loginPwd, clientType: 'web' }
  })
}

// 获取用户详情
export function getUserById (userId) {
  return Fetch({
    url: '/auth/v1/user/detail/' + userId
  })
}

/**
 * 获取当前用户所有菜单
 */
export function getRoleMenuList () {
  return Fetch({
    url: '/auth/v1/user/permission_none/permission/menu',
    param: { type: 'menu' }
  })
}

/*
* 获取当前菜单拥有的按钮列表
* */
export function getOwnerBtns (menuId) {
  return Fetch({
    url: `/auth/v1/user/permission_none/permission/btn/${menuId}`
  })
}
