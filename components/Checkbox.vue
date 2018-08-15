<template lang="pug">
  .u-checkbox.d-inline-flex.flex-column
    label.custom-control.form-check-inline.custom-checkbox
      input.custom-control-input(
        :class="{ 'is-invalid': !!error }"
        type="checkbox",
        :disabled="disabled",
        :required="required",
        ref="check",
        :checked="selected",
        @change="$emit('change', !selected)",
        @focus="$emit('focus')",
        @blur="$emit('blur')",
        @click="$emit('click')"
      )
      span.custom-control-indicator(:class="{ 'is-invalid': !!error }")
      span.custom-control-description(v-if="$slots.default")
        slot
    .invalid-feedback.d-block(v-if="error") {{ error }}
</template>

<script>
  export default {
    model: {
      prop: 'selected',
      event: 'change'
    },
    props: {
      selected: {
        default: true
      },
      disabled: {
        default: false
      },
      required: {
        default: false
      },
      error: {
        type: String
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables";

  .u-checkbox {
    .is-invalid:not(:checked) {
      + .custom-control-indicator {
        background-color: $custom-control-indicator-bg;
      }
    }
  }
</style>
