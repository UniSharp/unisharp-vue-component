<template lang="pug">
  .u-breadcrumb
    nav.breadcrumb
      nuxt-link.breadcrumb-item(
        v-for="(item, index) in (items || defaultItems).concat(appends).slice(0, -1)",
        :key="index",
        :to="item.to"
      ) {{ item.text }}
      span.breadcrumb-item.active {{ _.last((items || defaultItems).concat(appends)).text }}
</template>

<script>
  import _ from 'lodash'
  import config from '~/config'
  import Menu from '../plugins/menu'

  export default {
    props: {
      items: {
        type: Array
      },
      appends: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      _: () => _,
      defaultItems () {
        let items = [{ text: config.index.title, to: config.index.to }]
        let menu = new Menu(config.menu)
        let current = menu.getCurrent(this.$route)

        if (current) {
          items.push({ text: current.title, to: current.to })
        }

        return items
      }
    }
  }
</script>
