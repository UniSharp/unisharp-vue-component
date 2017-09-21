<template lang="pug">
  nav.u-pagination.d-flex.align-items-center(aria-label="Page navigation")
    p.mb-0.mr-auto {{ totalRows.toString().replace(/(.)(?=(?:\d{3})+$)/g, '$1,') }} results
    ul.pagination.mb-0
      //- previous button
      li.page-item(:class="{ disabled: isActive(1) }")
        a.page-link(aria-label="Previous", @click.stop.prevent="setPage(currentPage - 1)")
          span(aria-hidden="true"): i.fa.fa-angle-double-left
          span.sr-only Previous
      //- page button
      li.page-item(v-for="page in pageList", :class="{ active: isActive(page) }", :key="page")
        span.page-link(v-if="isActive(page)") {{ page }}
          span.sr-only (Current)
        a.page-link(@click.stop.prevent="setPage(page)", v-else) {{ page }}
      //- next button
      li.page-item(:class="{ disabled: isActive(pageList) }")
        a.page-link(aria-label="Next", @click.stop.prevent="setPage(currentPage + 1)")
          span(aria-hidden="true"): i.fa.fa-angle-double-right
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

<style lang="scss" scoped>
  .pagination {
    box-shadow: 0 0 6px rgba(0, 0, 0, .1);

    .page-item:first-child {
      .page-link {
        border-left: none;
      }
    }

    .page-item:last-child {
      .page-link {
        border-right: none;
      }
    }

    .page-link {
      border-top: none;
      border-bottom: none;

      .fa {
        transform: scale(.8);
      }
    }
  }
</style>
