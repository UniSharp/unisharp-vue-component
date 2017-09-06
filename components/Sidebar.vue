<template lang="pug">
  .u-sidebar(:class="{ show: shown }")
    transition(name="fade")
      .u-sidebar-backdrop(v-if="shown", @click="shown = false")
    .u-sidebar-content.d-flex.flex-column
      .u-sidebar-header.d-flex.align-items-center.justify-content-center
        slot(name="header")
      .u-sidebar-body
        slot
</template>

<script>
  export default {
    data () {
      return {
        shown: false
      }
    },
    methods: {
      show () {
        this.shown = true
      },
      hide () {
        this.shown = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/variables";
  @import "node_modules/bootstrap/scss/mixins/breakpoints";

  .u-sidebar {
    .u-sidebar-content {
      height: 100vh;
      background-color: $sidebar-bg;

      .u-sidebar-header {
        height: 92px;
      }

      .u-sidebar-body {
        overflow-x: hidden;
        overflow-y: scroll;
      }
    }

    @include media-breakpoint-down(md) {
      flex: 0 0 0;

      .u-sidebar-backdrop, .u-sidebar-content {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
      }

      .u-sidebar-backdrop {
        width: 100%;
        z-index: 10000;
        background-color: rgba(0, 0, 0, .4);

        &.fade-enter-active, &.fade-leave-active {
          transition: opacity .3s ease;
        }

        &.fade-enter, &.fade-leave-to {
          opacity: 0;
        }
      }

      .u-sidebar-content {
        z-index: 10002;
        left: $sidebar-width * -1;
        width: $sidebar-width;
        box-shadow: 0 8px 10px -5px rgba(0, 0, 0, .2), 0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12);
        transition: left .3s cubic-bezier(.25, .8, .5, 1);
      }

      &.show .u-sidebar-content {
        left: 0;
      }
    }

    @include media-breakpoint-up(lg) {
      flex: 0 0 260px;

      .u-sidebar-backdrop {
        display: none;
      }
    }
  }
</style>
