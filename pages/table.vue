<template lang="pug">
  u-admin
    u-breadcrumb(slot="breadcrumb")
    u-table.table.table-hover(
      ref="table",
      :items="items",
      :fields="fields",
      :per-page="perPage",
      :current-page="currentPage",
      :height="100",
      order-by="last_name"
      selection,
      isCheckAll,
      :filter="filter",
      @filtered="onFiltered"
    )
      template(slot="operation", scope="data")
        button.btn(type="button", @click.stop="showClickButton(data.value.age)") {{ data.value.age }}
    u-pagination(
      :total-rows="totalRows",
      :per-page="perPage",
      v-model="currentPage"
    )
    button.btn.btn-primary(type="button", @click.stop="showCheckItems") Get Checked Items of Current Page
</template>

<script>
  import UAdmin from '~/components/Admin'
  import UBreadcrumb from '~/components/Breadcrumb'
  import UTable from '~/components/Table.vue'
  import UPagination from '~/components/Pagination.vue'

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
        currentPage: 1,
        perPage: 5,
        totalRows: items.length,
        filter: { age: 1 }
      }
    },
    methods: {
      provider (context) {
        console.log(context)
        return [
          { age: 7, first_name: 'Mitzi', last_name: 'Navarro' },
          { age: 8, first_name: 'Genevive', last_name: 'Wilson' }
        ]
      },
      showCheckItems () {
        alert(JSON.stringify(this.$refs.table.showCheckItems()))
      },
      showClickButton (age) {
        alert(age)
        console.log(this.$refs.table.showCheckItems())
      },
      onFiltered (items) {
        // console.log(items)
        this.totalRows = items.length
        this.currentPage = 1
      }
    }
  }
</script>

<style lang="scss" scoped>
  .example {
    padding: 10px;
  }
</style>
