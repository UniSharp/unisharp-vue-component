<template lang="pug">
  nav.u-pagination.d-flex.align-items-center(aria-label="Page navigation")
    p.mb-0.mr-auto {{ totalRows.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') }} results
    ul.pagination.mb-0
      li.page-item(:class="{ disabled: section === 0 }")
        a.page-link(aria-label="Previous", @click.stop.prevent="setPage(currentPage - 1)")
          span(aria-hidden="true"): i.fa.fa-angle-left
          span.sr-only Previous
      //- page button
      li.page-item(v-for="page in pageList", :class="{ active: page.active }", :key="page.value")
        span.page-link(v-if="page.active") {{ page.value }}
          span.sr-only (Current)
        a.page-link(@click.stop.prevent="setPage(page.value)", v-else) {{ page.value }}
      //- next button
      li.page-item(:class="{ disabled: isLastSection }")
        a.page-link(aria-label="Next", @click.stop.prevent="setPage(currentPage + 1)")
          span(aria-hidden="true"): i.fa.fa-angle-right
          span.sr-only Next
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
      section () {
        return Math.ceil(this.currentPage / this.limitPage) - 1
      },
      lastSection () {
        return Math.ceil(this.totalPage / this.limitPage) - 1
      },
      isLastSection () {
        return this.section === this.lastSection
      },
      pageList () {
        let start = this.section * this.limitPage + 1
        let increment = (this.isLastSection ? this.totalPage % this.limitPage : this.limitPage)
        return _.range(start, start + increment).map(
          v => {
            return {
              value: v,
              active: this.currentPage === v,
              disabled: false
            }
          }
        )
      },
      pageListWithMore () {
        let more = {value: '...', active: false, disabled: true}
        return this.pageList.reduce((pre, cur) => {
          pre.push(cur)
          return pre
        }, this.isLastSection ? [more] : [])
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
