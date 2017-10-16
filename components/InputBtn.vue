<template lang="pug">
  .u-input-btn(@click="click")
    .u-select
      .u-select-current.form-control.placeholder
        slot
        i.fa(v-if="appendIcon", :class="`fa-${appendIcon}`", aria-hidden="true")
</template>

<script>
  export default {
    props: {
      appendIcon: String
    },
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

        .fa {
          padding-left: 1.1rem;
          font-size: .75rem;
        }
      }
    }
  }
</style>
