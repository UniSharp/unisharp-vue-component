<template lang="pug">
  u-admin
    form.card.w-100
      h4.card-header Card Title
      .card-body
        p Some quick example text to build on the card title and make up the bulk of the card's content.
        .card-actions
          button.btn.btn-info.btn-lg Cancel
          button.btn.btn-primary.btn-lg Submit
    md.form-control.my-4.
      ```
      form.card.w-100
      h4.card-header Card Title
      .card-body
        p Some quick example text to build on the card title and make up the bulk of the card's content.
        .card-actions
          button.btn.btn-info.btn-lg Cancel
          button.btn.btn-primary.btn-lg Submit
      ```
</template>

<script>
  export default {
    //
  }
</script>

<style lang="scss" scoped>
  .card + .card {
    margin-top: 2rem;
  }
</style>
