<template lang="pug">
  .u-dropdown(:class="{ active }")
    .u-dropdown-backdrop(v-if="active && !disabled", @click="hide")
    .u-dropdown-toggle(@click.prevent="show")
      slot(name="toggle")
    transition(name="fade")
      slot(v-if="active && !disabled")
</template>

<script>
  export default {
    props: ['disabled'],
    data () {
      return {
        active: false
      }
    },
    methods: {
      show () {
        this.active = true

        this.$emit('show')
      },
      hide () {
        this.active = false

        this.$emit('hide')
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
    position: relative;

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
  @import "../assets/scss/mixins";

  .u-dropdown-backdrop {
    @include backdrop;

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
