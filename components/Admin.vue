<template lang="pug">
  .u-admin.container-fluid
    .row
      u-sidebar.col.p-0(ref="sidebar")
        u-logo(slot="header")
        u-sidenav
      .u-content.col.p-0.d-flex.flex-column
        .navbar.px-4.py-0
          button.btn.btn-outline-light.bg-transparent.u-sidebar-toggle.mr-3.d-lg-none(@click.prevent="$refs.sidebar.show")
           i.fa.fa-bars
          slot(name="breadcrumb")
          u-user-dropdown.h-100.ml-auto
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
      position: relative;
      flex: 0 0 $navbar-height;
      background-color: $navbar-bg;
    }

    header {
      z-index: 10;

      h1 {
        font-weight: 400;
        font-size: 1.875rem;
      }

      box-shadow: 0 2px 12px rgba(0, 0, 0, .1);
    }

    main {
      overflow-x: hidden;
      overflow-y: auto;
      height: calc(100vh - 153px);
    }
  }
</style>
