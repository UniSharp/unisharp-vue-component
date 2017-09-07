<template lang="pug">
  table
    thead
      tr
        th
          u-checkbox(v-model="isCheckAll", :value="true")
        th(v-for="(value, key) in fields") {{ value.label }}
    tbody(:style="{ height: height + 'px' }")
      tr(v-for="item in computedItems", :key="item.uIndex")
        td
          u-checkbox(v-model="checks", :value="item.uIndex")
        td(v-for="(value, key) in fields") {{ item[key] }}
</template>

<script>
  import UCheckbox from '~/components/Checkbox'

  export default {
    components: {
      'u-checkbox': UCheckbox
    },
    props: {
      items: {
        type: Array,
        default: []
      },
      fields: {
        type: Object,
        default: null
      },
      perPage: {
        type: Number,
        default: null
      },
      currentPage: {
        type: Number,
        default: 1
      },
      height: {
        type: Number,
        default: null
      },
      fiexedFirstColumn: {
        type: Boolean,
        default: false
      },
      checkAll: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        isCheckAll: this.checkAll
      }
    },
    computed: {
      computedItems () {
        let items = this.items

        if (this.perPage) {
          let start = (this.currentPage - 1) * this.perPage
          let end = start + this.perPage
          items = items.slice(start, end)
          items.forEach((item, index) => {
            item.uIndex = start + index
          })
        }

        return items
      },
      checks: {
        get () {
          return this.isCheckAll ? Array.from(Array(this.items.length).keys()) : []
        },
        set () {
        }
      }
    },
    watch: {
      checks (v) {
        console.log(v)
      }
    }
  }
</script>

<style lang="scss">
  table {
    width: 100%;

    tbody {
      overflow: auto;
      height: 100%;
    }
  }
</style>
