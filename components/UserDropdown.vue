<template lang="pug">
  u-dropdown.u-user-dropdown
    button.btn.btn-link.d-flex.align-items-center.h-100.px-4.u-user-toggle(slot="toggle")
      i.fa.fa-user.mr-2(aria-hidden="true")
      | {{ username }}
      i.fa.fa-caret-down.ml-2(aria-hidden="true")
    .dropdown-menu
      slot
</template>

<script>
  export default {
    computed: {
      username () {
        try {
          return this.$store.state.user.getters.username || 'User'
        } catch (e) {
          return 'User'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables";
  @import "node_modules/bootstrap/scss/mixins/transition";

  .u-user-dropdown {
    button {
      font-size: $font-size-sm;
    }
  }

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
