<template>
  <div class="catalog-item">
    <div class="catalog-item__gallery">
      <img :src="item.picture" :alt="item.name" class="catalog-item__image" />
      <button class="catalog-item__gallery-cross" />
      <div class="catalog-item__gallery-footer">
        <button class="catalog-item__gallery-button">Уменьшить</button>
        <div class="catalog-item__gallery-dots">
          <div class="catalog-item__gallery-dot"></div>
          <div
            class="catalog-item__gallery-dot catalog-item__gallery-dot_active"
          ></div>
          <div class="catalog-item__gallery-dot"></div>
        </div>
        <nuxt-link to="#" class="catalog-item__link catalog-item__link_white"
          >Перейти к покупке</nuxt-link
        >
      </div>
    </div>
    <div class="catalog-item__info-wrapper">
      <h3 class="catalog-item__article">Арт. 32430 0</h3>
      <h1 class="catalog-item__title">{{ item.name }}</h1>
      <p class="catalog-item__description">
        Энергосберегающая светодиодная лампа в форме витой свечи теплого
        свечения. Нестыдная лампа для открытых светильников, создаст уют в доме
        и согреет холодными вечерами.
      </p>
      <div class="catalog-item__icons">
        <span class="catalog-item__icon catalog-item__icon_maximum"
          >Максимальное освещение</span
        >
        <span class="catalog-item__icon catalog-item__icon_economy"
          >Экономия энергии</span
        >
        <span class="catalog-item__icon catalog-item__icon_duration"
          >Срок службы<br />до 30 000 часов</span
        >
      </div>
      <h2 class="catalog-item__subtitle">Основные характеристики</h2>
      <div class="catalog-item__characteristics">
        <table class="catalog-item__characteristics-table">
          <tr>
            <td>Цоколь</td>
            <td>Е14</td>
          </tr>
          <tr>
            <td>Потребляемая мощность</td>
            <td>5 Вт</td>
          </tr>
          <tr>
            <td>Световой поток</td>
            <td>400 Lm</td>
          </tr>
          <tr>
            <td>Цветовая температура</td>
            <td>2700 K</td>
          </tr>
        </table>

        <table class="catalog-item__characteristics-table">
          <tr>
            <td>Номинальное напряжение</td>
            <td>180 - 240 В</td>
          </tr>
          <tr>
            <td>Свет</td>
            <td>теплый</td>
          </tr>
          <td>Диаметр</td>
          <td>35 мм</td>
          <tr></tr>
          <tr>
            <td>Высота</td>
            <td>98 мм</td>
          </tr>
        </table>
      </div>
      <img src="/lightbulb.png" class="catalog-item__pack-image" />
      <p>
        Вся продукция REV поставляется в узнаваемой фирменной упаковке.<br />
        Производитель REV Ritter GmbH, Германия
      </p>
      <div class="catalog-item__spacer" />
      <div class="catalog-item__footer">
        <div class="catalog-item__price-wrapper">
          <div>Средняя розничная цена</div>
          <div class="catalog-item__price">{{ item.price }} ₽</div>
        </div>
        <nuxt-link to="#" class="catalog-item__buy-button">
          Перейти к покупке
        </nuxt-link>
        <nuxt-link to="#" class="catalog-item__link"
          >Узнать где купить</nuxt-link
        >
      </div>
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
.catalog-item {
  margin-top: 10px;
  border-radius: 6px;
  overflow: hidden;
  &__image {
    display: block;
    background: url('~assets/pattern.png') no-repeat center;
    width: 100%;
    height: 657px;
    object-fit: contain;
  }
  &__gallery-cross {
    position: absolute;
    top: 30px;
    right: 30px;
    width: 22px;
    height: 22px;
    background: url('~assets/cross.svg') no-repeat center;
    border: none;
  }
  &__gallery {
    position: relative;
  }
  &__gallery-button {
    border: none;
    background: none;
    padding: 0;
    color: #ffffff;
    font: 300 16px Roboto;
  }
  &__link {
    color: #000000;
    text-decoration: none;
    font-family: Roboto;
    line-height: 48px;
    &_white {
      color: #ffffff;
    }
    &::after {
      content: ' >';
      font-weight: bold;
    }
  }
  &__gallery-footer {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 33px;
    padding: 0 33px;
    padding-bottom: 37px;
  }
  &__gallery-dots {
    display: flex;
  }
  &__gallery-dot {
    width: 14px;
    height: 14px;
    margin-right: 22px;
    background: rgba(#ffffff, 0.35);
    border-radius: 50%;
    &_active {
      background: #ffffff;
    }
  }
  &__info-wrapper {
    padding: 54px 150px 69px 150px;
    background-color: #ffffff;
    color: #000000;
    font-family: Roboto;
    font-size: 19px;
    font-weight: 300;
    line-height: 29px;
    text-align: center;
  }
  &__article {
    margin-bottom: 28px;
    font-size: 19px;
    font-weight: 300;
    line-height: 29px;
  }
  &__title {
    margin-bottom: 21px;
    font-size: 60px;
    font-weight: 500;
    line-height: normal;
  }
  &__description {
    margin-bottom: 65px;
  }
  &__icons {
    display: flex;
    justify-content: space-around;
    font-weight: 400;
    margin-bottom: 92px;
  }
  &__icon {
    width: 165px;
    &::before {
      margin: 0 auto;
      width: 107px;
      height: 107px;
      content: '';
      display: block;
      background: no-repeat center;
    }
    &_maximum::before {
      background-image: url(/icon1.svg);
    }
    &_economy::before {
      background-image: url(/icon2.svg);
    }
    &_duration::before {
      background-image: url(/icon3.svg);
    }
  }
  &__subtitle {
    margin-bottom: 30px;
    font-size: 30px;
    font-weight: 500;
    line-height: 37px;
  }
  &__characteristics {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    text-align: left;
  }
  &__characteristics-table {
    width: 360px;
  }
  &__pack-image {
    margin-bottom: 26px;
  }
  &__spacer {
    margin: 43px 0;
    border: 1px solid #979797;
  }
  &__footer {
    margin-top: 73px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__price {
    color: #1e1919;
    font-size: 30px;
    font-weight: 400;
    margin-top: 20px;
  }
  &__price-wrapper {
    font-size: 16px;
    font-weight: 300;
    line-height: 18px;
    text-align: left;
  }
  &__buy-button {
    padding: 20px 40px;
    border-radius: 6px;
    color: #ffffff;
    background-color: #b31983;
    font-size: 21px;
    font-weight: 400;
    text-decoration: none;
  }
}
</style>
