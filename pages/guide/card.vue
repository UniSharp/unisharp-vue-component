<template lang="pug">
  u-admin
    u-breadcrumb(slot="breadcrumb")
    .container
      .card.w-100
        h4.card-header Featured
        .card-body
          h4.card-title Special title treatment
          p.card-text With supporting text below as a natural lead-in to additional content.
          .card-actions
            a.btn.btn-info.btn-lg(href="#") Info Button
            a.btn.btn-primary.btn-lg(href="#") Primary Button
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
          .card-actions
            button.btn.btn-info.btn-lg Cancel
            button.btn.btn-primary.btn-lg Submit
</template>

<script>
  import UAdmin from '~/components/Admin'
  import UBreadcrumb from '~/components/Breadcrumb'

  export default {
    components: { UAdmin, UBreadcrumb }
  }
</script>

<style lang="scss" scoped>
  .card + .card {
    margin-top: 2rem;
  }
</style>
