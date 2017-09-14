<template lang="pug">
  .u-radio.col-form-label(:class="{ 'custom-controls-stacked': stacked !== undefined }")
    label.custom-control.form-check-inline.custom-radio(:key="key", v-for="(option, key) in options")
      input.custom-control-input(
        type="radio",
        :id="id",
        :name="name",
        :value="option.value",
        :checked="option.value == value",
        :disabled="disabled ? disabled : option.disabled",
        :required="required",
        @change="$emit('change', option.value)",
        @focus="$emit('focus', option.value)",
        @blur="$emit('blur', option.value)",
        @click="$emit('click', option.value)"
      )
      span.custom-control-indicator
      span.custom-control-description {{ option.text }}
</template>

<script>
  export default {
    props: {
      options: {
        type: Array,
        required: true
      },
      id: {
        default: null
      },
      name: {
        default: null
      },
      value: {
        default: null
      },
      disabled: {
        default: false
      },
      required: {
        default: false
      },
      stacked: {
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    }
  }
</script>
