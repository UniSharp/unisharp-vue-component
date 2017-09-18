<template lang="pug">
  u-dropdown.u-select(ref="dropdown")
    template(slot="toggle")
      .d-flex
        span.badge.badge-pill.badge-primary(v-for="(tag, index) in selectedTags")
          | {{ tag }}
          svg.tag-remove(height="11", width="11", @click.stop.prevent="removeTag(index)")
            line(x1="2", y1="2", x2="9", y2="9", style="stroke:rgb(255,255,255);stroke-width:2")
            line(x1="9", y1="2", x2="2", y2="9", style="stroke:rgb(255,255,255);stroke-width:2")
        input.u-select-current.form-control(
          type="text",
          v-model="keyword",
          :placeholder="placeholder",
          @keydown="handleKeydown"
        )
    .dropdown-menu.u-select-tags
      a.dropdown-item(
        v-for="(tag, index) in filterTags",
        :key="index",
        :class="activeClass(index)"
        @mousemove="mousemove(index)",
        @click.stop.prevent="selection"
      ) {{ tag }}
</template>

<script>
  // import _ from 'lodash'
  import UDropdown from './Dropdown'

  const UP = 38
  const DOWN = 40
  const ENTER = 13
  const DELETE = 8
  const ESC = 27

  export default {
    components: { UDropdown },
    props: {
      placeholder: String,
      tags: {
        type: Array,
        required: true
      },
      value: Array
    },
    data () {
      return {
        keyword: '',
        activeIndex: -1,
        selectedTags: this.value
      }
    },
    computed: {
      filterTags () {
        return this.tags.filter((tag) => {
          return this.keyword ? tag.includes(this.keyword) : true
        })
      }
    },
    methods: {
      handleKeydown (e) {
        let keyCode = e.keyCode
        this.$refs.dropdown.show()

        switch (keyCode) {
          case DOWN:
            e.preventDefault()
            this.activeIndex < this.filterTags.length - 1
              ? this.activeIndex++
              : this.activeIndex = 0
            break
          case UP:
            e.preventDefault()
            this.activeIndex > 0
              ? this.activeIndex--
              : this.activeIndex = this.filterTags.length - 1
            break
          case ENTER:
            e.preventDefault()
            this.selection()
            break
          case DELETE:
            this.removeTag(this.selectedTags.length - 1)
            break
          case ESC:
            this.clear()
            break
        }
      },
      mousemove (i) {
        this.activeIndex = i
      },
      activeClass (i) {
        if (this.activeIndex === i) {
          return {
            active: true
          }
        }
      },
      selection () {
        if (this.activeIndex === -1) {
          return
        }

        this.selectedTags.push(this.filterTags[this.activeIndex])
        this.$emit('input', this.selectedTags)
        this.clear()
      },
      removeTag (index) {
        this.selectedTags.splice(index, 1)
        this.$emit('input', this.selectedTags)
        this.clear()
      },
      clear () {
        this.activeIndex = -1
        this.keyword = ''
        this.$refs.dropdown.hide()
      }
    }
  }
</script>


<style lang="scss" scoped>
  @import "../assets/scss/variables";

  $hover-bg: theme-color("primary");
  $hover-fg: #fff;

  @if (((red($hover-bg) * 299) + (green($hover-bg) * 587) + (blue($hover-bg) * 114)) / 1000 >= 150) {
    $hover-fg: #111;
  }

  .u-select {
    .badge {
      margin-right: .5rem;
      display: flex;
      align-items: center;

      .tag-remove {
        border-radius: 50%;
        margin-left: .5rem;

        &:hover {
          background-color: rgba(255, 255, 255, .6);
        }
      }
    }

    input {
      border: 0;
      outline: 0;
      width: 100%;
    }

    .u-select-tags {
      width: calc(100% - #{$grid-gutter-width});
    }

    &.active .u-select-current, .u-select-current:hover {
      background-color: $hover-bg;
      border-color: $hover-bg;
      color: $hover-fg;

      &:after {
        border-top-color: $hover-fg;
      }
    }
  }
</style>
