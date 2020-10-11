<template>
  <Table
    ref="selection"
    :columns="tableColumns"
    :data="pageData"
    :loading="tableLoading"
    @on-select="tableSelect"
    @on-selection-change="selectionChange"
  ></Table>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  props: {
    rowKey: {
      type: String,
      default: 'id'
    }
  },
  data () {
    return {}
  },
  methods: {
    tableSelect (selection) {
      this.SELECTION_DATA(selection)
    },
    selectionChange (selection) {
      this.SELECTION_DATA(selection)
    },
    ...mapMutations(['SELECTION_DATA', 'TABLE_LOADING'])
  },
  computed: {
    ...mapState(['tableLoading', 'tableColumns', 'pageData', 'breadCrumb', 'isSelection',
      'isExportTable'])
  },
  watch: {
    pageData: {
      handler () {
        this.TABLE_LOADING(false)
      },
      deep: true
    },
    isSelection () {
      this.$refs.selection.selectAll(false)
    },
    isExportTable () {
      this.$refs.selection.exportCsv({
        filename: this.breadCrumb.three,
        original: false,
        data: this.pageData
      })
    }
  }
}
</script>

<style>

</style>
