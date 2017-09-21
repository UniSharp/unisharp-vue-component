import _ from 'lodash'
import config from '~/config'

class Menu {
  constructor () {
    this.items = this.getItems(config.menu)
  }

  getItems (menu) {
    let result = []

    menu.forEach(item => {
      if (item.to) {
        result.push({ title: item.title, to: item.to })
      }

      if (item.active) {
        item.active.forEach(active => result.push({ title: item.title, to: active }))
      }

      if (item.children) {
        result = result.concat(this.getItems(item.children))
      }
    })

    return result
  }

  active () {
    return _.find(this.items, { to: location.pathname })
  }
}

const menu = new Menu()

export default menu
