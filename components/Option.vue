<template lang="pug">
  a.dropdown-item(@click.stop.prevent="$emit('change', value)") {{ text }}
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        required: true
      },
      value: {
      }
    }
  }
</script>

