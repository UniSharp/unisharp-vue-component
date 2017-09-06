<template lang="pug">
  .u-switch
    input(type='checkbox').d-none
    .switch
      .on.bg-primary.text-center ON
      .toggle.bg-default
      .off.bg-default.text-center OFF
</template>

<style lang="scss">
  $height: 38px;
  $width: $height * 1.5;
  $border-width: 1px;
  $border-color: rgba(77, 83, 94, .15);
  $input-btn-padding-y: 6px;
  $input-btn-padding-x: 12px;
  $font-size: 16px;

  @mixin with-words() {
    padding: $input-btn-padding-y $input-btn-padding-x;
    font-size: $font-size;
  }

  .u-switch {
    height: $height;
    width: $width * 2;
    overflow-x: hidden;
    position: relative;
    border-radius: 5px;
    border: $border-width solid $border-color;
  }

  .switch {
    height: $height;
    width: $width * 3;
    display: flex;
    position: absolute;
    transition: all .7s;
    left: 0;
  }

  .switch:hover {
    left: - $width - $border-width;
  }

  .on {
    height: $height;
    width: $width;

    @include with-words();
  }

  .toggle {
    height: $height;
    width: $width;
    border-left: $border-width solid $border-color;
    border-right: $border-width solid $border-color;
  }

  .off {
    height: $height;
    width: $width;

    @include with-words();
  }
</style>

<script>
  export default {
    name: 'u-switch',
    data () {
      return {
        //
      }
    },
    props: {
      value: {
        default: true
      },
      checked: {
        default: false
      },
      disabled: {
        default: false
      },
      required: {
        default: false
      }
    },
    methods: {
      handleChange () {
        //
      }
    }
  }
</script>
