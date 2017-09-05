<template lang="pug">
  .u-header
    b-navbar(fixed, type="dark")
      slot
      u-breadcrumb
      b-nav(is-nav-bar, class="ml-auto")
        u-user-dropdown
</template>

<script>
  import UBreadcrumb from '~/components/BreadCrumb'
  import UUserDropdown from '~/components/UserDropdown'

  export default {
    components: { UBreadcrumb, UUserDropdown }
  }
</script>

<style lang="scss" scoped>
  $header-height: 70px;

  .navbar {
    height: $header-height;
  }
</style>
