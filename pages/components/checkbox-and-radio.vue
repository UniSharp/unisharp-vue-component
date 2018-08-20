<template lang="pug">
  u-admin
    .card.w-100: .card-body
      section
        h4 Checkbox
        u-value-printer(:value="form.enabled")

        u-checkbox(v-model="form.enabled") Checked
        u-checkbox(v-model="form.enabled", disabled) Disabled

        u-code-viewer
          template(slot="template").
            u-checkbox(v-model="form.checked") Checked

            u-checkbox(v-model="form.checked", disabled) Disabled
          template(slot="script").
            data () {
              return {
                form: {
                  checked: true
                }
              }
            }
        h5 Properties
        ul: li(v-for="property in checkboxProperties") {{ property.property }} [{{ property.type }}]
        h5 Events
        ul: li(v-for="eventName in checkboxEvents") {{ eventName }}

      section
        h4 Checkbox Group
        u-value-printer(:value="selectedCheckboxGroup")

        h5 Inline display
        u-checkbox-group(v-model="selectedCheckboxGroup", :options="options")

        h5.mt-3 Stacked display
        u-checkbox-group(v-model="selectedCheckboxGroup", :options="options", :stacked="true")

        u-code-viewer
          template(slot="template").
            u-checkbox-group(v-model="form.checked", :options="options")

            u-checkbox-group(v-model="form.checked", :options="options", :stacked="true")
          template(slot="script").
            data () {
              return {
                form: {
                  checked: [1]
                },
                options: [
                  { text: 'I', value: 1 },
                  { text: 'II', value: 2 },
                  { text: 'III', value: 3 }
                ]
              }
            }
        h5 Properties
        ul: li(v-for="property in checkboxGroupProperties") {{ property.property }} [{{ property.type }}]
        h5 Events
        ul: li(v-for="event in checkboxGroupEvents") {{ event.event }}

      section
        h4 Single Radio

        u-radio(name="single1") Checked
        u-radio(name="single2", disabled) Disabled

        u-code-viewer
          template(slot="template").
            u-radio(name="single1") Checked

            u-radio(name="single2", disabled) Disabled
      section
        h4 Radio Group
        u-value-printer(:value="form.checked")

        h5 Inline display
        u-radio-group(v-model="form.checked", :options="options", @change="showValue")

        h5.mt-3 Stacked display
        u-radio-group(v-model="form.checked", :options="options", @change="showValue", :stacked="true")

        u-code-viewer
          template(slot="template").
            u-radio-group(v-model="form.checked", :options="options")

            u-radio-group(v-model="form.checked", :options="options", :stacked="true")
          template(slot="script").
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
        h5 Properties
        ul: li(v-for="property in radioGroupProperty") {{ property.property }} [{{ property.type }}]
        h5 Events
        ul: li(v-for="event in radioEvents") {{ event.event }}
</template>
<script>
  export default {
    data () {
      return {
        form: {
          enabled: true,
          checked: 1
        },
        selectedCheckboxGroup: [1],
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
          { property: 'selected', type: 'Boolean', default_value: 'false', required: '', description: 'Checkbox is checked or not' },
          { property: 'disabled', type: 'Boolean', default_value: 'false', required: '', description: 'The disabled attribute of checkbox' },
          { property: 'error', type: 'String', default_value: '', required: '', description: 'Error text value' }
        ],
        checkboxEvents: [ 'change', 'focus', 'blur', 'click' ],
        checkboxGroupProperties: [
          { property: 'selected', type: 'Array', default_value: '', required: 'false', description: 'Values of selected options' },
          { property: 'options', type: 'Array', default_value: '', required: 'true', description: 'The options of checkboxes, and format is [{ text: \'displayname\', value: \'key\' }]' },
          { property: 'stacked', type: 'Boolean', default_value: 'false', required: '', description: 'The arrangement of options' },
          { property: 'error', type: 'String', default_value: '', required: '', description: 'Error text value' }
        ],
        checkboxGroupEvents: [
          { event: 'change', arguments: 'Checked value of checkbox(es). When bound to multiple checkboxes, value will be an array.', description: 'Get current value when the checkbox is toggled' }
        ],
        radioGroupProperty: [
          { property: 'selected', type: 'any', default_value: '', required: 'false', description: 'Value of selected options' },
          { property: 'options', type: 'Array', default_value: '', required: 'true', description: 'The options of radios, and format is [{ text: \'displayname\', value: \'key\' }]' },
          { property: 'disabled', type: 'Boolean', default_value: 'false', required: '', description: 'The disabled attribute of radio' },
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
