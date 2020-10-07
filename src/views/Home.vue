<template>
  <Layout>
    <Header>
      <MenuTop :menuTopData="menuTopData"/>
    </Header>
    <Layout>
      <Sider hide-trigger>
        <MenuSider />
      </Sider>
      <Layout style="padding: 0 24px 24px;">
        <Breadcrumb style="margin: 24px 0">
          <BreadcrumbItem>{{breadCrumb.one}}</BreadcrumbItem>
          <BreadcrumbItem>{{breadCrumb.two}}</BreadcrumbItem>
          <BreadcrumbItem>{{breadCrumb.three}}</BreadcrumbItem>
        </Breadcrumb>
        <Content style="padding: 24px; background-color: #fff;" :style="{minHeight: clientHeight}">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </Layout>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import MenuTop from 'components/menu/MenuTop'
import MenuSider from 'components/menu/MenuSider'
import { getRoleMenuList } from 'common/api/user'
import { dealWithMenu, toggleLoading } from 'common/js/util'

export default {
  name: 'Home',
  components: {
    MenuTop,
    MenuSider
  },
  data () {
    return {
      clientHeight: '',
      menuTopData: []
    }
  },
  created () {
    this.clientHeight = (document.documentElement.clientHeight * 0.78) + 'px'
    const menuTopData = localStorage.getItem('menuTopData') || null
    if (!menuTopData) {
      const hasLoad = toggleLoading()
      getRoleMenuList().then(data => {
        hasLoad()
        this.menuTopData = dealWithMenu(data)
      }).catch(hasLoad)
    } else {
      this.menuTopData = JSON.parse(menuTopData)
      if (this.menuTopData[0]) {
        this.MENU_SIDER_DATA(this.menuTopData[0].id)
      }
    }
  },
  methods: {
    ...mapMutations(['MENU_SIDER_DATA'])
  },
  computed: mapState(['breadCrumb'])
}
</script>

<style lang="scss" scoped></style>
