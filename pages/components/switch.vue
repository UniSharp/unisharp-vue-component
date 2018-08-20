<template lang="pug">
  u-admin
    .card.w-100: .card-body
      section
        h4 Default Switch
        u-value-printer(:value="form.enabled")

        u-switch(v-model="form.enabled")

        u-code-viewer
          template(slot="template").
            u-switch(v-model="form.enabled")
          template(slot="script").
            data () {
              return {
                form: {
                  enabled: true
                }
              }
            }
        //- h5 Properties
        //- ul: li(v-for="property in checkboxProperties") {{ property.property }} [{{ property.type }}]
        //- h5 Events
        //- ul: li(v-for="eventName in checkboxEvents") {{ eventName }}

      section
        h4 Custom Switch Content
        u-value-printer(:value="form.enabled")

        u-switch(v-model="form.enabled")
          template(slot="on")
            i.fa.fa-check.text-white
          template(slot="off")
            i.fa.fa-times.text-danger

        u-code-viewer
          template(slot="template").
            u-switch(v-model="form.enabled")
              template(slot="on")
                i.fa.fa-check.text-white
              template(slot="off")
                i.fa.fa-times.text-danger
          template(slot="script").
            data () {
              return {
                form: {
                  enabled: true
                }
              }
            }
</template>
<script>
  export default {
    data () {
      return {
        form: {
          enabled: true
        }
      }
    }
  }
</script>
