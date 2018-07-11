<template lang="pug">
  u-admin
    u-pagination(:totalRows="12345", :perPage="500", :limitPage="3", :currentPage="3")

    md.form-control.my-3.
      u-pagination(:totalRows="12345", :perPage="500", :limitPage="3", :currentPage="3")

    h2 Property
    u-table(:fields="propertyFields", :items="properties", :hidePagination="true")
    h2 Event
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
          { property: 'totalRows', type: 'Number', default_value: '20', required: '', description: '' },
          { property: 'perPage', type: 'Number', default_value: '20', required: '', description: '' },
          { property: 'currentPage', type: 'Number', default_value: '1', required: '', description: '' },
          { property: 'limitPage', type: 'Number', default_value: '5', required: '', description: '' }
        ],
        events: [
          { event: 'update:currentPage', arguments: '', description: '' }
        ]
      }
    }
  }
</script>
