<template lang="pug">
  u-admin
    .card.w-100: .card-body
      h4 Basic use without pagination

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
                  first_name: {
                    label: 'First Name'
                  },
                  last_name: {
                    label: 'Last name'
                  },
                  level: {
                    label: 'Department Level'
                  }
                },
                items: [
                  { id: 1, first_name: 'Dickerson', last_name: 'Macdonald', level: 1 },
                  { id: 2, first_name: 'Larsen', last_name: 'Shaw', level: 1 },
                  { id: 3, first_name: 'Geneva', last_name: 'Wilson', level: 1 },
                  { id: 4, first_name: 'Jami', last_name: 'Carney', level: 2 },
                  { id: 5, first_name: 'Essie', last_name: 'Dunlap', level: 3 }
                ]
              }
            }
          }
        ```
      h4 Basic use with pagination

      u-table(:fields="fields", :items="items", :per-page="perPage", :totalRows="totalRows")

      md.form-control.my-3.
        ```
        template.
          u-table(:fields="fields", :items="items", :per-page="perPage", :totalRows="totalRows")

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

      h4 Property
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
          { property: 'items', type: 'Array', default_value: '[]', required: '', description: 'Table content' },
          { property: 'provider', type: 'Func', default_value: 'null', required: '', description: 'Table content by provider function return' },
          { property: 'fields', type: 'Object', default_value: 'null', required: '', description: 'Table Header' },
          { property: 'perPage', type: 'Number', default_value: 'null', required: '', description: 'The count of per page data' },
          { property: 'totalRows', type: 'Number', default_value: 'null', required: '', description: 'Total count of result data' },
          { property: 'hidePagination', type: 'Boolean', default_value: 'false', required: '', description: 'Hide pagination feature' }
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
          },
          operation: {
            label: 'Operation'
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
