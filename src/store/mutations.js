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
  [types.BREAD_CRUMB] (state, { key, text, url = '#' }) {
    state.breadCrumb[key] = {
      text,
      url
    }
  },
  [types.PAGE_BUTTONS] (state, btns) {
    state.pageButtons = [...btns]
  },
  [types.TABLE_LOADING] (state, loading) {
    state.tableLoading = loading
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
  },
  [types.SELECTION_DATA] (state, selectionList) {
    state.selectionList = selectionList
  },
  [types.TABLE_SEARCH_CONFIG] (state, params) {
    state.searchParams = params
  },
  [types.TPAGE_NUM] (state, total) {
    state.cTotal = total
  },
  [types.IS_REMOVE_SELECTION] (state) {
    state.isSelection = !state.isSelection
  },
  [types.IS_EXPORT_TABLE_DATA] (state) {
    state.isExportTable = !state.isExportTable
  },
  [types.IS_LEVEL_ONE_PAGE] (state, isOne) {
    state.isLevelOnePage = isOne
  }
}
