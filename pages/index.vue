<template lang="pug">
  u-admin
    u-breadcrumb(slot="breadcrumb")
    .container.d-flex.flex-column.align-items-center.justify-content-center
      .card.w-100
        h4.card-header Featured
        .card-body
          h4.card-title Special title treatment
          p.card-text With supporting text below as a natural lead-in to additional content.
          a.btn.btn-secondary(href="#") Go somewhere
          a.btn.btn-primary(href="#") Go somewhere
      .card.w-100
        .card-body
          h4.card-title Card title
          h6.card-subtitle.mb-2.text-muted Card subtitle
          p.card-text Some quick example text to build on the card title and make up the bulk of the card's content.
          a.card-link(href="#") Card link
          a.card-link(href="#") Another link
</template>

<script>
  import UAdmin from '~/components/Admin'
  import UBreadcrumb from '~/components/Breadcrumb'

  export default {
    components: { UAdmin, UBreadcrumb }
  }
</script>

<style lang="scss" scoped>
  .card + .card {
    margin-top: 2rem;
  }
</style>
