<template lang="pug">
  .u-switch(@click='toggleValue', :disabled='disabled')
    input(type='checkbox', :name='name', :value='checked').d-none
    .switch(:class="checked === false ? 'off' : ''")
      .bg-primary.text-center ON
      .bg-default.toggle
      .bg-info.text-center OFF
</template>

<script>
  export default {
    data () {
      return {
        checked: true
      }
    },
    mounted () {
      this.checked = this.value
    },
    props: {
      value: {
        default: true
      },
      name: {
        required: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      required: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      toggleValue () {
        if (this.disabled) {
          return
        }
        this.checked = !this.checked
        this.$emit('input', this.checked).$emit('change', this.checked)
      }
    }
  }
</script>

<style lang="scss">
  $height: 38px;
  $block-width: 60px;
  $border-width: 1px;
  $border-color: rgba(77, 83, 94, .15);
  $input-btn-padding-y: 6px;
  $input-btn-padding-x: 12px;

  .u-switch {
    height: $height;
    width: $block-width * 2;
    overflow-x: hidden;
    position: relative;
    border-radius: 5px;
    border: $border-width solid $border-color;
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }
  }

  .switch {
    width: $block-width * 3;
    display: flex;
    position: absolute;
    transition: all .7s;
    left: 0;

    &.off {
      left: - $block-width - $border-width;
    }

    * {
      height: $height - ($border-width * 2);
      width: $block-width;
      padding: $input-btn-padding-y $input-btn-padding-x;
      line-height: $height - ($input-btn-padding-y * 2) - ($border-width * 2);
    }

    .toggle {
      border-left: $border-width solid $border-color;
      border-right: $border-width solid $border-color;
    }
  }
</style>
