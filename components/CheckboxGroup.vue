<template lang="pug">
  .u-checkbox-group(:class="{ 'custom-controls-stacked': stacked }")
    u-checkbox(
      :key="key",
      v-for="(option, key) in options",
      :selected="selected && selected.indexOf(option.value) > -1",
      @change="(thisIsSelected) => updateSelected(thisIsSelected, option)"
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
      stacked: {
        type: Boolean,
        default: false
      },
      error: {
        type: String
      },
      selected: {
        type: Array
      }
    },
    model: {
      prop: 'selected',
      event: 'change'
    },
    methods: {
      updateSelected (thisIsSelected, option) {
        let newSelectedValue = this.selected
        if (thisIsSelected) {
          newSelectedValue.push(option.value)
          newSelectedValue = [...new Set(newSelectedValue)]
        } else {
          newSelectedValue = newSelectedValue.filter(selectedOption => selectedOption !== option.value)
        }
        this.$emit('change', newSelectedValue)
      }
    }
  }
</script>

<style lang="scss">
  .u-checkbox-group {
    .u-checkbox {
      .invalid-feedback {
        display: none !important;
      }
    }
  }
</style>
