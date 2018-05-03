<template lang="pug">
  .u-breadcrumb
    nav.breadcrumb
      nuxt-link.breadcrumb-item(
        v-for="(item, index) in breadcrumbs.concat(appends).slice(0, -1)",
        :key="index",
        :to="item.to"
      ) {{ item.text }}
      span.breadcrumb-item.active(v-if="_.last(breadcrumbs.concat(appends))") {{ _.last(breadcrumbs.concat(appends)).text }}
</template>

<script>
  import _ from 'lodash'
  import config from '~/config'
  import Vue from 'vue'
  import VueAsyncAsyncComputed from 'vue-async-computed'

  Vue.use(VueAsyncAsyncComputed)

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
    asyncComputed: {
      defaultItems: {
        default: [],
        async get () {
          let items = [{ text: config.index.title, to: config.index.to }]
          let menu = this.$store.dispatch('menu/getMenu')
          let current = menu.getCurrent(this.$route)

          if (current) {
            items.push({ text: current.title, to: current.to })
          }

          return items
        }
      }
    },
    computed: {
      _: () => _,
      breadcrumbs () {
        return this.items != null && this.items.length ? this.items : this.defaultItems
      }
    }
  }
</script>
