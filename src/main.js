import Vue from 'vue'
import App from './App.vue'
import VueHighlightJS from 'vue-highlightjs'
import Clipboard from 'v-clipboard'

Vue.use(VueHighlightJS)
Vue.use(Clipboard)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
