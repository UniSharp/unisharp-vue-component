<template lang="pug">
  b-container(:fluid="true")
    b-row
      b-col.p-0.sidebar(:class="{ show: sidebarShow }")
        transition(name="fade")
          .sidebar-backdrop(v-if="sidebarShow", @click="sidebarShow = false")
        u-nav
      b-col.p-0.d-flex.flex-column
        u-header
          b-btn.sidebar-toggle(variant="outline-secondary", @click.prevent="sidebarShow = true")
           i.fa.fa-bars
        main
          nuxt
</template>

<script>
  import UNav from '~/components/Nav'
  import UHeader from '~/components/Header'

  export default {
    components: { UNav, UHeader },
    data () {
      return {
        sidebarShow: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/variables";
  @import "node_modules/bootstrap/scss/mixins/breakpoints";

  $sidebar-width: 260px;

  .u-nav, .sidebar-backdrop, .sidebar + * {
    height: 100vh;
  }

  .u-nav {
    background-color: $indigo;
  }

  .u-header {
    background-color: lighten($indigo, 5%);
  }

  main {
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .sidebar {
    @include media-breakpoint-down(md) {
      flex: 0 0 0;

      .sidebar-backdrop, .u-nav {
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
      }

      .sidebar-backdrop {
        &.fade-enter-active, &.fade-leave-active {
          transition: opacity .3s ease;
        }

        &.fade-enter, &.fade-leave-to {
          opacity: 0;
        }

        z-index: 10000;
        background-color: rgba(0, 0, 0, .4);
      }

      .u-nav {
        position: fixed;
        z-index: 10002;
        left: $sidebar-width * -1;
        width: $sidebar-width;
        box-shadow: 0 8px 10px -5px rgba(0, 0, 0, .2), 0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12);
        transition: left .3s cubic-bezier(.25, .8, .5, 1);
      }

      &.show .u-nav {
        left: 0;
      }
    }

    @include media-breakpoint-up(md) {
      flex: 0 0 260px;

      .sidebar-backdrop, + * .sidebar-toggle {
        display: none;
      }
    }
  }
</style>
