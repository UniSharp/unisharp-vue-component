<template lang="pug">
  .u-select
    u-dropdown(
      :class="{ filterable }",
      @show="onDropdownShow",
      ref="dropdown",
      :disabled="disabled"
    )
      input.w-100.p-0.u-select-filter(
        slot="toggle",
        v-model="filter",
        ref="filter",
        v-if="filterable",
        :placeholder="placeholder",
        @keydown="onKeydown",
        @focus="$refs.dropdown.show()",
        @compositionstart="handleComposition(isComposition = true)",
        @compositionend="handleComposition(isComposition = false)"
      )
      .u-select-current.form-control(
        slot="toggle",
        :class="{ placeholder: current === placeholder, 'is-invalid': !!error }",
        v-else
      ) {{ current }}
      .dropdown-menu.u-select-options(ref="menu")
        .u-select-options-wrapper(v-if="pinnedOption")
          a.dropdown-item(:class="{ hover: hover < 0 }", @click.prevent.stop="selectPinned")
            | {{ pinnedOptionPrefix }}{{ pinnedOption }}
        .u-select-options-wrapper
          a.dropdown-item(
            @mouseenter="hover = key",
            @click.prevent.stop="select(option.value)",
            :class="{ hover: hover == key, disabled: option.disabled }",
            v-for="(option, key) in filteredOptions",
            :key="key",
            ref="options"
          ) {{ option.text }}
    .invalid-feedback(v-if="error") {{ error }}
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
        type: Boolean
      },
      noPlaceholder: {
        type: Boolean
      },
      pinnedOption: {
        type: [String, Object],
        default: null
      },
      pinnedOptionPrefix: {
        type: String,
        default: ''
      },
      search: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      error: {
        type: String
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

        if (!this.noPlaceholder) {
          options.unshift({ text: this.placeholder, value: null })
        }

        if (this.pinnedOption) {
          this.hover = -1
        }
        return options
      },
      _: () => _
    },
    data () {
      return {
        isComposition: false,
        filter: '',
        hover: 0
      }
    },
    methods: {
      select (selected) {
        if (_.find(this.normalizedOptions, { value: selected }).disabled) {
          return
        }

        this.$refs.dropdown.hide()
        this.$emit('change', selected)
        this.cleanFilter()
      },
      selectPinned () {
        this.insert(this.pinnedOption)
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

        if (this.filterable) {
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
            // isComposition 表示是否在用輸入法打字
            if (this.isComposition) {
              return
            }

            if (this.filteredOptions[this.hover]) {
              this.select(this.filteredOptions[this.hover].value)
            } else {
              this.insert(this.filter)
            }

            this.cleanFilter()
            this.$refs.dropdown.show()
            break

          case 'ESC':
            this.cleanFilter()
            this.$refs.dropdown.hide()
            break

          default:
            this.$emit('keydown', e)
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

  $max-items: 5;

  .u-select {
    .u-select-options {
      max-height: ($font-size-base * $line-height-base + $dropdown-item-padding-y * 2) * $max-items + $dropdown-padding-y * 2;
    }

    .u-dropdown.active .u-select-current, .u-select-current:hover {
      &.is-invalid {
        border-color: $form-feedback-invalid-color !important;

        &:hover {
          box-shadow: $btn-invalid-box-shadow;
        }
      }
    }

    .invalid-feedback {
      display: block !important;
    }
  }
</style>
