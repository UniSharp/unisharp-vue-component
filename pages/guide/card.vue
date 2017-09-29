<template lang="pug">
  u-admin
    form.card.w-100
      h4.card-header Form
      .card-body
        .form-group.row
          label.col-sm-2.col-form-label(for="email") Email
          .col-sm-10
            input#email.form-control-plaintext(type="text", value="email@example.com", readonly)
        .form-group.row
          label.col-sm-2.col-form-label(for="name") Name
          .col-sm-10
            input#name.form-control(v-model="form.name", placeholder="Name")
        .form-group.row
          label.col-sm-2.col-form-label(for="name-2") Two columns
          .col-sm-4.mb-3.mb-sm-0
            input#name-2.form-control(v-model="form.name", placeholder="Name")
          label.col-sm-2.col-form-label.text-sm-right(for="name-3") Two columns
          .col-sm-4
            input#name-3.form-control(v-model="form.name", placeholder="Name")
        .form-group.row
          label.col-sm-2.col-form-label(for="password") Password
          .col-sm-10
            input#password.form-control(v-model="form.password", type="password", placeholder="Password")
        .form-group.row
          label.col-sm-2.col-form-label(for="btnPassword") Password
          .col-sm-10.d-flex
            input#btnPassword.form-control.mr-3.col(v-model="form.password", type="password", placeholder="Password")
            .btn.btn-info.btn-square(@click.prevent="form.password = ''")
              i.fa.fa-eraser
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
          label.col-sm-2.col-form-label Input Tag
          .col-sm-10
            u-input-tag(v-model="form.checked", :tags="options", placeholder="Tags")
        .form-group.row
          label.col-sm-2.col-form-label Switch
          .col-sm-10
            u-switch(v-model="form.switch")
        .form-group.row
          label.col-sm-2.col-form-label Checkbox
          .col-sm-10
            .col-form-label
              u-checkbox(v-model="form.switch") Checkbox
        .form-group.row
          label.col-sm-2.col-form-label Checkbox
          .col-sm-4.mb-3.mb-sm-0
            .col-form-label
              u-checkbox(v-model="form.switch") Checkbox
          label.col-sm-2.col-form-label.text-sm-right Checkbox
          .col-sm-4
            .col-form-label
              u-checkbox(v-model="form.switch") Checkbox
        .form-group.row
          label.col-sm-2.col-form-label Uploader
          .col-sm-10
            u-uploader(v-model="form.files")
        .card-actions
          button.btn.btn-info.btn-lg Cancel
          button.btn.btn-primary.btn-lg Submit
    .card.w-100
      h4.card-header Featured
      .card-body
        h4.card-title Special title treatment
        p.card-text With supporting text below as a natural lead-in to additional content.
        .card-actions
          a.btn.btn-info.btn-lg Info Button
          a.btn.btn-primary.btn-lg Primary Button
</template>

<script>
  export default {
    data () {
      return {
        options: [{
          text: 'I',
          value: 1
        }, {
          text: 'II',
          value: 2
        }, {
          text: 'III',
          value: 3
        }, {
          text: 'IV',
          value: 4
        }, {
          text: 'V',
          value: 5
        }, {
          text: 'VI',
          value: 6
        }, {
          text: 'VII',
          value: 7
        }, {
          text: 'VIII',
          value: 8
        }, {
          text: 'IX',
          value: 9
        }],
        form: {
          name: '',
          password: '',
          selected: 5,
          checked: [2, 5, 8],
          switch: false,
          files: []
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
