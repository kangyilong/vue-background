export default {
  menuSiderData: [], // 二级菜单
  topMenuChange: true, // 监听头部菜单
  breadCrumb: { // 面包蟹
    one: {
      text: '',
      url: '#'
    },
    two: {
      text: '',
      url: '#'
    },
    three: {
      text: '',
      url: '#'
    }
  },
  pageButtons: [], // 列表页按钮
  tableColumns: [], // table columns
  tableLoading: false,
  pageData: [],
  selectionList: [],
  searchParams: {}, // 搜索参数
  cTotal: 0, // 列表总数
  isSelection: false, // 清除 table 选中项
  isExportTable: false, // 是否导出table数据
  isLevelOnePage: true // 一级页面
}
