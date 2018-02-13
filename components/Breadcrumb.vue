<template lang="pug">
  .u-breadcrumb
    nav.breadcrumb
      nuxt-link.breadcrumb-item(
        v-for="(item, index) in (items || defaultItems).concat(appends).slice(0, -1)",
        :key="index",
        :to="item.to"
      ) {{ item.text }}
      span.breadcrumb-item.active(v-if="_.last((items || defaultItems).concat(appends))") {{ _.last((items || defaultItems).concat(appends)).text }}
</template>

<script>
  import _ from 'lodash'
  import config, { createMenu } from '~/config'
  import Menu from '../plugins/Menu'
  import Vue from 'vue'
  import VueAsyncAsyncComputed from 'vue-async-computed'

  Vue.use(VueAsyncAsyncComputed)

  export default {
    props: {
      items: {
        type: Array,
        default: () => []
      },
      appends: {
        type: Array,
        default: () => []
      }
    },
    asyncComputed: {
      async defaultItems () {
        console.log(typeof createMenu)
        let items = [{ text: config.index.title, to: config.index.to }]
        let menu = new Menu(await createMenu(this.$store))
        let current = menu.getCurrent(this.$route)

        if (current) {
          items.push({ text: current.title, to: current.to })
        }

        return items
      }
    },
    computed: {
      _: () => _
    }
  }
</script>
