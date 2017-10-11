<template lang="pug">
  .u-table.table-responsive
    .loading.d-flex.align-items-center.justify-content-center(v-if="isLoading")
      i.fa.fa-spin.fa-refresh.fa-5x
    table.mb-4.table.table-bordered.table-striped.text-center
      thead(:class="{ 'float-grid': height }")
        tr
          th(:style="getCeilStyle(-1)", v-if="selection")
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
      tbody(:class="{ 'float-grid': height }", :style="heightWithRows")
        template(v-for="(item, i) in rows")
          tr(:key="item.uIndex")
            td(:style="getCeilStyle(-1)", v-if="selection")
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
        default: () => []
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
        isLoading: true,
        pxPerRow: 60,
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
          this.isLoading = true

          let info = {
            currentPage: this.currentPage,
            perPage: this.perPage,
            filter: this.filter,
            orderBy: this.order,
            orderDesc: this.desc
          }

          if (this.provider) {
            if (this.provider.hasOwnProperty('then')) {
              return this.provider(info).then(() => {
                this.isLoading = false
              })
            }
            this.isLoading = false
            return Promise.resolve(this.provider(info))
          }
          this.isLoading = false
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
        return items
      },
      sorted () {
        return _.orderBy(this.filtered, [this.order], [this.desc ? 'desc' : 'asc'])
      },
      paged () {
        // Pagination is done in provider. Nothing to do here.
        return this.sorted
      },
      rows () {
        return this.paged
      },
      heightWithRows () {
        if (this.height) {
          if (this.rows.length >= this.height) {
            var rowsToShow = this.height
            if (this.rows.length > this.height) {
              rowsToShow += 0.5
            }
            return {
              height: rowsToShow * this.pxPerRow + 'px',
              overflow: 'auto'
            }
          }
        }
      }
    },
    methods: {
      changeCheckAll (all) {
        let sets = new Set(this.checks)
        this.rows.forEach((item) => all ? sets.add(item.uIndex) : sets.delete(item.uIndex))
        this.checks = Array.from(sets)
      },
      getCeilStyle (key) {
        var style = {
          'white-space': 'nowrap'
        }
        if (this.fields[key] && this.fields[key].width) {
          style['width'] = this.fields[key].width
        } else {
          style['max-width'] = '200px'
          style['min-width'] = '200px'
        }
        return style
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

  .loading {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    // background-color: black;
    // opacity: .3;
    z-index: 3;
  }

  .float-grid {
    float: left;
    width: 100%;
  }
</style>
