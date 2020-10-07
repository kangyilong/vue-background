<template>
  <div class="list_page">
    <c-search />
    <c-buttons />
    <c-table :rowKey="rowKey"/>
  </div>
</template>

<script>
import CSearch from './cSearch'
import CButtons from './cButtons'
import CTable from './cTable'
export default {
  components: { CButtons, CSearch, CTable },
  props: {
    rowKey: {
      type: String,
      default: 'id'
    }
  },
  data () {
    return {}
  }
}
</script>
