<template lang="pug">
  nuxt-link.u-logo.d-flex.align-items-center.justify-content-center(:to="to")
    img(:src="logo", v-if="logo")
    .logo(v-else)
    .text.d-flex.flex-column.justify-content-center
      h1(v-if="title") {{ title }}
</template>

<script>
  import config from '~/config'

  export default {
    props: {
      to: {
        type: String,
        default: () => config.index.to
      }
    },
    data () {
      return {
        logo: (config.logo && config.logo.image) ? config.logo.image : null,
        title: config.logo ? config.logo.title : 'BACKEND'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables";

  $logo-color: #7ac5c1;
  $logo-size: 2rem;
  $square-size: $logo-size * .35;
  $trangle-size: $logo-size * .28;
  $square-position: ($logo-size - $square-size) / 2;
  $trangle-position: ($logo-size - $trangle-size) / 2;

  a {
    &:hover {
      text-decoration: none;
    }
  }

  img {
    height: 2rem;
  }

  .logo {
    position: relative;
    width: $logo-size;
    height: $logo-size;
    border-radius: 50%;
    background-color: $logo-color;

    &:before {
      content: "";
      position: absolute;
      width: $square-size;
      height: $square-size;
      top: $square-position;
      left: $square-position;
      background-color: #3c4350;
    }

    &:after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      top: $trangle-position;
      right: $square-position;
      border-top: $trangle-size / 2 solid transparent;
      border-bottom: $trangle-size / 2 solid transparent;
      border-right: $trangle-size / 2 solid $logo-color;
    }
  }

  h1 {
    margin-bottom: 0;
    margin-left: .5rem;
    font-size: $logo-size - .5rem;
    font-weight: bold;
    font-family: Arial;
    letter-spacing: .1rem;
    color: $white;
  }
</style>
