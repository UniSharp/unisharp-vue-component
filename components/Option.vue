<template lang="pug">
li(@click="change")
  slot
</template>

<script>
export default {
  props: ['value'],
  methods: {
    change () {
      this.$emit('change', {text: this.$slots.default[0].text, value: this.value})
    }
  }
}
</script>

