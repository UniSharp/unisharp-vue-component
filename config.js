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
      title: 'Buttons',
      to: '/guide/buttons'
    }, {
      title: 'Typography',
      to: '/guide/typography'
    }, {
      title: 'Alerts',
      to: '/guide/alerts'
    }, {
      title: 'Modal',
      to: '/guide/modal'
    }, {
      title: 'Card',
      to: '/guide/card'
    }, {
      title: 'List',
      to: '/guide/list'
    }]
  }, {
    icon: 'cubes',
    title: 'Components',
    children: [{
      title: '表單元件',
      to: '/form'
    }, {
      title: '表格',
      to: '/table'
    }, {
      title: 'Filter',
      to: '/components/filter'
    }]
  }]
}
