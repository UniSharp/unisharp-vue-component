<template lang="pug">
  table
    thead
      tr
        th
          u-checkbox(v-model="checkAlls", :value="currentPage")
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
      isCheckAll: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        checkAlls: this.isCheckAll
          ? this._arrayRange(Math.ceil(this.items.length / this.perPage)).map(v => v + 1)
          : [],
        checks: this.isCheckAll ? this._arrayRange(this.items.length) : []
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
      }
    },
    watch: {
      checkAlls (newValue, oldValue) {
        let removePage = this._arrayDiff(oldValue, newValue)[0]
        let addPage = this._arrayDiff(newValue, oldValue)[0]
        let checkItems = this._getPageItemIndexes(addPage)
        let uncheckItems = this._getPageItemIndexes(removePage)
        this._updateChecks(checkItems, true)
        this._updateChecks(uncheckItems, false)
      }
    },
    methods: {
      _arrayRange (length) {
        return Array.from(Array(length).keys())
      },
      _arrayDiff (mainArray, filerArray) {
        return mainArray.filter(x => filerArray.indexOf(x) === -1)
      },
      _getPageItemIndexes (page) {
        if (page === undefined) {
          return []
        }

        let indexes = []
        for (let i = this.perPage * (page - 1); i < this.perPage * page; i++) {
          indexes.push(i)
        }

        return indexes
      },
      _updateChecks (itemIndexes, isSetCheck) {
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

<style lang="scss">
  table {
    width: 100%;

    tbody {
      overflow: auto;
      height: 100%;
    }
  }
</style>
