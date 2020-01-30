<template>
  <div>
    <nuxt-link to="/">Назад</nuxt-link>
    <h1>{{ currentSection.name }}</h1>
    {{ minPrice }}
    {{ maxPrice }}
    <div>
      <input
        v-model.number="fromPrice"
        :min="minPrice"
        :max="Math.round((maxPrice + minPrice) / 2)"
        type="range"
      />
      &nbsp;&nbsp;{{ fromPrice }}
    </div>
    <div>
      <input
        v-model.number="toPrice"
        :min="Math.round((maxPrice + minPrice) / 2)"
        :max="maxPrice"
        type="range"
      />
      &nbsp;&nbsp;{{ toPrice }}
    </div>

    <section class="container">
      <nuxt-link
        :to="{
          name: 'catalog-code-itemCode',
          params: { code: currentSection.code, itemCode: item.code }
        }"
        v-for="item in itemsFilteredByPrice"
        :key="item.id"
      >
        <h2>{{ item.name }}</h2>
        <img :src="item.picture" :alt="item.name" />
        {{ item.price }}
      </nuxt-link>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {},
  data() {
    return {
      fromPrice: 0,
      toPrice: 0
    }
  },
  computed: {
    ...mapGetters(['getItemsBySectionId', 'getSectionByCode']),
    currentSection() {
      return this.getSectionByCode(this.$route.params.sections)
    },
    sectionFilters() {
      return this.$route.params.sections.split('-or-')
    },
    items() {
      return this.getItemsBySectionId(this.currentSection.id)
    },
    itemsFilteredByPrice() {
      return this.items.filter(
        ({ price }) => this.fromPrice <= price && price <= this.toPrice
      )
    },
    minPrice() {
      return Math.min(...this.items.map(({ price }) => price)) // TODO maybe set min of minPrice as maxPrice value
    },
    maxPrice() {
      return Math.max(...this.items.map(({ price }) => price), 0)
    }
  },
  watch: {
    fromPrice() {
      this.updateURL()
    },
    toPrice() {
      this.updateURL()
    }
  },
  created() {
    const { fromPrice } = this.$route.query
    const { toPrice } = this.$route.query

    if (fromPrice !== undefined) this.fromPrice = parseInt(fromPrice)
    if (toPrice !== undefined) this.toPrice = parseInt(toPrice)
  },
  methods: {
    updateURL() {
      const { fromPrice, toPrice } = this
      this.$router.push({
        path: this.$route.path,
        query: { fromPrice, toPrice }
      })
    }
  }
}
</script>
<style>
.container {
  display: flex;
  flex-wrap: wrap;
}
.container a {
  padding: 10px;
  width: 20%;
}
img {
  width: 100%;
  height: auto;
}
</style>
