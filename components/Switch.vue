<template lang="pug">
  .u-switch(@click='toggleValue')
    input(type='checkbox', :name='name', :value='checked').d-none
    .switch(:class="checked === false ? 'off' : ''")
      .on-side.bg-primary.text-center ON
      .toggle.bg-default
      .off-side.bg-default.text-center OFF
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
        default: false
      },
      required: {
        default: false
      }
    },
    methods: {
      toggleValue () {
        this.checked = !this.checked
        this.$emit('input', this.checked).$emit('change', this.checked)
      }
    }
  }
</script>

<style lang="scss">
  $height: 38px;
  $width: $height * 1.5;
  $border-width: 1px;
  $border-color: rgba(77, 83, 94, .15);
  $input-btn-padding-y: 6px;
  $input-btn-padding-x: 12px;

  @mixin with-words() {
    padding: $input-btn-padding-y $input-btn-padding-x;
  }

  .u-switch {
    height: $height;
    width: $width * 2;
    overflow-x: hidden;
    position: relative;
    border-radius: 5px;
    border: $border-width solid $border-color;
  }

  .switch {
    height: $height;
    width: $width * 3;
    display: flex;
    position: absolute;
    transition: all .7s;
    left: 0;
  }

  .switch.off {
    left: - $width - $border-width;
  }

  .on-side {
    height: $height;
    width: $width;

    @include with-words();
  }

  .toggle {
    height: $height;
    width: $width;
    border-left: $border-width solid $border-color;
    border-right: $border-width solid $border-color;
  }

  .off-side {
    height: $height;
    width: $width;

    @include with-words();
  }
</style>
