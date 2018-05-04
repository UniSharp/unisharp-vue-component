import _ from 'lodash'
import { createMenu } from '~/config'

class Menu {
  constructor (menu) {
    this.menu = menu
  }

  getVisible () {
    return this.menu.filter(menu => {
      if (menu.children) {
        menu.children = menu.children.filter(child => {
          if (child.show === undefined || !!child.show) {
            return child
          }
        })
      }

      if (menu.show === undefined || !!menu.show) {
        return menu
      }
    })
  }

  getCurrent ($route) {
    return _.find(Menu.normalize(this.menu), { matched: $route.matched[0].path })
  }

  static async singleton (store) {
    if (!Menu.instance) {
      Menu.instance = await new Menu(await createMenu(store))
    }

    return Menu.instance
  }

  static isActive (item, $route) {
    return _.find(Menu.normalize(item), { matched: $route.matched[0].path })
  }

  static normalize (menu) {
    let result = []

    if (!_.isArray(menu)) {
      menu = [menu]
    }

    menu.forEach(item => {
      if (item.to) {
        result.push({ title: item.title, to: item.to, matched: item.to })
      }

      if (item.active) {
        item.active.forEach(active => result.push({ title: item.title, to: item.to, matched: active }))
      }

      if (item.children) {
        result = result.concat(Menu.normalize(item.children))
      }
    })

    return result
  }
}

export default Menu
