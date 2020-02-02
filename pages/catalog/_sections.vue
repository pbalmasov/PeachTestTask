<template>
  <div class="catalog">
    <div class="catalog__select-wrapper">
      <base-select
        :items="availiableSections"
        class="catalog__select"
      ></base-select>
    </div>
    <div class="catalog__inputs">
      <label
        v-for="section in availiableSections"
        :key="section.id"
        class="catalog__checkbox"
      >
        <input
          v-model="selectedSections"
          :value="section.code"
          type="checkbox"
        />
        <div class="catalog__checkbox-name">{{ section.name }}</div>
      </label>
    </div>
    <div>
      От
      <input
        v-model.number="fromPrice"
        :min="minPrice"
        :max="Math.round((maxPrice + minPrice) / 2)"
        type="text"
        class="catalog__price-input"
      />
      До
      <input
        v-model.number="toPrice"
        :min="Math.round((maxPrice + minPrice) / 2)"
        :max="maxPrice"
        type="text"
        class="catalog__price-input"
      />
    </div>
    <section class="catalog__container">
      <nuxt-link
        :to="{
          name: 'catalog-code-itemCode',
          params: { code: item.code, itemCode: item.code }
        }"
        v-for="item in itemsFilteredByPrice"
        :key="item.id"
        class="catalog__item"
      >
        <img :src="item.picture" :alt="item.name" class="catalog__item-image" />
        <h2 class="catalog__item-title">{{ item.name }}</h2>
        <span>10 W</span>
        <span>30 000 часов</span>
        <span>Холодный свет 75W</span>
        <span
          >Розничная цена
          <span class="catalog__item-price">{{ item.price }} ₽</span></span
        >
      </nuxt-link>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import BaseSelect from '~/components/BaseSelect'

export default {
  components: { BaseSelect },
  data() {
    return {
      fromPrice: 0,
      toPrice: 0,
      selectedSections: []
    }
  },
  computed: {
    ...mapState(['sections', 'items']),
    ...mapGetters(['getItemsBySections', 'getSectionByCode']),
    sectionItems() {
      return this.getItemsBySections(
        this.availiableSections.filter(section =>
          this.selectedSections.find(
            sectionCode => section.code === sectionCode
          )
        )
      )
    },
    itemsFilteredByPrice() {
      return this.sectionItems.filter(
        ({ price }) => this.fromPrice <= price && price <= this.toPrice
      )
    },
    availiableSections() {
      const itemsSections = [
        ...new Set(this.items.map(({ sectionId }) => sectionId))
      ]
      return this.sections.filter(({ id }) => itemsSections.indexOf(id) !== -1)
    },
    minPrice() {
      return Math.min(...this.sectionItems.map(({ price }) => price)) // TODO maybe set min of minPrice as maxPrice value
    },
    maxPrice() {
      return Math.max(...this.sectionItems.map(({ price }) => price), 0)
    }
  },
  watch: {
    selectedSections() {
      this.updateURL()
    },
    fromPrice() {
      this.updateURL()
    },
    toPrice() {
      this.updateURL()
    }
  },
  created() {
    this.preventUpdateURL = true
    const { fromPrice, toPrice } = this.$route.query
    const { sections } = this.$route.params

    if (sections !== undefined && sections !== null) {
      this.selectedSections = sections
        .split('-or-')
        .filter(item =>
          this.availiableSections.find(({ code }) => item === code)
        )
    }
    if (fromPrice !== undefined) this.fromPrice = parseInt(fromPrice)
    this.toPrice = toPrice !== undefined ? parseInt(toPrice) : this.maxPrice
    this.preventUpdateURL = false
  },
  methods: {
    updateURL() {
      if (this.preventUpdateURL) return
      const { fromPrice, toPrice, selectedSections } = this
      this.$router.push({
        name: this.$route.name,
        params: {
          sections: selectedSections.length
            ? selectedSections.join('-or-')
            : null
        },
        query: { fromPrice, toPrice }
      })
    }
  }
}
</script>
<style lang="scss">
.catalog {
  &__select-wrapper {
    display: flex;
    justify-content: center;
  }
  &__select {
    width: 542px;
  }
  &__inputs {
    margin-left: 37px;
    display: flex;
    flex-wrap: wrap;
  }
  &__price-input {
    width: auto;
    color: #ffffff;
    background: none;
    border: none;
  }
  &__checkbox {
    margin: 10px;
    font-size: 16px;
    font-weight: 300;
    height: 33px;
    border-radius: 3px;
    input {
      display: none;
      &:checked + .catalog__checkbox-name {
        background: #551f42;
      }
    }
  }
  &__checkbox-name {
    padding: 7px 11px;
    background: rgba(#551f42, 0.44);
    transition: background-color 0.3s;
  }
  &__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  &__item {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    width: 372px;
    height: 521px;
    font-size: 19px;
    font-weight: 300;
    line-height: 26px;
    color: #ffffff;
    text-decoration: none;
    margin: 60px 30px;
  }
  &__item-image {
    width: 372px;
    height: 372px;
    object-fit: contain;
  }
  &__item-price {
    font-size: 30px;
    font-weight: 400;
    line-height: 24px;
  }
}
</style>
