<template lang="pug">
  .u-checkbox.d-inline-block
    .custom-control.form-check-inline.custom-checkbox(@click="$emit('change', !selected)")
      input.custom-control-input(
        :class="{ 'is-invalid': !!error }"
        type="checkbox",
        ref="check",
        :checked="selected",
        :disabled="disabled",
        @change="$emit('change', !selected)",
        @focus="$emit('focus')",
        @blur="$emit('blur')",
        @click="$emit('click')"
      )
      //- span.custom-control-indicator(:class="{ 'is-invalid': !!error }")
      label.custom-control-label(v-if="$slots.default")
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
