<template lang="pug">
  .bootstrap
    .container
      section.alerts
        h1 Alerts
        hr
        .alert.alert-primary(role="alert")
          | This is a primary alert with&nbsp;
          a.alert-link an example link
          | . Give it a click if you like.
        .alert.alert-secondary(role="alert")
          | This is a secondary alert with&nbsp;
          a.alert-link an example link
          | . Give it a click if you like.
        .alert.alert-success(role="alert")
          | This is a success alert with&nbsp;
          a.alert-link an example link
          | . Give it a click if you like.
        .alert.alert-danger(role="alert")
          | This is a danger alert with&nbsp;
          a.alert-link an example link
          | . Give it a click if you like.
        .alert.alert-warning(role="alert")
          | This is a warning alert with&nbsp;
          a.alert-link an example link
          | . Give it a click if you like.
        .alert.alert-info(role="alert")
          | This is a info alert with&nbsp;
          a.alert-link an example link
          | . Give it a click if you like.
        .alert.alert-light(role="alert")
          | This is a light alert with&nbsp;
          a.alert-link an example link
          | . Give it a click if you like.
        .alert.alert-dark(role="alert")
          | This is a dark alert with&nbsp;
          a.alert-link an example link
          | . Give it a click if you like.
      section.badges
        h1 Badges
        hr
        span.badge.badge-primary Primary
        span.badge.badge-secondary Secondary
        span.badge.badge-success Success
        span.badge.badge-danger Danger
        span.badge.badge-warning Warning
        span.badge.badge-info Info
        span.badge.badge-light Light
        span.badge.badge-dark Dark
      section.badges.pill-badges
        h1 Pill Badges
        hr
        span.badge.badge-pill.badge-primary Primary
        span.badge.badge-pill.badge-secondary Secondary
        span.badge.badge-pill.badge-success Success
        span.badge.badge-pill.badge-danger Danger
        span.badge.badge-pill.badge-warning Warning
        span.badge.badge-pill.badge-info Info
        span.badge.badge-pill.badge-light Light
        span.badge.badge-pill.badge-dark Dark
      section.buttons
        h1 Buttons
        hr
        button.btn.btn-primary(type="button") Primary
        button.btn.btn-secondary(type="button") Secondary
        button.btn.btn-success(type="button") Success
        button.btn.btn-danger(type="button") Danger
        button.btn.btn-warning(type="button") Warning
        button.btn.btn-info(type="button") Info
        button.btn.btn-light(type="button") Light
        button.btn.btn-dark(type="button") Dark
      section.buttons.outline-buttons
        h1 Outline Buttons
        hr
        button.btn.btn-outline-primary(type="button") Primary
        button.btn.btn-outline-secondary(type="button") Secondary
        button.btn.btn-outline-success(type="button") Success
        button.btn.btn-outline-danger(type="button") Danger
        button.btn.btn-outline-warning(type="button") Warning
        button.btn.btn-outline-info(type="button") Info
        button.btn.btn-outline-light(type="button") Light
        button.btn.btn-outline-dark(type="button") Dark
</template>

<script>
  export default {
    //
  }
</script>

<style lang="scss" scoped>
  section {
    padding: 1rem 0;
  }

  section.badges .badge + .badge {
    margin-left: 1rem;
  }

  section.buttons .btn + .btn {
    margin-left: 1rem;
  }
</style>
