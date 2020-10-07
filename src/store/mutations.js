import * as types from './mutation-types'

export default {
  [types.MENU_SIDER_DATA] (state, menuId) {
    const menuData = JSON.parse(localStorage.getItem('menuData') || '[]')
    const obj = menuData.filter(item => item.id === menuId)[0] || {}
    state.menuSiderData = obj.children || []
  },
  [types.TOP_MENU_CHANGE] (state) {
    state.topMenuChange = !state.topMenuChange
  },
  [types.BREAD_CRUMB] (state, { key, text }) {
    state.breadCrumb[key] = text
  },
  [types.PAGE_BUTTONS] (state, btns) {
    state.pageButtons = btns
  },
  [types.PAGE_LIST_DATA] (state, pageData) {
    state.pageData = pageData
  },
  [types.TABLE_COLUMNS] (state, columns) {
    state.tableColumns = [{
      type: 'selection',
      width: 60,
      align: 'center'
    }, ...columns]
  }
}
