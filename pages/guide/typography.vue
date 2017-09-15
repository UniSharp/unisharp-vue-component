<template lang="pug">
  u-admin
    u-breadcrumb(slot="breadcrumb")
    section
      .text-box
        h1 h1 - Admin heading
      .text-box
        h2 h2 - Admin heading
      .text-box
        h3 h3 - Admin heading
      .text-box
        h4 h4 - Admin heading
      .text-box
        h5 h5 - Admin heading
      .text-box
        h6 h6 - Admin heading
      .text-box
        p p - Admin content text

</template>

<script>
  // import Logo from '~/components/Logo.vue'
  import UAdmin from '~/components/Admin'
  import UBreadcrumb from '~/components/Breadcrumb'

  export default {
    components: { UAdmin, UBreadcrumb }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/variables";

  section {
    width: 90%;
    margin: 0 auto;

    h1, h2, h3, h4, h5, h6, p {
      padding: 0;
      margin: 0;
    }
  }

  .text-box {
    padding: 1.5rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }

</style>
