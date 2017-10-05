<template lang="pug">
  .alert.alert-success(role="alert")
    slot
      | {{message}}
</template>
<script>
  export default {
    props: {
      type: {
        type: String
      }
    },
    computed: {
      className () {
        return `alert-${this.type}`
      },
      message () {
        switch (this.type) {
          case 'success':
            return 'Success'
          case 'danger':
            return 'Failed'
          case 'info':
            return 'Information'
        }
      }
    }
  }
</script>
