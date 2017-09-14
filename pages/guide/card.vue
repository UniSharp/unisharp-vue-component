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
            label.col-sm-2.col-form-label(for="inputPassword") Password
            .col-sm-10
              input#inputPassword.form-control(type="password", placeholder="Password")
          .form-group.row
            label.col-sm-2.col-form-label(for="exampleSelect") Example select
            .col-sm-10
              u-select#exampleSelect(v-model="selected", :options="options")
          .form-group.row
            label.col-sm-2.col-form-label(for="exampleRadio") Example radio
            .col-sm-10
              u-radio#exampleRadio(v-model="selected", :options="options")
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

  export default {
    components: { UAdmin, UBreadcrumb, USelect, URadio },
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
        selected: null
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card + .card {
    margin-top: 2rem;
  }
</style>
