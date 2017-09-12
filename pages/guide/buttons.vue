<template lang="pug">
  u-admin
    u-breadcrumb(slot="breadcrumb")
    section
      button.btn.btn-primary(type="button") Primary
      button.btn.btn-secondary(type="button") Secondary
      button.btn.btn-danger(type="button") Danger
      button.btn.btn-info(type="button") Info
    section
      button.btn.btn-primary.btn-sm(type="button") Primary
      button.btn.btn-secondary.btn-sm(type="button") Secondary
      button.btn.btn-danger.btn-sm(type="button") Danger
      button.btn.btn-info.btn-sm(type="button") Info
    section
      button.btn.btn-primary.btn-lg(type="button") Primary
      button.btn.btn-secondary.btn-lg(type="button") Secondary
      button.btn.btn-danger.btn-lg(type="button") Danger
      button.btn.btn-info.btn-lg(type="button") Info
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
    padding: 1rem 0;
  }

  section .btn + .btn {
    margin-left: 1rem;
  }
</style>
