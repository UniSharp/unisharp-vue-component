<template lang="pug">
  .u-checkbox
    label.custom-control.form-check-inline.custom-checkbox
      input.custom-control-input(
        :class="{ 'is-invalid': !!error }"
        type="checkbox",
        :value="value",
        :name="name",
        :checked="isChecked",
        :disabled="disabled",
        :required="required",
        ref="check",
        @change="handleChange",
        @focus="$emit('focus')",
        @blur="$emit('blur')",
        @click="$emit('click')"
      )
      span.custom-control-indicator
      span.custom-control-description(v-if="$slots.default")
        slot
    .invalid-feedback(v-if="error") {{ error }}
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    model: {
      prop: 'checked',
      event: 'change'
    },
    computed: {
      isChecked () {
        if (Array.isArray(this.checked)) {
          return this.checked.indexOf(this.value) !== -1
        } else {
          return this.checked === this.value
        }
      }
    },
    props: {
      name: {
        default: false
      },
      value: {
        default: true
      },
      checked: {
        default: false
      },
      disabled: {
        default: false
      },
      required: {
        default: false
      },
      uncheckedValue: {
        default: false
      },
      error: {
        type: String
      },
      groupError: {
        type: String,
        default: null
      }
    },
    methods: {
      handleChange ({ target: { checked } }) {
        if (Array.isArray(this.checked)) {
          if (this.isChecked) {
            this.$emit('change', this.checked.filter(x => x !== this.value))
          } else {
            this.$emit('change', [...this.checked, this.value])
          }
        } else {
          this.$emit('change', checked ? this.value : this.uncheckedValue)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables";

  .u-checkbox {
    .is-invalid:not(:checked) {
      + .custom-control-indicator {
        background-color: $custom-control-indicator-bg;
      }
    }

    .invalid-feedback {
      display: block;
    }
  }
</style>
