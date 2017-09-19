<template lang="pug">
  .u-breadcrumb
    nav.breadcrumb
      nuxt-link.breadcrumb-item(v-for="(item, index) in items.concat(appends).slice(0, -1)", :key="index", :to="item.to") {{ item.text }}
      span.breadcrumb-item.active {{ _.last(items.concat(appends)).text }}
</template>

<script>
  import _ from 'lodash'
  import config from '~/config'
  import menu from '../plugins/menu'

  export default {
    props: {
      items: {
        type: Array,
        default: () => {
          let items = [{ text: config.index.title, to: config.index.to }]

          let active = menu.active()

          if (active) {
            items.push({ text: active.title, to: active.to })
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
