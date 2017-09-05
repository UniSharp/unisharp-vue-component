<template lang="pug">
  b-container(:fluid="true")
    b-row
      b-col(cols="2")
        blue-nav
      b-col(cols="10")
        blue-header
        nuxt
</template>

<script>
  import BlueNav from '~/components/Nav'
  import BlueHeader from '~/components/Header'
  export default {
    components: { BlueNav, BlueHeader }
  }
</script>

<style>
  *:hover {
    outline: 1px solid rgba(255, 0, 0, .5);
  }
</style>
