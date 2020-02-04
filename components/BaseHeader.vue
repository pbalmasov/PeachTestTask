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
    <input type="checkbox" class="header__toggle" />
  </header>
</template>

<style lang="scss">
.header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 16px;
  font-weight: 300;

  &__nav {
    flex: 1;
  }
  &__nav-list {
    width: 463px;
    display: inline-flex;
    flex-direction: row;
    list-style-type: none;
  }
  &__nav-list-item {
    margin-right: 10px;
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
      font-family: Roboto;
      font-weight: 700;
    }
  }
  &__search {
    width: 26px;
    height: 26px;
    background: url(~assets/search.svg);
  }
}
</style>
