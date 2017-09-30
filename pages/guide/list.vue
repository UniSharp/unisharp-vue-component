<template lang="pug">
  u-admin
    button.btn.btn-secondary.mb-4(@click.prevent) Create
    button.btn.btn-primary.mb-4(@click.prevent) Others
    form.form-inline.d-none.d-sm-flex(slot="functions")
      u-select(v-model="filter", placeholder="Filter", :options="options")
      .input-group
        input.form-control(v-model="search", type="text", placeholder="Search", aria-label="Search")
        span.input-group-btn
          button.btn.btn-flat(type="button")
            i.fa.fa-search.mr-2
            | Search
    .btn.btn-square.btn-flat.d-sm-none(slot="functions", @click.prevent.stop="$refs.modal.show()"): i.fa.fa-search
    .table-responsive.mb-4
      table.table.table-bordered.table-striped.text-center
        thead
          tr
            th(scope="row")
              u-checkbox(v-model="checkall", @click="setChecked")
            th First Name
              i.fa.fa-sort-asc.ml-2
            th Last Name
              i.fa.fa-sort.ml-2
            th Username
              i.fa.fa-sort.ml-2
            th Actions
              i.fa.fa-sort.ml-2
        tbody
          tr(:class="{ expand: expanding[0] }")
            th(scope="row")
              u-checkbox(v-model="checked[0]")
            td Mark
            td Otto
            td @mdo
            td
              button.btn.btn-info.btn-sm(@click="toggleExpanding(0)")
                i.fa.fa-angle-left.mr-2
              button.btn.btn-primary.btn-sm
                i.fa.fa-pencil.mr-2
                | Edit
              button.btn.btn-danger.btn-sm
                i.fa.fa-trash.mr-2
                | Remove
          tr(v-if="expanding[0]")
            td(colspan="5")
              p.font-weight-bold.mb-0 Mark Otto
                span.small.text-muted.ml-2 @mdo
          tr(:class="{ expand: expanding[1] }")
            th(scope="row")
              u-checkbox(v-model="checked[1]")
            td Jacob
            td Thornton
            td @fat
            td
              button.btn.btn-info.btn-sm(@click="toggleExpanding(1)")
                i.fa.fa-angle-left.mr-2
              button.btn.btn-primary.btn-sm
                i.fa.fa-pencil.mr-2
                | Edit
              button.btn.btn-danger.btn-sm
                i.fa.fa-trash.mr-2
                | Remove
          tr(v-if="expanding[1]")
            td(colspan="5")
              p.font-weight-bold.mb-0 Jacob Thornton
                span.small.text-muted.ml-2 @fat
          tr(:class="{ expand: expanding[2] }")
            th(scope="row")
              u-checkbox(v-model="checked[2]")
            td Larry
            td the Bird
            td @twitter
            td
              button.btn.btn-info.btn-sm(@click="toggleExpanding(2)")
                i.fa.fa-angle-left.mr-2
              button.btn.btn-primary.btn-sm
                i.fa.fa-pencil.mr-2
                | Edit
              button.btn.btn-danger.btn-sm
                i.fa.fa-trash.mr-2
                | Remove
          tr(v-if="expanding[2]")
            td(colspan="5")
              p.font-weight-bold.mb-0 Larry the Bird
                span.small.text-muted.ml-2 @twitter
    u-pagination(:totalRows="12345", :perPage="500")
    u-modal(ref="modal")
      span(slot="title") Search
      button.btn.btn-info(slot="actions", @click.stop.prevent="$refs.modal.hide()") Cancel
      button.btn.btn-primary(slot="actions", @click.stop.prevent="$refs.modal.hide()") Confirm
      u-select.mb-3(v-model="filter", placeholder="Filter", :options="options")
      input.form-control(v-model="search", type="text", placeholder="Search", aria-label="Search")
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
        search: '',
        checkall: false,
        checked: [false, false, false],
        expanding: [false, false, false]
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
      },
      toggleExpanding (i) {
        this.expanding.splice(i, 1, !this.expanding[i])
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/variables";
  @import "node_modules/bootstrap/scss/mixins/transition";

  .table {
    tr {
      .btn-info:after {
        content: "Expand";
      }

      .fa-angle-left {
        @include transition;
      }

      &.expand {
        .btn-info:after {
          content: "Shrink";
        }

        .fa-angle-left {
          transform: rotateZ(-90deg);
        }
      }
    }
  }
</style>
