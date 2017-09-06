<template lang="pug">
  nav.u-sidenav
    ul.list-unstyled
      li
        a(href="#")
          i.fa.fa-file-text-o(aria-hidden="true")
          | 元件範例
        ul.list-unstyled.u-sidenav-nested
          li: nuxt-link(to="/form") 表單元件
      li
        a(href="#")
          i.fa.fa-file-text-o(aria-hidden="true")
          | 會員管理
        ul.list-unstyled.u-sidenav-nested
          li: a(href="#") 會員列表
          li: a(href="#") 新增會員
      li
        a(href="#")
          i.fa.fa-file-text-o(aria-hidden="true")
          | 全站設定
</template>

<script>
  export default {
    //
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/variables";

  $item-height: 44px;

  .u-sidenav {
    font-weight: 300;

    .fa {
      width: 1rem;
      text-align: center;
      margin: 0 .5rem 0 1rem;
    }

    a {
      display: flex;
      align-items: center;
      height: $item-height;
      transition: color .3s ease;

      .fa {
        margin-top: 1px;
      }

      &:hover {
        text-decoration: none;
      }
    }

    :not(.u-sidenav-nested) > li {
      display: flex;
      flex-direction: column;
      background-color: $sidebar-bg;
      border-bottom: 1px solid $navbar-bg;

      &:first-child {
        border-top: 1px solid $navbar-bg;
      }

      a:hover .fa {
        transition: transform .5s cubic-bezier(.25, .8, .5, 1);
        transform: rotate(-360deg);
      }
    }

    .u-sidenav-nested {
      li {
        padding-left: 2.5rem;
        background-color: darken($sidebar-bg, 5%);
        transition: background-color .3s ease;

        & + li {
          margin-top: 1px;
        }

        a {
          height: $item-height - 10px;
        }

        &:hover, &.active {
          background-color: $navbar-bg;
        }
      }
    }
  }
</style>
