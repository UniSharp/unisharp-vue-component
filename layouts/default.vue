<template lang="pug">
  b-container(:fluid="true")
    b-row
      b-col(cols="2")
        u-nav
      b-col(cols="10")
        u-header
        nuxt
</template>

<script>
  import UNav from '~/components/Nav'
  import UHeader from '~/components/Header'
  export default {
    components: { UNav, UHeader }
  }
</script>

<style>
  *:hover {
    outline: 1px solid rgba(255, 0, 0, .5);
  }
</style>
