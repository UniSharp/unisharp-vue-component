<template lang="pug">
  u-admin
    u-breadcrumb(slot="breadcrumb")
    u-table.table.table-hover(
      :items="items",
      :fields="fields",
      :per-page="perPage",
      :current-page="currentPage",
      :height="100",
      selection,
      isCheckAll
    )
      template(slot="operation")
        button
    u-pagination(
      :total-rows="totalRows",
      :per-page="perPage",
      v-model="currentPage"
    )
</template>

<script>
  import UAdmin from '~/components/Admin'
  import UBreadcrumb from '~/components/Breadcrumb'
  import UTable from '~/components/Table.vue'
  import UPagination from '~/components/Pagination.vue'

  const items = [
    { isActive: true, age: 1, first_name: 'Dickerson', last_name: 'Macdonald', button: 'button' },
    { isActive: false, age: 2, first_name: 'Larsen', last_name: 'Shaw' },
    { isActive: false, age: 3, first_name: 'Geneva', last_name: 'Wilson' },
    { isActive: true, age: 4, first_name: 'Jami', last_name: 'Carney' },
    { isActive: false, age: 5, first_name: 'Essie', last_name: 'Dunlap' },
    { isActive: true, age: 6, first_name: 'Thor', last_name: 'Macdonald' },
    { isActive: false, age: 7, first_name: 'Mitzi', last_name: 'Navarro' },
    { isActive: false, age: 8, first_name: 'Genevive', last_name: 'Wilson' },
    { isActive: true, age: 9, first_name: 'John', last_name: 'Carney' },
    { isAactive: false, age: 10, first_name: 'Dick', last_name: 'Dunlap' },
    { isActive: true, age: 11, first_name: 'Dickerson', last_name: 'Macdonald' },
    { isActive: false, age: 12, first_name: 'Larsen', last_name: 'Shaw' },
    { isActive: false, age: 13, first_name: 'Genevive', last_name: 'Wilson' },
    { isActive: true, age: 14, first_name: 'John', last_name: 'Carney' },
    { isAactive: false, age: 15, first_name: 'Dick', last_name: 'Dunlap' },
    { isActive: true, age: 16, first_name: 'Dickerson', last_name: 'Macdonald' },
    { isActive: false, age: 17, first_name: 'Larsen', last_name: 'Shaw' },
    { isActive: false, age: 18, first_name: 'Geneva', last_name: 'Wilson' },
    { isActive: true, age: 19, first_name: 'Dickerson', last_name: 'Macdonald' },
    { isActive: false, age: 20, first_name: 'Larsen', last_name: 'Shaw' },
    { isActive: false, age: 21, first_name: 'Geneva', last_name: 'Wilson' }
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
            // label: 'Person last name'
            label: 'Person last name',
            width: '30%'
          },
          first_name: {
            // label: 'Person first name'
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
        perPage: 10,
        totalRows: items.length
      }
    }
  }
</script>

<style lang="scss" scoped>
  .example {
    padding: 10px;
  }
</style>
