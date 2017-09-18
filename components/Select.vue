<template lang="pug">
  u-dropdown.u-select(ref="dropdown")
    .u-select-current(slot="toggle").form-control {{ current }}
    .dropdown-menu.u-select-options
      u-option(@change="select", v-for="(option, key) in options", :key="key", :text="option.text", :value="option.value")
</template>

<script>
  import _ from 'lodash'
  import UDropdown from './Dropdown'
  import UOption from './Option'

  export default {
    components: { UDropdown, UOption },
    model: {
      prop: 'selected',
      event: 'change'
    },
    props: {
      placeholder: {
        type: String,
        default: '請選擇'
      },
      options: {
        type: Array,
        required: true
      },
      selected: {
        required: true
      }
    },
    computed: {
      current () {
        let current = _.find(this.options, { value: this.selected })

        return current ? current.text : this.placeholder
      }
    },
    methods: {
      select (selected) {
        this.$refs.dropdown.hide()
        this.$emit('change', selected)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables";
  @import "node_modules/bootstrap/scss/mixins/transition";

  $hover-bg: theme-color("primary");
  $hover-fg: #fff;

  @if (((red($hover-bg) * 299) + (green($hover-bg) * 587) + (blue($hover-bg) * 114)) / 1000 >= 150) {
    $hover-fg: #111;
  }

  .u-select {
    .u-select-current {
      @include transition;

      display: flex;
      align-items: center;
      justify-content: space-between;
      color: $input-placeholder-color;

      &:after {
        @include transition;

        content: "";
        margin-right: -.5rem;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid $input-placeholder-color;
      }
    }

    .u-select-options {
      width: calc(100% - #{$grid-gutter-width});
    }

    &.active .u-select-current, .u-select-current:hover {
      background-color: $hover-bg;
      border-color: $hover-bg;
      color: $hover-fg;

      &:after {
        border-top-color: $hover-fg;
      }
    }
  }
</style>
