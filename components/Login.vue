<template lang="pug">
  .u-login.wrapper
    header
      u-logo.mb-2
      h1.mb-0.title 客製化網站內容管理系統

    main
      form.card(@submit.prevent="onSubmit")
        h3.card-header.text-uppercase {{ title }}
        .card-body
          .form-group
            i.fa.fa-user
            input.form-control(
              :class="{ 'is-invalid': !!errors.username }",
              type="text",
              name="username",
              v-model="form.username",
              placeholder="帳號",
              aria-describedby="username",
              :disabled="loading",
              required
            )
            .invalid-feedback(v-if="errors.username") {{ errors.username }}
          .form-group
            i.fa.fa-lock
            input.form-control(
              :class="{ 'is-invalid': !!errors.password }",
              type="password",
              name="password",
              v-model="form.password",
              placeholder="密碼",
              aria-describedby="password",
              :disabled="loading",
              required
            )
            .invalid-feedback(v-if="errors.username") {{ errors.password }}
          .card-actions.mt-0.pt-0
            button.btn.btn-primary.btn-block.btn-lg(
              :class="{ disabled: loading, 'btn-loading': loading }",
              type="submit"
            ) 登入
          //- .form-group.mb-0
          //-   nuxt-link.link-dark(to="/login") 忘記密碼

    footer
      p.mb-1 BACKEND - Content Management System
      p.mb-0
        span Made with&nbsp;
        i.fa.fa-heart
        span &nbsp;by&nbsp;
        a(href="http://www.unisharp.com", target="_blank") UniSharp
</template>

<script>
  import config from '~/config'

  export default {
    props: {
      title: {
        type: String,
        default: () => config.index.title
      },
      errors: {
        type: Object,
        default: () => ({})
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        form: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      onSubmit () {
        this.$emit('submit', this.form)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/_variables";

  $icon-width: 2.75rem;

  .wrapper {
    height: 100%;
    background: url(../assets/img/login-bg.jpg) no-repeat center center;
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

      .card {
        margin: auto;
        width: calc(100% - 2rem);
        max-width: 25rem;

        .card-header {
          background-color: darken($gray-100, 2.5%);
          border-bottom: 0;
        }

        .card-body {
          .form-group {
            position: relative;

            .fa {
              position: absolute;
              left: 0;
              top: $input-btn-border-width;
              width: $icon-width;
              height: $input-height-inner;
              display: flex;
              align-items: center;
              justify-content: center;
              border-right: 1px solid $input-border-color;
              color: $input-placeholder-color;

              &:before {
                margin-left: 1px;
              }
            }

            .form-control {
              padding-left: $icon-width + $input-padding-x;
            }
          }
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
