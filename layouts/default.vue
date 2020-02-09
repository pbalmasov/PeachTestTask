<template>
  <div class="layout">
    <base-header class="layout__header" />
    <div class="layout__content">
      <nuxt />
    </div>
    <base-footer />
  </div>
</template>
<script>
import BaseHeader from '~/components/BaseHeader'
import BaseFooter from '~/components/BaseFooter'
export default {
  components: { BaseHeader, BaseFooter }
}
</script>
<style lang="scss">
html {
  background: #1a1212;
  color: #ffffff;
  font-family: 'Roboto Condensed', sans-serif;
  /* font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px; */
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
body,
#__nuxt,
#__layout {
  min-height: 100vh;
}
.layout {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  padding: 0 64px;
  &__header {
    margin-top: 23px;
  }
  &__content {
    flex: 1;
  }
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
