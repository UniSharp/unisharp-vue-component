<template lang="pug">
  u-admin
    form.form-inline(slot="functions")
      u-select(v-model="age", placeholder="Age", :options="ages")
      .input-group
        input.form-control(type="text", v-model="filterText", placeholder="Search", aria-label="Search")
        span.input-group-btn
          button.btn(type="button")
            i.fa.fa-search.mr-2
            | Search
    u-table(
      ref="table",
      :items="items",
      :fields="fields",
      :per-page="perPage",
      :sortable="true",
      order-by="last_name"
      selection,
      :filter="filter",
    )
      template(slot="expand", scope="row")
        tr
          td
          td(colspan="4")
            | hi
      template(slot="operation", scope="row")
        button.btn.btn-primary.btn-sm.mr-1(type="button", @click.stop="row.toggle()")
          i.fa.fa-angle-down(aria-hidden="true").mr-2
          | 展開
        button.btn.btn-primary.btn-sm(type="button", @click.stop="showClickButton(data.value.age)")
          i.fa.fa-bell(aria-hidden="true").mr-2
          | alert

    button.btn.btn-primary(type="button", @click.stop="showCheckItems") Get Checked Items of Current Page
</template>

<script>
  import axios from 'axios'

  let items = [
    { age: 1, first_name: 'Dickerson', last_name: 'Macdonald' },
    { age: 2, first_name: 'Larsen', last_name: 'Shaw' },
    { age: 3, first_name: 'Geneva', last_name: 'Wilson' },
    { age: 4, first_name: 'Jami', last_name: 'Carney' },
    { age: 5, first_name: 'Essie', last_name: 'Dunlap' },
    { age: 6, first_name: 'Thor', last_name: 'Macdonald' },
    { age: 7, first_name: 'Mitzi', last_name: 'Navarro' },
    { age: 8, first_name: 'Genevive', last_name: 'Wilson' },
    { age: 9, first_name: 'John', last_name: 'Carney' },
    { age: 10, first_name: 'Dick', last_name: 'Dunlap' },
    { age: 11, first_name: 'Dickerson', last_name: 'Macdonald' },
    { age: 12, first_name: 'Larsen', last_name: 'Shaw' },
    { age: 13, first_name: 'Genevive', last_name: 'Wilson' },
    { age: 14, first_name: 'John', last_name: 'Carney' },
    { age: 15, first_name: 'Dick', last_name: 'Dunlap' },
    { age: 16, first_name: 'Dickerson', last_name: 'Macdonald' },
    { age: 17, first_name: 'Larsen', last_name: 'Shaw' }
  ]

  export default {
    computed: {
      ages () {
        return items.map(v => v.age)
      }
    },
    data () {
      return {
        items: items,
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
      provider (context) {
        return new Promise((resolve, reject) => {
          axios.get('https://beta.json-generator.com/api/json/get/4yxjYQ79X').then(res => {
            resolve(res.data)
          })
        })
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
      }

    }
  }
</script>

<style lang="scss" scoped>
  .example {
    padding: 10px;
  }
</style>
