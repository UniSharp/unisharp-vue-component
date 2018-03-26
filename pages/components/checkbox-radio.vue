<template lang="pug">
  u-admin
    form.card.w-100
      .card-body
        .form-group.row
          label.col-sm-2.col-form-label.text-sm-right Checkbox:
          .col-sm-10
            u-checkbox-group(v-model="form.checked", :options="options")
        md.
          ```
          <template lang="pug">
            u-checkbox(v-model="check", value="yes")
            | Option 1
          </template>
          <script>
            export default {
              data () {
                return {
                  form: {
                    checked: true
                  },
                  options: [{
                    text: 'I',
                    value: 1
                  }, {
                    text: 'II',
                    value: 2
                  }, {
                    text: 'III',
                    value: 3
                  }]
                }
              }
            }
          </script>
          ```
</template>
<script>
  export default {
    data () {
      return {
        form: {
          checked: true
        },
        options: [{
          text: 'I',
          value: 1
        }, {
          text: 'II',
          value: 2
        }, {
          text: 'III',
          value: 3
        }]
      }
    }
  }
</script>
