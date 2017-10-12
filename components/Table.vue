<template lang="pug">
  div
    .loading.d-flex.align-items-center.justify-content-center(v-if="isLoading")
      i.fa.fa-spin.fa-refresh.fa-5x
    .u-table.table-responsive
      table.table.table-bordered.table-striped.text-center
        thead(:class="{ 'float-grid': rows }")
          tr
            th(v-if="selection")
              u-checkbox(@change="changeCheckAll", :checked="allChecked")
            th(
              :class="{ sortable }",
              v-for="(value, key) in fields",
              @click="sortColumn(key)"
            )
              | {{ value.label }}
              i.fa.ml-2(:class="sortIcon(key)", v-if="sortable")
        tbody(:class="{ 'float-grid': rows }")
          template(v-for="(item, i) in finalRows")
            tr(:key="item.uIndex")
              td(v-if="selection")
                u-checkbox(v-model="checks", :value="item.uIndex")
              td(v-for="(value, key) in fields")
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
      rows: {
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
        toggles: [],
        hash: _.uniqueId()
      }
    },
    asyncComputed: {
      pured: {
        lazy: true,
        get () {
          this.isLoading = true

          let info = {
            currentPage: this.currentPage,
            perPage: this.perPage,
            filter: this.filter,
            orderBy: this.order,
            orderDesc: this.desc,
            hash: this.hash
          }

          let promise = null
          switch (true) {
            case !!this.provider && !!this.provider.then:
              promise = this.provider(info)
              break
            case !!this.provider:
              promise = Promise.resolve(this.provider(info))
              break
            default:
              promise = Promise.resolve(this.items)
          }

          return promise.then(v => {
            this.isLoading = false
            return v
          })
        },
        default: []
      }
    },
    computed: {
      allChecked () {
        return _.difference(this.finalRows.map(v => v.uIndex), this.checks).length === 0
      },
      indexed () {
        return this.pured.map((item, index) => {
          item.uIndex = index
          return item
        })
      },
      filtered () {
        return this.filter ? _.filter(this.indexed, this.filter) : this.indexed
      },
      sorted () {
        return _.orderBy(this.filtered, [this.order], [this.desc ? 'desc' : 'asc'])
      },
      paged () {
        // Pagination is done in provider. Nothing to do here.
        return this.sorted
      },
      finalRows () {
        return this.paged
      }
    },
    methods: {
      sortIcon (key) {
        if (this.order !== key) {
          return 'fa-sort'
        }

        if (this.desc) {
          return 'fa-sort-down'
        }

        return 'fa-sort-up'
      },
      changeCheckAll (all) {
        let sets = new Set(this.checks)
        this.finalRows.forEach((item) => all ? sets.add(item.uIndex) : sets.delete(item.uIndex))
        this.checks = Array.from(sets)
      },
      showCheckItems () {
        let checked = _.intersection(this.checks, this.finalRows.map(v => v.uIndex))
        return this.finalRows.filter((item, index) => {
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
      },
      refresh () {
        this.hash = _.uniqueId()
        this.checks.splice(0, this.checks.length)
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
