import _ from 'lodash'
export default {
  methods: {
    normalize (options) {
      // support :
      // [{text: 'text', value: 'value'}]
      // or
      // { value: 'text' }
      // or
      // [ 'text', 'text' ] # it will use text as value
      return _.map(options, (v, k) => {
        return {
          value: typeof v.value !== 'undefined' ? v.value : v.text || v || k || null,
          text: _.toString(v.text || v),
          disabled: v.disabled || false
        }
      })
    }
  }
}
