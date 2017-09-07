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
        u-select(v-model="form.food", :options="foods")
        //- Select
        b-form-group(label='Food:', label-for='exampleInput3')
          b-form-select#exampleInput3(:options='foods', required='', v-model='form.food')
        //- Checkbox
        .form-group.row
          label.col-md-2.col-form-label Checkbox：
          .col-md-10.form-inline
            u-checkbox(v-model="check", value="yes")
              | Option 1
        //- Checkboxes
        .form-group.row
          label.col-md-2.col-form-label Checkbox：
          .col-md-10.form-inline
            u-checkbox(v-model="checks", value="1")
              | Option 1
            u-checkbox(v-model="checks", value="2")
              | Option 2
            u-checkbox(v-model="checks", value="3")
              | Option 3
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
            u-radio(name="food1", :options="foods", v-model="form.radio.value")
        .form-group.row
          label.col-md-2
            span.title Radio Stacked：
          .col-md-10
            u-radio(name="food2", :options="foods", stacked="true", v-model="form.radio.value")
        .form-group.row
          label.col-md-2
            span.title Radio Inline：
          .col-md-10
            input(type="text", :value="showRadioText(form.radio.value)")
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
  import USelect from '~/components/Select'

  export default {
    components: { UAdmin, UBreadcrumb, UCheckbox, USwitch, URadio, USelect },
    data () {
      return {
        check: 'yes',
        checks: ['1', '2'],
        form: {
          email: '',
          name: '',
          food: null,
          checked: false,
          secret: 'S3CR3T',
          radio: {
            value: 1
          }
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
      showSwitchValue (value) {
        console.log(value)
      },
      showRadioText (value) {
        return this.foods.find((food) => {
          if (food.value === value) {
            return food
          }
        }).text
      }
    },
    watch: {
      check (val) {
        console.log(val)
      },
      checks (val) {
        console.log(val)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
