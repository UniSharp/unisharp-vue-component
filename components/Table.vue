<template lang="pug">
  .u-table.table-responsive(:style="styleObject.div")
    table.mb-4.table.table-bordered.table-striped.text-center
      thead(:style="styleObject.thead")
        tr
          th(v-if="selection", :style="getCheckboxStyle()")
            u-checkbox(@change="changeCheckAll", :checked="allChecked")
          th(
            :class="{ sortable }",
            v-for="(value, key) in fields",
            :style="getCeilStyle(key)",
            @click="sortColumn(key)"
          )
            | {{ value.label }}
            i.fa.ml-2(:class="{'fa-sort-down': !desc, 'fa-sort-up': desc}", v-if="sortable && order === key")
            i.fa.ml-2(:class="{'fa-sort': true}", v-else-if="sortable")
      tbody(:style="styleObject.tbody")
        template(v-for="(item, i) in rows")
          tr(:key="item.uIndex")
            td(v-if="selection", :style="getCheckboxStyle()")
              u-checkbox(v-model="checks", :value="item.uIndex")
            td(
              v-for="(value, key) in fields",
              :style="getCeilStyle(key)"
            )
              slot(:index="i", :name="key", :value="item", :toggle="toggle(i)")
                | {{ item[key] }}
          slot(name="expand", :value="item", :index="i", :toggle="toggle(i)", v-if="!!toggles[i]")

    u-pagination(
      :total-rows="this.totalRows || filtered.length",
      :per-page="perPage",
      v-model="currentPage",
      @input="this.cleanToggles"
    )
</template>

<script>
  import UCheckbox from './Checkbox'
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
      totalRows: {
        type: Number,
        default: null
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
    data () {
      return {
        checks: [],
        order: this.orderBy,
        desc: this.orderDesc,
        currentPage: 1,
        toggles: []
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
      allChecked () {
        return _.difference(this.rows.map(v => v.uIndex), this.checks).length === 0
      },
      indexed () {
        return this.pured.map((item, index) => {
          item.uIndex = index
          return item
        })
      },
      filtered () {
        let items = this.filter ? _.filter(this.indexed, this.filter) : this.indexed
        this.currentPage = 1
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
        return this.sliced
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
      changeCheckAll (all) {
        let sets = new Set(this.checks)
        this.rows.forEach((item) => all ? sets.add(item.uIndex) : sets.delete(item.uIndex))
        this.checks = Array.from(sets)
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
      showCheckItems () {
        let checked = _.intersection(this.checks, this.rows.map(v => v.uIndex))
        return this.rows.filter((item, index) => {
          return checked.includes(item.uIndex)
        })
      },
      sortColumn (key) {
        if (this.sortable) {
          this.order = key
          this.desc = !this.desc
        }
      },
      cleanToggles () {
        this.toggles.forEach((v, k) => {
          Vue.set(this.toggles, k, false)
        })
      },
      toggle (i) {
        return () => {
          let toggle = !this.toggles[i]
          this.cleanToggles()
          Vue.set(this.toggles, i, toggle)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .sortable {
    cursor: pointer;
  }
</style>
