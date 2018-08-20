<template lang="pug">
  .u-radio.d-inline-block
    .custom-control.form-check-inline.custom-radio(@click="$emit('change', true)")
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
      //- span.custom-control-indicator
      label.custom-control-label(v-if="$slots.default")
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
        default: false
      },
      disabled: {
        default: false
      },
      error: {
        type: String
      }
    },
    model: {
      prop: 'selected',
      event: 'change'
    }
  }
</script>
