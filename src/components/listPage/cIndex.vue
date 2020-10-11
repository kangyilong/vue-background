<template>
  <div class="list_page">
    <c-search />
    <c-buttons :rowKey="rowKey" :pageConfig="pageConfig"/>
    <c-table :rowKey="rowKey"/>
    <c-t-page />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import CSearch from './cSearch'
import CButtons from './cButtons'
import CTable from './cTable'
import CTPage from './cTPage'
export default {
  components: { CButtons, CSearch, CTable, CTPage },
  props: {
    rowKey: {
      type: String,
      default: 'id'
    },
    pageConfig: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {}
  },
  created () {
    this.init()
    this.IS_LEVEL_ONE_PAGE(true)
  },
  methods: {
    init () {
      const { code } = this.pageConfig
      this.getPageData({ code, params: this.searchParams })
    },
    ...mapActions(['getPageData']),
    ...mapMutations(['IS_LEVEL_ONE_PAGE'])
  },
  computed: {
    ...mapState(['searchParams'])
  },
  watch: {
    searchParams: {
      handler () {
        this.init()
      },
      deep: true
    }
  }
}
</script>
