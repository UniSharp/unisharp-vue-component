<template lang="pug">
  u-admin
    .card.w-100: .card-body

      .my-2 Basic use
      u-input-tag(v-model="form.selectedTags1", placeholder="AddTag", :tags="tags")
      .my-2 Set limit property to limit at most selected size
      u-input-tag(v-model="form.selectedTags2", placeholder="AddTag", :tags="tags", :limit="2")
      .my-2 Enable insertable property to add additional tag ( Enter any text on input box )
      u-input-tag(v-model="form.selectedTags3", placeholder="AddTag", :tags.sync="tags", :insertable="true")

      u-code-viewer
        template(slot="template").
          u-input-tag(v-model="form.selectedTags1", placeholder="AddTag", :tags="tags")

          u-input-tag(v-model="form.selectedTags2", placeholder="AddTag", :tags="tags", :limit="2")

          u-input-tag(v-model="form.selectedTags3", placeholder="AddTag", :tags.sync="tags", :insertable="true")
        template(slot="script").
          export default {
            data () {
              return {
                form: {
                  selectedTags1: [],
                  selectedTags2: [],
                  selectedTags3: []
                },
                tags: ['Done', 'Doing', 'Doc', 'Reopen', 'Complete', 'Blocked', 'Teach', 'Depend', 'Error', 'Success']
              }
            }
          }
      h4 Property
      u-table(:fields="propertyFields", :items="properties", :hidePagination="true")
      h4 Event
      u-table(:fields="eventFields", :items="events", :hidePagination="true")
</template>
<script>
  export default {
    data () {
      return {
        form: {
          selectedTags1: [],
          selectedTags2: [],
          selectedTags3: []
        },
        tags: ['Done', 'Doing', 'Doc', 'Reopen', 'Complete', 'Blocked', 'Teach', 'Depend', 'Error', 'Success'],
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
          { property: 'tags', type: 'Array', default_value: '', required: 'true', description: 'The tags waiting to be selected' },
          { property: 'selected', type: 'Array', default_value: '', required: 'true', description: 'Selected tag' },
          { property: 'insertable', type: 'Boolean', default_value: 'null', required: '', description: 'Enable to allow new tag inserting' },
          { property: 'placeholder', type: 'String', default_value: '', required: '', description: 'Hint text' },
          { property: 'limit', type: 'Number', default_value: '', required: '', description: 'Limit the number of tag to be selected' },
          { property: 'limitMessage', type: 'String', default_value: 'Maximum tags exceeded.', required: '', description: 'The warning text of overrun size tags' },
          { property: 'error', type: 'String', default_value: '', required: '', description: 'Error text value' }
        ],
        events: [
          { event: 'change', arguments: 'Array. Get text of inserted / selected tags', description: 'Get value when tag inserted / selected' },
          { event: 'update:tags', arguments: 'Array', description: 'Get value when tag inserted' }
        ]
      }
    }
  }
</script>
