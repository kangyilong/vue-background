<template>
  <Menu
    ref="topMenu"
    mode="horizontal"
    :theme="theme"
    :active-name="activeId"
    style="display: flex;"
    @on-select="menuSelect"
  >
    <div class="layout-logo"></div>
    <div class="layout-nav">
      <MenuItem :name="item.id" v-for="item in menuTopData" :key="item.id">
        <Icon type="ios-paper" />
        {{item.name}}
      </MenuItem>
    </div>
  </Menu>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    menuTopData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      theme: 'dark',
      activeId: ''
    }
  },
  created () {
    this.activeId = localStorage.getItem('topMenuId') || ''
    if (!this.activeId && this.menuTopData[0]) {
      this.activeId = this.menuTopData[0].id
      this.getMenuName(this.activeId)
    }
  },
  methods: {
    menuSelect (id) {
      localStorage.setItem('topMenuId', id)
      this.MENU_SIDER_DATA(id)
      this.TOP_MENU_CHANGE()
    },
    getMenuName (activeId) {
      const menuName = this.menuTopData.filter(item => item.id === activeId)[0].name
      this.BREAD_CRUMB({
        key: 'one',
        text: menuName
      })
    },
    ...mapMutations(['MENU_SIDER_DATA', 'TOP_MENU_CHANGE', 'BREAD_CRUMB'])
  },
  watch: {
    menuTopData: {
      handler (ll) {
        if (ll[0]) {
          this.activeId = ll[0].id
        }
      },
      deep: true
    },
    activeId (val) {
      this.$nextTick(() => {
        this.$refs.topMenu.updateActiveName()
        this.MENU_SIDER_DATA(val)
        this.getMenuName(val)
      })
    }
  }
}
</script>

<style>
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    flex: 1;
    margin-left: 50px;
  }
</style>
