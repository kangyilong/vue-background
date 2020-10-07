<template>
  <Table
    ref="selection"
    :columns="tableColumns"
    :data="pageData"
    :loading="loading"
    @on-select="tableSelect"
    @on-selection-change="selectionChange"
  ></Table>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    rowKey: {
      type: String,
      default: 'id'
    }
  },
  data () {
    return {
      loading: true,
      selectionList: []
    }
  },
  methods: {
    tableSelect (selection) {
      this.selectionList = selection
    },
    selectionChange (selection) {
      this.selectionList = selection
    }
  },
  computed: {
    ...mapState(['tableColumns', 'pageData'])
  },
  watch: {
    pageData: {
      handler () {
        this.loading = false
      },
      deep: true
    }
  }
}
</script>

<style>

</style>
