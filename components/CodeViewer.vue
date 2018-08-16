<template lang="pug">
  .u-code-viewer
    ul.nav.nav-tabs.mt-3
      li.nav-item(@click="activeIndex = index", v-for="(codeType, index) in codeTabs", :key="index")
        a.nav-link(:class="{ active: activeIndex === index }", @click="activeIndex = index") {{ codeType }}

    md.form-control.mb-3(:class="{ 'd-none': activeIndex !== index }", v-for="(codeType, index) in codeTabs", :key="index")
      | ```
      |
      slot(:name="codeType")
      |
      | ```
</template>

<script>
  export default {
    data () {
      return {
        codeTabs: ['template', 'script'],
        activeIndex: 0
      }
    }
  }
</script>

<style>
  .u-code-viewer pre {
    margin: 0;
  }
</style>
