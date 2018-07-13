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
      title: 'Checkbox And Radio',
      to: '/components/checkbox-and-radio'
    }, {
      title: 'Select',
      to: '/components/select'
    }, {
      title: 'Input',
      to: '/components/input'
    }, {
      title: 'Input Tag',
      to: '/components/input-tag'
    }, {
      title: 'File Uploader',
      to: '/components/file-uploader'
    }, {
      title: 'DateTime Picker',
      to: '/components/datetime-picker'
    }, {
      title: 'Modal',
      to: '/components/modal'
    }, {
      title: 'Pagination',
      to: '/components/pagination'
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
