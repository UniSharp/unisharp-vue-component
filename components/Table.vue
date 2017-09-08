<template lang="pug">
  table
    thead(:style="styleObject.thead")
      tr
        th(v-if="selection")
          u-checkbox(v-model="checkAlls", :value="currentPage", @change="changeCheckAll")
        th(
          class="{ sortable }",
          v-for="(value, key) in fields",
          :style="getCeilWidth(key)",
          @click="order = key; desc = !desc"
        )
          | {{ value.label }}
          i.fa(:class="{'fa-angle-down': !desc, 'fa-angle-up': desc}", v-if="order === key")
    tbody(:style="styleObject.tbody")
      tr(v-for="(item, i) in rows", :key="item.uIndex")
        td(v-if="selection")
          u-checkbox(v-model="checks", :value="i", @change="changeCheck")
        td(
          v-for="(value, key) in fields",
          :style="getCeilWidth(key)"
        )
          slot(:index="i", :name="key", value="value")
            | {{ item[key] }}
</template>

<script>
  import UCheckbox from '~/components/Checkbox'
  import _ from 'lodash'

  export default {
    components: {
      UCheckbox
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
        checkAlls: this.isCheckAll
          ? this.arrayRange(Math.ceil(this.items.length / this.perPage)).map(v => v + 1)
          : [],
        checks: this.isCheckAll ? this.arrayRange(this.items.length) : [],
        order: this.orderBy,
        desc: this.orderDesc
      }
    },
    computed: {
      rows () {
        let items = _.orderBy(this.items, [this.order], [this.desc ? 'desc' : 'asc'])
        if (this.perPage) {
          let start = (this.currentPage - 1) * this.perPage
          let end = start + this.perPage
          items = items.slice(start, end)
        }

        return items
      },
      styleObject () {
        let thead = {}
        let tbody = {}

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

        return {thead, tbody}
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
      getCeilWidth (key) {
        return this.height
          ? { width: this.fields[key].width || '30%' }
          : null
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

        let indexes = []
        let i = this.perPage * (page - 1)
        let length = (this.perPage * page) < this.items.length ? (this.perPage * page) : this.items.length
        for (; i < length; i++) {
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
      }
    }
  }
</script>

<style lang="scss" scoped>

  table {
    width: 100%;

    tbody {
      overflow: auto;
      height: 100%;
    }
  }

  .sortable {
    cursor: pointer;

    i {
      margin-left: .25em;
      margin-right: .25em;
    }
  }
</style>
