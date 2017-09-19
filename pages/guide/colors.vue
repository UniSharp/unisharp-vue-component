<template lang="pug">
  u-admin
    section
      h3 主要顏色
      p 名稱即為對應的 variables 變數名稱
      .d-flex
        .color-box
          .square.blue
          p $blue
        .color-box
          .square.yellow
          p $yellow
        .color-box
          .square.red
          p $red
        .color-box
          .square.white
          p $white
        .color-box
          .square.black
          p $black
    section
      h3 灰階色系組
      p 名稱即為對應的 variables 變數名稱
      .d-flex
        .color-box
          .square.gray-100
          p $gray-100
        .color-box
          .square.gray-200
          p $gray-200
        .color-box
          .square.gray-300
          p $gray-300
        .color-box
          .square.gray-400
          p $gray-400
        .color-box
          .square.gray-500
          p $gray-500
        .color-box
          .square.gray-600
          p $gray-600
        .color-box
          .square.gray-700
          p $gray-700
        .color-box
          .square.gray-800
          p $gray-800
        .color-box
          .square.gray-900
          p $gray-900

</template>

<script>
  export default {
    //
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/variables";

  section {
    width: 90%;
    margin: 0 auto;
    padding: 2rem 0;

    .color-box {
      margin: 15px 0 0;

      p {
        text-align: center;
        margin: 10px 0 0;
      }
    }

    .color-box + .color-box {
      margin: 15px 0 0 15px;
    }

    .square {
      width: 80px;
      height: 80px;
      border-radius: 16px;
    }
  }

  .blue {
    background-color: $blue;
  }

  .yellow {
    background-color: $yellow;
  }

  .red {
    background-color: $red;
  }

  .white {
    background-color: $white;
  }

  .gray-100 {
    background-color: $gray-100;
  }

  .gray-200 {
    background-color: $gray-200;
  }

  .gray-300 {
    background-color: $gray-300;
  }

  .gray-400 {
    background-color: $gray-400;
  }

  .gray-500 {
    background-color: $gray-500;
  }

  .gray-600 {
    background-color: $gray-600;
  }

  .gray-700 {
    background-color: $gray-700;
  }

  .gray-800 {
    background-color: $gray-800;
  }

  .gray-900 {
    background-color: $gray-900;
  }

  .black {
    background-color: $black;
  }

</style>
