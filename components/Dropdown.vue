<template lang="pug">
  .u-dropdown(:class="{ active }")
    .u-dropdown-backdrop(v-if="active", @click="active = false")
    .u-dropdown-toggle(@click.prevent="active = true")
      slot(name="toggle")
    transition(name="fade")
      slot(v-if="active")
</template>

<script>
  export default {
    data () {
      return {
        active: false
      }
    },
    methods: {
      show () {
        this.active = true
      },
      hide () {
        this.active = false
      },
      toggle () {
        this.active = !this.active
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/scss/variables";
  @import "node_modules/bootstrap/scss/mixins/transition";

  .u-dropdown {
    .dropdown-menu.fade-enter-active, .dropdown-menu.fade-leave-active {
      @include transition($transition-fade);

      .dropdown-item {
        @include transition($transition-slide);
      }
    }

    .dropdown-menu.fade-enter, .dropdown-menu.fade-leave-to {
      opacity: 0;

      .dropdown-item {
        transform: translateY(-10px);
      }
    }
  }
</style>

<style lang="scss" scoped>
  .u-dropdown-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 10000;
  }

  .u-dropdown-toggle {
    cursor: pointer;
    height: 100%;
  }

  .dropdown-menu {
    margin: 0;
    left: inherit;
    top: 100%;
    display: block;
    z-index: 10002;
  }
</style>
