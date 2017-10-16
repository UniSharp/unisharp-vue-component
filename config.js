export default {
  index: {
    title: 'Blue Admin',
    to: '/'
  },
  menu: [{
    icon: 'book',
    title: 'Style Guide',
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
    title: '待分類',
    children: [{
      title: '表單元件',
      to: '/other/form'
    }, {
      title: '表單驗證',
      to: '/other/error-form'
    }, {
      title: '表格',
      to: '/other/table'
    }]
  }]
}
