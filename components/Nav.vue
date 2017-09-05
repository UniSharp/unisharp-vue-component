<template lang="pug">
  .u-nav
    header
      .backend-logo
        a.img-logo(href="#"): img(src="../assets/img/logo_img.png")
    nav
      ul
        li(v-b-toggle.collapse-manager)
          i.fa.fa-file-text-o(aria-hidden="true")
          span 管理員管理
        b-collapse#collapse-manager(tag="ul")
          li: a(href="#") 管理員列表
          li: a(href="#") 新增管理員
        li(v-b-toggle.collapse-member)
          i.fa.fa-file-text-o(aria-hidden="true")
          span 會員管理
        b-collapse#collapse-member(tag="ul")
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
  ul li {
    list-style: none;
  }

  .u-nav {
    width: 100%;
    height: 100%;
    position: absolute;
    background: #3c4350;
    left: 0;
    top: 0;

    header {
      .backend-logo {
        width: 100%;
        padding: 30px 15px;

        a.img-logo img {
          width: 170px;
          height: auto;
        }
      }
    }
  }
</style>
