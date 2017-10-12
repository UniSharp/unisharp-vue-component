<template lang="pug">
  .u-input
    input.form-control(:class="{ 'is-invalid': !!error }", type="email", :value="value", @input="$emit('input', $event.target.value)", placeholder="Enter email")
    .invalid-feedback(v-if="error") {{ error }}
</template>

<script>
  export default {
    props: {
      value: String,
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
