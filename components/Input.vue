<template lang="pug">
  .u-input
    input.form-control(type="email", :value="value", placeholder="Enter email", :class="{ 'is-invalid': !!error }")
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
      prop: 'value'
    }
  }
</script>
