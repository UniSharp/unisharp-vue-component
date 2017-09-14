<template lang="pug">
  .u-dropdown(:class="{ active }")
    .u-dropdown-backdrop(@click="active = false")
    .u-dropdown-toggle(@click.prevent="active = true")
      slot(name="toggle")
    slot
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

<style lang="scss" scoped>
  .u-dropdown-backdrop {
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

  .u-dropdown-toggle {
    cursor: pointer;
    height: 100%;
  }

  .dropdown-menu {
    margin: 0;
    left: inherit;
    top: 100%;
    display: block;
    opacity: 0;
    transition: opacity .3s ease;

    .dropdown-item {
      transform: translateY(-10px);
      transition: transform .3s cubic-bezier(.25, .8, .5, 1);
    }

    .active & {
      z-index: 10002;
      opacity: 1;

      .dropdown-item {
        transform: translateY(0);
      }
    }
  }
</style>
