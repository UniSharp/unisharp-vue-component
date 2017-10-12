<template lang="pug">
  .u-textarea
    textarea.form-control(:class="{ 'is-invalid': !!error }", rows="5") {{ content }}
    .invalid-feedback(v-if="error") {{ error }}
</template>

<script>
  export default {
    props: {
      content: {
        default: null
      },
      error: {
        type: String
      }
    },
    model: {
      prop: 'content'
    }
  }
</script>
