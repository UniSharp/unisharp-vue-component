export const createMenu = store => [
  {
    icon: 'book',
    title: 'Style Guide',
    show: true,
    children: [{
      title: 'Colors',
      to: '/guide/colors'
    }, {
      title: 'Typography',
      to: '/guide/typography'
    }]
  }, {
    icon: 'cubes',
    title: 'Components',
    children: [{
      title: 'Alerts',
      to: '/components/alerts'
    }, {
      title: 'Buttons',
      to: '/components/buttons'
    }, {
      title: 'Badges',
      to: '/components/badges'
    }, {
      title: 'Card',
      to: '/components/card'
    }, {
      title: 'Filter',
      to: '/components/filter'
    }, {
      title: 'Form',
      to: '/components/form'
    }, {
      title: 'Modal',
      to: '/components/modal'
    }, {
      title: 'Pagination',
      to: '/components/pagination'
    }]
  }, {
    icon: 'file-text-o',
    title: 'Example',
    children: [{
      title: 'List',
      to: '/example/list'
    }]
  }, {
    icon: 'folder-o',
    title: 'ShowCase',
    children: [{
      title: '表單元件',
      to: '/showcase/form'
    }, {
      title: '表單驗證',
      to: '/showcase/error-form'
    }, {
      title: '表格',
      to: '/showcase/table'
    }]
  }
]

export default {
  index: {
    title: 'Blue Admin',
    to: '/'
  },
  dropdownMenu: [{
    icon: 'cog',
    title: 'Change Password',
    to: '/password'
  }, {
    icon: 'sign-out',
    title: 'Logout',
    to: '/logout'
  }]
}
