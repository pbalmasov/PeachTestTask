<template>
  <header class="header">
    <img src="~/assets/logo.svg" class="header__logo" />
    <nav class="header__nav">
      <ul class="header__nav-list">
        <li class="header__nav-list-item">
          <nuxt-link :to="{ name: 'catalog-sections' }" class="header__nav-link"
            >Каталог</nuxt-link
          >
        </li>
        <li class="header__nav-list-item">
          <nuxt-link to="#" class="header__nav-link">О компании</nuxt-link>
        </li>
        <li class="header__nav-list-item">
          <nuxt-link to="#" class="header__nav-link">Сотрудничество</nuxt-link>
        </li>
        <li class="header__nav-list-item">
          <nuxt-link to="#" class="header__nav-link">Где купить</nuxt-link>
        </li>
      </ul>
    </nav>
    <div class="header__search" />
    <base-switch />
  </header>
</template>
<script>
import BaseSwitch from '~/components/BaseSwitch'
export default {
  components: { BaseSwitch }
}
</script>

<style lang="scss">
.header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 300;
  padding: 22px 0;

  &__nav {
    flex: 1;
  }
  &__nav-list {
    display: inline-flex;
    flex-direction: row;
    list-style-type: none;
  }
  &__nav-list-item {
    margin-right: 30px;
  }
  &__nav-link {
    color: #ffffff;
    text-decoration: none;
    &.nuxt-link-active {
      color: #b31983;
      font-family: Roboto;
      font-weight: 700;
    }
    &:hover {
      color: #551f42;
    }
  }
  &__search {
    width: 26px;
    height: 26px;
    background: url(~assets/search.svg);
    margin-right: 38px;
  }
  &__switch {
    cursor: pointer;
    &::before {
      content: '';
      display: block;
      width: 22px;
      height: 11px;
      border-radius: 6px;
      border: 3px solid #e4aed3;
    }
    &::after {
      content: '';
      display: block;
      margin-top: -13px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #ffffff;
    }
    input {
      display: none;
    }
  }
}
</style>
