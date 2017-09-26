<template lang="pug">
  .loading-logo
    img(src="../assets/img/logo-svg.svg")
</template>

<script>
  export default {
    //
  }
</script>

<style lang="scss" scoped>
  body, html, #__nuxt {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loading-logo {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: sk-rotateplane 2.4s infinite ease-in-out;

    img {
      width: 54px;
    }
  }

  @keyframes sk-rotateplane {
    0% {
      transform: rotateX(0deg) rotateY(0deg);
    }

    25% {
      transform: rotateX(-180deg) rotateY(0deg);
    }

    50% {
      transform: rotateX(-180deg) rotateY(-180deg);
    }

    75% {
      transform: rotateX(-360deg) rotateY(-180deg);
    }

    100% {
      transform: rotateX(-360deg) rotateY(-360deg);
    }
  }
</style>