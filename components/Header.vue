<template lang="pug">
  .u-header
    b-navbar(fixed, toggleable="md", type="dark", variant="info")
      b-nav-toggle(target="nav_collapse")
      b-collapse(is-nav, id="nav_collapse")
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

<style>

</style>
