<template lang="pug">
  u-admin
    u-table(:fields="fields", :items="items", :hidePagination="true")

    md.form-control.my-3.
      ```
      template.
        u-table(:fields="fields", :items="items", :hidePagination="true")

      script.
        export default {
          data () {
            return {
              fields: {
                last_name: {
                  label: 'Last name'
                },
                first_name: {
                  label: 'First Name'
                },
                level: {
                  label: 'Department Level'
                },
                operation: {
                  label: 'Operation'
                }
              },
              items: [
                { id: 1, level: 1, first_name: 'Dickerson', last_name: 'Macdonald' },
                { id: 2, level: 1, first_name: 'Larsen', last_name: 'Shaw' },
                { id: 3, level: 1, first_name: 'Geneva', last_name: 'Wilson' },
                { id: 4, level: 2, first_name: 'Jami', last_name: 'Carney' },
                { id: 5, level: 3, first_name: 'Essie', last_name: 'Dunlap' }
              ]
            }
          }
        }
      ```

    u-table(
      :fields="fields",
      :items="items",
      :per-page="perPage",
      :totalRows="totalRows",
    )
      template(slot="operation", slot-scope="row")
        button.btn.btn-info.btn-sm.mr-1(type="button", @click.stop="row.toggle()")
          i.fa.fa-angle-left(aria-hidden="true").mr-2
        button.btn.btn-danger.btn-sm.mr-1(type="button", @click.stop="remove(row.value.id)")
          i.fa.fa-trash(aria-hidden="true").mr-2
          | Remove
        button.btn.btn-primary.btn-sm(type="button", @click.stop="showClickButton(row.value.age)")
          i.fa.fa-pencil(aria-hidden="true").mr-2
          | Edit

    md.form-control.my-3.
      ```
      template.
        u-table(:fields="fields", :items="items", :per-page="perPage", :totalRows="totalRows")
          template(slot="operation", slot-scope="row")
            button.btn.btn-info.btn-sm.mr-1(type="button", @click.stop="row.toggle()")
              i.fa.fa-angle-left(aria-hidden="true").mr-2
            button.btn.btn-danger.btn-sm.mr-1(type="button", @click.stop="remove(row.value.id)")
              i.fa.fa-trash(aria-hidden="true").mr-2
              | Remove
            button.btn.btn-primary.btn-sm(type="button", @click.stop="showClickButton(row.value.age)")
              i.fa.fa-pencil(aria-hidden="true").mr-2
              | Edit

      script.
        export default {
          data () {
            return {
              fields: {
                last_name: {
                  label: 'Last name'
                },
                first_name: {
                  label: 'First Name'
                },
                level: {
                  label: 'Department Level'
                },
                operation: {
                  label: 'Operation'
                }
              },
              items: [
                { id: 1, level: 1, first_name: 'Dickerson', last_name: 'Macdonald' },
                { id: 2, level: 1, first_name: 'Larsen', last_name: 'Shaw' },
                { id: 3, level: 1, first_name: 'Geneva', last_name: 'Wilson' },
                { id: 4, level: 2, first_name: 'Jami', last_name: 'Carney' },
                { id: 5, level: 3, first_name: 'Essie', last_name: 'Dunlap' }
              ],
              perPage: 5,
              totalRows: 100
            }
          }
        }
      ```
</template>

<script>
  let items = [
    { id: 1, level: 1, first_name: 'Dickerson', last_name: 'Macdonald' },
    { id: 2, level: 1, first_name: 'Larsen', last_name: 'Shaw' },
    { id: 3, level: 1, first_name: 'Geneva', last_name: 'Wilson' },
    { id: 4, level: 2, first_name: 'Jami', last_name: 'Carney' },
    { id: 5, level: 3, first_name: 'Essie', last_name: 'Dunlap' }
  ]

  export default {
    data () {
      return {
        options: [
          { text: 'Level 1', value: 1 },
          { text: 'Level 2', value: 2 },
          { text: 'Level 3', value: 3 }
        ],
        filter: null,
        keyword: null,
        fields: {
          last_name: {
            label: 'Last name'
          },
          first_name: {
            label: 'First Name'
          },
          level: {
            label: 'Department Level'
          },
          operation: {
            label: 'Operation'
          }
        },
        items: items,
        perPage: 5,
        totalRows: 100
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/variables";
  @import "node_modules/bootstrap/scss/mixins/transition";

  .table {
    tr {
      .btn-info:after {
        content: "Expand";
      }

      .fa-angle-left {
        @include transition;
      }

      &.expand {
        .btn-info:after {
          content: "Shrink";
        }

        .fa-angle-left {
          transform: rotateZ(-90deg);
        }
      }
    }
  }
</style>
