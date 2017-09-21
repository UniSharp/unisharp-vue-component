<template lang="pug">
  u-admin
    button.btn.btn-primary.mb-4(@click.prevent) Create
    form.form-inline(slot="functions")
      u-select(v-model="filter", placeholder="Filter", :options="options")
      .input-group
        input.form-control(type="text", placeholder="Search", aria-label="Search")
        span.input-group-btn
          button.btn(type="button")
            i.fa.fa-search.mr-2
            | Search
    table.table.table-bordered.table-striped.text-center.mb-4
      thead
        tr
          th #
          th First Name
          th Last Name
          th Username
          th Actions
      tbody
        tr
          th(scope="row") 1
          td Mark
          td Otto
          td @mdo
          td
            button.btn.btn-primary.btn-sm
              i.fa.fa-pencil.mr-2
              | Edit
            button.btn.btn-danger.btn-sm
              i.fa.fa-trash.mr-2
              | Remove
        tr
          th(scope="row") 2
          td Jacob
          td Thornton
          td @fat
          td
            button.btn.btn-primary.btn-sm
              i.fa.fa-pencil.mr-2
              | Edit
            button.btn.btn-danger.btn-sm
              i.fa.fa-trash.mr-2
              | Remove
        tr
          th(scope="row") 3
          td Larry
          td the Bird
          td @twitter
          td
            button.btn.btn-primary.btn-sm
              i.fa.fa-pencil.mr-2
              | Edit
            button.btn.btn-danger.btn-sm
              i.fa.fa-trash.mr-2
              | Remove
    u-pagination(:totalRows="12345", :perPage="5000")
</template>

<script>
  export default {
    data () {
      return {
        options: [
          { text: 'One', value: 1 },
          { text: 'Two', value: 2 },
          { text: 'Three', value: 3 }
        ],
        filter: null
      }
    }
  }
</script>

<style lang="scss" scoped>
  .table {
    margin-bottom: 0;
  }
</style>
