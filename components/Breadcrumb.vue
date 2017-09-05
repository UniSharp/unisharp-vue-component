<template lang="pug">
  .u-breadcrumb
    b-breadcrumb.bg-transparent.m-0.p-0(:items="items")
</template>

<script>
  export default {
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
