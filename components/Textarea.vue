<template lang="pug">
  .u-textarea
    textarea.form-control(:class="{ 'is-invalid': !!error }", rows="5", @input="$emit('input', $event.target.value)") {{ value }}
    .invalid-feedback(v-if="error") {{ error }}
</template>

<script>
  export default {
    props: {
      value: {
        default: null
      },
      error: {
        type: String
      }
    },
    model: {
      prop: 'value',
      event: 'input'
    }
  }
</script>
