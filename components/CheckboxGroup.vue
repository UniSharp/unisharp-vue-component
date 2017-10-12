<template lang="pug">
  .u-checkbox-group
    u-checkbox(
      :key="key",
      v-for="(option, key) in options",
      v-model="checks",
      :value="option.value",
      @change="$emit('change', checks)",
      :error="error"
    )
      | {{ option.text }}
    .invalid-feedback(v-if="error") {{ error }}

</template>

<script>
  export default {
    props: {
      options: {
        type: Array,
        required: true
      },
      error: {
        type: String
      }
    },
    model: {
      prop: 'checked',
      event: 'change'
    },
    data () {
      return {
        checks: []
      }
    }
  }
</script>

<style lang="scss" scoped>
  .u-checkbox-group {
    .invalid-feedback {
      display: block;
    }
  }
</style>

<style lang="scss">
  .u-checkbox-group {
    .u-checkbox {
      .invalid-feedback {
        display: none;
      }
    }
  }
</style>
