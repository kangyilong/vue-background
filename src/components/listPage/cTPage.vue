<template>
  <div class="c_page">
    <Page
      :total="cTotal"
      show-sizer
      show-elevator
      @on-change="changePage"
      @on-page-size-change="changePageSize"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  data () {
    return {
      currentPage: 1,
      currentSize: 10
    }
  },
  methods: {
    changePage (page) {
      this.TABLE_LOADING(true)
      this.currentPage = page
      this.search()
    },
    changePageSize (size) {
      this.TABLE_LOADING(true)
      this.currentSize = size
      this.search()
    },
    search () {
      this.TABLE_SEARCH_CONFIG({
        pageSize: this.currentSize,
        pageNum: this.currentPage
      })
    },
    ...mapActions(['getPageData']),
    ...mapMutations(['TABLE_SEARCH_CONFIG', 'TABLE_LOADING'])
  },
  computed: {
    ...mapState(['cTotal', 'isSelection'])
  },
  watch: {
    isSelection () {
      this.search()
    }
  }
}
</script>

<style scoped lang="scss">
  .c_page{
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
  }
</style>
