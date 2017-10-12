<template lang="pug">
  .alert(role="alert", :class="className")
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
