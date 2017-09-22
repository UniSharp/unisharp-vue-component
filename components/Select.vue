<template lang="pug">
  u-dropdown.u-select(
    :class="{ filterable: !!this.filterable || this.filterable === '' }",
    @show="onDropdownShow",
    ref="dropdown"
  )
    input.w-100.p-0.u-select-filter(
      slot="toggle",
      v-model="filter",
      ref="filter",
      v-if="!!this.filterable || this.filterable === ''",
      @keydown="onKeydown"
    )
    .u-select-current(slot="toggle", v-else).form-control {{ current }}
    .dropdown-menu.u-select-options
      a.dropdown-item(
        @mouseenter="hover = key",
        @click.prevent.stop="select(option.value)",
        :class="{ hover: hover == key }",
        v-for="(option, key) in getOptions",
        :key="key"
      ) {{ option.text }}
</template>

<script>
  import _ from 'lodash'
  import Vue from 'vue'

  export default {
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
        type: [Array, Object],
        required: true
      },
      selected: {
        required: true
      },
      filterable: {
        default: false
      },
      noPlaceholder: {
        default: false
      }
    },
    computed: {
      current () {
        if (_.has(this.getOptions[0], 'text')) {
          let current = _.find(this.getOptions, { value: this.selected })
          return current ? current.text : this.placeholder
        }
        return this.getOptions.includes(this.selected) ? this.selected : this.placeholder
      },
      normalizedOptions () {
        return _.map(this.options, (v, k) => {
          return {
            value: v.value || v.text || v || k || null,
            text: _.toString(v.text || v)
          }
        })
      },
      getOptions () {
        // support :
        // [{text: 'text', value: 'value'}]
        // or
        // { value: 'text' }
        // or
        // [ 'text', 'text' ] # it will use text as value
        let options = this.normalizedOptions

        if (this.filter) {
          options = _.filter(options, option => option.text.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1)
        }

        if (!this.noPlaceholder && this.noPlaceholder !== '') {
          options.unshift({ text: this.placeholder, value: null })
        }

        return options
      },
      _: () => _
    },
    data () {
      return {
        filter: '',
        hover: -1
      }
    },
    methods: {
      select (selected) {
        this.$refs.dropdown.hide()
        this.$emit('change', selected)
      },
      onDropdownShow () {
        this.hover = -1

        if (!!this.filterable || this.filterable === '') {
          Vue.nextTick(() => this.$refs.filter.focus())
        }
      },
      onKeydown (e) {
        let keyMapping = {
          ArrowUp: 'UP',
          ArrowRight: 'RIGHT',
          ArrowDown: 'DOWN',
          ArrowLeft: 'LEFT',
          Enter: 'CR',
          Escape: 'ESC',
          Backspace: 'BS'
        }
        let key = keyMapping[e.code]

        switch (key) {
          case 'UP':
            this.hover = (this.hover - 1 + this.options.length) % this.options.length
            break

          case 'DOWN':
            this.hover = (this.hover + 1) % this.options.length
            break

          case 'CR':
            this.filter = ''
            this.select(this.options[this.hover].value)
            this.$refs.dropdown.show()
            break

          case 'ESC':
            this.filter = ''
            this.$refs.dropdown.hide()
            break

          default:
            return
        }

        e.preventDefault()
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
    min-width: 10rem;
    position: relative;

    .u-select-filter {
      border: 0;
      outline: 0;
      background: transparent;
    }

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
      width: 100%;
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
