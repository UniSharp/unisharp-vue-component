<template lang="pug">
  .u-radio.d-inline-block
    label.custom-control.form-check-inline.custom-radio
      input.custom-control-input(
        :class="{ 'is-invalid': !!error }"
        type="radio",
        :name="name",
        :checked="selected",
        :disabled="!!disabled || disabled === ''",
        @change="value => $emit('change', value)",
        @focus="$emit('focus')",
        @blur="$emit('blur')",
        @click="$emit('click')"
      )
      span.custom-control-indicator
      span.custom-control-description(v-if="$slots.default")
        slot
    .invalid-feedback.d-block(v-if="error") {{ error }}
</template>

<script>
  export default {
    props: {
      name: {
        default: null
      },
      selected: {
        default: null
      },
      disabled: {
        default: false
      },
      error: {
        type: String
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    }
  }
</script>
