<template lang="pug">
  u-admin
    .card.w-100: .card-body
      section
        h2 Checkbox

        u-checkbox(v-model="form.enabled", :value="true") Checked
        u-checkbox(v-model="form.enabled", :value="false") Not Checked
        u-checkbox(v-model="form.enabled", :value="false", disabled) Disabled
        u-checkbox(v-model="form.enabled", :value="true", disabled) Checked & Disabled

        md.form-control.my-3.
          ```
          template.
            u-checkbox(v-model="form.enabled", :value="true") Checked

            u-checkbox(v-model="form.enabled", :value="false") Not Checked

            u-checkbox(v-model="form.enabled", :value="false", disabled) Disabled

            u-checkbox(v-model="form.enabled", :value="true", disabled) Checked & Disabled

          script.
            export default {
              data () {
                return {
                  form: {
                    enabled: true
                  }
                }
              }
            }
          ```
        h4 Property
        u-table(:fields="propertyFields", :items="checkboxProperties", :hidePagination="true")
        h4 Event
        u-table(:fields="eventFields", :items="checkboxEvents", :hidePagination="true")

      section
        h2 Checkbox Group

        | By default, checkbox group display in vertical
        u-checkbox-group(v-model="form.checked", :options="options")
        | If setting stacked property to be true, checkbox group will append .custom-controls-stacked class and display in inline
        u-checkbox-group(v-model="form.checked", :options="options", :stacked="true")

        md.form-control.my-3.
          ```
          template.
            u-checkbox-group(v-model="form.checked", :options="options")

            u-checkbox-group(v-model="form.checked", :options="options", :stacked="true")

          script.
            export default {
              data () {
                return {
                  form: {
                    checked: 1
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
        h4 Property
        u-table(:fields="propertyFields", :items="checkboxGroupProperties", :hidePagination="true")
        h4 Event
        u-table(:fields="eventFields", :items="checkboxGroupEvents", :hidePagination="true")

      section
        h2 Radio

        .d-flex
          u-radio(name="single1", :value="true", :options="[{text: 'Checked', value: true}]")
          u-radio(name="single2", :value="true", :options="[{text: 'Not Checked', value: false}]")
          u-radio(name="single3", :value="true", :options="[{text: 'Disabled', value: false}]", disabled)
          u-radio(name="single4", :value="true", :options="[{text: 'Checked & Disabled', value: true}]", disabled)

        md.form-control.my-3.
          ```
          template.
            u-radio(name="single1", :value="true", :options="[{text: 'Checked', value: true}]")

            u-radio(name="single2", :value="true", :options="[{text: 'Not Checked', value: false}]")

            u-radio(name="single3", :value="true", :options="[{text: 'Disabled', value: false}]", disabled)

            u-radio(name="single4", :value="true", :options="[{text: 'Checked & Disabled', value: true}]", disabled)
          ```

      section
        h2 Radios

        | By default, radios display in vertical
        u-radio(v-model="form.checked", :options="options", name="group1")
        | If setting stacked property to be true, radios will append .custom-controls-stacked class and display in inline
        u-radio(v-model="form.checked", :options="options", name="group2", :stacked="true")

        md.form-control.my-3.
          ```
          template.
            u-radio(v-model="form.checked", :options="options", name="group1")

            u-radio(v-model="form.checked", :options="options", name="group2", :stacked="true")

          script.
            export default {
              data () {
                return {
                  form: {
                    checked: 1
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
        h4 Property
        u-table(:fields="propertyFields", :items="radioProperty", :hidePagination="true")
        h4 Event
        u-table(:fields="eventFields", :items="radioEvents", :hidePagination="true")
</template>
<script>
  export default {
    data () {
      return {
        form: {
          enabled: true,
          checked: 1
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
        checkboxProperties: [
          { property: 'name', type: 'String', default_value: 'false', required: '', description: 'The name attribute of checkbox' },
          { property: 'value', type: 'Any', default_value: 'true', required: '', description: 'Checkbox value' },
          { property: 'disabled', type: 'Boolean', default_value: 'false', required: '', description: 'The disabled attribute of checkbox' },
          { property: 'required', type: 'Boolean', default_value: 'false', required: '', description: 'The required attribute of checkbox' },
          { property: 'error', type: 'String', default_value: '', required: '', description: 'Error text value' }
        ],
        checkboxEvents: [
          { event: 'change', arguments: 'Checked value of checkbox, and the type according to the option value', description: 'Get current value when the checkbox is toggled' },
          { event: 'focus', arguments: '(same as change event)', description: 'Get current value when the checkbox is focused' },
          { event: 'blur', arguments: '(same as change event)', description: 'Get current value when the checkbox is blurred' },
          { event: 'click', arguments: '(same as change event)', description: 'Get current value when the checkbox is clicked' }
        ],
        checkboxGroupProperties: [
          { property: 'options', type: 'Array', default_value: '', required: 'true', description: 'The options of checkboxes, and format is [{ text: \'displayname\', value: \'key\' }]' },
          { property: 'stacked', type: 'Boolean', default_value: 'false', required: '', description: 'The arrangement of options' },
          { property: 'error', type: 'String', default_value: '', required: '', description: 'Error text value' }
        ],
        checkboxGroupEvents: [
          { event: 'change', arguments: 'Checked value of checkbox(es). When bound to multiple checkboxes, value will be an array.', description: 'Get current value when the checkbox is toggled' }
        ],
        radioProperty: [
          { property: 'options', type: 'Array', default_value: '', required: 'true', description: 'The options of radios, and format is [{ text: \'displayname\', value: \'key\' }]' },
          { property: 'name', type: 'String', default_value: 'null', required: '', description: 'Group name of radios' },
          { property: 'value', type: 'Any', default_value: 'null', required: '', description: 'Radio value' },
          { property: 'disabled', type: 'Boolean', default_value: 'false', required: '', description: 'The disabled attribute of radio' },
          { property: 'required', type: 'Boolean', default_value: 'false', required: '', description: 'The required attribute of radio' },
          { property: 'stacked', type: 'Boolean', default_value: 'false', required: '', description: 'The arrangement of options' },
          { property: 'error', type: 'String', default_value: '', required: '', description: 'Error text value' }
        ],
        radioEvents: [
          { event: 'change', arguments: 'Checked value of radio, and the type according to the option value', description: 'Get checked radio value when target radio is checked' },
          { event: 'focus', arguments: '(same as change event)', description: 'Get checked radio value when target radio is focused' },
          { event: 'blur', arguments: '(same as change event)', description: 'Get checked radio value when target radio is blurred' },
          { event: 'click', arguments: '(same as change event)', description: 'Get checked radio value when target radio is click' }
        ]
      }
    }
  }
</script>
