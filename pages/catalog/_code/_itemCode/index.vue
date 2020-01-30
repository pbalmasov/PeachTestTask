<template>
  <div>
    {{ item }}
    <h2>{{ item.name }}</h2>
    <img :src="item.picture" :alt="item.name" />
    <div>{{ item.prive }}</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  components: {},
  computed: {
    ...mapGetters(['getItemByCode']),
    item() {
      return this.getItemByCode(this.$route.params.itemCode)
    }
  }
}
</script>
