<template lang="pug">
  .u-user-dropdown
    b-nav-item-dropdown(right)
      template(slot="button-content")
        i.fa.fa-user(aria-hidden="true")
        span User
      b-dropdown-item(href="#")
        i.fa.fa-cog(aria-hidden="true")
        span 更改密碼
      b-dropdown-item(href="#")
        i.fa.fa-sign-out(aria-hidden="true")
        span 登出
</template>

<script>
  export default {
  }
</script>

<style>

</style>
