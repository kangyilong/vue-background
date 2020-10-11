<template>
  <div class="d_index">detail</div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {}
  },
  created () {
    this.IS_LEVEL_ONE_PAGE(false)
  },
  methods: {
    ...mapMutations(['IS_LEVEL_ONE_PAGE'])
  }
}
</script>

<style lang="scss" scoped></style>
