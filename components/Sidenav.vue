<template lang="pug">
  nav.u-sidenav
    ul.list-unstyled
      li(v-b-toggle.collapse-component)
        a(href="#")
          i.fa.fa-file-text-o(aria-hidden="true")
          | 元件範例
        ul.list-unstyled.u-sidenav-nested
          li: nuxt-link(to="/form") 表單元件
      li(v-b-toggle.collapse-member)
        a(href="#")
          i.fa.fa-file-text-o(aria-hidden="true")
          | 會員管理
        ul.list-unstyled.u-sidenav-nested
          li: a(href="#") 會員列表
          li: a(href="#") 新增會員
      li(v-b-toggle.collapse-setting)
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
      display: block;
      height: $item-height;
      line-height: $item-height;

      &:hover {
        color: $link-color;
        text-decoration: none;
      }
    }

    :not(.u-sidenav-nested) > li {
      background-color: darken($sidebar-bg, 5%);
      border-bottom: 1px solid lighten($sidebar-bg, 7.5%);

      &:first-child {
        border-top: 1px solid lighten($sidebar-bg, 7.5%);
      }

      &:hover .fa {
        transition: transform .5s cubic-bezier(.25, .8, .5, 1);
        transform: rotate(-360deg);
      }
    }

    .u-sidenav-nested {
      li {
        padding-left: 2.5rem;
        transition: background-color .5s ease;

        &:hover, &.active {
          background-color: $navbar-bg;
        }

        & + li {
          margin-top: 1px;
        }

        a {
          height: $item-height - 10px;
          line-height: $item-height - 10px;
        }
      }
    }
  }
</style>
