<template>
  <div>
    <base-header />
    <nuxt />
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
<style>
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

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
