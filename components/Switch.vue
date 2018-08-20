<template lang="pug">
  .u-switch
    .switch(@click="toggleValue", :class="{ disabled: !!disabled || disabled === '', 'is-invalid': !!error }")
      input.d-none(type="checkbox", :checked="checked")
      .u-switch-control(:class="{ off: !checked }")
        .u-switch-control-on
          slot(name="on", v-if="$slots.on")
          span(v-else) ON
        .u-switch-control-toggle.border-right.border-left
        .u-switch-control-off
          slot(name="off", v-if="$slots.off")
          span(v-else) OFF
    .invalid-feedback(v-if="error") {{ error }}
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
      disabled: {
        default: false
      },
      error: {
        type: String
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
  @import "../assets/scss/variables";
  @import "node_modules/bootstrap/scss/mixins/transition";
  @import "node_modules/bootstrap/scss/mixins/border-radius";

  $switch-height: 2.375rem;
  $switch-block-width: 3.75rem;

  .switch {
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

    &.is-invalid {
      border-color: $form-feedback-invalid-color !important;

      &:hover {
        box-shadow: $btn-invalid-box-shadow;
      }

      + .invalid-feedback {
        display: block;
      }
    }
  }

  .u-switch-control {
    @include transition($transition-slide);

    width: $switch-block-width * 3;
    display: flex;
    position: absolute;
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

      // @include color-yiq($bg-color);
      @include border-left-radius(calc(#{$input-border-radius} - #{$input-btn-border-width}));

      background-color: $bg-color;
    }
  }
</style>
