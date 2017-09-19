import _ from 'lodash'
import config from '~/config'

class Menu {
  constructor () {
    this.menu = []

    config.menu.forEach(item => {
      if (item.to) {
        this.menu.push({ title: item.title, to: item.to })
      }

      if (item.children) {
        item.children.forEach(child => this.menu.push({ title: child.title, to: child.to }))
      }
    })
  }

  active () {
    return _.find(this.menu, item => (new RegExp(`^${item.to}(/(create|edit))?$`)).test(location.pathname))
  }
}

const menu = new Menu()

export default menu
