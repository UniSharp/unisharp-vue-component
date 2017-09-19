<template lang="pug">
  nuxt-link.u-logo(:to="to")
    img(src="../assets/img/logo.png", :width="width")
</template>

<script>
  import config from '~/config'

  export default {
    props: {
      to: {
        type: String,
        default: () => config.index.to
      },
      width: {
        type: Number,
        default: 170
      }
    }
  }
</script>

<style lang="scss" scoped>
  .u-logo {
    display: block;

    img {
      height: auto;
    }
  }
</style>
