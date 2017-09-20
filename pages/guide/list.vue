<template lang="pug">
  u-admin
    form.form-inline(slot="functions")
      .input-group
        input.form-control(type="text", placeholder="Search", aria-label="Search")
        span.input-group-btn
          button.btn.btn-info(type="button")
            i.fa.fa-search.mr-2
            | Search
    .container
      table.table.table-bordered.table-striped.text-center
        thead
          tr
            th #
            th First Name
            th Last Name
            th Username
        tbody
          tr
            th(scope="row") 1
            td Mark
            td Otto
            td @mdo
          tr
            th(scope="row") 2
            td Jacob
            td Thornton
            td @fat
          tr
            th(scope="row") 3
            td Larry
            td the Bird
            td @twitter
</template>

<script>
  export default {
    //
  }
</script>

<style lang="scss" scoped>
  .table {
    margin-bottom: 0;
  }
</style>
