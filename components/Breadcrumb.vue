<template lang="pug">
  .u-breadcrumb
    nav.breadcrumb
      nuxt-link.breadcrumb-item(v-for="(item, index) in items.concat(appends).slice(0, -1)", :key="index", :to="item.to") {{ item.text }}
      span.breadcrumb-item.active {{ _.last(items.concat(appends)).text }}
</template>

<script>
  import _ from 'lodash'
  import config from '~/config'

  export default {
    props: {
      items: {
        type: Array,
        default: () => {
          let items = [{ text: config.index.title, to: config.index.to }]
          let menu = []

          config.menu.forEach(item => {
            if (item.to) {
              menu.push({ text: item.title, to: item.to })
            }

            if (item.children) {
              item.children.forEach(child => menu.push({ text: child.title, to: child.to }))
            }
          })

          let active = _.find(menu, item => (new RegExp(`^${item.to}`)).test(location.pathname))

          if (active) {
            items.push(active)
          }

          return items
        }
      },
      appends: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      _: () => _
    }
  }
</script>
