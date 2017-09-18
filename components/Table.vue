<template lang="pug">
  .u-table(:style="styleObject.div")
    table
      thead(:style="styleObject.thead")
        tr
          th(v-if="selection", :style="getCheckboxStyle()")
            u-checkbox(v-model="checkAlls", :value="currentPage", @change="changeCheckAll")
          th(
            :class="{ sortable }",
            v-for="(value, key) in fields",
            :style="getCeilStyle(key)",
            @click="sortColumn(key)"
          )
            | {{ value.label }}
            i.fa(:class="{'fa-sort-down': !desc, 'fa-sort-up': desc}", v-if="order === key")
            i.fa(:class="{'fa-sort': true}", v-else)
      tbody(:style="styleObject.tbody")
        template(v-for="(item, i) in rows")
          tr(:key="item.uIndex")
            td(v-if="selection", :style="getCheckboxStyle()")
              u-checkbox(v-model="checks", :value="item.uIndex", @change="changeCheck")
            td(
              v-for="(value, key) in fields",
              :style="getCeilStyle(key)"
            )
              slot(:index="i", :name="key", :value="item")
                | {{ item[key] }}
          slot(name="expand", :value="item", :index="i")
</template>

<script>
  import UCheckbox from '~/components/Checkbox'
  import Vue from 'vue'
  import AsyncComputed from 'vue-async-computed'
  import _ from 'lodash'

  Vue.use(AsyncComputed)
  export default {
    components: {
      UCheckbox
    },
    props: {
      filter: {},
      items: {
        type: Array,
        default: []
      },
      provider: {
        default: null
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
      width: {
        type: Number,
        default: null
      },
      fiexedFirstColumn: {
        type: Boolean,
        default: false
      },
      selection: {
        type: Boolean,
        default: false
      },
      isCheckAll: {
        type: Boolean,
        default: false
      },
      orderBy: {
        type: String
      },
      orderDesc: {
        type: Boolean,
        default: false
      },
      sortable: {
        type: Boolean,
        default: false
      }
    },
    mounted () {
      Vue.nextTick(() => {
        console.log(this.$slots)
      })
    },
    data () {
      return {
        checkAlls: (this.isCheckAll && this.perPage)
          ? this.arrayRange(Math.ceil(this.items.length / this.perPage)).map(v => v + 1)
          : [1],
        checks: this.isCheckAll ? this.arrayRange(this.items.length) : [],
        order: this.orderBy,
        desc: this.orderDesc
      }
    },
    asyncComputed: {
      pured: {
        get () {
          let info = {
            currentPage: this.currentPage,
            perPage: this.perPage,
            filter: this.filter,
            orderBy: this.order,
            orderDesc: this.desc
          }

          if (this.provider) {
            if (this.provider.hasOwnProperty('then')) {
              return this.provider(info)
            }
            return Promise.resolve(this.provider(info))
          }
          return Promise.resolve(this.items)
        },
        default: []
      }
    },
    computed: {
      filtered () {
        let items = this.filter ? _.filter(this.pured, this.filter) : this.pured
        this.$emit('filtered', items)
        return items
      },
      sorted () {
        return _.orderBy(this.filtered, [this.order], [this.desc ? 'desc' : 'asc'])
      },
      sliced () {
        let start = (this.currentPage - 1) * this.perPage
        let end = start + this.perPage
        return this.perPage ? this.sorted.slice(start, end) : this.sorted
      },
      rows () {
        let items = this.sliced
        items.forEach((item, index) => {
          item.uIndex = index
        })

        return items
      },
      styleObject () {
        let div = {}
        let thead = {}
        let tbody = {}

        if (this.width) {
          div = {
            width: `${this.width}px`,
            'overflow-x': 'scroll',
            'margin-left': this.fields[Object.keys(this.fields)[0]].width,
            'overflow-y': 'visible',
            padding: 0
          }
        }

        if (this.height) {
          thead = {
            float: 'left',
            width: '100%'
          }
          tbody = {
            height: this.height + 'px',
            overflow: 'auto',
            float: 'left',
            width: '100%'
          }
        }

        return {div, thead, tbody}
      }
    },
    methods: {
      changeCheckAll () {
        let checkItems = this.getPageItemIndexes(this.currentPage)
        let checkOrNot = this.checkAlls.indexOf(this.currentPage) > -1
        this.updateChecks(checkItems, checkOrNot)
      },
      changeCheck () {
        let itemIndexes = this.getPageItemIndexes(this.currentPage)
        let isAllItemsCheck = itemIndexes.every((itemIndex) => {
          return this.checks.indexOf(itemIndex) > -1
        })
        let index = this.checkAlls.indexOf(this.currentPage)

        if (isAllItemsCheck && index === -1) {
          this.checkAlls.push(this.currentPage)
        } else if (!isAllItemsCheck && index !== -1) {
          this.checkAlls.splice(index, 1)
        }
      },
      getCheckboxStyle () {
        if (this.width) {
          return {
            position: 'absolute',
            left: 0,
            'border-bottom': 0
          }
        }
      },
      getCeilStyle (key) {
        if (this.width && key === Object.keys(this.fields)[0]) {
          return {
            position: 'absolute',
            width: this.fields[key].width,
            left: this.selection ? '64px' : 0
          }
        }

        if (this.height || this.width) {
          return {
            width: this.fields[key].width || '200px',
            'white-space': 'nowrap'
          }
        }

        return null
      },
      arrayRange (length) {
        return Array.from(Array(length).keys())
      },
      arrayDiff (mainArray, filerArray) {
        return mainArray.filter(x => filerArray.indexOf(x) === -1)
      },
      getPageItemIndexes (page) {
        if (page === undefined) {
          return []
        }

        if (this.perPage === null) {
          return this.arrayRange(this.items.length)
        }

        let indexes = []
        let start = this.perPage * (page - 1)
        let end = (this.perPage * page) < this.items.length ? (this.perPage * page) : this.items.length
        for (let i = start; i < end; i++) {
          indexes.push(i)
        }

        return indexes
      },
      updateChecks (itemIndexes, isSetCheck) {
        if (isSetCheck) {
          itemIndexes.forEach(itemIndex => {
            if (this.checks.indexOf(itemIndex) === -1) {
              this.checks.push(itemIndex)
            }
          })
        } else {
          itemIndexes.forEach(itemIndex => {
            let index = this.checks.indexOf(itemIndex)
            if (index !== -1) {
              this.checks.splice(index, 1)
            }
          })
        }
      },
      showCheckItems () {
        let items = _.orderBy(this.items, [this.order], [this.desc ? 'desc' : 'asc'])
        let itemIndexes = this.getPageItemIndexes(this.currentPage)
        return items.filter((item, index) => {
          return (itemIndexes.indexOf(index) !== -1) && (this.checks.indexOf(index) !== -1)
        })
      },
      sortColumn (key) {
        this.order = key
        this.desc = !this.desc
        // clear all checked items when sort
        this.checks = []
        this.checkAlls = []
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sortable {
    cursor: pointer;

    i {
      margin-left: .25em;
      margin-right: .25em;
    }
  }
</style>
