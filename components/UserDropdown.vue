<template lang="pug">
  .u-user-dropdown
    button.btn.btn-link.d-flex.align-items-center.h-100.px-4.u-user-toggle
      i.fa.fa-user.mr-2(aria-hidden="true")
      | User
      i.fa.fa-caret-down.ml-2(aria-hidden="true")
    .dropdown-menu.m-0
      a.dropdown-item(href="#")
        i.fa.fa-cog.mr-2(aria-hidden="true")
        span 更改密碼
      a.dropdown-item(href="#")
        i.fa.fa-sign-out.mr-2(aria-hidden="true")
        span 登出
</template>

<script>
  export default {
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/variables";

  .u-user-toggle {
    cursor: pointer;
  }

  .u-user-toggle {
    border: 0 solid rgba(255, 255, 255, .1);
    border-width: 0 1px;
    background-color: $navbar-bg;
    transition: color .3s ease, background-color .3s ease;
    text-decoration: none;
  }

  .u-user-toggle:hover + .dropdown-menu, .dropdown-menu:hover {
    display: block;
    left: inherit;
    right: 1.5rem;
    top: 100%;
    border-top: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>
