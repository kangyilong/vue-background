<template>
  <Layout>
    <Header>
      <MenuTop :menuTopData="menuTopData"/>
    </Header>
    <Layout>
      <Sider hide-trigger>
        <MenuSider />
      </Sider>
      <Layout style="padding: 0 24px 24px; position: relative;">
        <Breadcrumb style="margin: 24px 10px 24px 0">
          <BreadcrumbItem>{{breadCrumb.one.text}}</BreadcrumbItem>
          <BreadcrumbItem>{{breadCrumb.two.text}}</BreadcrumbItem>
          <BreadcrumbItem style="cursor: pointer;" :to="breadCrumb.three.url">{{breadCrumb.three.text}}</BreadcrumbItem>
        </Breadcrumb>
        <p class="pre_page" v-if="!isLevelOnePage" @click="previousPage">上一页</p>
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
    goPage (url) {
      this.$router.push(url)
    },
    previousPage () {
      this.$router.go(-1)
    },
    ...mapMutations(['MENU_SIDER_DATA'])
  },
  computed: mapState(['breadCrumb', 'isLevelOnePage'])
}
</script>

<style lang="scss" scoped>
  .pre_page {
    color: #2d8cf0;
    cursor: pointer;
    position: absolute;
    right: 34px;
    top: 20px;
    padding: 10px 0;
    font-size: 13px;
  }
</style>
