<template lang="pug">
  .u-input
    textarea.form-control(
      :class="{ 'is-invalid': !!error }",
      :rows="rows",
      :name="name",
      :placeholder="placeholder",
      @input="$emit('input', $event.target.value)",
      v-if=" type === 'textarea' || rows > 1 "
    ) {{ value }}
    input.form-control(
      :id="id",
      :class="{ 'is-invalid': !!error }",
      :type="type",
      :name="name",
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
      id: {
        type: String
      },
      rows: {
        type: Number,
        default: 1
      },
      type: {
        type: String,
        default: 'text'
      },
      placeholder: String,
      value: null,
      error: {
        type: String
      },
      name: {
        type: String
      }
    },
    model: {
      prop: 'value',
      event: 'input'
    }
  }
</script>
