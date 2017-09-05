<template lang="pug">
  b-container(:fluid="true")
    b-row
      b-col(cols="2")
        nav
      b-col(cols="10")
        header
        nuxt
</template>

<style>
  *:hover {
    outline: 1px solid rgba(255, 0, 0, .5);
  }
</style>
