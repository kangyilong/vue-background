<template>
  <div class="page_box">
    <c-page :pageConfig="pageConfig"/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import CPage from 'components/listPage/cIndex'
export default {
  name: 'role',
  components: { CPage },
  data () {
    return {
      pageConfig: {
        code: '/auth/v1/role/page',
        deleteCode: '/auth/v1/role/remove'
      }
    }
  },
  created () {
    const columns = [{
      title: '角色名称',
      key: 'name',
      search: true
    }, {
      title: '最近更新人',
      key: 'creator'
    }, {
      title: '最近更新时间',
      key: 'createTime',
      type: 'datetime'
    }, {
      title: '备注',
      key: 'remark',
      render: (h, params) => {
        return h('strong', params.row.remark || '-')
      }
    }]
    this.TABLE_COLUMNS(columns)
  },
  methods: {
    ...mapMutations(['TABLE_COLUMNS'])
  }
}
</script>

<style lang="scss" scoped>
  .page_box {}
</style>
