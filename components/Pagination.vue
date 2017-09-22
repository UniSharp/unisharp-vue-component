<template lang="pug">
  nav.u-pagination.d-flex.align-items-center(aria-label="Page navigation")
    p.mb-0.mr-auto {{ totalRows.toString().replace(/(.)(?=(?:\d{3})+$)/g, '$1,') }} results
    ul.pagination.mb-0
      //- previous button
      li.page-item(:class="{ disabled: isActive(1) }")
        a.page-link(aria-label="Previous", @click.stop.prevent="setPage(1)")
          span(aria-hidden="true"): i.fa.fa-angle-double-left
          span.sr-only First
      li.page-item(:class="{ disabled: isActive(1) }")
        a.page-link(aria-label="Previous", @click.stop.prevent="setPage(currentPage - 1)")
          span(aria-hidden="true"): i.fa.fa-angle-left
          span.sr-only Previous
      //- page button
      li.page-item(v-show="!isOverBottom && isOverLimit")
        a.page-link ...
      li.page-item(v-for="page in pageList", :class="{ active: isActive(page) }", :key="page")
        span.page-link(v-if="isActive(page)") {{ page }}
          span.sr-only (Current)
        a.page-link(@click.stop.prevent="setPage(page)", v-else) {{ page }}
      li.page-item(v-show="!isOverTop && isOverLimit")
        a.page-link ...
      //- next button
      li.page-item(:class="{ disabled: isActive(totalPage) }")
        a.page-link(aria-label="Next", @click.stop.prevent="setPage(currentPage + 1)")
          span(aria-hidden="true"): i.fa.fa-angle-right
          span.sr-only Next
      li.page-item(:class="{ disabled: isActive(totalPage) }")
        a.page-link(aria-label="Next", @click.stop.prevent="setPage(totalPage)")
          span(aria-hidden="true"): i.fa.fa-angle-double-right
          span.sr-only Last
</template>

<script>
  import _ from 'lodash'

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
      limitPage: {
        type: Number,
        default: 7
      }
    },
    data () {
      return {
        currentPage: this.value
      }
    },
    computed: {
      totalPage () {
        return Math.ceil(this.totalRows / this.perPage)
      },
      isOverLimit () {
        return this.totalPage > this.limitPage
      },
      isOverTop () {
        return (this.totalPage - this.currentPage) <= Math.floor(this.limitPage / 2)
      },
      isOverBottom () {
        return (this.currentPage - 1) <= Math.floor(this.limitPage / 2)
      },
      pageList () {
        if (this.isOverLimit) {
          if (this.isOverTop) {
            return _.range(this.totalPage - this.limitPage + 2, this.totalPage + 1)
          }

          if (this.isOverBottom) {
            return _.range(1, this.limitPage)
          }

          let end = this.currentPage + Math.floor(this.limitPage / 2) - 1
          return _.range(end - this.limitPage + 3, end + 1)
        }

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
