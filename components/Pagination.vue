<template lang="pug">
  nav(aria-label="Page navigation")
    ul.pagination
      //- previous button
      li.page-item.disabled(v-if="isActive(1)")
        a.page-link(href="#", aria-label="Previous", @click.stop.prevent="setPage(currentPage - 1)")
          span(aria-hidden="true") &laquo;
      li.page-item(v-else)
        a.page-link(href="#", aria-label="Previous", @click.stop.prevent="setPage(currentPage - 1)")
          span(aria-hidden="true") &laquo;
          span.sr-only Previous
      //- page button
      li(v-for="page in pageList", :class="pageItemClasses(page)" :key="page")
        a(:class="pageLinkClasses(page)", @click.stop.prevent="setPage(page)") {{ page }}
      //- next button
      li.page-item.disabled(v-if="isActive(pageList)")
        a.page-link(href="#" aria-label="Next", @click.stop.prevent="setPage(currentPage + 1)")
          span(aria-hidden="true") &raquo;
      li.page-item(v-else)
        a.page-link(href="#" aria-label="Next", @click.stop.prevent="setPage(currentPage + 1)")
          span(aria-hidden="true") &raquo;
          span.sr-only Next
</template>

<script>
  export default {
    props: {
      totalRows: {
        type: Number,
        default: 20
      },
      perPage: {
        type: Number,
        default: 20
      },
      value: {
        type: Number,
        default: 1
      },
      size: {
        type: String,
        default: ''
      },
      prevText: {
        type: String,
        default: '&laquo;'
      },
      nextText: {
        type: String,
        default: '&raquo;'
      }
    },
    data () {
      return {
        currentPage: this.value
      }
    },
    computed: {
      pageList () {
        return Math.ceil(this.totalRows / this.perPage)
      }
    },
    methods: {
      isActive (page) {
        return this.currentPage === page
      },
      pageItemClasses (page) {
        return [
          'page-item',
          this.isActive(page) ? 'active' : ''
        ]
      },
      pageLinkClasses (page) {
        return [
          'page-link',
          this.isActive(page) ? 'active' : ''
        ]
      },
      setPage (page) {
        if (page < 1 || page > this.pageList) {
          return
        }
        this.currentPage = page
        this.$emit('input', this.currentPage)
      }
    }
  }
</script>
