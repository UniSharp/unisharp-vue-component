<template lang="pug">
  u-admin
    u-breadcrumb(slot="breadcrumb")
    section
      .alert.alert-success(role="alert")
        | This is a success alert with&nbsp;
        a.alert-link(href="#") an example link
      .alert.alert-danger(role="alert")
        | This is a danger alert with&nbsp;
        a.alert-link(href="#") an example link
      .alert.alert-info(role="alert")
        | This is a info alert with&nbsp;
        a.alert-link(href="#") an example link
</template>

<script>
  // import Logo from '~/components/Logo.vue'
  import UAdmin from '~/components/Admin'
  import UBreadcrumb from '~/components/Breadcrumb'

  export default {
    components: { UAdmin, UBreadcrumb }
  }
</script>

<style lang="scss" scoped>
  section {
    width: 90%;
    margin: 0 auto;
    padding: 2rem 0;
  }

</style>
