<template>
  <div class="page_box">
    <c-page />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import CPage from 'components/listPage/cIndex'
export default {
  name: 'role',
  components: { CPage },
  data () {
    return {
      pageParams: {
        code: '/auth/v1/role/page',
        removeCode: '/auth/v1/role/remove'
      }
    }
  },
  created () {
    this.getPageData({ code: '/auth/v1/role/page' })
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
        console.log(h, params)
        return h('strong', params.row.remark || '-')
      }
    }]
    this.TABLE_COLUMNS(columns)
  },
  methods: {
    ...mapActions(['getPageData']),
    ...mapMutations(['TABLE_COLUMNS'])
  },
  watch: {
    pageButtons: {
      handler (ll) {
        console.log(ll)
      },
      deep: true
    }
  },
  computed: mapState(['pageButtons'])
}
</script>

<style lang="scss" scoped>
  .page_box {}
</style>
