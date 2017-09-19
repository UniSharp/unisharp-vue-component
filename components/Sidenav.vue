<template lang="pug">
  nav.u-sidenav
    ul.list-unstyled.mb-0
      li(:class="{ active: item.to === $route.path || active === index }", :key="index", v-for="(item, index) in list")
        nuxt-link(:to="item.to", v-if="item.to !== undefined")
          i.fa(:class="`fa-${item.icon}`", aria-hidden="true")
          span {{ item.title }}
        a(@click.prevent="active = active === index ? -1 : index", v-else)
          i.fa(:class="`fa-${item.icon}`", aria-hidden="true")
          span.mr-auto {{ item.title }}
          i.fa.fa-angle-left(aria-hidden="true")
        ul.list-unstyled.u-sidenav-nested(:style="`height: ${35 * item.children.length - 1}px`", v-if="item.children")
          li(:class="{ active: child.to === $route.path }", :key="index", v-for="(child, index) in item.children")
            nuxt-link(:to="child.to") {{ child.title }}
</template>

<script>
  import _ from 'lodash'
  import config from '~/config'

  export default {
    data () {
      return {
        active: -1
      }
    },
    computed: {
      _: () => _,
      list: () => config.menu
    },
    created () {
      for (let i = 0; i < this.list.length; i++) {
        if (_.find(this.list[i].children, {to: this.$route.path})) {
          this.active = i

          break
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables";
  @import "node_modules/bootstrap/scss/mixins/transition";

  $item-height: 44px;

  .u-sidenav {
    .fa {
      width: 1rem;
      text-align: center;
      margin-right: .5rem;
    }

    a {
      @include transition;

      display: flex;
      align-items: center;
      height: $item-height;

      .fa {
        margin-top: 1px;
      }

      &:hover {
        text-decoration: none;
      }
    }

    :not(.u-sidenav-nested) > li {
      @include transition;

      display: flex;
      flex-direction: column;
      background-color: $sidebar-bg;
      border-bottom: 1px solid $navbar-bg;

      > a {
        padding: 0 .5rem 0 1rem;
      }

      &:first-child {
        border-top: 1px solid $navbar-bg;
      }

      .fa:last-child, a:hover .fa:first-child {
        @include transition($transition-slide);
      }

      &:hover, &.active {
        background-color: darken($sidebar-bg, 5%);
      }

      &:not(.active) .u-sidenav-nested {
        height: 0 !important;
      }

      &.active .fa:last-child {
        transform: rotate(-90deg);
      }

      a:hover .fa:first-child {
        transform: rotate(-360deg);
      }
    }

    .u-sidenav-nested {
      @include transition($transition-slide);

      overflow: hidden;

      li {
        @include transition;

        background-color: darken($sidebar-bg, 5%);

        & + li {
          margin-top: 1px;
        }

        a {
          padding-left: 2.5rem;
          height: $item-height - 10px;
        }

        &:hover, &.active {
          background-color: $navbar-bg;
        }
      }
    }
  }
</style>
