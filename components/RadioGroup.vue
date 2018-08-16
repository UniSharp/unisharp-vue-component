<template lang="pug">
  .u-radio-group(:class="{ 'custom-controls-stacked': stacked }")
    u-radio(
      :key="key",
      v-for="(option, key) in options",
      :selected="selected === option.value",
      @change="$emit('change', option.value)"
      :error="error"
    ) {{ option.text }}
    .invalid-feedback.d-block(v-if="error") {{ error }}
</template>

<script>
  export default {
    props: {
      options: {
        type: Array,
        required: true
      },
      selected: {
        default: null
      },
      disabled: {
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
      prop: 'selected',
      event: 'change'
    }
  }
</script>

<style lang="scss">
  .u-radio-group {
    .u-radio {
      .invalid-feedback {
        display: none !important;
      }
    }
  }
</style>
