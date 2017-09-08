<template lang="pug">
  .u-user-dropdown(:class="{ active }")
    .u-user-dropdown-backdrop(@click="active = false")
    button.btn.btn-link.d-flex.align-items-center.h-100.px-4.u-user-toggle(@click.prevent="active = true")
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
    data () {
      return {
        active: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/variables";

  .u-user-dropdown-backdrop {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 10000;

    .active & {
      display: block;
    }
  }

  .u-user-toggle {
    cursor: pointer;
    border: 0 solid rgba(255, 255, 255, .1);
    border-width: 0 1px;
    background-color: $navbar-bg;
    transition: color .3s ease, background-color .3s ease;
    text-decoration: none;

    &:hover, .active & {
      background-color: $sidebar-bg;
    }
  }

  .dropdown-menu {
    left: inherit;
    right: 1.5rem;
    top: 100%;
    border-top: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    display: block;
    z-index: -1;
    opacity: 0;
    transition: opacity .3s ease;

    a {
      transform: translateY(-10px);
      transition: transform .3s cubic-bezier(.25, .8, .5, 1);
    }

    .active & {
      z-index: 10002;
      opacity: 1;

      a {
        transform: translateY(0);
      }
    }
  }
</style>
