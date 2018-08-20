<template lang="pug">
  .u-code-viewer
    ul.nav.nav-tabs.mt-3
      li.nav-item(@click="activeIndex = index", v-for="(codeType, index) in codeTabs", :key="index", v-if="$slots[codeType]")
        a.nav-link(:class="{ active: activeIndex === index }", @click="activeIndex = index") {{ codeType }}

    md.code-container.form-control.mb-3(:class="{ 'd-none': activeIndex !== index }", v-for="(codeType, index) in codeTabs", :key="index", v-if="$slots[codeType]")
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

<style lang="scss">
  .code-container {
    height: auto;

    pre {
      margin: 0;
    }
  }
</style>
