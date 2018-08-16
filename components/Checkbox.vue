<template lang="pug">
  .u-checkbox.d-inline-block
    label.custom-control.form-check-inline.custom-checkbox
      input.custom-control-input(
        :class="{ 'is-invalid': !!error }"
        type="checkbox",
        :disabled="disabled",
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
      error: {
        type: String
      }
    }
  }
</script>
