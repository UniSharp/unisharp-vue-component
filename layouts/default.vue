<template lang="pug">
  b-container(:fluid="true")
    b-row
      b-col.p-0.sidebar
        u-nav
      b-col.p-0
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

<style scoped>
  *:hover {
    outline: 1px solid rgba(255, 0, 0, .5);
  }

  .sidebar {
    flex: 0 0 260px;
  }
</style>
