<template lang="pug">
  u-login(@submit="onSubmit", :errors="errors", :loading="loading", :powerBy="powerBy")
</template>

<script>
  export default {
    data () {
      return {
        loading: false,
        errors: {
          username: null,
          password: null
        }
      }
    },
    methods: {
      onSubmit (form) {
        this.loading = true
        this.errors.username = null
        this.errors.password = null

        setTimeout(() => {
          this.loading = false
          this.errors.username = 'Whoops!'
          this.errors.password = 'Looks like something went wrong.'
        }, 2000)
      }
    }
  }
</script>
