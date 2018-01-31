<template lang="pug">
  u-admin
    form.form-inline(slot="functions")
      form.form-inline.d-none.d-sm-flex(slot="functions")
        u-select(v-model="age", placeholder="Age", :options="ages")
        .input-group
          input.form-control(v-model="filterText", type="text", placeholder="Search", aria-label="Search")
          span.input-group-btn
            button.btn.btn-flat(type="button")
              i.fa.fa-search.mr-2
              | Search
      .btn.btn-square.btn-flat.d-sm-none(slot="functions", @click.prevent.stop="$refs.modal.show()"): i.fa.fa-search
    u-table(
      ref="table",
      :fields="fields",
      :per-page="perPage",
      :totalRows="totalRows",
      :sortable="true",
      order-by="last_name"
      selection,
      :provider="provider"
    )
      template(slot="expand", slot-scope="row")
        tr
          td
          td(colspan="4")
            | hi
      template(slot="operation", slot-scope="row")
        button.btn.btn-info.btn-sm.mr-1(type="button", @click.stop="row.toggle()")
          i.fa.fa-angle-down(aria-hidden="true").mr-2
          | 展開
        button.btn.btn-danger.btn-sm.mr-1(type="button", @click.stop="remove(row.value.id)")
          i.fa.fa-trash(aria-hidden="true").mr-2
          | 刪除
        button.btn.btn-primary.btn-sm(type="button", @click.stop="showClickButton(row.value.age)")
          i.fa.fa-bell(aria-hidden="true").mr-2
          | alert

    button.btn.btn-primary(type="button", @click.stop="showCheckItems") Get Checked Items of Current Page
    u-modal(ref="modal")
        span(slot="title") Search
        button.btn.btn-info(slot="actions", @click.stop.prevent="$refs.modal.hide()") Cancel
        button.btn.btn-primary(slot="actions", @click.stop.prevent="$refs.modal.hide()") Confirm
        u-select.mb-3(v-model="age", placeholder="Filter", :options="ages")
        input.form-control(v-model="filterText", type="text", placeholder="Search", aria-label="Search")
</template>

<script>
  import axios from 'axios'
  import MockAdapter from 'axios-mock-adapter'

  let items = [
    { id: 1, age: 1, first_name: 'Dickerson', last_name: 'Macdonald' },
    { id: 2, age: 2, first_name: 'Larsen', last_name: 'Shaw' },
    { id: 3, age: 3, first_name: 'Geneva', last_name: 'Wilson' },
    { id: 4, age: 4, first_name: 'Jami', last_name: 'Carney' },
    { id: 5, age: 5, first_name: 'Essie', last_name: 'Dunlap' },
    { id: 6, age: 6, first_name: 'Thor', last_name: 'Macdonald' },
    { id: 7, age: 7, first_name: 'Mitzi', last_name: 'Navarro' },
    { id: 8, age: 8, first_name: 'Genevive', last_name: 'Wilson' },
    { id: 9, age: 9, first_name: 'John', last_name: 'Carney' },
    { id: 10, age: 10, first_name: 'Dick', last_name: 'Dunlap' },
    { id: 11, age: 11, first_name: 'Dickerson', last_name: 'Macdonald' },
    { id: 12, age: 12, first_name: 'Larsen', last_name: 'Shaw' },
    { id: 13, age: 13, first_name: 'Genevive', last_name: 'Wilson' },
    { id: 14, age: 14, first_name: 'John', last_name: 'Carney' },
    { id: 15, age: 15, first_name: 'Dick', last_name: 'Dunlap' },
    { id: 16, age: 16, first_name: 'Dickerson', last_name: 'Macdonald' },
    { id: 17, age: 17, first_name: 'Larsen', last_name: 'Shaw' }
  ]

  export default {
    computed: {
      ages () {
        return items.map(v => v.age)
      }
    },
    data () {
      return {
        filterText: '',
        fields: {
          last_name: {
            label: 'Person last name',
            width: '30%'
          },
          first_name: {
            label: 'Person first name',
            width: '30%'
          },
          age: {
            label: 'Person age'
          },
          operation: {
            label: '操作'
          }
        },
        age: null,
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
              total: items.length,
              data: items.slice(start, end)
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
      showClickButton (age) {
        alert(age)
      },
      filter (item) {
        if (this.filterText) {
          let regex = new RegExp(`.*${this.filterText}.*`)
          return regex.test(item.last_name)
        }

        if (this.age) {
          return item.age === this.age
        }

        return true
      },
      remove (id) {
        items = items.filter(v => v.id !== id)
        this.$refs.table.refresh()
      }

    }
  }
</script>

<style lang="scss" scoped>
  .example {
    padding: 10px;
  }
</style>
