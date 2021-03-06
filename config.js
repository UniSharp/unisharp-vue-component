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
      title: 'Badges',
      to: '/components/badges'
    }, {
      title: 'Buttons',
      to: '/components/buttons'
    }, {
      title: 'Card',
      to: '/components/card'
    }, {
      title: 'Checkbox And Radio',
      to: '/components/checkbox-and-radio'
    }, {
      title: 'DateTime Picker',
      to: '/components/datetime-picker'
    }, {
      title: 'File Uploader',
      to: '/components/file-uploader'
    }, {
      title: 'Input',
      to: '/components/input'
    }, {
      title: 'Input Tag',
      to: '/components/input-tag'
    }, {
      title: 'Modal',
      to: '/components/modal'
    }, {
      title: 'Pagination',
      to: '/components/pagination'
    }, {
      title: 'Select',
      to: '/components/select'
    }, {
      title: 'Switch',
      to: '/components/switch'
    }]
  }, {
    icon: 'file-text-o',
    title: 'Table',
    children: [{
      title: 'Basic',
      to: '/table/basic'
    }, {
      title: 'Advance',
      to: '/table/advance'
    }]
  }, {
    icon: 'folder-o',
    title: 'ShowCase',
    children: [{
      title: 'Form',
      to: '/showcase/form'
    }, {
      title: 'Error Form',
      to: '/showcase/error-form'
    }, {
      title: 'Table',
      to: '/showcase/table'
    }, {
      title: 'Filter',
      to: '/showcase/filter'
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
