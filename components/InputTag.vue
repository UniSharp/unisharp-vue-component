<template lang="pug">
  .input-tag
    u-dropdown.u-select(ref="dropdown", :disableShow="true")
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
            @keydown="handleKeydown",
            @click="handleClick"
          )
      .dropdown-menu.u-select-tags(v-if="!disableShowList", :style="dropdownMenuStyle", ref="menu")
        a.dropdown-item(
          v-for="(tag, index) in filterTags",
          :key="index",
          :class="activeClass(index)",
          @mousemove="mousemove(index)",
          @click.stop.prevent="addTag"
        ) {{ tag }}

    u-modal(ref="modal", size="sm")
      span(slot="title")
      p {{ limitTagInfo }}
</template>

<script>
  import Vue from 'vue'
  import UDropdown from './Dropdown'
  import UModal from './Modal'

  const UP = 38
  const DOWN = 40
  const ENTER = 13
  const DELETE = 8
  const ESC = 27

  const SELECTION_TYPE = 'selection'
  const ADD_TYPE = 'add'

  export default {
    components: { UDropdown, UModal },
    props: {
      placeholder: String,
      tags: {
        type: Array
      },
      value: Array,
      type: {
        type: String,
        default: 'selection'
      },
      limitTag: {
        type: Number,
        default: null
      },
      limitTagInfo: {
        type: String,
        default: '輸入的 tag 數已達最大上限'
      },
      maxTagsShow: {
        type: Number,
        default: null
      }
    },
    data () {
      return {
        keyword: '',
        activeIndex: -1,
        selectedTags: this.value,
        selectionHeight: null,
        height: null
      }
    },
    computed: {
      filterTags () {
        return this.tags.filter((tag) => {
          return this.keyword ? tag.includes(this.keyword) : true
        })
      },
      disableShowList () {
        return this.type === ADD_TYPE
      },
      dropdownMenuStyle () {
        if (this.maxTagsShow && this.selectionHeight) {
          this.height = this.$refs.menu.childNodes[0].clientHeight * this.maxTagsShow + 8
          return {
            'max-height': `${this.height}px`,
            'overflow-y': 'scroll'
          }
        }
      }
    },
    methods: {
      handleKeydown (e) {
        if (!this.$refs.dropdown.active) {
          this.$refs.dropdown.show()
        }

        let keyCode = e.keyCode

        switch (keyCode) {
          case DOWN:
            e.preventDefault()
            this.activeIndex < this.filterTags.length - 1
              ? this.activeIndex++
              : this.activeIndex = 0
            this.handleScroll(DOWN)
            break
          case UP:
            e.preventDefault()
            this.activeIndex > 0
              ? this.activeIndex--
              : this.activeIndex = this.filterTags.length - 1
            this.handleScroll(UP)
            break
          case ENTER:
            e.preventDefault()
            this.addTag()
            break
          case DELETE:
            if (this.keyword === '') {
              this.removeTag(this.selectedTags.length - 1)
            }
            break
          case ESC:
            this.clear()
            break
        }
      },
      handleClick (e) {
        this.$refs.dropdown.show()

        if (!this.selectionHeight) {
          Vue.nextTick(() => {
            this.selectionHeight = this.maxTagsShow
              ? this.$refs.menu.childNodes[0].clientHeight
              : 0
          })
        }
      },
      handleScroll (direction) {
        if (!this.maxTagsShow) {
          return
        }

        let tmpScrollTop = 0
        switch (direction) {
          case DOWN:
            let overTags = (this.activeIndex + 1) - this.maxTagsShow
            tmpScrollTop = overTags > 0
              ? 8 + this.selectionHeight * overTags
              : 0
            break
          case UP:
            tmpScrollTop = this.activeIndex * this.selectionHeight + 8
            break
        }

        let currentScrollTop = this.$refs.menu.scrollTop
        let activeTagHeight = this.activeIndex * this.selectionHeight + 8
        if (
          activeTagHeight < currentScrollTop ||
          activeTagHeight > currentScrollTop + this.selectionHeight * (this.maxTagsShow - 1)
        ) {
          this.$refs.menu.scrollTop = tmpScrollTop
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
      addTag () {
        if (this.limitTag && this.selectedTags.length >= this.limitTag) {
          this.$refs.modal.show()
          this.clear()
          return
        }

        switch (this.type) {
          case SELECTION_TYPE:
            if (this.activeIndex === -1) {
              return
            }

            this.selectedTags.push(this.filterTags[this.activeIndex])
            break
          case ADD_TYPE:
            this.selectedTags.push(this.keyword)
            break
        }
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
