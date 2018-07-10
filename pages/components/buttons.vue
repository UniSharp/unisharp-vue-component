<template lang="pug">
  u-admin
    section
      h2 Type
      .row
        .col-5
          h5 Primary
          p 用於操作層級較高的功能
        .col-7.align-self-center
          button.btn.btn-primary(type="button") Primary
      .row
        .col-5
          h5 Secondary
          p 用於「儲存」、「完成」等 call to action，一個頁面只能出現一個
        .col-7.align-self-center
          button.btn.btn-secondary(type="button") Secondary
      .row
        .col-5
          h5 Danger
          p 用於操作不可逆的功能（例：刪除）
        .col-7.align-self-center
          button.btn.btn-danger(type="button") Danger
      .row
        .col-5
          h5 Info
          p 用於操作層級較低的功能
        .col-7.align-self-center
          button.btn.btn-info(type="button") Info
      .row
        md.form-control.
          ```
          button.btn.btn-primary(type="button") Primary

          button.btn.btn-secondary(type="button") Secondary

          button.btn.btn-danger(type="button") Danger

          button.btn.btn-info(type="button") Info
          ```
    section
      h2 Size
      .row
        .col-5
          h5 Medium
          p 放置於表格或列表上方時使用
        .col-7.align-self-center
          button.btn.btn-primary(type="button") Primary
          button.btn.btn-secondary(type="button") Secondary
          button.btn.btn-danger(type="button") Danger
          button.btn.btn-info(type="button") Info
      .row
        .col-5
          h5 Small
          p 放置於表格或列表內時使用
        .col-7.align-self-center
          button.btn.btn-primary.btn-sm(type="button") Primary
          button.btn.btn-secondary.btn-sm(type="button") Secondary
          button.btn.btn-danger.btn-sm(type="button") Danger
          button.btn.btn-info.btn-sm(type="button") Info
      .row
        .col-5
          h5 Large
          p 放置於卡片或表單下方時使用
        .col-7.align-self-center
          button.btn.btn-primary.btn-lg(type="button") Primary
          button.btn.btn-secondary.btn-lg(type="button") Secondary
          button.btn.btn-danger.btn-lg(type="button") Danger
          button.btn.btn-info.btn-lg(type="button") Info
      .row
        md.form-control.
          ```
          button.btn.btn-primary(type="button") Medium

          button.btn.btn-primary.btn-sm(type="button") Small

          button.btn.btn-primary.btn-lg(type="button") Large
          ```
    section
      h2 Square
      .row
        .col-5
          h5 Medium
        .col-7.align-self-center
          button.btn.btn-primary.btn-square(type="button")
            i.fa.fa-plus(aria-hidden="true")
          button.btn.btn-danger.btn-square(type="button")
            i.fa.fa-minus(aria-hidden="true")
          button.btn.btn-info.btn-square(type="button")
            i.fa.fa-plus(aria-hidden="true")
      .row
        .col-5
          h5 Small
        .col-7.align-self-center
          button.btn.btn-primary.btn-sm.btn-square(type="button")
            i.fa.fa-plus(aria-hidden="true")
          button.btn.btn-danger.btn-sm.btn-square(type="button")
            i.fa.fa-minus(aria-hidden="true")
          button.btn.btn-info.btn-sm.btn-square(type="button")
            i.fa.fa-plus(aria-hidden="true")
      .row
        md.form-control.
          ```
          button.btn.btn-primary.btn-square(type="button") Square
          ```
</template>

<script>
  export default {
    //
  }
</script>

<style lang="scss" scoped>
  section {
    width: 90%;
    margin: 0 auto;
    padding: 2rem 0;

    h2 {
      padding: 0 0 1rem;
    }

    .row {
      border-bottom: 1px solid rgba(0, 0, 0, .07);
      padding: 1rem 0;

      p {
        padding: 0;
        margin: 0;
      }
    }
  }

  section .btn + .btn {
    margin-left: 1rem;
  }
</style>
