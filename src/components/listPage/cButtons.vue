<template>
  <div class="page_btns">
    <Button
      v-for="item in pageButtons"
      :key="item.id"
      style="margin-right: 10px;"
      :data-url="item.url"
    >{{item.name}}</Button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState(['pageButtons'])
  }
}
</script>

<style scoped lang="scss">
  .page_btns {
    display: flex;
    align-items: center;
    margin: 6px 0 36px;
  }
</style>
