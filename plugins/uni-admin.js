import Vue from 'vue'
import UniAdmin from '../'
import VueQuillEditor from 'vue-quill-editor'
import Notifications from '@unisharp/vue-component-notification'

Vue.use(UniAdmin)
Vue.use(VueQuillEditor)
Vue.use(Notifications)

export default ({ store }, inject) => {
  // Inject `notify` key
  // -> `app.$notify`
  // -> `this.$notify` in Vue components
  // -> `this.$notify` in store actions/mutations
  // This way we can use it in middleware and pages `asyncData` & `fetch`
  inject('notify', new Notifications(Vue))
}
