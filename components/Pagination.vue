<template lang="pug">
  nav.u-pagination.d-flex.align-items-center.flex-wrap(aria-label="Page navigation")
    p.mb-2.w-100.text-center.w-sm-auto.mb-sm-0.text-sm-left {{ totalRows.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') }} results
    //- p.mb-0.mr-auto {{ totalRows.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') }} results
    ul.pagination.mb-0.mx-auto.mr-sm-0
      li.page-item(:class="{ disabled: currentPage === 1 }")
        a.page-link(aria-label="Previous", @click.stop.prevent="setPage(currentPage - 1)")
          span(aria-hidden="true"): i.fa.fa-angle-left
          span.sr-only Previous
      //- page button
      li.page-item(v-for="page in pageListWithMore", :class="{ active: page.active, disabled: page.disabled }", :key="page.value")
        span.page-link(v-if="page.active") {{ page.value }}
          span.sr-only (Current)
        a.page-link.d-none.d-sm-block(@click.stop.prevent="!page.disabled && setPage(page.value)", v-else) {{ page.value }}
      //- next button
      li.page-item(:class="{ disabled: currentPage == totalPage }")
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
      currentPage: {
        type: Number,
        default: 1
      },
      size: {
        type: String,
        default: ''
      },
      limitPage: {
        type: Number,
        default: 5
      }
    },
    data () {
      return {}
    },
    watch: {
      perPage () {
        this.$emit('update:currentPage', 1)
      }
    },
    computed: {
      totalPage () {
        return Math.ceil(this.totalRows / this.perPage)
      },
      pageList () {
        this.$emit('update:currentPage', this.totalPage < this.currentPage ? 1 : this.currentPage)

        let half = Math.floor(_.min([this.limitPage, this.totalPage]) / 2)
        let start = this.currentPage - half
        let end = this.currentPage + half
        // if arrive boundary add a offset
        let shift = start < 1 ? -start + 1 : (end > this.totalPage ? this.totalPage - end : 0)
        return _.range(this.clamp(start + shift), this.clamp(end + shift + 1)).map(
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
        let first = { value: 1, active: this.currentPage === 1, disabled: false }
        let more = { value: '...', active: false, disabled: true }
        let last = { value: this.clamp(this.totalPage), active: this.currentPage === this.totalPage, disabled: false }

        return _.sortBy(_.unionBy(this.pageList, [first, last], 'value'), ['value']).reduce((pre, cur) => {
          if (_.last(pre) && _.last(pre).value !== cur.value - 1) {
            pre = pre.concat(more)
          }
          return pre.concat(cur)
        }, [])
      }
    },
    methods: {
      clamp (number) {
        return _.clamp(number, 1, _.clamp(this.totalPage, 1, Number.MAX_SAFE_INTEGER))
      },
      setPage (page) {
        if (page < 1 || page > this.totalPage) {
          return
        }
        this.$emit('update:currentPage', page)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables";
  @import "node_modules/bootstrap/scss/mixins/breakpoints";

  .pagination {
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
        transform: translateY(-1px);
      }

      @include media-breakpoint-down(xs) {
        padding-top: .6rem;
        padding-bottom: .6rem;
      }
    }

    @include media-breakpoint-up(sm) {
      box-shadow: 0 0 6px rgba(0, 0, 0, .05);
    }
  }
</style>
