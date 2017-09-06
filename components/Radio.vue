<template lang="pug">
  .u-radio(:class="{ 'custom-controls-stacked': stacked }")
    label.custom-control.form-check-inline.custom-radio(:key="option.value", v-for="(option, index) in options")
      input.custom-control-input(
        type="radio",
        :name="name",
        :value="option.value",
        :checked="defaultValue == option.value",
        :disabled="disabled ? disabled : option.disabled",
        :required="required",
        @change="$emit('change')",
        @focus="$emit('focus')",
        @blur="$emit('blur')",
        @click="$emit('click')"
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
      name: {
        required: true,
        default: null
      },
      defaultValue: {
        default: 1
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
    }
  }
</script>
