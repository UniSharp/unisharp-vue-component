<template lang="pug">
  u-admin
    u-breadcrumb(slot="breadcrumb")
    form
      .form-group.row
        label.col-md-1.col-form-label Filter：
        .col-md-2
          input.form-control.pull-left(type='text', placeholder='Type to filter', v-model="filterText")
    u-table.table.table-hover(
      ref="table",
      :items="items",
      :fields="fields",
      :per-page="perPage",
      :current-page="currentPage",
      order-by="last_name"
      selection,
      isCheckAll,
      :filter="filter",
      @filtered="onFiltered"
    )
      template(slot="hiddenRow", scope="data")
        tr(v-show="data.index === detail")
          | hi
      template(slot="operation", scope="data")
        button.btn.mr-1(type="button", @click.stop="detail=data.index") 展開
        button.btn(type="button", @click.stop="showClickButton(data.value.age)") alert
    u-pagination(
      :total-rows="totalRows",
      :per-page="perPage",
      v-model="currentPage"
    )
    button.btn.btn-primary(type="button", @click.stop="showCheckItems") Get Checked Items of Current Page
</template>

<script>
  // import _ from 'lodash'
  import UAdmin from '~/components/Admin'
  import UBreadcrumb from '~/components/Breadcrumb'
  import UTable from '~/components/Table.vue'
  import UPagination from '~/components/Pagination.vue'
  import axios from 'axios'

  let items = [
    { age: 1, first_name: 'Dickerson', last_name: 'Macdonald' },
    { age: 2, first_name: 'Larsen', last_name: 'Shaw' },
    { age: 3, first_name: 'Geneva', last_name: 'Wilson' },
    { age: 4, first_name: 'Jami', last_name: 'Carney' },
    { age: 5, first_name: 'Essie', last_name: 'Dunlap' },
    { age: 6, first_name: 'Thor', last_name: 'Macdonald' },
    { age: 7, first_name: 'Mitzi', last_name: 'Navarro' },
    { age: 8, first_name: 'Genevive', last_name: 'Wilson' },
    { age: 9, first_name: 'John', last_name: 'Carney' },
    { age: 10, first_name: 'Dick', last_name: 'Dunlap' },
    { age: 11, first_name: 'Dickerson', last_name: 'Macdonald' },
    { age: 12, first_name: 'Larsen', last_name: 'Shaw' },
    { age: 13, first_name: 'Genevive', last_name: 'Wilson' },
    { age: 14, first_name: 'John', last_name: 'Carney' },
    { age: 15, first_name: 'Dick', last_name: 'Dunlap' },
    { age: 16, first_name: 'Dickerson', last_name: 'Macdonald' },
    { age: 17, first_name: 'Larsen', last_name: 'Shaw' }
  ]

  export default {
    components: {
      UTable,
      UPagination,
      UAdmin,
      UBreadcrumb
    },
    data () {
      return {
        items: items,
        filterText: '',
        fields: {
          last_name: {
            label: 'Person last name',
            width: '30%'
          },
          first_name: {
            label: 'Person first name',
            width: '30%'
          },
          age: {
            label: 'Person age'
          },
          operation: {
            label: '操作'
          }
        },
        detail: null,
        currentPage: 1,
        perPage: 5,
        totalRows: items.length
      }
    },
    methods: {
      provider (context) {
        return new Promise((resolve, reject) => {
          axios.get('https://beta.json-generator.com/api/json/get/4yxjYQ79X').then(res => {
            resolve(res.data)
          })
        })
      },
      showCheckItems () {
        alert(JSON.stringify(this.$refs.table.showCheckItems()))
      },
      showClickButton (age) {
        alert(age)
        console.log(this.$refs.table.showCheckItems())
      },
      onFiltered (items) {
        this.totalRows = items.length
        this.currentPage = 1
      },
      filter (item) {
        return item.last_name.indexOf(this.filterText) !== -1
      }
    }
  }
</script>

<style lang="scss" scoped>
  .example {
    padding: 10px;
  }
</style>
