import _ from 'lodash'

class Menu {
  constructor (menu) {
    this.menu = menu
  }

  getCurrent ($route) {
    return _.find(Menu.normalize(this.menu), { to: $route.matched[0].path })
  }

  static isActive (item, $route) {
    return _.find(Menu.normalize(item), { to: $route.matched[0].path })
  }

  static normalize (menu) {
    let result = []

    if (!_.isArray(menu)) {
      menu = [menu]
    }

    menu.forEach(item => {
      if (item.to) {
        result.push({ title: item.title, to: item.to })
      }

      if (item.active) {
        item.active.forEach(active => result.push({ title: item.title, to: active }))
      }

      if (item.children) {
        result = result.concat(Menu.normalize(item.children))
      }
    })

    return result
  }
}

export default Menu