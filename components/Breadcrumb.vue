<template lang="pug">
  .u-breadcrumb
    nav.breadcrumb.bg-transparent.m-0.p-0
      nuxt-link.breadcrumb-item(v-for='(item, index) in items' v-if='!item.active' :key='index' :to='item.href') {{ item.text }}
      span.breadcrumb-item.active(v-if='activeItem') {{ activeItem.text }}
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
    },
    computed: {
      activeItem () {
        return this.items.find((item) => { return item.active })
      }
    }
  }
</script>
