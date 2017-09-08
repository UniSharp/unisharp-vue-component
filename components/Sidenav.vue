<template lang="pug">
  nav.u-sidenav
    ul.list-unstyled
      li(:class="{ active: item.to === $route.path || active === index }", :key="index", v-for="(item, index) in list")
        nuxt-link(:to="item.to", v-if="item.to !== undefined")
          i.fa(:class="`fa-${item.icon}`", aria-hidden="true")
          span {{ item.title }}
        a(@click.prevent="active = active === index ? -1 : index", href="#", v-else)
          i.fa(:class="`fa-${item.icon}`", aria-hidden="true")
          span.mr-auto {{ item.title }}
          i.fa.fa-angle-left(aria-hidden="true")
        ul.list-unstyled.u-sidenav-nested(:style="`height: ${35 * item.children.length - 1}px`", v-if="item.children")
          li(:class="{ active: child.to === $route.path }", :key="index", v-for="(child, index) in item.children")
            nuxt-link(:to="child.to") {{ child.title }}
</template>

<script>
  import _ from 'lodash'

  export default {
    data () {
      return {
        active: -1,
        list: [{
          icon: 'file-text-o',
          title: '元件範例',
          children: [{
            title: '表單元件',
            to: '/form'
          }, {
            title: '表格',
            to: '/table'
          }]
        }, {
          icon: 'file-text-o',
          title: '會員管理',
          children: [{
            title: '會員列表',
            to: ''
          }, {
            title: '新增會員',
            to: ''
          }]
        }, {
          icon: 'file-text-o',
          title: '全站設定',
          to: ''
        }]
      }
    },
    computed: {
      _: () => _
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
  @import "~assets/scss/variables";

  $item-height: 44px;

  .u-sidenav {
    font-weight: 300;

    .fa {
      width: 1rem;
      text-align: center;
      margin-right: .5rem;
    }

    a {
      display: flex;
      align-items: center;
      height: $item-height;
      transition: color .3s ease;

      .fa {
        margin-top: 1px;
      }

      &:hover {
        text-decoration: none;
      }
    }

    :not(.u-sidenav-nested) > li {
      display: flex;
      flex-direction: column;
      background-color: $sidebar-bg;
      border-bottom: 1px solid $navbar-bg;
      transition: background-color .3s ease;

      > a {
        padding: 0 .5rem 0 1rem;
      }

      &:first-child {
        border-top: 1px solid $navbar-bg;
      }

      .fa:last-child, a:hover .fa:first-child {
        transition: transform .5s cubic-bezier(.25, .8, .5, 1);
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
      overflow: hidden;
      transition: height .5s cubic-bezier(.25, .8, .5, 1);

      li {
        background-color: darken($sidebar-bg, 5%);
        transition: background-color .3s ease;

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
