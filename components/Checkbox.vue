<template lang="pug">
  label.u-checkbox.custom-control.form-check-inline.custom-checkbox.mb-0
    input.custom-control-input(
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
    span.custom-control-description
      slot
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
