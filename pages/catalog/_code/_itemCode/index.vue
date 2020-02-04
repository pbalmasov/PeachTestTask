<template>
  <div class="item">
    <img :src="item.picture" :alt="item.name" class="item__image" />
    <div class="item__info-wrapper">
      <h3>Арт. 32430 0</h3>
      <h1 class="item__title">{{ item.name }}</h1>
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
    width: 100%;
    height: 657px;
    object-fit: contain;
  }
  &__info-wrapper {
    height: 1837px;
    border-radius: 0 0 6px 6px;
    background-color: #ffffff;
    color: #000000;
    font-family: Roboto;
    font-size: 19px;
    font-weight: 300;
    line-height: 29px;
    text-align: center;
  }
  &__title {
    font-size: 60px;
    font-weight: 500;
    line-height: normal;
  }
}
</style>
