<template lang="pug">
  u-admin
    .card.w-100: .card-body
      h4 Datetime(Default)

      .my-2 Set empty datetime
      u-datetime(v-model="empty")
      .my-2 Set placeholder
      u-datetime(v-model="empty", placeholder="YYYY-MM-DD HH:mm")
      .my-2 Give datetime as default value
      u-datetime(v-model="form.datetime")

      u-code-viewer
        template(slot="template").
          u-datetime(v-model="empty")

          u-datetime(v-model="empty", placeholder="YYYY-MM-DD HH:mm")

          u-datetime(v-model="form.datetime")
        template(slot="script").
          import moment from 'moment'

          export default {
            data () {
              return {
                empty: null,
                datetime: moment.now()
              }
            }
          }
      h4 Mode

      .my-2 Date
      u-datetime(v-model="form.datetime", mode="date")
      .my-2 Time
      u-datetime(v-model="form.datetime", mode="time")

      u-code-viewer
        template(slot="template").
          u-datetime(v-model="form.datetime", mode="date")

          u-datetime(v-model="form.datetime", mode="time")
        template(slot="script").
          import moment from 'moment'

          export default {
            data () {
              return {
                datetime: moment.now()
              }
            }
          }
      h4 Config

      li Locale
      .my-2
        span Support locales, and get more detail in&nbsp;
        a.text-primary(target="_blank", href="https://momentjs.com/docs/#/i18n/") moment.js
        span &nbsp;document. 'en' as a default

      u-datetime(v-model="form.datetime", :config="config")

      u-code-viewer
        template(slot="template").
          u-datetime(v-model="form.datetime", :config="config")
        template(slot="script").
          import moment from 'moment'

          export default {
            data () {
              return {
                datetime: moment.now(),
                config: {
                  locale: 'zh-cn'
                }
              }
            }
          }
      h4 Modal

      .my-2 Display in modal
      u-datetime(v-model="form.datetime", display="modal")

      u-code-viewer
        template(slot="template").
          u-datetime(v-model="form.datetime", display="modal")
        template(slot="script").
          import moment from 'moment'

          export default {
            data () {
              return {
                datetime: moment.now()
              }
            }
          }
      h4 Property
      u-table(:fields="propertyFields", :items="properties", :hidePagination="true")
      h4 Event
      u-table(:fields="eventFields", :items="events", :hidePagination="true")
</template>
<script>
  import moment from 'moment'

  export default {
    data () {
      return {
        empty: null,
        form: {
          datetime: moment.now()
        },
        config: {
          locale: 'zh-cn'
        },
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
          { property: 'mode', type: 'String', default_value: 'datetime', required: '', description: 'Display formats of date, time or datetime' },
          { property: 'display', type: 'String', default_value: 'dropdown', required: '', description: 'Display options of dropdown or modal' },
          { property: 'placeholder', type: 'String', default_value: '', required: '', description: 'Hint text' },
          { property: 'config', type: 'Object', default_value: '{{locale: \'en\'}}', required: '', description: 'See Momentjs document (https://momentjs.com/docs/#/i18n/)' },
          { property: 'error', type: 'String', default_value: '', required: '', description: 'Error text value' }
        ],
        events: [
          { event: 'change', arguments: 'String', description: 'Get current value when selected value is changed' }
        ]
      }
    }
  }
</script>
