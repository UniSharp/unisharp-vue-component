<template lang="pug">
  .u-welcome.container.d-flex.flex-column.align-items-center.justify-content-center
    u-face.smile.mt-5.mb-4
    h2.h1 歡迎登入
    h1.h2.mb-3 {{ config.index.title }}
    p << 請從左側目錄選擇要管理的功能
</template>

<script>
  import config from '~/config'

  export default {
    computed: {
      config: () => config
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables";

  .u-welcome {
    color: darken($body-bg, 20%);

    h2.h1 {
      font-size: 3.125rem;
    }
  }
</style>
