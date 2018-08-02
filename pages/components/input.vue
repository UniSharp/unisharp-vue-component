<template lang="pug">
  u-admin
    .card.w-100: .card-body
      h4 Input

      u-input(type="text", name="email", placeholder="Enter email")

      md.form-control.my-3.
        ```
        template.
          u-input(type="text", name="email", placeholder="Enter email")
        ```

      h4 Textarea

      u-input(type="textarea", :rows="10", placeholder="Enter description here")

      md.form-control.my-3.
        ```
        template.
          u-input(type="textarea", :rows="10", placeholder="Enter description here")
        ```

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
          { property: 'type', type: 'String', default_value: 'text', required: '', description: 'The attribute type of input, or switch to textarea' },
          { property: 'name', type: 'String', default_value: '', required: '', description: 'The attribute name of input / textarea' },
          { property: 'placeholder', type: 'String', default_value: '', required: '', description: 'Input / Textarea hint text' },
          { property: 'rows', type: 'Number', default_value: '1', required: '', description: 'The number of textarea visible lines' },
          { property: 'error', type: 'String', default_value: '', required: '', description: 'Error text value' },
          { property: 'disabled', type: 'Boolean', default_value: 'false', required: '', description: 'Disable the Input / Textarea' }
        ],
        events: [
          { event: 'input', arguments: 'String', description: 'Get value when input entered' }
        ]
      }
    }
  }
</script>
