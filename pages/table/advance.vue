<template lang="pug">
  u-admin
    .card.w-100: .card-body
      h2 Customize operation

      u-table(:fields="fields", :items="items", :per-page="perPage", :total-rows="totalRows")
        template(slot="operation", slot-scope="row")
          button.btn.btn-danger.btn-sm.mr-1(type="button", @click.stop="remove(row.value.id)")
            i.fa.fa-trash(aria-hidden="true").mr-2
            | Remove
          button.btn.btn-primary.btn-sm(type="button", @click.stop="showClickButton(row.value.age)")
            i.fa.fa-pencil(aria-hidden="true").mr-2
            | Edit

      md.form-control.my-3.
        ```
        template.
          u-table(:fields="fields", :items="items", :per-page="perPage", :total-rows="totalRows")
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
                  first_name: {
                    label: 'First Name'
                  },
                  last_name: {
                    label: 'Last name'
                  },
                  level: {
                    label: 'Department Level'
                  },
                  operation: {
                    label: 'Operation'
                  }
                },
                items: [
                  { id: 1, first_name: 'Dickerson', last_name: 'Macdonald', level: 1 },
                  { id: 2, first_name: 'Larsen', last_name: 'Shaw', level: 1 },
                  { id: 3, first_name: 'Geneva', last_name: 'Wilson', level: 1 },
                  { id: 4, first_name: 'Jami', last_name: 'Carney', level: 2 },
                  { id: 5, first_name: 'Essie', last_name: 'Dunlap', level: 3 }
                ],
                perPage: 5,
                totalRows: 100
              }
            }
          }
        ```

      h2 Expand

      u-table(:fields="fields", :items="items", :per-page="perPage", :total-rows="totalRows")
        template(slot="expand", slot-scope="row")
          tr
            td
            td(colspan="4")
              | Hi, show detail here
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
          u-table(:fields="fields", :items="items", :per-page="perPage", :total-rows="totalRows")
            template(slot="expand", slot-scope="row")
              tr
                td
                td(colspan="4")
                  | Hi, show detail here
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
                  first_name: {
                    label: 'First Name'
                  },
                  last_name: {
                    label: 'Last name'
                  },
                  level: {
                    label: 'Department Level'
                  },
                  operation: {
                    label: 'Operation'
                  }
                },
                items: [
                  { id: 1, first_name: 'Dickerson', last_name: 'Macdonald', level: 1 },
                  { id: 2, first_name: 'Larsen', last_name: 'Shaw', level: 1 },
                  { id: 3, first_name: 'Geneva', last_name: 'Wilson', level: 1 },
                  { id: 4, first_name: 'Jami', last_name: 'Carney', level: 2 },
                  { id: 5, first_name: 'Essie', last_name: 'Dunlap', level: 3 }
                ],
                perPage: 5,
                totalRows: 100
              }
            }
          }
        ```

      h2 Sorting column

      h4 All column sortable
      u-table(
        :fields="sortableFields",
        :items="items",
        :per-page="perPage",
        :total-rows="totalRows",
        sortable
      )
      h4 Order by column
      u-table(
        :fields="sortableFields",
        :items="items",
        :per-page="perPage",
        :total-rows="totalRows",
        order-by="last_name"
      )
      h4 Order desc
      u-table(
        :fields="sortableFields",
        :items="items",
        :per-page="perPage",
        :total-rows="totalRows",
        :order-desc="true"
      )

      md.form-control.my-3.
        ```
        template.
          u-table(:fields="fields", :items="items", :per-page="perPage", :total-rows="totalRows", order-by="last_name")

        script.
          export default {
            data () {
              return {
                fields: {
                  first_name: {
                    label: 'First Name'
                  },
                  last_name: {
                    label: 'Last name'
                  },
                  level: {
                    label: 'Department Level',
                    sortable: true
                  }
                },
                items: [
                  { id: 1, first_name: 'Dickerson', last_name: 'Macdonald', level: 1 },
                  { id: 2, first_name: 'Larsen', last_name: 'Shaw', level: 1 },
                  { id: 3, first_name: 'Geneva', last_name: 'Wilson', level: 1 },
                  { id: 4, first_name: 'Jami', last_name: 'Carney', level: 2 },
                  { id: 5, first_name: 'Essie', last_name: 'Dunlap', level: 3 }
                ],
                perPage: 5,
                totalRows: 100
              }
            }
          }
        ```

      h2 Selection

      u-table(
        :fields="noOperationFields",
        :items="items",
        :per-page="perPage",
        :total-rows="totalRows",
        selection
      )

      md.form-control.my-3.
        ```
        template.
          u-table(:fields="fields", :items="items", :per-page="perPage", :total-rows="totalRows", selection)

        script.
          export default {
            data () {
              return {
                fields: {
                  first_name: {
                    label: 'First Name'
                  },
                  last_name: {
                    label: 'Last name'
                  },
                  level: {
                    label: 'Department Level',
                    sortable: true
                  }
                },
                items: [
                  { id: 1, first_name: 'Dickerson', last_name: 'Macdonald', level: 1 },
                  { id: 2, first_name: 'Larsen', last_name: 'Shaw', level: 1 },
                  { id: 3, first_name: 'Geneva', last_name: 'Wilson', level: 1 },
                  { id: 4, first_name: 'Jami', last_name: 'Carney', level: 2 },
                  { id: 5, first_name: 'Essie', last_name: 'Dunlap', level: 3 }
                ],
                perPage: 5,
                totalRows: 100
              }
            }
          }
        ```

      h2 Property
      u-table(:fields="propertyFields", :items="properties", :hidePagination="true")
</template>

<script>
  let items = [
    { id: 1, first_name: 'Dickerson', last_name: 'Macdonald', level: 1 },
    { id: 2, first_name: 'Larsen', last_name: 'Shaw', level: 1 },
    { id: 3, first_name: 'Geneva', last_name: 'Wilson', level: 1 },
    { id: 4, first_name: 'Jami', last_name: 'Carney', level: 2 },
    { id: 5, first_name: 'Essie', last_name: 'Dunlap', level: 3 }
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
          first_name: {
            label: 'First Name'
          },
          last_name: {
            label: 'Last name'
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
        totalRows: 100,
        propertyFields: {
          property: {
            label: 'Property'
          },
          type: {
            label: 'Type'
          },
          default_value: {
            label: 'Default Value'
          },
          required: {
            label: 'Required'
          },
          description: {
            label: 'Description'
          }
        },
        properties: [
          { property: 'order-by', type: 'String', default_value: 'false', required: '', description: 'Order by a column' },
          { property: 'order-desc', type: 'Boolean', default_value: 'false', required: '', description: 'Make all Columns order by desc' },
          { property: 'sortable', type: 'Boolean', default_value: 'false', required: '', description: 'Make all Columns sortable' },
          { property: 'selection', type: 'Boolean', default_value: 'false', required: '', description: 'Show checkbox' },
          { property: 'primary-key', type: 'String', default_value: 'id', required: '', description: 'Index column' }
        ]
      }
    },
    computed: {
      sortableFields () {
        return {
          first_name: {
            label: 'First Name'
          },
          last_name: {
            label: 'Last name'
          },
          level: {
            label: 'Department Level',
            sortable: true
          }
        }
      },
      noOperationFields () {
        return {
          first_name: {
            label: 'First Name'
          },
          last_name: {
            label: 'Last name'
          },
          level: {
            label: 'Department Level'
          }
        }
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
