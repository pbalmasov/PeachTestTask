<template>
  <div class="catalog">
    <div class="catalog__select-wrapper">
      <base-select
        :items="availiableSections"
        class="catalog__select"
      ></base-select>
    </div>
    <div class="catalog__filters">
      <div key="filters" v-if="isFiltersShowed">
        <div
          v-for="filter in filters"
          :key="filter.model"
          class="catalog__inputs"
        >
          <label
            v-for="item in filter.items"
            :key="item.id || item"
            class="catalog__checkbox"
          >
            <input
              v-model="selected[filter.model]"
              :value="item.code || item"
              type="checkbox"
            />
            <div class="catalog__checkbox-name">{{ item.name || item }}</div>
          </label>
        </div>
        <div class="catalog__range-input">
          От
          <input
            v-autowidth="{
              minWidth: '35px',
              maxWidth: '35px',
              comfortZone: 0
            }"
            v-model.number="value[0]"
            type="text"
          />
          До
          <input
            v-autowidth="{
              minWidth: '35px',
              maxWidth: '35px',
              comfortZone: 0
            }"
            v-model.number="value[1]"
            type="text"
          />
          <vue-slider
            v-model="value"
            :min="minPrice"
            :max="maxPrice"
            :dot-size="10"
            :tooltip="'none'"
            :enable-cross="false"
            class="catalog__range-input-slider"
          ></vue-slider>
        </div>
      </div>
      <div key="selectedFilters" v-else class="catalog__inputs">
        <div
          v-for="filter in selectedFilters"
          :key="filter"
          class="catalog__checkbox catalog__checkbox-name catalog__checkbox_active"
        >
          {{ filter }}
        </div>
      </div>
      <svg
        @click="isFiltersShowed = !isFiltersShowed"
        :class="{ catalog__filter_active: isFiltersShowed }"
        xmlns="http://www.w3.org/2000/svg"
        width="31"
        height="22"
        class="catalog__filter"
      >
        <path
          class="catalog__filter-slider"
          fill="#b3b3b3"
          d="M0 4a1 1 0 011-1h29a1 1 0 011 1v1a1 1 0 01-1 1H1a1 1 0 01-1-1zM0 17a1 1 0 011-1h29a1 1 0 011 1v1a1 1 0 01-1 1H1a1 1 0 01-1-1z"
        />
        <path
          class="catalog__filter-dots"
          fill="#fff"
          d="M23.5 9a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM7.5 22a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"
        />
      </svg>
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
        <h3 class="catalog__item-article">Арт. 856735 7</h3>
        <div class="catalog__item-info">
          <span class="catalog__item-base">E27</span>
          <div class="catalog__item-icon"></div>
          <span class="catalog__item-watt">10W</span>
          <span class="catalog__item-characteristics"
            >30 000 часов<br />
            Холодный свет 75W</span
          >
          <span
            >Розничная цена&nbsp;
            <span class="catalog__item-price">{{ item.price }}₽</span></span
          >
        </div>
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
      value: [0, 100],
      selected: {
        sections: [],
        form: ['Свеча на ветру'],
        base: ['E27']
      },
      isFiltersShowed: false,
      staticFilters: [
        {
          items: [
            'Все формы',
            'Грушевидная',
            'Спираль',
            'Свеча',
            'Свеча на ветру',
            'Шар'
          ],
          model: 'form'
        },
        {
          items: [
            'Все цоколи',
            'E14',
            'E27',
            'GU5 3',
            'GU10',
            'G4',
            'G9',
            'G13'
          ],
          model: 'base'
        }
      ]
    }
  },
  computed: {
    ...mapState(['sections', 'items']),
    ...mapGetters(['getItemsBySections', 'getSectionByCode']),
    filters() {
      return [
        { items: this.availiableSections, model: 'sections' },
        ...this.staticFilters
      ]
    },
    selectedFilters() {
      return [
        ...this.selectedSections.map(({ name }) => name),
        ...this.selected.form,
        ...this.selected.base
      ]
    },
    selectedSections() {
      return this.availiableSections.filter(section =>
        this.selectedSectionsCodes.find(
          sectionCode => section.code === sectionCode
        )
      )
    },
    selectedSectionsCodes() {
      return this.selected.sections
    },
    sectionItems() {
      return this.getItemsBySections(this.selectedSections)
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
    fromPrice() {
      return this.value[0]
    },
    toPrice() {
      return this.value[1]
    },
    minPrice() {
      return Math.min(...this.sectionItems.map(({ price }) => price))
    },
    maxPrice() {
      return Math.max(...this.sectionItems.map(({ price }) => price), 0)
    }
  },
  watch: {
    selectedSectionsCodes() {
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
      this.selected.sections = sections
        .split('-or-')
        .filter(item =>
          this.availiableSections.find(({ code }) => item === code)
        )
    } else
      this.selected.sections = this.availiableSections.map(({ code }) => code)
    const fromPriceClamped =
      fromPrice !== undefined ? parseInt(fromPrice) : this.minPrice
    const toPriceClamped =
      toPrice !== undefined ? parseInt(toPrice) : this.maxPrice
    this.preventUpdateURL = false
    this.value = [fromPriceClamped, toPriceClamped]
  },
  methods: {
    updateURL() {
      if (this.preventUpdateURL) return
      const { fromPrice, toPrice, selectedSectionsCodes } = this
      this.$router.push({
        name: this.$route.name,
        params: {
          sections: selectedSectionsCodes.length
            ? selectedSectionsCodes.join('-or-')
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
  margin-top: 23px;
  &__select-wrapper {
    display: flex;
    justify-content: center;
  }
  &__select {
    width: 542px;
    margin-bottom: 20px;
  }
  &__filters {
    display: flex;
  }
  &__inputs {
    margin: 5px 0;
  }
  &__filter {
    margin-left: auto;
    .catalog__filter-slider {
      fill: #b3b3b3;
      transition: fill 0.3s;
    }
    .catalog__filter-dots {
      fill: #ffffff;
      transition: fill 0.3s;
    }
    &_active {
      .catalog__filter-slider {
        fill: #62224c;
      }
      .catalog__filter-dots {
        fill: #b31983;
      }
    }
  }
  &__range-input {
    position: relative;
    padding: 7px 11px;
    border-radius: 3px;
    color: #000000;
    background-color: #efefef;
    width: 138px;
    input {
      font: 300 16px Roboto;
      color: #000000;
      background: none;
      border: none;
    }
  }
  &__range-input-slider {
    position: absolute;
    left: 0;
    right: 0;
  }
  &__price-input {
    width: auto;
    color: #ffffff;
    background: none;
    border: none;
  }
  &__checkbox-name {
    padding: 7px 11px;
    background: rgba(#551f42, 0.44);
    border-radius: 3px;
    transition: background-color 0.3s;
  }
  &__checkbox {
    display: inline-block;
    margin-right: 5px;
    font-size: 16px;
    font-weight: 300;
    input {
      display: none;
      &:checked + .catalog__checkbox-name {
        background: #551f42;
      }
    }
    &_active {
      background: #551f42;
    }
  }
  &__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  &__item {
    position: relative;
    margin: 60px 0px;
    padding: 28px;
    flex: 0 0 auto;
    width: 358px;
    height: 560px;
    font-family: 'Roboto Condensed';
    font-weight: 300;
    font-size: 19px;
    line-height: 26px;
    color: #ffffff;
    text-decoration: none;
  }
  &__item-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 372px;
    object-fit: contain;
  }
  &__item-article {
    position: absolute;
    top: 6px;
    right: 40px;
    font-size: 16px;
    font-weight: 300;
  }
  &__item-icon {
    margin-bottom: 20px;
    width: 57px;
    height: 57px;
    background: url(/angle-icon.png);
  }
  &__item-info {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 23px;
  }
  &__item-base {
    font-size: 30px;
    line-height: 29px;
    margin-bottom: 5px;
  }
  &__item-watt {
    margin: 17px 0;
    font-size: 80px;
    font-weight: 700;
    line-height: 50px;
    text-transform: uppercase;
  }
  &__item-characteristics {
    margin: 15px 0;
  }
  &__item-price {
    font-size: 30px;
    font-weight: 400;
    line-height: 24px;
  }
}
</style>
