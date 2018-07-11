<template lang="pug">
  .u-radio(:class="{ 'custom-controls-stacked': stacked }")
    label.custom-control.form-check-inline.custom-radio(:key="key", v-for="(option, key) in options")
      input.custom-control-input(
        :class="{ 'is-invalid': !!error }"
        type="radio",
        :id="id",
        :name="name",
        :value="option.value",
        :checked="option.value == value",
        :disabled="!!disabled || disabled === ''",
        :required="!!required || required === ''",
        @change="$emit('change', option.value)",
        @focus="$emit('focus', option.value)",
        @blur="$emit('blur', option.value)",
        @click="$emit('click', option.value)"
      )
      span.custom-control-indicator
      span.custom-control-description {{ option.text }}
    .invalid-feedback(v-if="error") {{ error }}
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
        type: Boolean,
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

<style lang="scss" scoped="">
  @import "../assets/scss/variables";

  .u-radio {
    .is-invalid:not(:checked) {
      + .custom-control-indicator {
        background-color: $custom-control-indicator-bg;
      }
    }

    .invalid-feedback {
      display: block;
    }
  }
</style>
