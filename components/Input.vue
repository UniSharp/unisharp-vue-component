<template lang="pug">
  .u-input
    textarea.form-control(
      :class="{ 'is-invalid': !!error }",
      :rows="rows",
      :placeholder="placeholder",
      @input="$emit('input', $event.target.value)",
      v-if=" type === 'textarea' || rows > 1 "
    ) {{ value }}
    input.form-control(
      :class="{ 'is-invalid': !!error }",
      :type="type",
      :value="value",
      :placeholder="placeholder",
      @input="$emit('input', $event.target.value)",
      v-else
    )
    .invalid-feedback(v-if="error") {{ error }}
</template>

<script>
  export default {
    props: {
      rows: {
        type: Number,
        default: 1
      },
      type: {
        type: String,
        default: 'text'
      },
      placeholder: String,
      value: String,
      error: {
        type: String
      }
    },
    model: {
      prop: 'value',
      event: 'input'
    }
  }
</script>
