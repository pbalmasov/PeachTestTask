<template>
  <div>
    {{ selectedSection }}
    <select v-model="selectedSection" name="section">
      <option
        v-for="section in availiableSections"
        :key="section.id"
        :value="section"
        >{{ section.name }}</option
      >
    </select>
    <section class="container">
      <div v-for="item in sectionItems" :key="item.id">
        <h2>{{ item.name }}</h2>
        <img :src="item.picture" :alt="item.name" />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      items: [],
      sections: [],
      selectedSection: null
    }
  },
  computed: {
    sectionItems() {
      return this.selectedSection
        ? this.items.filter(
            ({ sectionId }) => sectionId === this.selectedSection.id
          )
        : null
    },
    availiableSections() {
      const itemsSections = [
        ...new Set(this.items.map(({ sectionId }) => sectionId))
      ]
      return this.sections.filter(({ id }) => itemsSections.indexOf(id) !== -1)
    }
  },
  async created() {
    const {
      data: { items, sections }
    } = await this.$axios('/api/mock.php')
    // eslint-disable-next-line
    console.log(items)
    this.items = Object.values(items)
    this.sections = Object.values(sections)
  }
}
</script>

<style>
.container {
  display: flex;
  flex-wrap: wrap;
}
.container div {
  width: 20%;
}
img {
  width: 100%;
  height: auto;
}
</style>
