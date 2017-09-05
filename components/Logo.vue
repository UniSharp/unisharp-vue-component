<template lang="pug">
  nuxt-link.logo(:to="to")
    img(src="~assets/img/logo.png")
</template>

<script>
  export default {
    props: {
      to: {
        type: String,
        default: '/'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .logo {
    display: block;

    img {
      width: 170px;
      height: 32px;
    }
  }
</style>
