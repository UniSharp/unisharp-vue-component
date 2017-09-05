<template lang="pug">
  .u-breadcrumb
    b-breadcrumb(:items="items")
</template>

<script>
  export default {
    mounted: function () {
      console.log(this.items)
    },
    data () {
      return {
        items: [{
          text: 'Admin',
          href: '#'
        }, {
          text: 'Manage',
          href: '#'
        }, {
          text: 'Library',
          active: true
        }]
      }
    }
  }
</script>

<style>

</style>
