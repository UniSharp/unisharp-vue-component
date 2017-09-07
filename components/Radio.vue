<template lang="pug">
  .u-radio(:class="{ 'custom-controls-stacked': stacked }")
    label.custom-control.form-check-inline.custom-radio(:key="option.value", v-for="(option, index) in options")
      input.custom-control-input(
        type="radio",
        :id="id",
        :name="name",
        :value="option.value",
        :checked="option.value == value",
        :disabled="disabled ? disabled : option.disabled",
        :required="required",
        @change="$emit('change', option.value)",
        @focus="$emit('focus', option.value)",
        @blur="$emit('blur', option.value)",
        @click="$emit('click', option.value)"
      )
      span.custom-control-indicator
      span.custom-control-description {{ option.text }}
</template>

<script>
  export default {
    data () {
      return {
        //
      }
    },
    props: {
      options: {
        default: () => {
          return [
            { text: 'Option1', value: 1, disabled: false },
            { text: 'Option2', value: 2, disabled: true },
            { text: 'Option3', value: 3, disabled: false }
          ]
        }
      },
      id: {
        default: null
      },
      name: {
        required: true,
        default: null
      },
      value: {
        default: null
      },
      disabled: {
        default: false
      },
      required: {
        default: false
      },
      stacked: {
        default: false
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    }
  }
</script>
