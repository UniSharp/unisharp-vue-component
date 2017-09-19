<template lang="pug">
  u-admin(title="Card")
    .container
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
              input#name.form-control(placeholder="Name")
          .form-group.row
            label.col-sm-2.col-form-label(for="password") Password
            .col-sm-10
              input#password.form-control(v-model="form.password", type="password", placeholder="Password")
          .form-group.row
            label.col-sm-2.col-form-label(for="btnPassword") Password
            .col-sm-9.pr-0
              input#btnPassword.form-control(v-model="form.password", type="password", placeholder="Password")
            .col-sm-1
              .btn.btn-info.btn-block.px-0(@click.prevent="form.password = ''")
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
          password: '',
          selected: 3,
          checked: [1, 3, 5],
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
