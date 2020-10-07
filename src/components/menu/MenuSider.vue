<template>
  <Menu
    ref="sideMenu"
    :theme="theme"
    width="auto"
    :active-name="activeId"
    :open-names="openMenu"
    @on-select="menuSelect"
  >
    <Submenu :name="item.id" v-for="item in menuSiderData" :key="item.id">
      <template slot="title">
        <Icon type="ios-paper" />
        {{item.name}}
      </template>
      <MenuItem
        :name="`${item.id}-${cItem.id}`"
        v-for="cItem in (item.children || [])"
        :key="cItem.id"
      >{{cItem.name}}</MenuItem>
    </Submenu>
  </Menu>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      theme: 'dark',
      activeId: '',
      openMenu: [],
      timeout: null
    }
  },
  created () {
    this.activeId = localStorage.getItem('siderActiveId') || ''
    this.defaulteSider(this.menuSiderData)
  },
  methods: {
    menuSelect (id) {
      this.activeId = id
    },
    defaulteSider (ll) {
      if (Array.isArray(ll) && ll.length > 0) {
        let openMenu = {}
        let menuObj = {}
        if (this.activeId) {
          const openId = this.activeId.split('-')[0]
          const activeId = this.activeId.split('-')[1]
          this.openMenu = [openId]
          openMenu = ll.filter(item => item.id === openId)[0] || {}
          if (openMenu.id) {
            menuObj = openMenu.children.filter(item => item.id === activeId)[0] || {}
          }
        } else {
          openMenu = ll[0]
          menuObj = openMenu.children[0] || {}
          if (menuObj.id) {
            this.activeId = `${openMenu.id}-${menuObj.id}`
            this.openMenu = [openMenu.id]
          }
        }
        if (openMenu.id && menuObj.id) {
          if (this.timeout) {
            clearTimeout(this.timeout)
          }
          this.timeout = setTimeout(() => {
            const itName = openMenu.name
            const { name, url, id } = menuObj
            this.BREAD_CRUMB({
              key: 'two',
              text: itName
            })
            this.BREAD_CRUMB({
              key: 'three',
              text: name
            })
            this.getPageButtons(id)
            localStorage.setItem('siderActiveId', this.activeId)
            this.$router.push(url.split('.htm')[0])
          }, 100)
        }
      }
    },
    ...mapMutations(['BREAD_CRUMB']),
    ...mapActions(['getPageButtons'])
  },
  computed: mapState(['menuSiderData', 'topMenuChange']),
  watch: {
    menuSiderData: {
      handler (ll) {
        this.defaulteSider(ll)
      },
      deep: true
    },
    topMenuChange () {
      this.activeId = ''
    },
    openMenu () {
      this.$nextTick(() => {
        this.$refs.sideMenu.updateOpened()
        this.$refs.sideMenu.updateActiveName()
      })
    },
    activeId () {
      this.defaulteSider(this.menuSiderData)
    }
  }
}
</script>
