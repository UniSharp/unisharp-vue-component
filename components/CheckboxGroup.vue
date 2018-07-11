<template lang="pug">
  .u-checkbox-group(:class="{ 'custom-controls-stacked': stacked }")
    u-checkbox(
      :key="key",
      v-for="(option, key) in options",
      v-model="checked",
      :value="option.value",
      :error="error"
    ) {{ option.text }}
    .invalid-feedback(v-if="error") {{ error }}
</template>

<script>
  export default {
    props: {
      options: {
        type: Array,
        required: true
      },
      stacked: {
        type: Boolean,
        default: false
      },
      error: {
        type: String
      },
      vModel: {
      }
    },
    model: {
      prop: 'vModel',
      event: 'change'
    },
    data () {
      return {
        checked: this.vModel
      }
    },
    watch: {
      vModel (value) {
        this.checked = value
      },
      checked (value) {
        this.$emit('change', value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .u-checkbox-group {
    .invalid-feedback {
      display: block;
    }
  }
</style>

<style lang="scss">
  .u-checkbox-group {
    .u-checkbox {
      .invalid-feedback {
        display: none !important;
      }
    }
  }
</style>
