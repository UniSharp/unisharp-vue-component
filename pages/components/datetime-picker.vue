<template lang="pug">
  u-admin
    .card.w-100: .card-body
      h2 Datetime(Default)

      .my-2 Set empty datetime
      u-datetime(v-model="empty")
      .my-2 Set placeholder
      u-datetime(v-model="empty", placeholder="YYYY-MM-DD HH:mm")
      .my-2 Give datetime as default value
      u-datetime(v-model="form.datetime")

      md.form-control.my-3.
        ```
        template.
          u-datetime(v-model="empty")

          u-datetime(v-model="empty", placeholder="YYYY-MM-DD HH:mm")

          u-datetime(v-model="form.datetime")

        script.
          import moment from 'moment'

          export default {
            data () {
              return {
                empty: null,
                datetime: moment.now()
              }
            }
          }
        ```

      h2 Mode

      .my-2 Date
      u-datetime(v-model="form.datetime", mode="date")
      .my-2 Time
      u-datetime(v-model="form.datetime", mode="time")

      md.form-control.my-3.
        ```
        template.
          u-datetime(v-model="form.datetime", mode="date")

          u-datetime(v-model="form.datetime", mode="time")

        script.
          import moment from 'moment'

          export default {
            data () {
              return {
                datetime: moment.now()
              }
            }
          }
        ```

      h2 Config

      h4 Locale
      .my-2
        span Support locales, and get more detail in&nbsp;
        nuxt-link(to="https://momentjs.com/docs/#/i18n/") moment.js&nbsp;
        span document. 'en' as a default

      u-datetime(v-model="form.datetime", :config="config")

      md.form-control.my-3.
        ```
        template.
          u-datetime(v-model="form.datetime", :config="config")

        script.
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
        ```
      h2 Modal

      .my-2 Display in modal
      u-datetime(v-model="form.datetime", display="modal")

      md.form-control.my-3.
        ```
        template.
          u-datetime(v-model="form.datetime", display="modal")

        script.
          import moment from 'moment'

          export default {
            data () {
              return {
                datetime: moment.now()
              }
            }
          }
        ```

      h2 Property
      u-table(:fields="propertyFields", :items="properties", :hidePagination="true")
      h2 Event
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
          { property: 'mode', type: 'String', default_value: 'datetime', required: '', description: '' },
          { property: 'display', type: 'String', default_value: 'dropdown', required: '', description: '' },
          { property: 'disabled', type: 'Boolean', default_value: 'false', required: '', description: '' },
          { property: 'required', type: 'Boolean', default_value: 'false', required: '', description: '' },
          { property: 'placeholder', type: 'String', default_value: '', required: '', description: '' },
          { property: 'config', type: 'Object', default_value: '{{locale: \'en\'}}', required: '', description: '' },
          { property: 'error', type: 'String', default_value: '', required: '', description: '' }
        ],
        events: [
          { event: 'change', arguments: '', description: '' }
        ]
      }
    }
  }
</script>
