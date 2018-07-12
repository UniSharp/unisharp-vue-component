<template lang="pug">
  u-admin
    button.btn.btn-secondary.mb-4(@click.prevent) Create
    button.btn.btn-primary.mb-4(@click.prevent) Others
    form.form-inline.d-none.d-sm-flex(slot="functions")
      u-select(v-model="level", placeholder="Filter Level", :options="levels", @change="filter")
      .input-group
        input.form-control(v-model="keyword", type="text", placeholder="Search", aria-label="Search")
        span.input-group-btn
          button.btn.btn-flat(type="button", @click="filter")
            i.fa.fa-search.mr-2
            | Search
    .btn.btn-square.btn-flat.d-sm-none(slot="functions", @click.prevent.stop="$refs.modal.show()"): i.fa.fa-search
    u-table(
      ref="table",
      :fields="fields",
      :per-page="perPage",
      :totalRows="totalRows",
      order-by="last_name"
      selection,
      :provider="provider"
    )
      template(slot="expand", slot-scope="row")
        tr
          td
          td(colspan="4")
            | Hi, show detail here
      template(slot="operation", slot-scope="row")
        button.btn.btn-info.btn-sm.mr-1(type="button", @click.stop="row.toggle()")
          i.fa.fa-angle-left(aria-hidden="true").mr-2
        button.btn.btn-danger.btn-sm.mr-1(type="button", @click.stop="remove(row.value.id)")
          i.fa.fa-trash(aria-hidden="true").mr-2
          | Remove
        button.btn.btn-primary.btn-sm(type="button", @click.stop="showClickButton(row.value)")
          i.fa.fa-pencil(aria-hidden="true").mr-2
          | Edit

    button.btn.btn-primary(type="button", @click.stop="showCheckItems") Get Checked Items of Current Page
    u-modal(ref="modal")
        span(slot="title") Search
        button.btn.btn-info(type="button", slot="actions", @click="$refs.modal.hide()") Cancel
        button.btn.btn-primary(type="button", slot="actions", @click="filter") Confirm
        u-select.mb-3(v-model="level", placeholder="Filter", :options="levels")
        input.form-control(v-model="keyword", type="text", placeholder="Search", aria-label="Search")
</template>

<script>
  import _ from 'lodash'
  import axios from 'axios'
  import MockAdapter from 'axios-mock-adapter'

  let items = [
    { id: 1, level: 1, first_name: 'Dickerson', last_name: 'Macdonald' },
    { id: 2, level: 1, first_name: 'Larsen', last_name: 'Shaw' },
    { id: 3, level: 3, first_name: 'Geneva', last_name: 'Wilson' },
    { id: 4, level: 3, first_name: 'Jami', last_name: 'Carney' },
    { id: 5, level: 3, first_name: 'Essie', last_name: 'Dunlap' },
    { id: 6, level: 2, first_name: 'Thor', last_name: 'Macdonald' },
    { id: 7, level: 2, first_name: 'Mitzi', last_name: 'Navarro' },
    { id: 8, level: 1, first_name: 'Genevive', last_name: 'Wilson' },
    { id: 9, level: 1, first_name: 'John', last_name: 'Carney' },
    { id: 10, level: 1, first_name: 'Dick', last_name: 'Dunlap' },
    { id: 11, level: 1, first_name: 'Dickerson', last_name: 'Macdonald' },
    { id: 12, level: 1, first_name: 'Larsen', last_name: 'Shaw' },
    { id: 13, level: 1, first_name: 'Genevive', last_name: 'Wilson' },
    { id: 14, level: 1, first_name: 'John', last_name: 'Carney' },
    { id: 15, level: 2, first_name: 'Dick', last_name: 'Dunlap' },
    { id: 16, level: 3, first_name: 'Dickerson', last_name: 'Macdonald' },
    { id: 17, level: 3, first_name: 'Larsen', last_name: 'Shaw' }
  ]

  export default {
    computed: {
      levels () {
        return _.uniqBy(_.map(items, v => {
          return {text: 'Level ' + v.level, value: v.level}
        }), 'value')
      }
    },
    data () {
      return {
        level: null,
        keyword: null,
        fields: {
          last_name: {
            label: 'Last name'
          },
          first_name: {
            label: 'First Name'
          },
          level: {
            label: 'Department Level',
            sortable: true
          },
          operation: {
            label: 'Operation'
          }
        },
        items: items,
        perPage: 5,
        totalRows: items.length
      }
    },
    methods: {
      setAxiosMock () {
        let mock = new MockAdapter(axios)

        mock.onAny().reply(config => {
          let params = config.url.match(/page=(\d+)&perPage=(\d+)/)
          let currentPage = parseInt(params[1])
          let perPage = parseInt(params[2])
          let start = (currentPage - 1) * perPage
          let end = start + perPage
          return [
            200,
            {
              total: this.items.length,
              data: this.items.slice(start, end)
            }
          ]
        })
      },
      async provider ({currentPage, perPage}) {
        this.setAxiosMock()
        let { data } = await axios.get(`/faker?page=${currentPage}&perPage=${perPage}`)
        this.totalRows = data.total
        return data.data
      },
      showCheckItems () {
        alert(JSON.stringify(this.$refs.table.showCheckItems()))
      },
      showClickButton (item) {
        alert(`Go to edit ${item.first_name} ${item.last_name}`)
      },
      filter () {
        this.items = items

        if (this.keyword) {
          this.items = this.items.filter(v => v.last_name === this.keyword || v.first_name === this.keyword)
        }

        if (this.level) {
          this.items = this.items.filter(v => v.level === this.level)
        }

        this.$refs.table.refresh()
        this.$refs.modal.hide()
      },
      remove (id) {
        this.items = this.items.filter(v => v.id !== id)
        this.$refs.table.refresh()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/variables";
  @import "node_modules/bootstrap/scss/mixins/transition";

  table {
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
