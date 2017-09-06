<template lang="pug">
  u-admin
    u-breadcrumb(slot="breadcrumb")
    b-card(header="Form Components", header-tag="header")
      b-form(@submit.prevent='onSubmit')
        //- Label
        .form-group.row
          label.col-md-2 Label：
          .col-md-10.form-control-static I'm label text.
        //- Input
        .form-group.row
          label.col-md-2.col-form-label Email address：
          .col-md-10
            input.form-control(type='email', v-model='form.email', required='', placeholder='Enter email')
        //- Select
        b-form-group(label='Food:', label-for='exampleInput3')
          b-form-select#exampleInput3(:options='foods', required='', v-model='form.food')
        //- Checkbox
        .form-group.row
          label.col-md-2.col-form-label Checkbox：
          .col-md-10.form-inline
            u-checkbox(v-model='form.checked', :checked="true")
            | I'm checkbox
        //- Switch
        .form-group.row
          label.col-md-2.col-form-label Switch：
          .col-md-10
            u-switch(name='switch', v-model='form.checked', @change='showSwitchValue')
        //- Textarea
        b-form-group(label='Textarea:', label-for='exampleInput5')
          b-form-textarea#exampleInput5(placeholder='Enter something', :rows='3', :max-rows='6')
        //- Radio
        .form-group.row
          label.col-md-2
            span.title Radio Inline：
          .col-md-10
            u-radio(name="food4", :options="foods", defaultValue="3")
        .form-group.row
          label.col-md-2
            span.title Radio Stacked：
          .col-md-10
            u-radio(name="food5", :options="foods", stacked="true")
        //- Button
        button.btn.btn-primary(type="button") Submit
        button.btn.btn-default(type="reset") Reset
  </template>

<script>
  // import Logo from '~/components/Logo.vue'
  import UAdmin from '~/components/Admin'
  import UBreadcrumb from '~/components/Breadcrumb'
  import UCheckbox from '~/components/Checkbox'
  import USwitch from '~/components/Switch'
  import URadio from '~/components/Radio'

  export default {
    components: { UAdmin, UBreadcrumb, UCheckbox, USwitch, URadio },
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
      onSubmit (e) {
        alert(JSON.stringify(this.form))
      },
      handleChange () {
        console.log('change')
      },
      handleFocus () {
        console.log('focus')
      },
      handleBlur () {
        console.log('blur')
      },
      handleClick () {
        console.log('click')
      },
      showSwitchValue (value) {
        console.log(value)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
