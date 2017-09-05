<template lang="pug">
  .u-nav.d-flex.flex-column
    header.d-flex.justify-content-center
      a.py-4.logo(href="#")
        img(src="~assets/img/logo.png")
    nav
      ul.list-unstyled
        li(v-b-toggle.collapse-component)
          i.fa.fa-file-text-o(aria-hidden="true")
          span 元件範例
          b-collapse#collapse-component.list-unstyled(tag="ul")
            li: nuxt-link(to="/form") 表單元件
        li(v-b-toggle.collapse-member)
          i.fa.fa-file-text-o(aria-hidden="true")
          span 會員管理
          b-collapse#collapse-member.list-unstyled(tag="ul")
            li: a(href="#") 會員列表
            li: a(href="#") 新增會員
        li(v-b-toggle.collapse-setting)
          i.fa.fa-file-text-o(aria-hidden="true")
          span 全站設定
</template>

<script>
  export default {
    //
  }
</script>

<style lang="scss" scoped>
  .u-nav {
    .logo {
      display: block;

      img {
        width: 170px;
        height: 32px;
      }
    }
  }
</style>
