import Fetch from 'common/js/fetch'
import { getOwnerBtns } from 'common/api/user'

// 获取页面按钮
export function getPageButtons (context, menuId) {
  getOwnerBtns(menuId).then(data => {
    context.commit('PAGE_BUTTONS', data)
  })
}

// 获取页面列表数据
export function getPageData (context, params = {}) {
  const { code = '', pageSize = 10, pageNum = 1, searchParams = {} } = params
  Fetch({
    url: code,
    param: {
      pageNum,
      pageSize,
      ...searchParams
    }
  }).then(data => {
    context.commit('PAGE_LIST_DATA', data.list)
  })
}

export default {
  getPageButtons,
  getPageData
}
