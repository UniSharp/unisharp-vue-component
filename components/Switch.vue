<template lang="pug">
  .u-switch(@click="toggleValue", :class="{ disabled }")
    input.d-none(type="checkbox", :name="name", :value="value", :checked="checked")
    .u-switch-control(:class="{ off: !checked }")
      .u-switch-control-on {{ onText }}
      .u-switch-control-toggle
      .u-switch-control-off {{ offText }}
</template>

<script>
  export default {
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      checked: {
        required: true
      },
      value: {
        default: true
      },
      name: {
      },
      disabled: {
        default: false
      },
      required: {
        default: false
      },
      onText: {
        default: 'ON'
      },
      offText: {
        default: 'OFF'
      }
    },
    methods: {
      toggleValue () {
        if (this.disabled) {
          return
        }

        this.$emit('change', !this.checked)
      }
    }
  }
</script>

<style lang="scss">
  @import "~assets/scss/variables";
  @import "node_modules/bootstrap/scss/mixins/border-radius";

  $switch-height: 2.375rem;
  $switch-block-width: 3.75rem;

  .u-switch {
    @include border-radius($input-border-radius);

    height: $switch-height;
    width: $switch-block-width * 2;
    overflow-x: hidden;
    position: relative;
    border: $input-btn-border-width solid $input-border-color;
    cursor: pointer;

    &.disabled {
      cursor: not-allowed;
    }
  }

  .u-switch-control {
    width: $switch-block-width * 3;
    display: flex;
    position: absolute;
    transition: left .5s cubic-bezier(.25, .8, .5, 1);
    left: 0;

    &, * {
      height: 100%;
    }

    &.off {
      left: $switch-block-width * -1;
      margin-left: $input-btn-border-width * -1;
    }

    * {
      width: $switch-block-width;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .u-switch-control-on {
      $bg-color: theme-color("primary");

      @include color-yiq($bg-color);
      @include border-left-radius($input-border-radius);

      background-color: $bg-color;
    }

    .u-switch-control-toggle {
      border-left: $input-btn-border-width solid $input-border-color;
      border-right: $input-btn-border-width solid $input-border-color;
    }
  }
</style>
