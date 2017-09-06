<template lang="pug">
  u-admin
    u-breadcrumb(slot="breadcrumb")
    b-card(header="Form Components", header-tag="header")
      b-form(@submit='onSubmit')
        //- Label
        .form-group.row
          label.col-md-2
            span.title Label：
          .col-md-10.form-control-static I'm label text.
        //- Label
        .form-group.row
          label.col-md-2
            span.title Email address：
          .col-md-10.form-control
            input.form-control(type='email', v-model='form.email', required='', placeholder='Enter email')
        //- Select
        b-form-group(label='Food:', label-for='exampleInput3')
          b-form-select#exampleInput3(:options='foods', required='', v-model='form.food')
        //- Checkbox
        b-form-group
          b-form-checkbox#exampleInput4(v-model='form.checked')
            | Check me out
        //- Textarea
        b-form-group(label='Textarea:', label-for='exampleInput5')
          b-form-textarea#exampleInput5(placeholder='Enter something', :rows='3', :max-rows='6')
        //- Radio
        b-form-group(label='Food:', label-for='exampleInput6')
          b-form-radio#exampleInput6(:options='foods', v-model='form.food')
        //- Button
        button.btn.btn-primary(type="button") Submit
        button.btn.btn-default(type="reset") Reset
  </template>

<script>
  // import Logo from '~/components/Logo.vue'
  import UAdmin from '~/components/Admin'
  import UBreadcrumb from '~/components/Breadcrumb'

  export default {
    components: { UAdmin, UBreadcrumb },
    data () {
      return {
        form: {
          email: '',
          name: '',
          food: null,
          checked: false,
          secret: 'S3CR3T'
        },
        foods: [
          { text: 'Select One', value: null },
          { text: 'Carrots', value: 1 },
          { text: 'Beans', value: 2 },
          { text: 'Corn', value: 3 }
        ]
      }
    },
    methods: {
      onSubmit (evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
