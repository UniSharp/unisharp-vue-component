<template lang="pug">
  .u-checkbox
    label.custom-control.custom-checkbox
      input.custom-control-input(type="checkbox", :value="value", :checked="checked", :disabled="disabled", :required="required", @change="handleChange")
      span.custom-control-indicator
</template>

<script>
  export default {
    data () {
      return {
        //
      }
    },
    props: {
      value: {
        default: true
      },
      checked: {
        default: false
      },
      disabled: {
        default: false
      },
      required: {
        default: false
      }
    },
    methods: {
      handleChange () {
        //
      }
    }
  }
</script>
