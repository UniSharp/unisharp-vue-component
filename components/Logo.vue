<template lang="pug">
  nuxt-link.logo(:to="to")
    img(src="~assets/img/logo.png", :width="width")
</template>

<script>
  export default {
    props: {
      to: {
        type: String,
        default: '/'
      },
      width: {
        type: Number,
        default: 170
      }
    }
  }
</script>

<style lang="scss" scoped>
  .logo {
    display: block;

    img {
      height: auto;
    }
  }
</style>
