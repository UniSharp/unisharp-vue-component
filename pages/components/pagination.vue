<template lang="pug">
  u-admin
    u-pagination(:totalRows="12345", :perPage="500", :limitPage="3", :currentPage="3")

    md.form-control.my-3.
      u-pagination(:totalRows="12345", :perPage="500", :limitPage="3", :currentPage="3")

    h4 Property
    u-table(:fields="propertyFields", :items="properties", :hidePagination="true")
    h4 Event
    u-table(:fields="eventFields", :items="events", :hidePagination="true")
</template>

<script>
  export default {
    data () {
      return {
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
        eventFields: {
          event: {
            label: 'Event'
          },
          arguments: {
            label: 'Arguments'
          },
          description: {
            label: 'Description'
          }
        },
        properties: [
          { property: 'totalRows', type: 'Number', default_value: '20', required: '', description: 'Total count of result data' },
          { property: 'perPage', type: 'Number', default_value: '20', required: '', description: 'The count of per page data' },
          { property: 'currentPage', type: 'Number', default_value: '1', required: '', description: 'Current page' },
          { property: 'limitPage', type: 'Number', default_value: '5', required: '', description: 'The number of pages is displayed, and out of number pages will be displayed in "..."' }
        ],
        events: [
          { event: 'update:currentPage', arguments: 'Number', description: 'Get value when page switched' }
        ]
      }
    }
  }
</script>
