<template>
  <ul>
    <li v-for="{ id, name, code } in availiableSections" :key="id">
      <nuxt-link
        :to="{ name: 'catalog-sections', params: { sections: code } }"
        >{{ name }}</nuxt-link
      >
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['items', 'sections']),
    availiableSections() {
      const itemsSections = [
        ...new Set(this.items.map(({ sectionId }) => sectionId))
      ]
      return this.sections.filter(({ id }) => itemsSections.indexOf(id) !== -1)
    }
  }
}
</script>
