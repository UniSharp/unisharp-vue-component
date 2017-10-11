<template lang="pug">
  .u-input
    input.form-control(type="email", v-model="form.email", placeholder="Enter email", :class="{ 'is-invalid': !!error }")
    .invalid-feedback(v-if="error") {{ error }}
</template>

<script>
  export default {
    props: {
      error: {
        type: String
      }
    }
  }
</script>
