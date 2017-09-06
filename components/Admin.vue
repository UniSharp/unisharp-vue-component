<template lang="pug">
  .u-admin.container-fluid
    .row
      u-sidebar.col.p-0(ref="sidebar")
        u-logo(slot="header")
        u-sidenav
      .u-content.col.p-0.d-flex.flex-column
        .navbar.navbar-dark.px-4.py-3
          b-btn.u-sidebar-toggle.mr-3.d-lg-none(variant="outline-secondary", @click.prevent="$refs.sidebar.show")
           i.fa.fa-bars
          slot(name="breadcrumb")
          b-nav(is-nav-bar, class="ml-auto")
            u-user-dropdown
        header.p-4.bg-white
          h1.m-0 {{ title }}
        main.p-4
          slot
</template>

<script>
  import ULogo from '~/components/Logo'
  import USidebar from '~/components/Sidebar'
  import USidenav from '~/components/Sidenav'
  import UUserDropdown from '~/components/UserDropdown'

  export default {
    components: { ULogo, USidebar, USidenav, UUserDropdown },
    props: {
      title: {
        type: String,
        default: '後台管理系統'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~assets/scss/variables";

  .u-content {
    height: 100vh;

    .u-sidebar-toggle {
      cursor: pointer;
    }

    .navbar {
      flex: 0 0 $navbar-height;
      background-color: $navbar-bg;
    }

    header {
      h1 {
        font-weight: 400;
        font-size: 1.875rem;
      }

      box-shadow: 0 2px 12px rgba(0, 0, 0, .1);
    }

    main {
      overflow-x: hidden;
      overflow-y: scroll;
    }
  }
</style>
