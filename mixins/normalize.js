import _ from 'lodash'
export default {
  methods: {
    normalize (options) {
      return _.map(options, (v, k) => {
        return {
          value: v.value || v.text || v || k || null,
          text: _.toString(v.text || v)
        }
      })
    }
  }
}
