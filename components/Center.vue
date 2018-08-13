<template lang="pug">
  .u-login.wrapper
    header
      u-logo.mb-2
      h1.mb-0.title 客製化網站內容管理系統

    main
      slot

    footer
      p.mb-0(v-if="powerBy.isShow")
        span Made with&nbsp;
        i.fa.fa-heart
        span &nbsp;by&nbsp;
        a(:href="powerBy.href", target="_blank") {{ powerBy.title }} 
</template>

<script>
  export default {
    props: {
      powerBy: {
        type: Object,
        default: {
          isShow: true,
          href: 'http://www.unisharp.com',
          title: 'UniSharp'
        }
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
