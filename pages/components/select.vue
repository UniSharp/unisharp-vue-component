<template lang="pug">
  u-admin
    .card.w-100: .card-body
      h4 Basic use

      u-select(v-model="form.selected", :options="options", :selected="form.selected")

      .my-2
        | Support two format for options, one is:
        br
        code.
          [{ text: 'I', value: 1 }, { text: 'II', value: 2 }, { text: 'III', value: 3 }]
        br
        | another is:
        br
        code.
          ['I', 'II', 'III'] or {'I', 'II', 'III'}

      md.form-control.my-3.
        ```
        template.
          u-select(v-model="form.selected", :options="options")

        script.
          export default {
            data () {
              return {
                form: {
                    selected: 2
                  },
                options: [
                  { text: 'I', value: 1 },
                  { text: 'II', value: 2 },
                  { text: 'III', value: 3 }
                ]
              }
            }
         }
        ```
      md.form-control.my-3.
        ```
        template.
          u-select(v-model="form.selected", :options="options")

        script.
          export default {
            data () {
              return {
                form: {
                    selected: 'II'
                  },
                options: ['I', 'II', 'III']
              }
            }
         }
        ```

      h4 Placeholder

      .my-2 Default
      u-select(:options="options", selected="")
      .my-2 Customize placeholder
      u-select(:options="options", selected="", placeholder="客製預設選項")
      .my-2 No placeholder
      u-select(:options="options", selected="", :noPlaceholder="true")

      md.form-control.my-3.
        ```
        template.
          u-select(:options="options", selected="")
          u-select(:options="options", selected="", placeholder="客製預設選項")
          u-select(:options="options", selected="", :noPlaceholder="true")

        script.
          export default {
            data () {
              return {
                options: [
                  { text: 'I', value: 1 },
                  { text: 'II', value: 2 },
                  { text: 'III', value: 3 }
                ]
              }
            }
         }
        ```

      h4 Disabled

      .my-2 Disabled
      u-select(:options="options", selected="", disabled)

      md.form-control.my-3.
        ```
        template.
          u-select(:options="options", selected="", disabled)

        script.
          export default {
            data () {
              return {
                options: [
                  { text: 'I', value: 1 },
                  { text: 'II', value: 2 },
                  { text: 'III', value: 3 }
                ]
              }
            }
         }
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
        form: {
          selected: 2
        },
        options: [
          { text: 'I', value: 1 },
          { text: 'II', value: 2 },
          { text: 'III', value: 3 }
        ],
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
          { property: 'options', type: '[Array, Object]', default_value: '', required: 'true', description: 'The options of select. Support two format for options: key-value or only value array/object' },
          { property: 'selected', type: 'Any', default_value: '', required: 'true', description: 'The selected attribute of select option' },
          { property: 'disabled', type: 'Boolean', default_value: 'false', required: '', description: 'Disabled select dropdown' },
          { property: 'placeholder', type: 'String', default_value: '請選擇', required: '', description: 'The placeholder and empty option hint text' },
          { property: 'noPlaceholder', type: 'Boolean', default_value: 'false', required: '', description: 'Remove empty option' },
          { property: 'filterable', type: 'Boolean', default_value: 'false', required: '', description: 'Enable for InputTag component to filter selected tags' },
          { property: 'pinnedOption', type: '[Array, Object]', default_value: 'null', required: '', description: 'Dropdown sub menu options' },
          { property: 'pinnedOptionPrefix', type: 'String', default_value: '', required: '', description: 'Dropdown sub menu prefix text of options' },
          { property: 'search', type: 'String', default_value: '', required: '', description: 'Last selected tag text for search to filter tags' },
          { property: 'error', type: 'String', default_value: '', required: '', description: 'Error text value' }
        ],
        events: [
          { event: 'change', arguments: 'Array. Get value of selected options', description: 'Get selected value when option is selected' },
          { event: 'update:search', arguments: 'Array', description: 'Get filtered and selected tags when search finished' },
          { event: 'insert', arguments: 'String. Get text of inserted tag', description: 'Get inserted tag when tag inserted' }
        ]
      }
    }
  }
</script>
