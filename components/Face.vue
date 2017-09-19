<template lang="pug">
  .face
    .eye
    .eye
    .mouth
</template>

<script>
  export default {
    //
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables";

  $face-size: 10rem;
  $face-color: darken($body-bg, 10%);
  $face-border-width: .75rem;
  $mouth-border-width: .625rem;
  $eye-size: 1rem;

  .face {
    position: relative;
    width: $face-size;
    height: $face-size;
    border-radius: 50%;
    border: $face-border-width solid $face-color;
    display: flex;
    justify-content: center;
    flex: 0 0 $face-size;

    .eye {
      position: absolute;
      width: $eye-size;
      height: $eye-size;
      border-radius: 50%;
      background-color: $face-color;
      top: 2.5rem;
    }

    .eye:nth-child(1) {
      left: $face-size * .2;
    }

    .eye:nth-child(2) {
      right: $face-size * .2;
    }

    .mouth {
      position: absolute;
    }

    &.smile, &.sad {
      .mouth {
        width: $face-size * .75;
        height: $face-size * 1.5;
        border: $mouth-border-width solid transparent;
        border-bottom-color: $face-color;
        border-bottom-left-radius: $face-size * .365 $face-size * .75;
        border-bottom-right-radius: $face-size * .365 $face-size * .75;
        bottom: 1.5rem;

        &:before, &:after {
          content: "";
          position: absolute;
          width: $mouth-border-width;
          height: $mouth-border-width;
          border-radius: 50%;
          background-color: $face-color;
          bottom: .725rem;
        }

        &:before {
          left: .725rem;
        }

        &:after {
          right: .725rem;
        }
      }
    }

    &.sad .mouth {
      transform: rotateZ(180deg) scale(.9) translateY($face-size * -1.35);
    }

    &.neutral .mouth {
      width: $face-size * .5;
      height: $mouth-border-width;
      border-radius: $mouth-border-width / 2;
      background-color: $face-color;
      bottom: 2.5rem;
    }
  }
</style>
