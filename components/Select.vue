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
      :placeholder="placeholder",
      @keydown="onKeydown",
      @focus="$refs.dropdown.show()",
      @blur="$refs.dropdown.hide()"
    )
    .u-select-current.form-control(slot="toggle", :class="{ placeholder: current === placeholder }", v-else) {{ current }}
    .dropdown-menu.u-select-options(ref="menu")
      .u-select-options-wrapper(v-if="filteredOptions.length")
        a.dropdown-item(
          @mouseenter="hover = key",
          @click.prevent.stop="select(option.value)",
          :class="{ hover: hover == key, disabled: option.disabled }",
          v-for="(option, key) in filteredOptions",
          :key="key",
          ref="options"
        ) {{ option.text }}
      .u-select-options-wrapper(v-else)
        a.dropdown-item
          | {{ empty }}

</template>

<script>
  import _ from 'lodash'
  import Vue from 'vue'
  import Normalize from '../mixins/normalize'

  export default {
    mixins: [Normalize],
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
      },
      empty: {
        type: String,
        default: 'No Options'
      },
      search: {
        type: String,
        default: ''
      }
    },
    watch: {
      search (value) {
        this.filter = this.search
      },
      filter (value) {
        this.$emit('update:search', value)
      }
    },
    computed: {
      current () {
        if (_.has(this.filteredOptions[0], 'text')) {
          let current = _.find(this.filteredOptions, { value: this.selected })
          return current ? current.text : this.placeholder
        }
        return this.filteredOptions.includes(this.selected) ? this.selected : this.placeholder
      },
      normalizedOptions () {
        return this.normalize(this.options)
      },
      filteredOptions () {
        let options = []

        if (this.filter) {
          let needle = this.filter.toLowerCase()

          this.normalizedOptions.forEach(option => {
            let haystack = option.text.toLowerCase()

            if (haystack === needle) {
              options.unshift(option)
            } else if (haystack.indexOf(needle) !== -1) {
              options.push(option)
            }
          })
        } else {
          options = this.normalizedOptions
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
        hover: 0
      }
    },
    methods: {
      select (selected) {
        this.$refs.dropdown.hide()
        this.$emit('change', selected)
        this.cleanFilter()
      },
      insert (inserted) {
        this.$refs.dropdown.hide()
        this.$emit('insert', inserted)
        this.cleanFilter()
      },
      cleanFilter () {
        this.filter = ''
      },
      onDropdownShow () {
        this.hover = 0

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
            if (this.filteredOptions[this.hover]) {
              this.select(this.filteredOptions[this.hover].value)
            } else {
              this.insert(this.filter)
            }
            this.filter = ''
            this.$refs.dropdown.show()
            break

          case 'BS':
            this.filter = this.filter.slice(0, this.filter.length - 1)
            this.$emit('keydown', e)
            break

          case 'ESC':
            this.cleanFilter()
            this.$refs.dropdown.hide()
            break

          default:
            return
        }

        if (['UP', 'DOWN'].indexOf(key) !== -1) {
          let menuRect = this.$refs.menu.getBoundingClientRect()
          let optionRect = this.$refs.options[this.hover].getBoundingClientRect()

          if (key === 'DOWN' && this.hover === 0) {
            this.$refs.menu.scrollTop = 0
          } else if (key === 'UP' && this.hover === this.filteredOptions.length - 1) {
            this.$refs.menu.scrollTop = menuRect.height
          } else if (optionRect.bottom > menuRect.bottom) {
            this.$refs.menu.scrollTop += optionRect.height
          } else if (optionRect.top < menuRect.top) {
            this.$refs.menu.scrollTop -= optionRect.height
          }
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
  $max-items: 5;

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
      color: $input-color;

      &::placeholder {
        color: $input-placeholder-color;
        opacity: 1;
      }
    }

    .u-select-current {
      @include transition;

      display: flex;
      align-items: center;
      justify-content: space-between;
      color: $input-color;

      &.placeholder {
        color: $input-placeholder-color;
      }

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
      max-height: ($font-size-base * $line-height-base + $dropdown-item-padding-y * 2) * $max-items + $dropdown-padding-y * 2;
      overflow: auto;

      .dropdown-item {
        line-height: $line-height-base;
      }
    }

    &.active .u-select-current, .u-select-current:hover {
      background-color: $hover-bg;
      border-color: $hover-bg !important;
      color: $hover-fg;

      &:after {
        border-top-color: $hover-fg;
      }
    }
  }
</style>
