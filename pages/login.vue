<template lang="pug">
  .wrapper
    .container-bg
      header
        u-logo(to="#", width="200")
        h1.m-0 客製化網站內容管理系統

      div.main
        .card
          .card-header
            h2 師大十年計畫
          .card-body
            form
              .form-group.row
                .input-group
                  span#name.input-group-addon: i.fa.fa-user
                  input.form-control(type="text", name="name", placeholder="帳號", aria-describedby="name")
              .form-group.row
                .input-group
                  span#password.input-group-addon: i.fa.fa-lock
                  input.form-control(type="password", name="password", placeholder="密碼", aria-describedby="password")
              .form-group.row
                button.btn.btn-default.w-100(type="submit") 登入
              .form-group.row
                a(href="#") 忘記密碼

      footer
        p.mb-0 BACKEND - Content Management System
        p.mb-0
          span Made with
          i.fa.fa-heart
          span by
          a(href="http://www.unisharp.com", target="_blank") UniSharp
</template>

<script>
  import ULogo from '~/components/Logo'

  export default {
    components: { ULogo }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/_admin_variables";

  .wrapper {
    width: 100%;
    height: 100vh;
    position: relative;

    .container-bg {
      margin: 0;
      height: 100%;
      background: url(~assets/img/login-bg.jpg) no-repeat center center;
      background-size: cover;
      position: relative;

      header {
        position: absolute;
        top: 0;
        width: 100%;
        background: $login-bg;
        padding: 30px 0;
        text-align: center;

        h1 {
          text-align: center;
          color: rgba(255, 255, 255, .8);
          font-weight: 300;
          font-size: .813rem;
          letter-spacing: 8px;
          text-indent: 10px;
          padding: 10px 0 0;
        }
      }

      div.main {
        width: 100%;
        height: 100%;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-pack: center;
        justify-content: center;
        padding: 0;

        .card {
          position: inherit;

          .card-header {
            padding: 15px 35px;
          }

          .card-body {
            padding: 15px 35px;
          }
        }
      }

      footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        background: $login-bg;
        padding: 30px 0;
        text-align: center;

        p {
          font-size: .75rem;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, .4);
          text-align: center;
          padding: 2px 0;

          i {
            padding: 0 5px;
          }

          a {
            padding: 0 0 0 3px;
          }
        }
      }
    }
  }
</style>
