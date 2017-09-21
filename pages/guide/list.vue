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
          th(scope="row")
            u-checkbox(v-model="checkall", @click="setChecked")
          th First Name
          th Last Name
          th Username
          th Actions
      tbody
        tr
          th(scope="row")
            u-checkbox(v-model="checked[0]")
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
          th(scope="row")
            u-checkbox(v-model="checked[1]")
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
          th(scope="row")
            u-checkbox(v-model="checked[2]")
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
        filter: null,
        checkall: false,
        checked: [false, false, false]
      }
    },
    watch: {
      checked (value) {
        this.checkall = value.indexOf(false) === -1
      }
    },
    methods: {
      setChecked () {
        for (let i = 0; i < this.checked.length; i++) {
          this.checked.splice(i, 1, !this.checkall)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .table {
    margin-bottom: 0;
  }
</style>
