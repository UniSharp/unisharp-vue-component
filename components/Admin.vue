<template lang="pug">
  .u-admin.container-fluid
    notifications
    .row
      u-sidebar.col.p-0(ref="sidebar")
        u-logo(slot="header")
        u-sidenav
      .u-content.col.p-0.d-flex.flex-column
        .navbar.px-4.py-0
          .u-sidebar-toggle.text-light.px-2.mr-3.d-lg-none(@click.prevent="$refs.sidebar.show")
           i.fa.fa-bars
          .d-none.d-sm-block
            slot(name="breadcrumb")
              u-breadcrumb
          u-user-dropdown.h-100.ml-auto
            template(v-if="dropdownMenu")
              nuxt-link.dropdown-item(v-for="(item, index) in dropdownMenu", :to="item.to", :key="index")
                i.fa.mr-2(:class="`fa-${item.icon}`", aria-hidden="true")
                span {{ item.title }}
            template(v-else)
              nuxt-link.dropdown-item(to="/logout")
                i.fa.fa-sign-out.mr-2(aria-hidden="true")
                span 登出
        header.px-4.bg-white.d-flex.align-items-center
          h1.mb-0.mr-auto {{ title || defaultTitle }}
          slot(name="functions")
        main.p-4
          slot
</template>

<script>
  import config, { createMenu } from '~/config'
  import Menu from '../plugins/Menu'

  export default {
    props: {
      title: {
        type: String
      }
    },
    computed: {
      defaultTitle () {
        let menu = new Menu(createMenu(this.$store))
        let current = menu.getCurrent(this.$route)

        return current ? current.title : config.index.title
      },
      dropdownMenu () {
        return config.dropdownMenu
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/variables";
  @import "node_modules/bootstrap/scss/mixins/breakpoints";

  .u-logo {
    margin-left: -.35rem;
  }

  .row {
    flex-wrap: nowrap;
  }

  .u-content {
    flex: 0 0 auto;
    height: 100vh;

    .u-sidebar-toggle {
      cursor: pointer;
      transform: scale(1.5);
    }

    .navbar {
      position: relative;
      background-color: $navbar-bg;
      flex: 0 0 map-get($navbar-heights, 'xs');
    }

    header {
      z-index: 10;
      flex: 0 0 map-get($navbar-heights, 'xs') * 1.2;

      h1 {
        font-weight: 400;
        font-size: 1.875rem;
      }

      box-shadow: 0 2px 12px rgba(0, 0, 0, .1);
    }

    main {
      overflow-x: hidden;
      overflow-y: auto;
      min-height: calc(100vh - #{map-get($navbar-heights, 'xs') * 2.2});
    }

    @include media-breakpoint-up(sm) {
      .navbar {
        flex: 0 0 map-get($navbar-heights, 'sm');
      }

      header {
        flex: 0 0 map-get($navbar-heights, 'sm') * 1.2;
      }

      main {
        min-height: calc(100vh - #{map-get($navbar-heights, 'sm') * 2.2});
      }
    }

    @include media-breakpoint-up(lg) {
      width: calc(100% - #{$sidebar-width});
    }
  }
</style>
