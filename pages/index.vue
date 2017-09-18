<template lang="pug">
  u-admin
    u-breadcrumb(slot="breadcrumb")
    .container.d-flex.align-items-center.justify-content-center
      .logo
      .text.d-flex.flex-column.justify-content-center
        h1 BLUE
        h1 ADMIN
</template>

<script>
  export default {
    //
  }
</script>

<style lang="scss" scoped>
  $logo-size: 5.5rem;
  $square-size: $logo-size * .34375;
  $trangle-size: $logo-size * .28125;
  $square-position: ($logo-size - $square-size) / 2;
  $trangle-position: ($logo-size - $trangle-size) / 2;

  .logo {
    position: relative;
    width: $logo-size;
    height: $logo-size;
    border-radius: 50%;
    background-color: #7ac5c1;

    &:before {
      content: "";
      position: absolute;
      width: $square-size;
      height: $square-size;
      top: $square-position;
      left: $square-position;
      background-color: #e1e9eb;
    }

    &:after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      top: $trangle-position;
      right: $square-position;
      border-top: $trangle-size / 2 solid transparent;
      border-bottom: $trangle-size / 2 solid transparent;
      border-right: $trangle-size / 2 solid #7ac5c1;
    }
  }

  h1 {
    margin-bottom: 0;
    margin-left: 1.5rem;
    font-size: 2.5rem;
    letter-spacing: .2rem;
    font-weight: 500;
  }

  .container {
    margin: -1.5rem auto;
    height: calc(100vh - 153px);
  }
</style>
