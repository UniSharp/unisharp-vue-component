<template lang="pug">
  .u-login.wrapper
    header
      u-logo.mb-2(to="/login", :width="200")
      h1.mb-0.title 客製化網站內容管理系統

    main
      .card
        h3.card-header BLUE ADMIN
        .card-body
          form(@submit.prevent="onSubmit")
            .form-group
              .input-group
                span.input-group-addon.px-3: i.fa.fa-user
                input.form-control(type="text", name="name", v-model="form.name", placeholder="帳號", aria-describedby="name")
            .form-group
              .input-group
                span.input-group-addon.px-3: i.fa.fa-lock
                input.form-control(type="password", name="password", v-model="form.password", placeholder="密碼", aria-describedby="password")
            .form-group
              button.btn.btn-primary.btn-block.btn-lg(type="submit") 登入
            .form-group.mb-0
              nuxt-link.link-dark(to="/login") 忘記密碼

    footer
      p.mb-1 BACKEND - Content Management System
      p.mb-0
        span Made with&nbsp;
        i.fa.fa-heart
        span &nbsp;by&nbsp;
        a(href="http://www.unisharp.com", target="_blank") UniSharp
</template>

<script>
  export default {
    data () {
      return {
        form: {
          name: '',
          password: ''
        }
      }
    },
    methods: {
      onSubmit (e) {
        alert(JSON.stringify(this.form))
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/_variables";

  .wrapper {
    height: 100%;
    background: url(~assets/img/login-bg.jpg) no-repeat center center;
    background-size: cover;

    header, footer {
      position: fixed;
      width: 100%;
      background-color: $sidebar-bg;
      padding: 1.75rem 0;
      text-align: center;
      z-index: 1;
    }

    header {
      top: 0;

      .title {
        color: rgba(255, 255, 255, .8);
        font-weight: 300;
        font-size: .813rem;
        letter-spacing: .5rem;
        text-indent: .5rem;
      }
    }

    main {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;

      .card {
        min-width: 25rem;

        .card-header {
          background-color: darken($gray-100, 2.5%);
          border-bottom: 0;
        }
      }
    }

    footer {
      bottom: 0;

      p {
        font-size: .75rem;
        letter-spacing: .05rem;
        color: rgba(255, 255, 255, .4);
      }
    }
  }
</style>
