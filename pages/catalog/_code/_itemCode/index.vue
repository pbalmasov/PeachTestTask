<template>
  <div class="item">
    <img :src="item.picture" :alt="item.name" class="item__image" />
    <div class="item__info-wrapper">
      <h3>Арт. 32430 0</h3>
      <h1>{{ item.name }}</h1>
      <p>
        Энергосберегающая светодиодная лампа в форме витой свечи теплого
        свечения. Нестыдная лампа для открытых светильников, создаст уют в доме
        и согреет холодными вечерами.
      </p>
      <div>
        <span>Максимальное освещение</span>
        <span>Экономия энергии</span>
        <span>Срок службы до 30 000 часов</span>
      </div>
      <h2>Основные характеристики</h2>
      <table></table>
      <p>
        Вся продукция REV поставляется в узнаваемой фирменной упаковке.
        Производитель REV Ritter GmbH, Германия
      </p>
      <div>
        <span
          >Средняя розничная цена <span>{{ item.price }} ₽</span></span
        >
      </div>
      <button>
        Перейти к покупке
      </button>
      <div class="item__spacer" />
      <nuxt-link to="#">Узнать где купить</nuxt-link>
    </div>
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

<style lang="scss">
.item {
  &__image {
    width: 1153px;
    height: 657px;
    object-fit: contain;
  }
}
</style>
