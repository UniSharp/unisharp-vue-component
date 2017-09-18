<template lang="pug">
  u-dropdown.u-user-dropdown
    button.btn.btn-link.d-flex.align-items-center.h-100.px-4.u-user-toggle(slot="toggle")
      i.fa.fa-user.mr-2(aria-hidden="true")
      | User
      i.fa.fa-caret-down.ml-2(aria-hidden="true")
    .dropdown-menu
      a.dropdown-item(href="#")
        i.fa.fa-cog.mr-2(aria-hidden="true")
        span 更改密碼
      a.dropdown-item(href="#")
        i.fa.fa-sign-out.mr-2(aria-hidden="true")
        span 登出
</template>

<script>
  import UDropdown from '~/components/Dropdown'

  export default {
    components: { UDropdown }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/variables";
  @import "node_modules/bootstrap/scss/mixins/transition";

  .u-user-toggle {
    @include transition;

    cursor: pointer;
    border: 0 solid rgba(255, 255, 255, .1);
    border-width: 0 1px;
    background-color: $navbar-bg;
    text-decoration: none;

    &:hover, .active & {
      background-color: $sidebar-bg;
    }
  }

  .dropdown-menu {
    right: 1.5rem;
    border-top: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>
