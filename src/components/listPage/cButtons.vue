<template>
  <div class="page_btns" @click="buttonsEvent">
    <Button
      v-for="item in pageButtons"
      :key="item.id"
      style="margin-right: 10px;position: relative;"
    >
      <span class="mok_box" :data-url="item.url"></span>
      {{item.name}}
    </Button>
    <p v-show="false">{{JSON.stringify(pageButtons)}}</p>
    <Modal
      v-model="mVisible"
      :title="mTitle"
      :loading="mLoading"
      @on-ok="mDeleteOK">
      <p>{{mContent}}</p>
    </Modal>
  </div>
</template>

<script>
import { showMessage } from 'common/js/util'
import { mapState, mapMutations } from 'vuex'
import Fetch from 'common/js/fetch'
export default {
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
    return {
      mTitle: '',
      mVisible: false,
      mLoading: false,
      mContent: ''
    }
  },
  methods: {
    buttonsEvent (ev) {
      const target = ev.target
      const url = target.getAttribute('data-url')
      if (url) {
        const len = this.selectionList.length
        let pathname = window.location.pathname + '/addEdit'
        const dealUrl = {
          '/add': () => {
            this.$router.push(pathname)
          },
          '/edit': () => {
            if (len === 0) {
              return showMessage({
                msg: '请选择记录',
                type: 'warning'
              })
            } else if (len > 1) {
              return showMessage({
                msg: '请选择一条记录',
                type: 'warning'
              })
            }
            const rowKey = this.selectionList[0][this.rowKey]
            pathname += `?code=${rowKey}`
            this.$router.push(pathname)
          },
          '/detail': () => {
            if (len === 0) {
              return showMessage({
                msg: '请选择记录',
                type: 'warning'
              })
            } else if (len > 1) {
              return showMessage({
                msg: '请选择一条记录',
                type: 'warning'
              })
            }
            const rowKey = this.selectionList[0][this.rowKey]
            pathname += `?code=${rowKey}&v=1`
            this.$router.push(pathname)
          },
          '/delete': () => {
            if (len === 0) {
              return showMessage({
                msg: '请选择记录',
                type: 'warning'
              })
            }
            this.mContent = '您确定要删除该条记录吗？删除记录后无法还原'
            this.mVisible = true
          },
          '/export': () => {
            this.IS_EXPORT_TABLE_DATA()
          },
          '/goBack': () => {
            this.$router.go(-1)
          }
        }
        const eventFn = dealUrl[url]
        eventFn && eventFn()
      }
    },
    mDeleteOK () {
      const { deleteCode } = this.pageConfig
      if (this.selectionList.length > 1) {
        const codeList = this.selectionList.map(item => item[this.rowKey])
        Fetch({
          url: deleteCode,
          param: {
            codeList
          }
        }).then(() => {
          this.mVisible = false
          this.IS_REMOVE_SELECTION()
        })
      } else {
        const rowCode = this.selectionList[0][this.rowKey]
        Fetch({
          url: `${deleteCode}/${rowCode}`
        }).then(() => {
          this.mVisible = false
          this.IS_REMOVE_SELECTION()
        })
      }
    },
    ...mapMutations(['IS_REMOVE_SELECTION', 'IS_EXPORT_TABLE_DATA'])
  },
  computed: mapState(['pageButtons', 'selectionList'])
}
</script>

<style scoped lang="scss">
  .page_btns {
    display: flex;
    align-items: center;
    margin: 6px 0 36px;
  }
</style>
