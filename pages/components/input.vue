<template lang="pug">
  u-admin
    .card.w-100: .card-body
      h2 Input

      u-input(type="text", name="email", placeholder="Enter email")

      md.form-control.my-3.
        ```
        template.
          u-input(type="text", name="email", placeholder="Enter email")
        ```

      h2 Textarea

      u-input(type="textarea", rows="10", placeholder="Enter description here")

      md.form-control.my-3.
        ```
        template.
          u-input(type="textarea", rows="10", placeholder="Enter description here")
        ```

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
          { property: 'type', type: 'String', default_value: 'text', required: '', description: '' },
          { property: 'name', type: 'String', default_value: '', required: '', description: '' },
          { property: 'placeholder', type: 'String', default_value: '', required: '', description: '' },
          { property: 'rows', type: 'Number', default_value: '1', required: '', description: '' },
          { property: 'error', type: 'String', default_value: '', required: '', description: '' }
        ],
        events: [
          { event: 'input', arguments: '', description: '' }
        ]
      }
    }
  }
</script>
