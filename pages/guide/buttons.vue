<template lang="pug">
  u-admin
    u-breadcrumb(slot="breadcrumb")
    section
      h2 類型
      .row
        .col-5
          h5 Primary
          p 用於操作層級較高的功能
        .col-7.align-self-center
          button.btn.btn-primary(type="button") Primary
      .row
        .col-5
          h5 Secondary
          p 用於 call to action，一個頁面只能出現一個
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
    section
      h2 尺寸
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
</template>

<script>
  // import Logo from '~/components/Logo.vue'
  import UAdmin from '~/components/Admin'
  import UBreadcrumb from '~/components/Breadcrumb'

  export default {
    components: { UAdmin, UBreadcrumb }
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
