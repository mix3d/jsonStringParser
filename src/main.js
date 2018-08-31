import Vue from 'vue'
import App from './App.vue'
import VueHighlightJS from 'vue-highlightjs'
import Clipboard from 'v-clipboard'
import VueUp from 'vueup'


Vue.use(VueHighlightJS)
Vue.use(Clipboard)
Vue.use(VueUp)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
