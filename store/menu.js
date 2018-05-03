import { createMenu } from '~/config'
import Menu from '../plugins/Menu'
import _ from 'lodash'

export const state = () => ({
  menu: null
})

export const mutations = {
  setMenu (state, menu) {
    state.menu = menu
  }
}

export const actions = {
  async getMenu ({ commit, state }) {
    if (!state.menu) {
      let menu = new Menu(await createMenu(this))
      commit('setMenu', menu)
    }

    return state.menu
  },

  async getVisible ({dispatch, state}) {
    if (!state.menu) {
      await dispatch('getMenu')
    }

    let menu = _.cloneDeep(state.menu)
    return menu.getVisible()
  }
}
