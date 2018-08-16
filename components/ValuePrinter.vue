<template lang="pug">
  .my-2
    i.fa.fa-info-circle.text-warning.mr-2
    | value:
    span.font-weight-bold(v-if="Array.isArray(value)")
      |  [
      template(v-for="(element, index) in value")
        template(v-if="index !== 0") ,&nbsp;
        | '{{ element }}'
      | ]
    span.font-weight-bold(v-else)  {{ value }}
</template>

<script>
  export default {
    props: {
      value: {
        required: true
      }
    }
  }
</script>
