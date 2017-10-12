<template lang="pug">
  .u-input-btn(@click="click")
    .u-select
      .u-select-current.form-control.placeholder
        slot
</template>

<script>
  export default {
    methods: {
      click (e) {
        this.$emit('click', e)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .u-input-btn {
    cursor: pointer;

    .u-select {
      min-width: auto;

      .u-select-current {
        &:after {
          margin-right: 0;
          border: none;
        }
      }
    }
  }
</style>
