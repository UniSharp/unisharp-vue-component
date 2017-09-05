<template lang="pug">
  u-admin
    u-breadcrumb(slot="breadcrumb")
    .container.d-flex.flex-column.align-items-center.justify-content-center
      .caption.my-3.text-center
        h1.display-3.text-dark Blue Admin
        h2.display-4.text-muted A base template
      .links
        a.btn.btn-lg.btn-outline-success.px-4.mr-3(href="https://nuxtjs.org/", target="_blank") Documentation
        a.btn.btn-lg.btn-outline-dark.px-4(href="https://github.com/nuxt/nuxt.js", target="_blank") GitHub
</template>

<script>
  import UAdmin from '~/components/Admin'
  import UBreadcrumb from '~/components/Breadcrumb'

  export default {
    components: { UAdmin, UBreadcrumb }
  }
</script>

<style lang="scss" scoped>
  //
</style>
