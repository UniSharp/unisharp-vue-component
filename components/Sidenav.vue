<template lang="pug">
  nav.u-sidenav
    ul.list-unstyled
      li(:key="index", v-for="(item, index) in list")
        nuxt-link(:to="item.to", v-if="item.to !== undefined")
          i.fa(:class="`fa-${item.icon}`", aria-hidden="true")
          | {{ item.title }}
        a(@click.prevent, href="#", v-else)
          i.fa(:class="`fa-${item.icon}`", aria-hidden="true")
          | {{ item.title }}
        ul.list-unstyled.u-sidenav-nested(v-if="item.children")
          li(:key="index", v-for="(child, index) in item.children")
            nuxt-link(:to="child.to") {{ child.title }}
</template>

<script>
  export default {
    data () {
      return {
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
      margin: 0 .5rem 0 1rem;
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

      &:first-child {
        border-top: 1px solid $navbar-bg;
      }

      a:hover .fa {
        transition: transform .5s cubic-bezier(.25, .8, .5, 1);
        transform: rotate(-360deg);
      }
    }

    .u-sidenav-nested {
      li {
        padding-left: 2.5rem;
        background-color: darken($sidebar-bg, 5%);
        transition: background-color .3s ease;

        & + li {
          margin-top: 1px;
        }

        a {
          height: $item-height - 10px;
        }

        &:hover, &.active {
          background-color: $navbar-bg;
        }
      }
    }
  }
</style>
