<template lang="pug">
  u-admin
    u-breadcrumb(slot="breadcrumb")
    .container
      form.card.w-100
        h4.card-header Form
        .card-body
          .form-group.row
            label.col-sm-2.col-form-label(for="staticEmail") Email
            .col-sm-10
              input#staticEmail.form-control-plaintext(type="text", value="email@example.com", readonly)
          .form-group.row
            label.col-sm-2.col-form-label(for="inputName") Name
            .col-sm-10
              input#inputName.form-control(placeholder="Name")
          .form-group.row
            label.col-sm-2.col-form-label(for="inputPassword") Password
            .col-sm-10
              input#inputPassword.form-control(type="password", placeholder="Password")
          .form-group.row
            label.col-sm-2.col-form-label(for="select") Select
            .col-sm-10
              u-select#select(v-model="form.selected", :options="options")
          .form-group.row
            label.col-sm-2.col-form-label Radio
            .col-sm-10
              u-radio(v-model="form.selected", :options="options")
          .form-group.row
            label.col-sm-2.col-form-label Radio Stacked
            .col-sm-10
              u-radio(v-model="form.selected", :options="options", stacked)
          .form-group.row
            label.col-sm-2.col-form-label Checkbox
            .col-sm-10
              .col-form-label
                u-checkbox(v-model="form.checked", :key="key", :value="option.value", v-for="(option, key) in options") {{ option.text }}
          .form-group.row
            label.col-sm-2.col-form-label Checkbox Stacked
            .col-sm-10
              .col-form-label.custom-controls-stacked
                u-checkbox(v-model="form.checked", :key="key", :value="option.value", v-for="(option, key) in options") {{ option.text }}
          .form-group.row
            label.col-sm-2.col-form-label Switch
            .col-sm-10
              u-switch(v-model="form.switch")
          .form-group.row
            label.col-sm-2.col-form-label Checkbox
            .col-sm-10
              .col-form-label
                u-checkbox(v-model="form.switch") Checkbox
          .card-actions
            button.btn.btn-info.btn-lg Cancel
            button.btn.btn-primary.btn-lg Submit
      .card.w-100
        h4.card-header Featured
        .card-body
          h4.card-title Special title treatment
          p.card-text With supporting text below as a natural lead-in to additional content.
          .card-actions
            a.btn.btn-info.btn-lg(href="#") Info Button
            a.btn.btn-primary.btn-lg(href="#") Primary Button
</template>

<script>
  import UAdmin from '~/components/Admin'
  import UBreadcrumb from '~/components/Breadcrumb'
  import USelect from '~/components/Select'
  import URadio from '~/components/Radio'
  import UCheckbox from '~/components/Checkbox'
  import USwitch from '~/components/Switch'

  export default {
    components: { UAdmin, UBreadcrumb, USelect, URadio, UCheckbox, USwitch },
    data () {
      return {
        options: [{
          text: 'One',
          value: 1
        }, {
          text: 'Two',
          value: 2
        }, {
          text: 'Three',
          value: 3
        }, {
          text: 'Four',
          value: 4
        }, {
          text: 'Five',
          value: 5
        }],
        form: {
          selected: 3,
          checked: [1, 3, 5],
          switch: false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card + .card {
    margin-top: 2rem;
  }
</style>
