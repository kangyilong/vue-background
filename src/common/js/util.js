import { Message, Spin } from 'view-design'

export function saveUser ({ token, userId }) {
  localStorage.setItem('token', token)
  localStorage.setItem('userId', userId)
}

export function isLogin () {
  return !!localStorage.getItem('token')
}

export function loginOut () {
  localStorage.clear()
  window.location.href = '/login'
}

// 提示信息
export function showMessage ({ msg = '操作成功', type = 'success', duration = 3, closable = false, onClose = () => {}, background = false }) {
  const config = {
    content: msg,
    duration,
    background
  }
  if (closable) {
    config.onClose = onClose
  }
  Message[type](config)
}

// loading 弹出框
export function toggleLoading () {
  Spin.show()
  return Spin.hide
}

// 处理菜单数据
export function dealWithMenu (data) {
  if (!Array.isArray(data) && data.length > 0) return []
  const menu02 = data.filter(item => item.depth === '2')
  const menuTop = JSON.parse(JSON.stringify(menu02))
  const menu03 = data.filter(item => item.depth === '3')
  const menu04 = data.filter(item => item.depth === '4')
  const menuObj = {
    id: data[0].id,
    name: data[0].name,
    children: menu02
  }
  menu02.forEach(item => {
    item.children = menu03.filter(it => it.parentId === item.id)
    item.children.forEach(cItem => {
      cItem.children = menu04.filter(it => it.parentId === cItem.id)
    })
  })
  localStorage.setItem('menuData', JSON.stringify(menuObj.children))
  localStorage.setItem('menuTopData', JSON.stringify(menuTop))
  return menuTop
}

/*
* 表单验证规则
* */
export function formRules () {
  return {
    required: {
      required: true, message: ' ', trigger: 'blur'
    },
    email: {
      type: 'email', message: '请输入正确的邮箱号', trigger: 'blur'
    },
    mobile: {
      type: 'email', message: '请输入正确的邮箱号', trigger: 'blur'
    },
    number: {
      type: 'number', message: '格式错误', trigger: 'blur'
    },
    date: {
      type: 'date', message: ' '
    }
  }
}
